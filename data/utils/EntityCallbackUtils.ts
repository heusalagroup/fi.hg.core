// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityCallback } from "../types/EntityCallback";
import { Entity } from "../Entity";
import { reduce } from "../../functions/reduce";
import { EntityCallbackType } from "../types/EntityCallbackType";
import { filter } from "../../functions/filter";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { some } from "../../functions/some";

const LOG = LogService.createLogger( 'EntityCallbackUtils' );

export class EntityCallbackUtils {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

    public static hasCallbacks (
        callbacks : readonly EntityCallback[],
        type      : EntityCallbackType
    ) : boolean {
        return some(
            callbacks,
            (callback: EntityCallback) : boolean => callback.callbackType === type
        );
    }

    /**
     * These callbacks are executed before the operation to persist
     * a new entity into the database. This is usually `INSERT` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPrePersistCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.PRE_PERSIST
        );
    }

    /**
     * These callbacks are executed after the operation to persist
     * a new entity into the database. This is usually `INSERT` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPostPersistCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.POST_PERSIST
        );
    }

    /**
     * These callbacks are executed before the operation to remove
     * an entity from the database. This is usually `DELETE` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPreRemoveCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.PRE_REMOVE
        );
    }

    /**
     * These callbacks are executed after the operation to remove
     * an entity from the database. This is usually `DELETE` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPostRemoveCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.POST_REMOVE
        );
    }

    /**
     * These callbacks are executed before the operation to update
     * an entity in the database. This is usually `UPDATE` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPreUpdateCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.PRE_UPDATE
        );
    }

    /**
     * These callbacks are executed after the operation to update
     * an entity in the database. This is usually `UPDATE` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPostUpdateCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.POST_UPDATE
        );
    }

    /**
     * These callbacks are executed after the operation to fetch
     * an entity from the database. This is usually `SELECT` operation.
     *
     * @param entityList
     * @param callbacks
     */
    public static async runPostLoadCallbacks<T extends Entity> (
        entityList: readonly T[],
        callbacks : readonly EntityCallback[]
    ) : Promise<void> {
        return this._runCallbacks(
            entityList,
            callbacks,
            EntityCallbackType.POST_LOAD
        );
    }

    /**
     *
     * @param entityList
     * @param callbacks
     * @param type
     * @private
     */
    private static async _runCallbacks<T extends Entity> (
        entityList : readonly T[],
        callbacks  : readonly EntityCallback[],
        type       : EntityCallbackType,
    ) : Promise<void> {

        callbacks = filter(
            callbacks,
            (callback) => callback?.callbackType === type
        );

        await reduce(
            entityList,
            async (entityPrevPromise: Promise<void>, entity: T): Promise<void> => {

                await entityPrevPromise;

                await reduce(
                    callbacks,
                    async (ret: Promise<void>, callback: EntityCallback): Promise<void> => {
                        await ret;
                        const { propertyName } = callback;

                        if ( !( entity && (entity as any)[propertyName] ) ) {
                            LOG.warn( `The entity did not have callback method defined with name "${propertyName.toString()}": `, entity );
                            throw new TypeError( `The entity did not have callback method defined with name "${propertyName.toString()}"` );
                        }

                        try {
                            await (entity as any)[propertyName]();
                        } catch ( err ) {
                            LOG.warn( `The callback named "${propertyName.toString()}" for ${type} life cycle method resolved in to an error: `, err );
                            throw new TypeError( `Callback function "${propertyName.toString()}" failed for ${type} life cycle event handler: ${err}` );
                        }

                    },
                    Promise.resolve()
                );

            },
            Promise.resolve()
        );

    }
}

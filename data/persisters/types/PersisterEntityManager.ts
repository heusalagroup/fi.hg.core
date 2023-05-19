// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityLike } from "../../types/EntityLike";
import { has } from "../../../functions/has";
import { EntityField } from "../../types/EntityField";
import { filter } from "../../../functions/filter";
import { LogService } from "../../../LogService";
import { isEqual } from "../../../functions/isEqual";
import { LogLevel } from "../../../types/LogLevel";

const LOG = LogService.createLogger( 'PersisterEntityManager' );

/**
 * Manager implementation which can be used to save a state of an entity inside
 * the entity object itself. This enables the Persister to know what was the state of
 * the entity when it gave it to the library user and detect changes in it.
 */
export class PersisterEntityManager {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

    private readonly _symbol : any;

    private constructor () {
        this._symbol = Symbol('persisterState');
    }

    /**
     * Create instance of PersisterEntityStateManager
     */
    public static create () {
        return new PersisterEntityManager();
    }

    /**
     * Saves current state as the state that is last known state from the
     * database persister into the entity provided by the persister.
     *
     * This is an internal function used by the persister to detect changes in
     * entities provided by them.
     */
    public saveLastEntityState<T extends EntityLike> (item: any) : void {
        item[this._symbol] = item.clone();
    }

    /**
     * Get saved state as the state that is the last known state provided by the
     * database persister.
     *
     * This is an internal function used by the persister to detect changes made
     * by the user of the persister.
     */
    public getLastEntityState<T extends EntityLike> (item: any) : EntityLike | undefined {
        return has(item, this._symbol) ? item[this._symbol] : undefined;
    }

    /**
     * Get array of fields which have changed since last saved state.
     *
     * If there were no previous state saved, will return all fields.
     *
     * This will also ignore fields configured as non-updatable.
     *
     * @param item
     * @param fields
     */
    public getChangedFields<T extends EntityLike> (
        item   : T,
        fields : readonly EntityField[]
    ) : EntityField[] {
        const prevState = this.getLastEntityState<T>(item);
        if (prevState === undefined) {
            LOG.warn(`Warning! Could not detect saved state in entity: `, item);
            return filter(
                fields,
                (field: EntityField) : boolean => {
                    const { updatable } = field;
                    return updatable !== false;
                }
            );
        }
        return filter(
            fields,
            (field: EntityField) : boolean => {
                const { propertyName, updatable } = field;
                if (updatable === false) return false;
                const prevValue : any = has(prevState, propertyName) ? (prevState as any)[propertyName] : undefined;
                const nextValue : any = has(item, propertyName) ? (item as any)[propertyName] : undefined;
                return !isEqual( prevValue, nextValue );
            }
        );
    }

}

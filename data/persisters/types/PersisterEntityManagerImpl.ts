// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { has } from "../../../functions/has";
import { filter } from "../../../functions/filter";
import { isEqual } from "../../../functions/isEqual";
import { EntityLike } from "../../types/EntityLike";
import { EntityField } from "../../types/EntityField";
import { LogService } from "../../../LogService";
import { LogLevel } from "../../../types/LogLevel";
import { PersisterEntityManager } from "./PersisterEntityManager";
import { forEach } from "../../../functions/forEach";

const LOG = LogService.createLogger( 'PersisterEntityManagerImpl' );

/**
 * @inheritDoc
 */
export class PersisterEntityManagerImpl implements PersisterEntityManager {

    /**
     * Set internal log level for this scope. These logs are written with logger
     * named as "PersisterEntityManagerImpl".
     *
     * @param level
     */
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
        return new PersisterEntityManagerImpl();
    }

    /**
     * @inheritDoc
     */
    public saveLastEntityState<T extends EntityLike> (item: T) : void {
        (item as any)[this._symbol] = item.clone();
    }

    /**
     * @inheritDoc
     */
    public saveLastEntityListState<T extends EntityLike> (list: readonly T[]) : void {
        forEach(
            list,
            (item: any) : void => this.saveLastEntityState<T>(item)
        );
    }

    /**
     * @inheritDoc
     */
    public getLastEntityState<T extends EntityLike> (item: T) : T | undefined {
        return has(item, this._symbol) ? (item as any)[this._symbol] : undefined;
    }

    /**
     * @inheritDoc
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

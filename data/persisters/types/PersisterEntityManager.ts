// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityLike } from "../../types/EntityLike";
import { EntityField } from "../../types/EntityField";

/**
 * Manager implementation which can be used to save a state of an entity inside
 * the entity object itself. This enables the Persister to know what was the state of
 * the entity when it gave it to the library user and detect changes in it.
 */
export interface PersisterEntityManager {

    /**
     * Saves current state as the state that is last known state from the
     * database persister into the entity provided by the persister.
     *
     * This is an internal function used by the persister to detect changes in
     * entities provided by them.
     */
    saveLastEntityState<T extends EntityLike> (item: T) : void

    /**
     * Saves current state as the state that is last known state from the
     * database persister into each entity provided by the persister as a list.
     *
     * This is an internal function used by the persister to detect changes in
     * entities provided by them.
     */
    saveLastEntityListState<T extends EntityLike> (list: readonly T[]) : void;

    /**
     * Get saved state as the state that is the last known state provided by the
     * database persister.
     *
     * This is an internal function used by the persister to detect changes made
     * by the user of the persister.
     */
    getLastEntityState<T extends EntityLike> (item: T) : T | undefined;

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
    getChangedFields<T extends EntityLike> (
        item   : T,
        fields : readonly EntityField[]
    ) : EntityField[];

}

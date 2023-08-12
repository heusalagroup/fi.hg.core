// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { EntityMetadata } from "./EntityMetadata";
import { Entity } from "../Entity";
import { Sort } from "../Sort";
import { Where } from "../Where";
import { PersisterType } from "../persisters/types/PersisterType";
import { Disposable } from "../../types/Disposable";

/**
 * Implements interface for relational database entity persister.
 *
 * Our persister interface is intended to be only used by persister developers
 * to implement new Persisters -- and by our internal relational database
 * framework.
 *
 * Because of this, we have intentionally left the API as simple as possible.
 * Our method signatures also intentionally do not leave out any optional
 * parameters.
 *
 * For example, we want it to be an syntax error if you call
 * `.deleteAll(metadata)` without the where clause. This is because we could be
 * adding more options later, and we don't want future changes to accidentally
 * add bugs like deleting something you didn't want to, or leaving some new
 * feature not implemented in your implementation.
 *
 * The API may also change from time to time without notice, so if you want your
 * persister to be refactored to support all of our future improvements, you
 * should contact us and make it officially part of our framework. For
 * commercial closed source Persisters our company can provide commercial
 * support to upgrade these changes with a support contract.
 *
 * @see {@link MySqlPersister}
 * @see {@link PgPersister}
 * @see {@link MemoryPersister}
 * @see {@link MockPersister}
 */
export interface Persister extends Disposable {

    /**
     * Get the type of the persister.
     */
    getPersisterType () : PersisterType;

    /**
     * Destroys the persister.
     *
     * This will free up any used resources. You should not use the persister
     * after calling this method, and it's advised to delete any references to it.
     */
    destroy () : void;

    /**
     * This method is used by our annotation framework to inform the persister
     * about a new kind of entity.
     *
     * @see {@link PersisterMetadataManager.setupEntityMetadata}
     * @param metadata
     */
    setupEntityMetadata (metadata: EntityMetadata) : void;

    /**
     * Get count of matching entities in the persister.
     *
     * @param metadata Entity metadata
     * @param where Criteria to filter entities, otherwise all entities will be
     *              counted.
     */
    count (
        metadata  : EntityMetadata,
        where     : Where | undefined,
    ) : Promise<number>;

    /**
     * Check if matching entities exist in the persister.
     *
     * @param metadata Entity metadata
     * @param where Criteria to filter entities
     * @returns `true` if entities matching the criteria exist, otherwise `false`
     */
    existsBy (
        metadata : EntityMetadata,
        where    : Where,
    ) : Promise<boolean>;

    /**
     * Delete matching entities from the persister.
     *
     * @param metadata Entity metadata
     * @param where Criteria to filter entities, otherwise all entities will be
     *              removed.
     */
    deleteAll (
        metadata  : EntityMetadata,
        where     : Where | undefined,
    ): Promise<void>;

    /**
     * Find matching entities stored in the persister.
     *
     * @param metadata Entity metadata
     * @param where Criteria to filter entities, otherwise all entities found.
     * @param sort Criteria how to sort entities. If undefined, it will be
     *             unspecified and may be random.
     * @returns all matching entities
     */
    findAll<T extends Entity> (
        metadata  : EntityMetadata,
        where     : Where | undefined,
        sort      : Sort | undefined
    ): Promise<T[]>;

    /**
     * Find a matching entity stored in the persister.
     *
     * @param metadata Entity metadata
     * @param where Criteria to filter entities
     * @param sort Criteria how to sort entities. Note, this will affect which
     *             entity will be found if there are more than one. If undefined,
     *             the order will be unspecified and may be random.
     * @returns the matching entity, otherwise `undefined`
     */
    findBy<T extends Entity> (
        metadata : EntityMetadata,
        where    : Where,
        sort     : Sort | undefined
    ): Promise<T | undefined>;

    /**
     * Insert an entity or more to the persister.
     *
     * @param metadata Entity metadata
     * @param entity
     */
    insert<T extends Entity> (
        metadata : EntityMetadata,
        entity   : T | readonly T[],
    ): Promise<T>;

    /**
     * Update an entity stored in the persister.
     *
     * @param metadata Entity metadata
     * @param entity
     */
    update<T extends Entity> (
        metadata : EntityMetadata,
        entity   : T,
    ): Promise<T>;

}

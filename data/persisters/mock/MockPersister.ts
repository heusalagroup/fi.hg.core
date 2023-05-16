// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Persister } from "../../types/Persister";
import { Entity, EntityIdTypes } from "../../Entity";
import { EntityMetadata } from "../../types/EntityMetadata";
import { first } from "../../../functions/first";
import { isArray } from "../../../types/Array";
import { Sort } from "../../Sort";
import { Where } from "../../Where";
import { PersisterType } from "../types/PersisterType";

/**
 * This persister implements every method but doesn't really do anything.
 * It is useful for testing purposes.
 *
 * @see {@link Persister}
 */
export class MockPersister implements Persister {

    public getPersisterType (): PersisterType {
        return PersisterType.MOCK;
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.destroy}
     */
    public destroy () {}

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.setupEntityMetadata}
     */
    public async setupEntityMetadata (
        metadata : EntityMetadata
    ) : Promise<void> {
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.count}
     */
    public async count<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined
    ): Promise<number> {
        return 0;
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.existsBy}
     */
    public async existsBy<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where,
    ): Promise<boolean> {
        return false;
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.deleteAll}
     */
    public async deleteAll<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined
    ): Promise<void> {
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.findAll}
     */
    public async findAll<T extends Entity, ID extends EntityIdTypes> (
        metadata  : EntityMetadata,
        where     : Where | undefined,
        sort      : Sort | undefined
    ): Promise<T[]> {
        return [];
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.findBy}
     */
    public async findBy<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined,
        sort     : Sort | undefined
    ): Promise<T | undefined> {
        return undefined;
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.insert}
     */
    public async insert<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        entity   : readonly T[] | T,
    ): Promise<T> {
        const item = isArray(entity) ? first(entity) : entity;
        if(!item) throw new TypeError('Could not create item');
        return item;
    }

    /**
     * **MOCKED VERSION!**
     * @inheritDoc
     * @see {@link Persister.update}
     */
    public async update<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        entity   : T,
    ): Promise<T> {
        return entity;
    }

}

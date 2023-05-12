// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Persister } from "../../types/Persister";
import { Entity, EntityIdTypes } from "../../Entity";
import { EntityMetadata } from "../../types/EntityMetadata";
import { first } from "../../../functions/first";
import { isArray } from "../../../types/Array";
import { Sort } from "../../Sort";
import { Where } from "../../Where";

/**
 * This persister implements every method but doesn't really do anything.
 * It is useful for testing purposes.
 */
export class MockPersister implements Persister {

    public destroy () {}

    public async setupEntityMetadata (
        metadata : EntityMetadata
    ) : Promise<void> {
    }

    public async count<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined
    ): Promise<number> {
        return 0;
    }

    public async existsBy<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where,
    ): Promise<boolean> {
        return false;
    }

    public async deleteAll<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined
    ): Promise<void> {
    }

    public async findAll<T extends Entity, ID extends EntityIdTypes> (
        metadata  : EntityMetadata,
        where     : Where | undefined,
        sort      : Sort | undefined
    ): Promise<T[]> {
        return [];
    }

    public async findBy<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        where    : Where | undefined,
        sort     : Sort | undefined
    ): Promise<T | undefined> {
        return undefined;
    }

    public async insert<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        entity   : readonly T[] | T,
    ): Promise<T> {
        const item = isArray(entity) ? first(entity) : entity;
        if(!item) throw new TypeError('Could not create item');
        return item;
    }

    public async update<T extends Entity, ID extends EntityIdTypes> (
        metadata : EntityMetadata,
        entity   : T,
    ): Promise<T> {
        return entity;
    }

}

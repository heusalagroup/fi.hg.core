// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Persister } from "../../types/Persister";
import { Entity, EntityIdTypes } from "../../Entity";
import { EntityMetadata } from "../../types/EntityMetadata";
import { first } from "../../../functions/first";
import { isArray } from "../../../types/Array";
import { Sort } from "../../Sort";

/**
 * This persister implements every method but doesn't really do anything.
 * It is useful for testing purposes.
 */
export class MockPersister implements Persister {

    public destroy () {}

    public async setupEntityMetadata (metadata: EntityMetadata) : Promise<void> {
    }

    public async count<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata): Promise<number> {
        return 0;
    }

    public async countByProperty<T extends Entity, ID extends EntityIdTypes> (property: string, value: any, metadata: EntityMetadata): Promise<number> {
        return 0;
    }

    public async deleteAll<T extends Entity, ID extends EntityIdTypes> (metadata: EntityMetadata): Promise<void> {
    }

    public async deleteAllById<T extends Entity, ID extends EntityIdTypes> (ids: readonly ID[], metadata: EntityMetadata): Promise<void> {
    }

    public async deleteAllByProperty<T extends Entity, ID extends EntityIdTypes> (property: string, value: any, metadata: EntityMetadata): Promise<void> {
    }

    public async deleteById<T extends Entity, ID extends EntityIdTypes> (id: ID, metadata: EntityMetadata): Promise<void> {
    }

    public async existsByProperty<T extends Entity, ID extends EntityIdTypes> (property: string, value: any, metadata: EntityMetadata): Promise<boolean> {
        return false;
    }

    public async findAll<T extends Entity, ID extends EntityIdTypes> (
        metadata: EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T[]> {
        return [];
    }

    public async findAllById<T extends Entity, ID extends EntityIdTypes> (
        ids: readonly ID[],
        metadata: EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T[]> {
        return [];
    }

    public async findAllByProperty<T extends Entity, ID extends EntityIdTypes> (
        property: string,
        value: any,
        metadata: EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T[]> {
        return [];
    }

    public async findById<T extends Entity, ID extends EntityIdTypes> (
        id: ID,
        metadata: EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T | undefined> {
        return undefined;
    }

    public async findByProperty<T extends Entity, ID extends EntityIdTypes> (
        property: string,
        value: any,
        metadata: EntityMetadata,
        sort     : Sort | undefined
    ): Promise<T | undefined> {
        return undefined;
    }

    public async insert<T extends Entity, ID extends EntityIdTypes> (entity: readonly T[] | T, metadata: EntityMetadata): Promise<T> {
        const item = isArray(entity) ? first(entity) : entity;
        if(!item) throw new TypeError('Could not create item');
        return item;
    }

    public async update<T extends Entity, ID extends EntityIdTypes> (entity: T, metadata: EntityMetadata): Promise<T> {
        return entity;
    }

}

// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {Entity, EntityIdTypes} from "../Entity";
import Persister from "./Persister";
import EntityMetadata from "./EntityMetadata";

export interface StaticRepository <T extends Entity, ID extends EntityIdTypes> {

    new (
        emptyMetadata : EntityMetadata,
        persister     : Persister
    ) : Repository<T, ID>;

}

export interface Repository<T extends Entity, ID extends EntityIdTypes> {

    count () : Promise<number>;

    delete (entity: T): Promise<void>;

    deleteById (id : ID): Promise<void>;

    deleteAll (): Promise<void>;
    deleteAll (entities: T[]): Promise<void>;

    deleteAllById (ids: ID[]): Promise<void>;

    existsById (id : ID): Promise<boolean>;

    findAll (): Promise<T[]>;

    findAllById (ids: ID[]): Promise<T[]>;

    findById (id: ID): Promise<T | undefined>;

    /**
     *
     * @deprecated Use `Repository.findAllByPropertyName(value)` instead.
     * @param propertyName
     * @param value
     */
    find (propertyName: string, value: any): Promise<T[]>;

    save (entity: T): Promise<T>;

    saveAll (entities: T[]): Promise<T[]>;


    /**
     * Warning! You shouldn't use Persister directly through this API.
     *
     * This interface is exposed as public for our own internal implementation, because TypeScript doesn't
     * support a concept like "friends" found from other languages.
     */
    __getPersister () : Persister;

}

export function createRepository<T extends Entity, ID extends EntityIdTypes> (
    ctor           : StaticRepository<T, ID>,
    entityMetadata : EntityMetadata,
    persister      : Persister
) : Repository<T, ID> {
    return new ctor(entityMetadata, persister)
}

export default Repository;

// Copyright (c) 2020, 2021 Sendanor. All rights reserved.

import { Entity, EntityIdTypes } from "../Entity";
import { Persister } from "./Persister";
import { EntityMetadata } from "./EntityMetadata";
import { Sort } from "../Sort";
import { Where } from "../Where";

export interface StaticRepository <T extends Entity, ID extends EntityIdTypes> {

    new (
        emptyMetadata : EntityMetadata,
        persister     : Persister
    ) : Repository<T, ID>;

}

const RESERVED_REPOSITORY_METHOD_NAMES : readonly string[] = [
    "setup",
    "count",
    "existsBy",
    "delete",
    "deleteById",
    "deleteAll",
    "deleteAllById",
    "existsById",
    "findAll",
    "findAllById",
    "findById",
    "find",
    "save",
    "saveAll",
    "__getPersister",
];

export function isReservedRepositoryMethodName (name: string) : boolean {
    return RESERVED_REPOSITORY_METHOD_NAMES.includes(name);
}

export interface Repository<T extends Entity, ID extends EntityIdTypes> {

    setup () : Promise<void>;

    count (where ?: Where) : Promise<number>;

    existsBy (where : Where) : Promise<boolean>;

    delete (entity: T): Promise<void>;

    deleteById (id : ID): Promise<void>;

    deleteAll (where ?: Where): Promise<void>;
    deleteAll (entities ?: readonly T[]): Promise<void>;

    deleteAllById (ids: readonly ID[]): Promise<void>;

    existsById (id : ID): Promise<boolean>;

    findAll (
        where ?: Where | Sort | undefined,
        sort  ?: Where | Sort | undefined,
    ): Promise<T[]>;

    findAllById (ids: readonly ID[] | ID, sort?: Sort): Promise<T[]>;

    findById (id: ID, sort?: Sort): Promise<T | undefined>;

    /**
     * @deprecated Use .findAll(Where.propertyExists(propertyName, value))
     * @param propertyName
     * @param value
     * @param sort
     */
    find (
        propertyName: string,
        value: any,
        sort?: Sort
    ): Promise<T[]>;

    save (entity: T): Promise<T>;

    saveAll (entities: readonly T[]): Promise<T[]>;


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

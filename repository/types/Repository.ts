// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { Entity } from "../Entity";
import Persister from "./Persister";
import EntityMetadata from "./EntityMetadata";

export interface StaticRepository <T extends Entity, IdType = string> {

    new (
        emptyMetadata : EntityMetadata,
        persister     : Persister
    ) : Repository<T, IdType>;

}

export interface Repository<T extends Entity, IdType = string> {

    save (entity: T): Promise<T>;

    delete (entity: T): Promise<void>;

    findAll (): Promise<T[]>;

    findAllById (ids: any[]): Promise<T[]>;

    findById (id: any): Promise<T | undefined>;

    find (propertyName: string, value: any): Promise<T[]>;

}

export function createRepository<T extends Entity, IdType> (
    ctor           : StaticRepository<T, IdType>,
    entityMetadata : EntityMetadata,
    persister      : Persister
) : Repository<T, IdType> {
    return new ctor(entityMetadata, persister)
}

export default Repository;

// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import RepositoryEntry from "./RepositoryEntry";
import PublicRepository from "./PublicRepository";

export interface Repository<T> extends PublicRepository<T> {

    findById (
        id              : string,
        includeMembers ?: boolean
    ): Promise<RepositoryEntry<T> | undefined>;

    getAll (): Promise<RepositoryEntry<T>[]>;

    getAllByProperty (
        propertyName  : string,
        propertyValue : any
    ): Promise<RepositoryEntry<T>[]>;

    createItem (
        data    : T,
        members ?: string[]
    ): Promise<RepositoryEntry<T>>;

    update (id: string, data: T): Promise<RepositoryEntry<T>>;

    deleteById (id: string): Promise<RepositoryEntry<T>>;

    inviteToItem (id: string, members : string[]): Promise<void>;

    subscribeToItem (id: string): Promise<void>;

}

export interface RepositoryFactory<T> {
    (rooms: string[]) : Repository<T>;
}

export default Repository;
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RepositoryEntry } from "./RepositoryEntry";
import { PublicRepository } from "./PublicRepository";

export interface Repository<T> extends PublicRepository<T> {

    findById (
        id              : string,
        includeMembers ?: boolean
    ): Promise<RepositoryEntry<T> | undefined>;

    waitById (
        id              : string,
        includeMembers ?: boolean,
        timeout        ?: number
    ): Promise<RepositoryEntry<T> | undefined>;

    getAll (): Promise<readonly RepositoryEntry<T>[]>;

    getAllByProperty (
        propertyName  : string,
        propertyValue : any
    ): Promise<readonly RepositoryEntry<T>[]>;

    createItem (
        data    : T,
        members ?: readonly string[]
    ): Promise<RepositoryEntry<T>>;

    update (id: string, data: T): Promise<RepositoryEntry<T>>;

    deleteById (id: string): Promise<RepositoryEntry<T>>;

    inviteToItem (id: string, members : readonly string[]): Promise<void>;

    subscribeToItem (id: string): Promise<void>;

}

export interface RepositoryFactory<T> {
    (rooms: readonly string[]) : Repository<T>;
}

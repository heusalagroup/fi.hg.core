// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { SimpleRepositoryEntry } from "./SimpleRepositoryEntry";
import { SimpleStoredRepositoryItem } from "./SimpleStoredRepositoryItem";

export const REPOSITORY_NEW_IDENTIFIER = 'new';

export interface SimpleRepository<T extends SimpleStoredRepositoryItem> {

    findById (
        id              : string,
        includeMembers ?: boolean
    ): Promise<SimpleRepositoryEntry<T> | undefined>;

    findByProperty (
        propertyName  : string,
        propertyValue : any
    ): Promise<SimpleRepositoryEntry<T> | undefined>;

    findByIdAndUpdate (
        id: string,
        item: T
    ) : Promise<SimpleRepositoryEntry<T>>;

    waitById (
        id              : string,
        includeMembers ?: boolean,
        timeout        ?: number
    ): Promise<SimpleRepositoryEntry<T> | undefined>;

    getAll (): Promise<readonly SimpleRepositoryEntry<T>[]>;

    getSome (idList : readonly string[]): Promise<readonly SimpleRepositoryEntry<T>[]>;

    getAllByProperty (
        propertyName  : string,
        propertyValue : any
    ): Promise<readonly SimpleRepositoryEntry<T>[]>;

    createItem (
        data    : T,
        members ?: readonly string[]
    ): Promise<SimpleRepositoryEntry<T>>;

    update (id: string, data: T): Promise<SimpleRepositoryEntry<T>>;
    updateOrCreateItem (item: T) : Promise<SimpleRepositoryEntry<T>>;

    deleteById (id: string): Promise<SimpleRepositoryEntry<T>>;
    deleteByIdList (list: readonly string[]): Promise<readonly SimpleRepositoryEntry<T>[]>;
    deleteByList (list: readonly SimpleRepositoryEntry<T>[]): Promise<readonly SimpleRepositoryEntry<T>[]>;
    deleteAll (): Promise<readonly SimpleRepositoryEntry<T>[]>;

    inviteToItem (id: string, members : readonly string[]): Promise<void>;

    subscribeToItem (id: string): Promise<void>;

    isRepositoryEntryList (list: any) : list is SimpleRepositoryEntry<T>[];

}


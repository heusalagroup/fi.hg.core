// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RepositoryEntry } from "./RepositoryEntry";
import { StoredRepositoryItem } from "./StoredRepositoryItem";

export const REPOSITORY_NEW_IDENTIFIER = 'new';

export interface Repository<T extends StoredRepositoryItem> {

    findById (
        id              : string,
        includeMembers ?: boolean
    ): Promise<RepositoryEntry<T> | undefined>;

    findByIdAndUpdate (
        id: string,
        item: T
    ) : Promise<RepositoryEntry<T>>;

    waitById (
        id              : string,
        includeMembers ?: boolean,
        timeout        ?: number
    ): Promise<RepositoryEntry<T> | undefined>;

    getAll (): Promise<readonly RepositoryEntry<T>[]>;

    getSome (idList : readonly string[]): Promise<readonly RepositoryEntry<T>[]>;

    getAllByProperty (
        propertyName  : string,
        propertyValue : any
    ): Promise<readonly RepositoryEntry<T>[]>;

    createItem (
        data    : T,
        members ?: readonly string[]
    ): Promise<RepositoryEntry<T>>;

    update (id: string, data: T): Promise<RepositoryEntry<T>>;
    updateOrCreateItem (item: T) : Promise<RepositoryEntry<T>>;

    deleteById (id: string): Promise<RepositoryEntry<T>>;
    deleteByIdList (list: readonly string[]): Promise<readonly RepositoryEntry<T>[]>;
    deleteByList (list: readonly RepositoryEntry<T>[]): Promise<readonly RepositoryEntry<T>[]>;

    inviteToItem (id: string, members : readonly string[]): Promise<void>;

    subscribeToItem (id: string): Promise<void>;

    isRepositoryEntryList (list: any) : list is RepositoryEntry<T>[];

}


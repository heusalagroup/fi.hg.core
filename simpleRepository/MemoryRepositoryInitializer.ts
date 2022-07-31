// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MemoryRepository } from "./MemoryRepository";
import { StoredRepositoryItem, StoredRepositoryItemTestCallback } from "./types/StoredRepositoryItem";
import { RepositoryInitializer } from "./types/RepositoryInitializer";
import { Repository } from "./types/Repository";

export class MemoryRepositoryInitializer<T extends StoredRepositoryItem> implements RepositoryInitializer<T> {

    private readonly _isT : StoredRepositoryItemTestCallback;

    public constructor (
        isT : StoredRepositoryItemTestCallback
    ) {
        this._isT = isT;
    }

    public async initializeRepository () : Promise<Repository<T>> {
        return new MemoryRepository<T>(this._isT);
    }

}

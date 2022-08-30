// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MemoryRepository } from "./MemoryRepository";
import { StoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "./types/StoredRepositoryItem";
import { RepositoryInitializer } from "./types/RepositoryInitializer";
import { Repository } from "./types/Repository";

export class MemoryRepositoryInitializer<T extends StoredRepositoryItem> implements RepositoryInitializer<T> {

    private readonly _isT : StoredRepositoryItemTestCallback;
    private readonly _explainT : StoredRepositoryItemExplainCallback;
    private readonly _tName    : string;

    public constructor (
        isT : StoredRepositoryItemTestCallback,
        tName               : string                              | undefined = undefined,
        explainT            : StoredRepositoryItemExplainCallback | undefined = undefined
    ) {
        this._isT = isT;
        this._explainT = explainT;
        this._tName = tName;
    }

    public async initializeRepository () : Promise<Repository<T>> {
        return new MemoryRepository<T>(
            this._isT,
            undefined,
            this._tName,
            this._explainT
        );
    }

}

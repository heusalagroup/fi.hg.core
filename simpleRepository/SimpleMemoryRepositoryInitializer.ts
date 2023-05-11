// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleMemoryRepository } from "./SimpleMemoryRepository";
import { SimpleStoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "./types/SimpleStoredRepositoryItem";
import { SimpleRepositoryInitializer } from "./types/SimpleRepositoryInitializer";
import { SimpleRepository } from "./types/SimpleRepository";
import { explainNot, explainOk } from "../types/explain";

export class SimpleMemoryRepositoryInitializer<T extends SimpleStoredRepositoryItem> implements SimpleRepositoryInitializer<T> {

    private readonly _isT : StoredRepositoryItemTestCallback;
    private readonly _explainT : StoredRepositoryItemExplainCallback;
    private readonly _tName    : string;

    public constructor (
        isT : StoredRepositoryItemTestCallback,
        tName               : string                              | undefined = undefined,
        explainT            : StoredRepositoryItemExplainCallback | undefined = undefined
    ) {
        this._isT = isT;
        this._tName    = tName ?? 'T';
        this._explainT = explainT ?? ( (value: any) : string => isT(value) ? explainOk() : explainNot(this._tName) );
    }

    public async initializeRepository () : Promise<SimpleRepository<T>> {
        return new SimpleMemoryRepository<T>(
            this._isT,
            undefined,
            this._tName,
            this._explainT
        );
    }

}

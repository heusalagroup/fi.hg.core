// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleStoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "../../../simpleRepository/types/SimpleStoredRepositoryItem";
import { SimpleRepository } from "../../../simpleRepository/types/SimpleRepository";
import { SimpleRepositoryAdapter } from "./SimpleRepositoryAdapter";
import { SimpleRepositoryInitializer } from "../../../simpleRepository/types/SimpleRepositoryInitializer";
import { explainNot, explainOk } from "../../../types/explain";
import { SimpleEntityRepository } from "./SimpleEntityRepository";
import { SimpleEntity } from "./SimpleEntity";
import { NewSimpleDTO } from "./NewSimpleDTO";

export class SimpleRepositoryAdapterInitializer<
    T extends SimpleStoredRepositoryItem,
    SimpleEntityT extends SimpleEntity
> implements SimpleRepositoryInitializer<T> {

    private readonly _repository : SimpleEntityRepository<SimpleEntityT>;
    private readonly _members    : readonly string[] | undefined;
    private readonly _isT        : StoredRepositoryItemTestCallback;
    private readonly _explainT   : StoredRepositoryItemExplainCallback;
    private readonly _tName      : string;
    private readonly _tCreate    : (dto: NewSimpleDTO) => SimpleEntityT;

    public constructor (
        repository          : SimpleEntityRepository<SimpleEntityT>,
        tCreate             : (dto: NewSimpleDTO) => SimpleEntityT,
        isT                 : StoredRepositoryItemTestCallback,
        tName               : string,
        explainT            : StoredRepositoryItemExplainCallback,
        members             : readonly string[] | undefined
    ) {
        this._repository = repository;
        this._members    = members;
        this._isT        = isT;
        this._tName      = tName ?? 'T';
        this._tCreate    = tCreate;
        this._explainT   = explainT ?? ( (value: any) : string => isT(value) ? explainOk() : explainNot(this._tName) );
    }

    public async initializeRepository () : Promise<SimpleRepository<T>> {
        return new SimpleRepositoryAdapter<T, SimpleEntityT>(
            this._repository,
            this._tCreate,
            this._isT,
            this._tName,
            this._explainT,
            this._members
        );
    }

}

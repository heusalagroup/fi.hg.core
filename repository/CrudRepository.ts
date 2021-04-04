// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { Entity } from "./Entity";
import EntityMetadata, { KeyValuePairs } from "./types/EntityMetadata";
import Persister from "./types/Persister";
import RepositoryEntityError from "./types/RepositoryEntityError";

export class CrudRepository<T extends Entity> {

    private readonly _persister: Persister;

    private readonly _entityMetadata: EntityMetadata;

    public constructor (emptyEntity: T, persister: Persister) {

        this._entityMetadata = emptyEntity.getMetadata();

        this._persister = persister;

    }

    public async save (entity: T): Promise<T> {

        const metadata = this._entityMetadata;

        const id = (entity as KeyValuePairs)[metadata.idPropertyName];

        if (!id) {
            return await this._persister.insert(entity, metadata);
        }

        const current = await this.findById(id);

        if (!current) {
            throw new RepositoryEntityError(id, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Entity ${id} not found in table ${metadata.tableName}`);
        }

        return await this._persister.update(entity, metadata);

    }

    public async delete (entity: T): Promise<void> {
        return await this._persister.delete(entity, this._entityMetadata);
    }

    public async findAll (): Promise<T[]> {
        return await this._persister.findAll<T>(this._entityMetadata);
    }

    public async findAllById (ids: any[]): Promise<T[]> {
        return await this._persister.findAllById<T>(ids, this._entityMetadata);
    }

    public async findById (id: any): Promise<T | undefined> {
        return await this._persister.findById<T>(id, this._entityMetadata);
    }

    public async find (propertyName: string, value: any): Promise<T[]> {
        return await this._persister.findByProperty(propertyName, value, this._entityMetadata);
    }

}

export default CrudRepository;

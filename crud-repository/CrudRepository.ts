// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { Entity } from "./Entity";
import EntityMetadata, { KeyValuePairs } from "./persistence/EntityMetadata";
import Persister from "./persistence/Persister";

export default class CrudRepository<T extends Entity> {
    private persister: Persister;
    private entityMetadata: EntityMetadata;

    constructor(emptyEntity: T, persister: Persister) {
        this.entityMetadata = emptyEntity.getMetadata();
        this.persister = persister;
    }

    public async save(entity: T): Promise<T> {
        const metadata = this.entityMetadata;
        const id = (entity as KeyValuePairs)[metadata.idPropertyName];
        if (!id) {
            return this.persister.insert(entity, metadata);
        }
        const current = await this.findById(id);
        if (!current) {
            return Promise.reject(new Error(`Entity ${id} not found in table ${metadata.tableName}`));
        }
        return this.persister.update(entity, metadata);
    }

    public delete(entity: T): Promise<void> {
        return this.persister.delete(entity, this.entityMetadata);
    }

    public findAll(): Promise<T[]> {
        return this.persister.findAll<T>(this.entityMetadata);
    }

    public findAllById(ids: any[]): Promise<T[]> {
        return this.persister.findAllById<T>(ids, this.entityMetadata);
    }

    public findById(id: any): Promise<T | undefined> {
        return this.persister.findById<T>(id, this.entityMetadata);
    }

    public find(propertyName: string, value: any): Promise<T[]> {
        return this.persister.findByProperty(propertyName, value, this.entityMetadata);
    }
}

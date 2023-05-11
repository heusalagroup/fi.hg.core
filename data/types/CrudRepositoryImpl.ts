// Copyright (c) 2022-2023 Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { map } from "../../functions/map";
import { reduce } from "../../functions/reduce";
import { Entity, EntityIdTypes } from "../Entity";
import { Persister } from "./Persister";
import { EntityUtils } from "../utils/EntityUtils";
import { EntityMetadata } from "./EntityMetadata";
import { RepositoryEntityError } from "./RepositoryEntityError";
import { CrudRepository } from "./CrudRepository";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { KeyValuePairs } from "./KeyValuePairs";
import { Sort } from "../Sort";

const LOG = LogService.createLogger('CrudRepositoryImpl');

export class CrudRepositoryImpl<T extends Entity, ID extends EntityIdTypes>
    implements CrudRepository<T, ID> {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _persister      : Persister;
    private readonly _entityMetadata : EntityMetadata;

    public constructor (
        emptyMetadata : EntityMetadata,
        persister     : Persister
    ) {
        this._entityMetadata = emptyMetadata;
        this._persister = persister;
        LOG.debug(`constructor: emptyMetadata = `, emptyMetadata);
    }

    public async setup () : Promise<void> {
        await this._persister.setupEntityMetadata(this._entityMetadata);
    }

    /**
     * You shouldn't use Persister directly through this API.
     *
     * This interface is exposed to a public access for our own internal implementation, because TypeScript doesn't
     * support a concept like "friends" found from other languages.
     */
    public __getPersister () : Persister {
        return this._persister;
    }

    public async delete (entity: T): Promise<void> {
        LOG.debug(`delete: entity = `, entity);
        const id = EntityUtils.getId<T, ID>(entity, this._entityMetadata);
        LOG.debug(`delete: id = `, id);
        return await this._persister.deleteById<T, ID>(id, this._entityMetadata);
    }

    public async findAll (
        sort ?: Sort
    ): Promise<T[]> {
        LOG.debug(`findAll`);
        return await this._persister.findAll(this._entityMetadata, sort);
    }

    public async findAllById (
        ids: any[],
        sort ?: Sort
    ) : Promise<T[]> {
        LOG.debug(`findAllById = `, ids);
        return await this._persister.findAllById(ids, this._entityMetadata, sort);
    }

    public async findById (
        id: any,
        sort ?: Sort
    ): Promise<T | undefined> {
        LOG.debug(`findById = `, id);
        return await this._persister.findById(id, this._entityMetadata, sort);
    }

    public async find (
        propertyName: string,
        value: any,
        sort ?: Sort
    ): Promise<T[]> {
        LOG.debug(`find = `, propertyName, value);
        return await this._persister.findAllByProperty(
            propertyName,
            value,
            this._entityMetadata,
            sort
        );
    }

    public async count (): Promise<number> {
        LOG.debug(`count`);
        return await this._persister.count<T, ID>(this._entityMetadata);
    }

    public async deleteAll (): Promise<void>;
    public async deleteAll (entities: T[]): Promise<void>;

    public async deleteAll (entities?: T[]): Promise<void> {
        LOG.debug(`deleteAll: entities = `, entities);
        if (entities === undefined) {
            return await this._persister.deleteAll<T, ID>(this._entityMetadata);
        } else {
            const ids = map(entities, (item : T) => {
                return EntityUtils.getId<T, ID>(item, this._entityMetadata);
            });
            LOG.debug(`deleteAll: ids = `, ids);
            return await this._persister.deleteAllById<T, ID>(ids, this._entityMetadata);
        }
    }

    public async deleteById (id: ID): Promise<void> {
        LOG.debug(`deleteById: id = `, id);
        return await this._persister.deleteById<T, ID>(id, this._entityMetadata);
    }

    public async deleteAllById (ids: ID[]): Promise<void> {
        LOG.debug(`deleteAllById: ids = `, ids);
        return await this._persister.deleteAllById<T, ID>(ids, this._entityMetadata);
    }

    public async existsById (id: ID): Promise<boolean> {
        LOG.debug(`existsById: id = `, id);
        const idPropertyName : string = EntityUtils.getIdPropertyName(this._entityMetadata);
        LOG.debug(`existsById: idPropertyName = `, idPropertyName);
        return await this._persister.existsByProperty<T, ID>(idPropertyName, id, this._entityMetadata);
    }

    public async saveAll (
        entities: T[]
    ): Promise<T[]> {
        LOG.debug(`saveAll: entities = `, entities);
        const results : T[] = [];
        await reduce(
            entities,
            async (p : Promise<void>, item : T) => {
                await p;
                const savedItem = await this.save(item);
                results.push(savedItem);
            },
            Promise.resolve()
        );
        LOG.debug(`saveAll: results = `, results);
        return results;
    }

    public async save (entity: T): Promise<T> {
        LOG.debug(`save: entity = `, entity);
        const metadata = this._entityMetadata;
        LOG.debug(`save: metadata = `, metadata);
        const id = (entity as KeyValuePairs)[metadata.idPropertyName];
        LOG.debug(`save: id = `, id);
        if ( !id ) return await this._persister.insert(entity, metadata);
        const current = await this.findById(id);
        LOG.debug(`save: current = `, current);
        if (!current) {
            throw new RepositoryEntityError(id, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Entity "${id}" not found in table: ${metadata.tableName}`);
        }
        return await this._persister.update(entity, metadata);
    }

}

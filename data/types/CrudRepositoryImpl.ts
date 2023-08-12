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
import { isSort, Sort } from "../Sort";
import { isWhere, Where } from "../Where";
import { isArray } from "../../types/Array";

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
     * This interface is exposed to public access for our own internal implementation, because TypeScript doesn't
     * support a concept like "friends" found from other languages.
     */
    public __getPersister () : Persister {
        return this._persister;
    }

    public async delete (entity: T): Promise<void> {
        LOG.debug(`delete: entity = `, entity);
        const id = EntityUtils.getId<T, ID>(entity, this._entityMetadata);
        const propertyName = EntityUtils.getIdPropertyName(this._entityMetadata);
        LOG.debug(`delete: id = `, id);
        return await this._persister.deleteAll(
            this._entityMetadata,
            Where.propertyEquals(propertyName, id)
        );
    }

    public async findAll (
        arg1 ?: Where | Sort | undefined,
        arg2 ?: Sort | Where | undefined
    ): Promise<T[]> {
        LOG.debug(`findAll = `, arg1, arg2);
        const [where, sort] = this._parseArgs(arg1, arg2);
        return await this._persister.findAll(
            this._entityMetadata,
            where,
            sort
        );
    }

    public async findAllById (
        ids: any[] | any,
        sort ?: Sort
    ) : Promise<T[]> {
        LOG.debug(`findAllById = `, ids, sort);
        ids = isArray(ids) ? ids : [ids];
        const propertyName = EntityUtils.getIdPropertyName(this._entityMetadata);
        return await this._persister.findAll(
            this._entityMetadata,
            Where.propertyListEquals(propertyName, ids),
            sort
        );
    }

    public async findById (
        id: any,
        sort ?: Sort
    ): Promise<T | undefined> {
        LOG.debug(`findById = `, id);
        const propertyName = EntityUtils.getIdPropertyName(this._entityMetadata);
        return await this._persister.findBy(
            this._entityMetadata,
            Where.propertyEquals(propertyName, id),
            sort
        );
    }

    /**
     * @deprecated Use .findAll(Where...)
     * @param propertyName
     * @param value
     * @param sort
     */
    public async find (
        propertyName: string,
        value: any,
        sort ?: Sort
    ): Promise<T[]> {
        LOG.debug(`find = `, propertyName, value);
        return await this._persister.findAll(
            this._entityMetadata,
            Where.propertyEquals(propertyName, value),
            sort
        );
    }

    public async count (
        where ?: Where
    ): Promise<number> {
        return await this._persister.count(this._entityMetadata, where);
    }

    public async existsBy (
        where : Where
    ): Promise<boolean> {
        return await this._persister.existsBy(this._entityMetadata, where);
    }

    public async deleteAll (
        entities ?: readonly T[] | Where | undefined
    ): Promise<void> {

        if (entities === undefined) {
            LOG.debug(`deleteAll`);
            return await this._persister.deleteAll(
                this._entityMetadata,
                undefined
            );
        }

        if (isWhere(entities)) {
            LOG.debug(`deleteAll: where = `, entities);
            return await this._persister.deleteAll(
                this._entityMetadata,
                entities
            );
        }

        LOG.debug(`deleteAll: entities = `, entities);
        const propertyName = this._entityMetadata.idPropertyName;
        const ids = map(
            entities,
            (item : T)  : ID => EntityUtils.getId<T, ID>(item, this._entityMetadata)
        );
        LOG.debug(`deleteAll: ids = `, ids);
        return await this._persister.deleteAll(
            this._entityMetadata,
            Where.propertyListEquals(
                propertyName,
                ids
            ),
        );

    }

    public async deleteById (id: ID): Promise<void> {
        LOG.debug(`deleteById: id = `, id);
        return await this._persister.deleteAll(
            this._entityMetadata,
            Where.propertyEquals(this._entityMetadata.idPropertyName, id)
        );
    }

    public async deleteAllById (ids: readonly ID[] | ID): Promise<void> {
        ids = isArray(ids) ? ids : [ids];
        LOG.debug(`deleteAllById: ids = `, ids);
        const idPropertyName : string = EntityUtils.getIdPropertyName(this._entityMetadata);
        return await this._persister.deleteAll(
            this._entityMetadata,
            Where.propertyListEquals(idPropertyName, ids)
        );
    }

    public async existsById (id: ID): Promise<boolean> {
        LOG.debug(`existsById: id = `, id);
        const idPropertyName : string = EntityUtils.getIdPropertyName(this._entityMetadata);
        LOG.debug(`existsById: idPropertyName = `, idPropertyName);
        return await this._persister.existsBy(
            this._entityMetadata,
            Where.propertyEquals(idPropertyName, id),
        );
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
        if ( !id ) return await this._persister.insert(metadata, entity);
        const current = await this.existsById(id);
        LOG.debug(`save: current = `, current);
        if (!current) {
            throw new RepositoryEntityError(id, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Entity "${id}" not found in table: ${metadata.tableName}`);
        }
        return await this._persister.update(metadata, entity);
    }

    private _parseArgs (
        arg1 ?: Where | Sort | undefined,
        arg2 ?: Sort | Where | undefined
    ) : [Where | undefined, Sort | undefined] {
        if (isSort(arg1)) {
            if (isWhere(arg2)) return [arg2, arg1];
            // if (isSort(arg2)) return [undefined, arg1.and(arg2)];
            if (arg2 !== undefined) throw new TypeError(`Argument 2 is unknown type: ${arg2}`);
            return [undefined, arg1];
        } else if (isWhere(arg1)) {
            if (isSort(arg2)) return [arg1, arg2];
            if (isWhere(arg2)) return [arg1.and(arg2), undefined];
            if (arg2 !== undefined) throw new TypeError(`Argument 2 is unknown type: ${arg2}`);
            return [arg1, undefined];
        } if (arg1 === undefined && arg2 === undefined) {
            return [undefined, undefined];
        }
        throw new TypeError(`Both arguments are unknown type: ${arg1} ${arg2}`);
    }

}

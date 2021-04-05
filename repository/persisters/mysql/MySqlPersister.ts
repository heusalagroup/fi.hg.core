// Copyright (c) 2020-2021 Sendanor. All rights reserved.

// @ts-ignore
import mysql, {FieldInfo, MysqlError} from "mysql";

import EntityMetadata, {EntityField} from "../../types/EntityMetadata";
import Persister from "../../Persister";
import RepositoryError from "../../types/RepositoryError";
import RepositoryEntityError from "../../types/RepositoryEntityError";
import {isArray, map, reduce} from "../../../modules/lodash";
import Entity, {EntityIdTypes} from "../../Entity";
import {
    COUNT_ALL_QUERY_STRING,
    COUNT_BY_COLUMN_QUERY_STRING,
    DELETE_ALL_BY_ID_QUERY_STRING,
    DELETE_ALL_QUERY_STRING,
    DELETE_BY_COLUMN_QUERY_STRING,
    DELETE_BY_ID_QUERY_STRING,
    EXISTS_BY_COLUMN_QUERY_STRING,
    INSERT_QUERY_STRING,
    SELECT_ALL_QUERY_STRING,
    SELECT_BY_COLUMN_LIST_QUERY_STRING,
    SELECT_BY_COLUMN_QUERY_STRING,
    UPDATE_QUERY_STRING
} from "./MySqlConstants";
import EntityUtils from "../../EntityUtils";

export type QueryResultPair = [any, readonly FieldInfo[] | undefined];

export class MySqlPersister
    implements Persister {

    private readonly _pool        : mysql.Pool;
    private readonly _tablePrefix : string;

    public constructor (
        host: string,
        user: string,
        password: string,
        database: string,
        tablePrefix: string = '',
        connectionLimit: number = 10
    ) {

        this._tablePrefix = tablePrefix;

        this._pool = mysql.createPool({
            connectionLimit,
            host,
            user,
            password,
            database
        });

    }

    public async insert<T extends Entity, ID extends EntityIdTypes>(entities: T | T[], metadata: EntityMetadata): Promise<T> {

        if (!isArray(entities)) {
            entities = [entities];
        }

        const {tableName} = metadata;

        const fields = metadata.fields.filter((fld: EntityField) => !EntityUtils.isIdField(fld, metadata));

        const colNames = fields.map((col: EntityField) => col.columnName);

        const insertValues = map(entities, (item: T) => {
            return fields.map((col: EntityField) => {
                return (item as any)[col.propertyName];
            });
        });

        const queryValues = [`${this._tablePrefix}${tableName}`, colNames, insertValues];

        const [results] = await this._query(INSERT_QUERY_STRING, queryValues);

        const entityId = results?.insertId;

        if (!entityId) {
            throw new RepositoryError(RepositoryError.Code.CREATED_ENTITY_ID_NOT_FOUND, `Entity id could not be found for newly created entity`);
        }

        const resultEntity: T | undefined = await this.findById(entityId, metadata);

        if (resultEntity) {
            return resultEntity;
        } else {
            throw new RepositoryEntityError(entityId, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Newly created entity not found: #${entityId}`);
        }

    }

    public async update<T extends Entity, ID extends EntityIdTypes>(entity: T, metadata: EntityMetadata): Promise<T> {

        const {tableName} = metadata;

        const idColName = EntityUtils.getIdColumnName(metadata);

        const id: ID = EntityUtils.getId<T, ID>(entity, metadata, this._tablePrefix);

        const fields = metadata.fields.filter((fld: EntityField) => !EntityUtils.isIdField(fld, metadata));

        const assignmentListPairs: [string, any][] = fields.map(
            (fld: EntityField): [string, any] => [`${fld.columnName}`, (entity as any)[fld.propertyName]]
        );

        const assignmentListValues: any[] = reduce(
            assignmentListPairs,
            (a: any[], pair: [string, any]) => {
                return a.concat(pair);
            },
            []
        );

        const assignmentListQueryString = fields.map(() => `?? = ?`).join(', ');

        const queryString = UPDATE_QUERY_STRING(assignmentListQueryString);
        const queryValues = [`${this._tablePrefix}${tableName}`, ...assignmentListValues, idColName, id];

        await this._query(queryString, queryValues);

        const resultEntity: T | undefined = await this.findById(id, metadata);

        if (resultEntity) {
            return resultEntity;
        } else {
            throw new RepositoryEntityError(id, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Entity not found: #${id}`);
        }

    }

    public async deleteAll<T extends Entity, ID extends EntityIdTypes>(metadata: EntityMetadata): Promise<void> {

        const {tableName} = metadata;

        await this._query(DELETE_ALL_QUERY_STRING, [`${this._tablePrefix}${tableName}`]);

    }

    public async deleteById<T extends Entity, ID extends EntityIdTypes>(
        id: ID,
        metadata: EntityMetadata
    ): Promise<void> {

        const {tableName} = metadata;

        const idColName = EntityUtils.getIdColumnName(metadata);

        await this._query(DELETE_BY_ID_QUERY_STRING, [`${this._tablePrefix}${tableName}`, idColName, id]);

    }

    public async deleteAllById<T extends Entity, ID extends EntityIdTypes>(
        ids: ID[],
        metadata: EntityMetadata
    ): Promise<void> {

        const {tableName} = metadata;

        const idColumnName: string = EntityUtils.getIdColumnName(metadata);

        const queryValues = [`${this._tablePrefix}${tableName}`, idColumnName, ids];

        const [results] = await this._query(DELETE_ALL_BY_ID_QUERY_STRING, queryValues);

        return results.map((row: any) => EntityUtils.toEntity<T, ID>(row, metadata));

    }

    public async deleteAllByProperty<
        T extends Entity,
        ID extends EntityIdTypes
    >(
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<void> {

        const {tableName} = metadata;

        const columnName = EntityUtils.getColumnName(property, metadata.fields);

        await this._query(
            DELETE_BY_COLUMN_QUERY_STRING,
            [`${this._tablePrefix}${tableName}`, columnName, value]
        );

    }

    public async findById<
        T extends Entity,
        ID extends EntityIdTypes
    >(
        id: ID,
        metadata: EntityMetadata
    ): Promise<T | undefined> {

        const {tableName} = metadata;

        const idColumnName = EntityUtils.getIdColumnName(metadata);

        const [results] = await this._query(SELECT_BY_COLUMN_QUERY_STRING, [`${this._tablePrefix}${tableName}`, idColumnName, id]);

        return results.length >= 1 && results[0] ? EntityUtils.toEntity<T, ID>(results[0], metadata) : undefined;

    }

    public async findByProperty<
        T extends Entity,
        ID extends EntityIdTypes
    > (
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<T | undefined> {

        const {tableName} = metadata;

        const columnName = EntityUtils.getColumnName(property, metadata.fields);

        const [results] = await this._query(SELECT_BY_COLUMN_QUERY_STRING, [`${this._tablePrefix}${tableName}`, columnName, value]);

        return results.length >= 1 && results[0] ? EntityUtils.toEntity<T, ID>(results[0], metadata) : undefined;

    }


    public async findAll<T extends Entity,
        ID extends EntityIdTypes>(
        metadata: EntityMetadata
    ): Promise<T[]> {

        const {tableName} = metadata;

        const [results] = await this._query(SELECT_ALL_QUERY_STRING, [`${this._tablePrefix}${tableName}`]);

        return results.map((row: any) => EntityUtils.toEntity<T, ID>(row, metadata));

    }

    public async findAllById<T extends Entity,
        ID extends EntityIdTypes>(
        ids: ID[],
        metadata: EntityMetadata
    ): Promise<T[]> {

        const {tableName} = metadata;

        const idColumnName: string = EntityUtils.getIdColumnName(metadata);

        const queryValues = [`${this._tablePrefix}${tableName}`, idColumnName, ids];

        const [results] = await this._query(SELECT_BY_COLUMN_LIST_QUERY_STRING, queryValues);

        return results.map((row: any) => EntityUtils.toEntity<T, ID>(row, metadata));

    }

    public async findAllByProperty<
        T extends Entity,
        ID extends EntityIdTypes
    >(
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<T[]> {

        const {tableName} = metadata;

        const columnName = EntityUtils.getColumnName(property, metadata.fields);

        const [results] = await this._query(SELECT_BY_COLUMN_QUERY_STRING, [`${this._tablePrefix}${tableName}`, columnName, value]);

        return results.map((row: any) => EntityUtils.toEntity<T, ID>(row, metadata));

    }

    public async count<T extends Entity,
        ID extends EntityIdTypes>(
        metadata: EntityMetadata
    ): Promise<number> {

        const {tableName} = metadata;

        const [results] = await this._query(COUNT_ALL_QUERY_STRING, ['count', `${this._tablePrefix}${tableName}`]);

        if (results.length !== 1) {
            throw new RepositoryError(RepositoryError.Code.COUNT_INCORRECT_ROW_AMOUNT, `count: Incorrect amount of rows in the response`);
        }

        return results[0].count;

    }

    public async countByProperty<T extends Entity,
        ID extends EntityIdTypes>(
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<number> {

        const {tableName} = metadata;

        const [results] = await this._query(
            COUNT_BY_COLUMN_QUERY_STRING,
            ['count', `${this._tablePrefix}${tableName}`, property, value]
        );

        if (results.length !== 1) {
            throw new RepositoryError(RepositoryError.Code.COUNT_INCORRECT_ROW_AMOUNT, `countByProperty: Incorrect amount of rows in the response`);
        }

        return results[0].count;

    }

    public async existsByProperty<
        T extends Entity,
        ID extends EntityIdTypes
    >(
        property : string,
        value    : any,
        metadata : EntityMetadata
    ): Promise<boolean> {

        const {tableName} = metadata;

        const columnName = EntityUtils.getColumnName(property, metadata.fields);

        const [results] = await this._query(
            EXISTS_BY_COLUMN_QUERY_STRING,
            ['exists', `${this._tablePrefix}${tableName}`, columnName, value]
        );

        if (results.length !== 1) {
            throw new RepositoryError(RepositoryError.Code.EXISTS_INCORRECT_ROW_AMOUNT, `existsById: Incorrect amount of rows in the response`);
        }

        return !!results[0].exists;

    }

    private async _query(
        query: string,
        values ?: any[]
    ): Promise<QueryResultPair> {

        return await new Promise((resolve, reject) => {
            try {
                this._pool.query(query, values, (error: MysqlError | null, results ?: any, fields?: FieldInfo[]) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve([results, fields]);
                    }
                });
            } catch (err) {
                reject(err);
            }
        });

    }

}

export default MySqlPersister;

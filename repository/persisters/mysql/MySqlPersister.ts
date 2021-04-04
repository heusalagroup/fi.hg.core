// Copyright (c) 2020-2021 Sendanor. All rights reserved.

// @ts-ignore
import mysql, {FieldInfo, MysqlError} from "mysql";
import EntityMetadata, { KeyValuePairs, EntityField } from "../../types/EntityMetadata";
import Persister from "../../types/Persister";
import RepositoryError from "../../types/RepositoryError";
import RepositoryEntityError from "../../types/RepositoryEntityError";
import {isArray, map, reduce} from "../../../modules/lodash";

export type QueryResultPair = [any, readonly FieldInfo[] | undefined];

const INSERT_QUERY_STRING                = 'INSERT INTO ?? (??) VALUES ?';
const DELETE_BY_ID_QUERY_STRING          = 'DELETE FROM ?? WHERE ?? = ?';
const SELECT_ALL_QUERY_STRING            = 'SELECT * FROM ??';
const SELECT_BY_COLUMN_QUERY_STRING      = 'SELECT * FROM ?? WHERE ?? = ?';
const SELECT_BY_COLUMN_LIST_QUERY_STRING = 'SELECT * FROM ?? WHERE ?? IN (?)';
const UPDATE_QUERY_STRING                = (assignmentListQueryString : string) => `UPDATE ?? SET ${ assignmentListQueryString } WHERE ?? = ?`;

export class MySqlPersister implements Persister {

    private readonly _pool : mysql.Pool;

    public constructor (
        host            : string,
        user            : string,
        password        : string,
        database        : string,
        connectionLimit : number = 10
    ) {

        this._pool = mysql.createPool({
            connectionLimit,
            host,
            user,
            password,
            database
        });

    }

    public async insert<T>(entities: T | T[], metadata: EntityMetadata): Promise<T> {

        if (!isArray(entities)) {
            entities = [entities];
        }

        const { tableName } = metadata;

        const fields = metadata.fields.filter((fld: EntityField) => !MySqlPersister._isIdField(fld, metadata));

        const colNames = fields.map((col : EntityField) => col.columnName);

        const insertValues = map(entities, (item : T) => {
            return fields.map((col : EntityField) => col.propertyName).map((p : string) => (item as any)[p]);
        });

        const queryValues = [tableName, colNames, insertValues];

        const [results] = await this._query(INSERT_QUERY_STRING, queryValues);

        const entityId = results?.insertId;

        if (!entityId) {
            throw new RepositoryError(RepositoryError.Code.CREATED_ENTITY_ID_NOT_FOUND, `Entity id could not be found for newly created entity`);
        }

        const resultEntity : T | undefined = await this.findById(entityId, metadata);

        if (resultEntity) {
            return resultEntity;
        } else {
            throw new RepositoryEntityError(entityId, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Newly created entity not found: #${entityId}`);
        }

    }

    public async update<T>(entity: T, metadata: EntityMetadata): Promise<T> {

        const { tableName } = metadata;

        const idColName = MySqlPersister._getIdColumnName(metadata);

        const id = MySqlPersister._getId(entity, metadata);

        const fields = metadata.fields.filter((fld: EntityField) => !MySqlPersister._isIdField(fld, metadata));

        const assignmentListPairs : [string, any][] = fields.map(
            (fld: EntityField) : [string, any] => [`${fld.columnName}`, (entity as any)[fld.propertyName]]
        );

        const assignmentListValues : any[] = reduce(
            assignmentListPairs,
            (a: any[], pair: [string, any]) => {
                return a.concat(pair);
            },
            []
        );

        const assignmentListQueryString = fields.map( () => `?? = ?` ).join(', ');

        const queryString = UPDATE_QUERY_STRING(assignmentListQueryString);
        const queryValues = [tableName, ...assignmentListValues, idColName, id];

        await this._query(queryString, queryValues);

        const resultEntity: T | undefined = await this.findById(id, metadata);

        if (resultEntity) {
            return resultEntity;
        } else {
            throw new RepositoryEntityError(id, RepositoryEntityError.Code.ENTITY_NOT_FOUND, `Entity not found: #${id}`);
        }

    }

    public async delete<T>(entity: T, metadata: EntityMetadata): Promise<void> {

        const { tableName } = metadata;

        const idColName = MySqlPersister._getIdColumnName(metadata);

        const id = MySqlPersister._getId(entity, metadata);

        const deleteValues = [tableName, idColName, id];

        await this._query(DELETE_BY_ID_QUERY_STRING, deleteValues);

    }

    public async findAll<T>(metadata: EntityMetadata): Promise<T[]> {

        const { tableName } = metadata;

        const [results] = await this._query(SELECT_ALL_QUERY_STRING, [tableName]);

        return results.map((row: any) => MySqlPersister._toEntity(row, metadata));

    }

    public async findAllById<T>(ids: any[], metadata: EntityMetadata): Promise<T[]> {

        const { tableName } = metadata;

        const idColumnName : string = MySqlPersister._getIdColumnName(metadata);

        const queryValues = [tableName, idColumnName, ids];

        const [results] = await this._query(SELECT_BY_COLUMN_LIST_QUERY_STRING, queryValues);

        return results.map((row: any) => MySqlPersister._toEntity(row, metadata));

    }

    public async findById<T>(id: any, metadata: EntityMetadata): Promise<T | undefined> {

        const { tableName } = metadata;

        const idColumnName = MySqlPersister._getIdColumnName(metadata);

        const [results] = await this._query(SELECT_BY_COLUMN_QUERY_STRING, [tableName, idColumnName, id]);

        return results.length >= 1 && results[0] ? MySqlPersister._toEntity(results[0], metadata) : undefined;

    }

    public async findByProperty<T>(property: string, value: any, metadata: EntityMetadata): Promise<T[]> {

        const { tableName } = metadata;

        const columnName = MySqlPersister._getColumnName(property, metadata.fields);

        const [results] = await this._query(SELECT_BY_COLUMN_QUERY_STRING, [tableName, columnName, value]);

        return results.map( (row: any) => MySqlPersister._toEntity(row, metadata) );

    }


    private async _query (
        query  : string,
        values ?: any[]
    ) : Promise<QueryResultPair> {

        return new Promise((resolve, reject) => {

            return this._pool.query(query, values, (error : MysqlError | null, results ?: any, fields?: FieldInfo[]) => {
                if (error) {
                    reject(error);
                } else {
                    resolve([results, fields]);
                }
            });

        });

    }


    private static _toEntity<T> (entity: KeyValuePairs, metadata: EntityMetadata): T {
        return (
            metadata.fields
            .map((fld) => ({ [fld.propertyName]: entity[fld.columnName] }))
            .reduce((prev, curr) => Object.assign(prev, curr)) as T
        );
    }

    private static _getColumnName (propertyName: string, fields: EntityField[]): string {

        const field = fields.find((x : EntityField) => x.propertyName === propertyName);

        if (field) {
            return field.columnName;
        }

        throw new RepositoryError(RepositoryError.Code.COLUMN_NAME_NOT_FOUND, `Column name not found for property: "${propertyName}"`);

    }

    private static _getIdColumnName (metadata: EntityMetadata) : string {
        return MySqlPersister._getColumnName(metadata.idPropertyName, metadata.fields);
    }

    private static _getId (entity: KeyValuePairs, metadata: EntityMetadata) {

        const id = entity[metadata.idPropertyName];

        if (id) {
            return id;
        }

        throw new RepositoryError(RepositoryError.Code.ID_NOT_FOUND_FOR_TABLE, `Id property not found for table: "${metadata.tableName}"`);

    }

    private static _isIdField (field: EntityField, metadata: EntityMetadata) {
        return field.propertyName === metadata.idPropertyName;
    }

}

export default MySqlPersister;

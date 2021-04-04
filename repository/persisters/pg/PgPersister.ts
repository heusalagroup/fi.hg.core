// Copyright (c) 2020-2021 Sendanor. All rights reserved.

// @ts-ignore
import { Pool } from "pg";
import EntityMetadata, { KeyValuePairs, EntityField } from "../../types/EntityMetadata";
import Persister from "../../types/Persister";

export class PgPersister implements Persister {
    private pool: Pool;

    constructor(host: string, user: string, password: string, database: string) {
        this.pool = new Pool({
            host,
            user,
            password,
            database,
        });
    }

    public async insert<T>(entity: T, metadata: EntityMetadata): Promise<T> {
        const { tableName } = metadata;
        const fields = metadata.fields.filter((fld) => !this.isIdField(fld, metadata));
        const colNames = fields.map((col) => col.columnName).join(",");
        const values = fields.map((col) => col.propertyName).map((p) => (entity as any)[p]);
        const placeholders = Array.from({ length: fields.length }, (_, i) => i + 1)
            .map((i) => `$${i}`)
            .reduce((prev, curr) => `${prev},${curr}`);
        const insert = `INSERT INTO ${tableName}(${colNames}) VALUES(${placeholders}) RETURNING *`;
        try {
            const result = await this.pool.query(insert, values);
            return this.toEntity(result.rows[0], metadata);
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    public async update<T>(entity: T, metadata: EntityMetadata): Promise<T> {
        const { tableName } = metadata;
        const idColName = this.getIdColumnName(metadata);
        const id = this.getId(entity, metadata);
        const fields = metadata.fields.filter((fld) => !this.isIdField(fld, metadata));
        const setters = fields.map((fld, idx) => `${fld.columnName}=$${idx + 2}`).reduce((prev, curr) => `${prev},${curr}`);
        const values = [id].concat(fields.map((col) => col.propertyName).map((p) => (entity as any)[p]));
        const update = `UPDATE ${tableName} SET ${setters} WHERE ${idColName}=$1 RETURNING *`;
        try {
            const result = await this.pool.query(update, values);
            return this.toEntity(result.rows[0], metadata);
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    public async delete<T>(entity: T, metadata: EntityMetadata): Promise<void> {
        const { tableName } = metadata;
        const idColName = this.getIdColumnName(metadata);
        const id = this.getId(entity, metadata);
        const sql = `DELETE FROM ${tableName} WHERE ${idColName}=$1 RETURNING *`;
        try {
            return this.pool.query(sql, [id]).then();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    public async findAll<T>(metadata: EntityMetadata): Promise<T[]> {
        const { tableName } = metadata;
        const select = `SELECT * FROM ${tableName}`;
        try {
            const result = await this.pool.query(select);
            return result.rows.map((row: any) => this.toEntity(row, metadata));
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    public async findAllById<T>(ids: any[], metadata: EntityMetadata): Promise<T[]> {
        try {
            const { tableName } = metadata;
            const idColumnName = this.getIdColumnName(metadata);
            const placeholders = Array.from({ length: ids.length }, (_, i) => i + 1)
                .map((i) => `$${i}`)
                .reduce((prev, curr) => `${prev},${curr}`);
            const select = `SELECT * FROM ${tableName} WHERE ${idColumnName} IN (${placeholders})`;
            const result = await this.pool.query(select, ids);
            return result.rows.map((row: any) => this.toEntity(row, metadata));
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    public async findById<T>(id: string, metadata: EntityMetadata): Promise<T | undefined> {
        const { tableName } = metadata;
        const idColumnName = this.getIdColumnName(metadata);
        const select = `SELECT * FROM ${tableName} WHERE ${idColumnName} = $1`;
        try {
            const result = await this.pool.query(select, [id]);
            return this.toEntity(result.rows[0], metadata) as T;
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    public async findByProperty<T>(property: string, value: any, metadata: EntityMetadata): Promise<T[]> {
        try {
            const { tableName } = metadata;
            const columnName = this.getColumnName(property, metadata.fields);
            const select = `SELECT * FROM ${tableName} WHERE ${columnName} = $1`;
            const result = await this.pool.query(select, [value]);
            return result.rows.map((row: any) => this.toEntity(row, metadata));
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    private toEntity<T>(entity: KeyValuePairs, metadata: EntityMetadata): T {
        return metadata.fields
            .map((fld) => ({ [fld.propertyName]: entity[fld.columnName] }))
            .reduce((prev, curr) => Object.assign(prev, curr)) as T;
    }

    private getColumnName(propertyName: string, fields: EntityField[]): string {
        return fields.find((x) => x.propertyName === propertyName)?.columnName || "";
    }

    private getIdColumnName(metadata: EntityMetadata) {
        return this.getColumnName(metadata.idPropertyName, metadata.fields);
    }

    private getId(entity: KeyValuePairs, metadata: EntityMetadata) {
        return entity[metadata.idPropertyName];
    }

    private isIdField(field: EntityField, metadata: EntityMetadata) {
        return field.propertyName === metadata.idPropertyName;
    }
}

export default PgPersister;

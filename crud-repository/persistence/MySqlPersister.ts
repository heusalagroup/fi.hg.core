import mysql from "mysql";
import EntityMetadata, { KeyValuePairs, EntityField } from "./EntityMetadata";
import Persister from "./Persister";

export default class MySqlPersister implements Persister {
    connection: mysql.Connection;
    connected: boolean = false;

    constructor(host: string, user: string, password: string, database: string) {
        this.connection = mysql.createConnection({
            host,
            user,
            password,
            database,
        });
        this.connect();
    }

    private connect() {
        this.connection.connect((err: mysql.MysqlError) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.connected = true;
            console.log("MySQL Connection established!");
        });
    }

    public async insert<T>(entity: T, metadata: EntityMetadata): Promise<T> {
        const { tableName } = metadata;
        const fields = metadata.fields.filter((fld) => !this.isIdField(fld, metadata));
        const colNames = fields.map((col) => col.columnName).join(",");
        const values = fields.map((col) => col.propertyName).map((p) => (entity as any)[p]);
        const placeholders = Array.from({ length: fields.length }, (_, i) => i + 1)
            .map(() => `?`)
            .reduce((prev, curr) => `${prev},${curr}`);
        const insert = `INSERT INTO ${tableName}(${colNames}) VALUES(${placeholders})`;
        return new Promise((resolve, reject) => {
            try {
                this.connection.query(insert, values, async (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    const entity: T | undefined = await this.findById(result.insertId, metadata);
                    if (entity) {
                        return resolve(entity);
                    } else {
                        reject(`Entity with id ${result.insertId} not found`);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public async update<T>(entity: T, metadata: EntityMetadata): Promise<T> {
        const { tableName } = metadata;
        const idColName = this.getIdColumnName(metadata);
        const id = this.getId(entity, metadata);
        const fields = metadata.fields.filter((fld) => !this.isIdField(fld, metadata));
        const setters = fields.map((fld) => `${fld.columnName}=?`).reduce((prev, curr) => `${prev},${curr}`);
        const values = fields
            .map((col) => col.propertyName)
            .map((p) => (entity as any)[p])
            .concat([id]);
        const update = `UPDATE ${tableName} SET ${setters} WHERE ${idColName}=?`;
        return new Promise((resolve, reject) => {
            try {
                this.connection.query(update, values, async (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    const entity: T | undefined = await this.findById(id, metadata);
                    if (entity) {
                        return resolve(entity);
                    } else {
                        reject(`Entity with id ${result.insertId} not found`);
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public async delete<T>(entity: T, metadata: EntityMetadata): Promise<void> {
        const { tableName } = metadata;
        const idColName = this.getIdColumnName(metadata);
        const id = this.getId(entity, metadata);
        const sql = `DELETE FROM ${tableName} WHERE ${idColName}=?`;
        return new Promise((resolve, reject) => {
            try {
                this.connection.query(sql, [id], async (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve();
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public async findAll<T>(metadata: EntityMetadata): Promise<T[]> {
        const { tableName } = metadata;
        const select = `SELECT * FROM ${tableName}`;
        return new Promise((resolve, reject) => {
            try {
                this.connection.query(select, async (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(result.map((row: any) => this.toEntity(row, metadata)));
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    public async findById<T>(id: string, metadata: EntityMetadata): Promise<T | undefined> {
        const { tableName } = metadata;
        const idColumnName = this.getIdColumnName(metadata);
        const select = `SELECT * FROM ${tableName} WHERE ${idColumnName} = ?`;
        return new Promise((resolve, reject) => {
            this.connection.query(select, [id], (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(result[0] ? this.toEntity(result[0], metadata) : undefined);
            });
        });
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

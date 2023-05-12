// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2023 Sendanor. All rights reserved.

import { Entity, EntityIdTypes, isEntity } from "../Entity";
import { EntityMetadata } from "../types/EntityMetadata";
import { RepositoryError } from "../types/RepositoryError";
import { trim } from "../../functions/trim";
import { isString } from "../../types/String";
import { MySqlDateTime } from "../persisters/mysql/types/MySqlDateTime";
import { isReadonlyJsonAny, parseJson, parseReadonlyJsonObject, ReadonlyJsonObject } from "../../Json";
import { isNumber } from "../../types/Number";
import { reduce } from "../../functions/reduce";
import { LogService } from "../../LogService";
import { CreateEntityLikeCallback } from "../types/EntityLike";
import { isFunction } from "../../types/Function";
import { forEach } from "../../functions/forEach";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";
import { isBoolean } from "../../types/Boolean";
import { isArray, isArrayOf } from "../../types/Array";
import { map } from "../../functions/map";
import { EntityField } from "../types/EntityField";
import { KeyValuePairs } from "../types/KeyValuePairs";
import { EntityRelationOneToMany } from "../types/EntityRelationOneToMany";
import { EntityRelationManyToOne } from "../types/EntityRelationManyToOne";
import { EntityFieldType } from "../types/EntityFieldType";
import { every } from "../../functions/every";
import { PersisterMetadataManager } from "../persisters/types/PersisterMetadataManager";
import { has } from "../../functions/has";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger('EntityUtils');

export class EntityUtils {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static getColumnName (
        propertyName : string,
        fields       : readonly EntityField[]
    ): string {
        const field = fields.find((x: EntityField) => x.propertyName === propertyName);
        if ( !field ) throw new RepositoryError(RepositoryError.Code.COLUMN_NAME_NOT_FOUND, `Column name not found for property: "${propertyName}"`);
        return field.columnName;
    }

    public static getPropertyName (
        columnName : string,
        fields     : readonly EntityField[]
    ): string {
        const field = fields.find((x: EntityField) => x.columnName === columnName);
        if (field) {
            return field.propertyName;
        }
        throw new RepositoryError(RepositoryError.Code.PROPERTY_NAME_NOT_FOUND, `Column not found: "${columnName}"`);
    }

    public static toJSON (
        entity: Entity,
        metadata: EntityMetadata
    ) : ReadonlyJsonObject {

        let json = reduce(
            metadata.fields,
            (prev: ReadonlyJsonObject, field: EntityField) : ReadonlyJsonObject => {
                const propertyName = field?.propertyName;
                if (!propertyName) throw new TypeError(`The field did not have propertyName defined`);
                const value : unknown = (entity as any)[propertyName];
                if (value === undefined) return prev;
                if (!isReadonlyJsonAny(value)) {
                    LOG.warn(`Could not convert property "${propertyName}" as JSON: Value not compatible for JSON:`, value);
                    return prev;
                }
                return {
                    ...prev,
                    [propertyName]: value
                };
            },
            {} as ReadonlyJsonObject
        );

        json = reduce(
            metadata.oneToManyRelations,
            (prev: ReadonlyJsonObject, oneToMany: EntityRelationOneToMany) : ReadonlyJsonObject => {
                const { propertyName } = oneToMany;
                if (propertyName) {
                    const value : unknown = (entity as any)[propertyName];
                    if (value === undefined) return prev;
                    if (!isArrayOf<Entity>(value, isEntity)) {
                        LOG.warn(`Could not convert property "${propertyName}" as JSON: Value not entity array:`, value);
                        return prev;
                    }
                    return {
                        ...prev,
                        [propertyName]: map(value, (item : Entity) : ReadonlyJsonObject => item.toJSON())
                    };
                }
                return prev;
            },
            json
        );

        json = reduce(
            metadata.manyToOneRelations,
            (prev: ReadonlyJsonObject, manyToOne: EntityRelationManyToOne) : ReadonlyJsonObject => {
                const { propertyName } = manyToOne;
                if (propertyName) {
                    const value : unknown = (entity as any)[propertyName];
                    if (value === undefined) return prev;
                    if (!isEntity(value)) {
                        LOG.warn(`Could not convert property "${propertyName}" as JSON: Value not entity:`, value);
                        return prev;
                    }
                    return {
                        ...prev,
                        [propertyName]: value.toJSON()
                    };
                }
                return prev;
            },
            json
        );

        return json;
    }

    public static clone (
        entity: Entity,
        metadata: EntityMetadata
    ) : Entity {
        const idPropertyName = metadata?.idPropertyName;
        if (!idPropertyName) throw new TypeError(`The entity metadata did not have id property name defined`);
        const createEntity : CreateEntityLikeCallback | undefined = metadata?.createEntity;
        if (!isFunction(createEntity)) {
            throw new TypeError(`The entity metadata did not have ability to create new entities. Did you forget '@table()' annotation?`);
        }
        const clonedEntity = createEntity();

        // We need to copy all normal fields because entity constructor might not
        // initialize everything same way
        forEach(
            metadata?.fields,
            (field: EntityField) => {
                const propertyName = field.propertyName;
                // Note: Joined entities will be copied below at manyToOneRelations
                if (propertyName && field.fieldType !== EntityFieldType.JOINED_ENTITY) {
                    (clonedEntity as any)[propertyName] = EntityUtils.cloneValue((entity as any)[propertyName]);
                }
            }
        );

        // We also need to copy @OneToMany relations
        forEach(
            metadata.oneToManyRelations,
            (oneToMany: EntityRelationOneToMany) : void => {
                const { propertyName } = oneToMany;
                if (propertyName) {
                    (clonedEntity as any)[propertyName] = EntityUtils.cloneValue((entity as any)[propertyName]);
                }
            },
        );

        // We also need to copy @ManyToOne relations
        forEach(
            metadata.manyToOneRelations,
            (manyToOne: EntityRelationManyToOne) : void => {
                const { propertyName } = manyToOne;
                if (propertyName) {
                    (clonedEntity as any)[propertyName] = EntityUtils.cloneValue((entity as any)[propertyName]);
                }
            },
        );

        return clonedEntity;
    }

    public static cloneValue<T> (value: T) : T {

        if ( isString(value)
            || isNumber(value)
            || isBoolean(value)
            || isUndefined(value)
            || isNull(value)
        ) {
            return value;
        }

        if (isArray(value)) {
            return map(
                value,
                (item: any) => EntityUtils.cloneValue(item)
            ) as unknown as T;
        }

        if (isEntity(value)) {
            return value.clone() as unknown as T;
        }

        LOG.debug(`value = `, value);
        throw new TypeError(`Could not clone value: ${value}`);
    }

    /**
     * This method goes through all fields in the metadata and copies values
     * from columns to properties.
     *
     * This property does not handle joined entities and will ignore those.
     *
     * @param dbEntity The data in format where the column name points to the
     *                 property value, e.g. as it is saved in the MySQL row.
     * @param parentMetadata
     * @param metadataManager
     */
    public static toEntity<T extends Entity, ID extends EntityIdTypes> (
        dbEntity: KeyValuePairs,
        parentMetadata: EntityMetadata,
        metadataManager: PersisterMetadataManager
    ): T {

        if (!dbEntity) {
            throw new TypeError(`The dbEntity must be defined: ${dbEntity}`);
        }

        const { createEntity, fields, manyToOneRelations, oneToManyRelations } = parentMetadata;
        if (!createEntity) throw new TypeError(`Could not create entity: No create function`);
        const ret : T = createEntity() as unknown as T;

        forEach(
            fields,
            (field: EntityField) : void => {
                const {fieldType, propertyName, columnName, metadata} = field;
                if (fieldType === EntityFieldType.JOINED_ENTITY) {
                    // This is handled below at @ManyToOne
                } else {
                    (ret as any)[propertyName] = dbEntity[columnName];
                }
            }
        );

        // OneToMany relations
        forEach(
            oneToManyRelations,
            (relation: EntityRelationOneToMany) : void => {
                const {propertyName} = relation;
                // LOG.debug(`oneToMany: propertyName=`, propertyName);
                if (!propertyName) return;
                const mappedTable = relation?.mappedTable;
                if (!mappedTable) {
                    LOG.debug(`oneToMany: "${propertyName}": mappedTable=`, mappedTable);
                    throw new TypeError(`The property "${propertyName}" did not have table configured`);
                }
                const mappedMetadata = metadataManager.getMetadataByTable(mappedTable);
                if (!mappedMetadata) {
                    LOG.debug(`oneToMany: "${propertyName}": mappedMetadata=`, mappedMetadata);
                    throw new TypeError(`Could not find metadata for property "${propertyName}" from table "${mappedTable}"`);
                }

                let dbValue : any = has(dbEntity, propertyName) ? dbEntity[propertyName] : undefined;
                if (dbValue !== undefined) {
                    if (isString(dbValue)) {
                        const jsonString = dbValue;
                        dbValue = parseJson(jsonString);
                        if (dbValue === undefined) throw new TypeError(`Failed to parse JSON: "${jsonString}"`)
                    }
                    if (!isArray(dbValue)) {
                        LOG.debug(`dbValue for property "${propertyName}" = `, dbValue);
                        throw new TypeError(`Expected the dbValue for property "${propertyName}" to be an array: ${dbValue}`);
                    }
                    (ret as any)[propertyName] = map(
                        dbValue,
                        (value: any) => {
                            if (value === undefined) throw new TypeError(`Unexpected undefined item in an array for property "${propertyName}"`);
                            return this.toEntity(value, mappedMetadata, metadataManager);
                        }
                    );
                }

            }
        );

        // ManyToOne relations
        forEach(
            manyToOneRelations,
            (relation: EntityRelationManyToOne) : void => {
                const {propertyName} = relation;
                // LOG.debug(`manyToOne: propertyName=`, propertyName);
                if (!propertyName) return;
                const mappedTable = relation?.mappedTable;
                if (!mappedTable) {
                    LOG.debug(`manyToOne: ${propertyName}: mappedTable=`, mappedTable);
                    throw new TypeError(`The property "${propertyName}" did not have table configured`);
                }
                const mappedMetadata = metadataManager.getMetadataByTable(mappedTable);
                if (!mappedMetadata) {
                    LOG.debug(`manyToOne: ${propertyName}: mappedMetadata=`, mappedMetadata);
                    throw new TypeError(`Could not find metadata for property "${propertyName}" from table "${mappedTable}"`);
                }

                let dbValue : any = has(dbEntity, propertyName) ? dbEntity[propertyName] : undefined;
                if (dbValue !== undefined) {
                    if (isString(dbValue)) {
                        const jsonString = dbValue;
                        dbValue = parseJson(jsonString);
                        if (dbValue === undefined) throw new TypeError(`Failed to parse JSON: "${jsonString}"`)
                    }
                    LOG.debug(`manyToOne: db value=`, dbValue);
                    (ret as any)[propertyName] = this.toEntity(dbValue, mappedMetadata, metadataManager);
                }

            }
        );

        if (!isEntity(ret)) {
            LOG.debug(`Could not create entity correctly: `, ret);
            throw new TypeError(`Could not create entity correctly: ${ret}`);
        }

        return ret;
    }

    public static getIdColumnName (metadata: EntityMetadata) : string {
        return EntityUtils.getColumnName(metadata.idPropertyName, metadata.fields);
    }

    public static getIdPropertyName (metadata: EntityMetadata) : string {
        return metadata.idPropertyName;
    }

    public static getId<T extends Entity, ID extends EntityIdTypes> (
        entity      : T,
        metadata    : EntityMetadata,
        tablePrefix : string = ''
    ): ID {
        const id = (entity as KeyValuePairs)[metadata.idPropertyName];
        if (id !== undefined) return id;
        throw new RepositoryError(RepositoryError.Code.ID_NOT_FOUND_FOR_TABLE, `Id property not found for table: "${tablePrefix}${metadata.tableName}"`);
    }

    public static isIdField (
        field: EntityField,
        metadata: EntityMetadata
    ) {
        return field.propertyName === metadata.idPropertyName;
    }

    public static parseStringArray (
        input: string | undefined,
        separator: string
    ) : string[] {
        return (input ?? '').split(separator).map(trim).filter((item: string) => !!item);
    }

    public static parseBoolean (input : any) : boolean {
        return input === true || input === 1;
    }

    public static parseString (input : any) : string {
        return isString(input) ? input : '';
    }

    public static parseNumber (input : any) : number | undefined {
        return isNumber(input) ? input : undefined;
    }

    public static parseJsonObject (input : any) : ReadonlyJsonObject | undefined {
        return parseReadonlyJsonObject(input);
    }

    public static parseIntegerAsString (input : string | number | undefined) : string | undefined {
        if ( (isString(input) && trim(input)) === '' || input === undefined ) return undefined;
        return `${input}`;
    }

    public static parseDateAsString (input : Date | string | undefined) : string | undefined {
        if ( (isString(input) && trim(input)) === '' || input === undefined ) return undefined;
        return `${input}`;
    }

    public static parseMySQLDateAsIsoString (value : any) : string | undefined {
        let parsed = MySqlDateTime.parse(EntityUtils.parseDateAsString(value));
        return parsed ? parsed.getISOString() : undefined;
    }

    public static parseDateAsIsoString (value : any) : string | undefined {
        let parsed = EntityUtils.parseDateAsString(value);
        return parsed ? parsed : undefined;
    }

    public static parseJson (value : any) : string | undefined {
        let parsed = MySqlDateTime.parse(EntityUtils.parseDateAsString(value));
        return parsed ? parsed.getISOString() : undefined;
    }

    public static parseIsoStringAsMySQLDateString (value : any) : string | undefined {
        let parsed = MySqlDateTime.parse(value);
        return parsed ? parsed.toString() : undefined;
    }

    /**
     * This function validates that each entity in the list is has the same
     * metadata, e.g. are of the same type of entities.
     *
     * @param list
     * @param metadata
     */
    public static areEntitiesSameType <T extends Entity> (
        list      : readonly T[],
        metadata ?: EntityMetadata
    ) : boolean {
        if ( list.length < 1 ) throw new TypeError(`Cannot check empty array of entities for their type`);
        if ( !metadata ) metadata = list[0].getMetadata();
        return every(list, (entity: T) : boolean => entity.getMetadata() === metadata);
    }

    /**
     * Removes relations to other entities from an entity, e.g. simplifies it.
     *
     * @param item
     * @param metadata
     * @returns Cloned and simplified new entity
     */
    public static removeEntityRelations<T extends Entity> (
        item: T,
        metadata: EntityMetadata
    ) : T {
        const clonedEntity = item.clone() as T;

        forEach(
            metadata.manyToOneRelations,
            (relation) => {
                const {propertyName} = relation;
                (clonedEntity as any)[propertyName] = undefined;
            }
        );

        forEach(
            metadata.oneToManyRelations,
            (relation) => {
                const {propertyName} = relation;
                (clonedEntity as any)[propertyName] = [];
            }
        );

        return clonedEntity;
    }

}

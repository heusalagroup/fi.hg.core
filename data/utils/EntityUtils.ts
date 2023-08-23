// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2023 Sendanor. All rights reserved.

import { map } from "../../functions/map";
import { find } from "../../functions/find";
import { filter } from "../../functions/filter";
import { trim } from "../../functions/trim";
import { forEach } from "../../functions/forEach";
import { has } from "../../functions/has";
import { Entity, EntityIdTypes, isEntity } from "../Entity";
import { EntityMetadata } from "../types/EntityMetadata";
import { RepositoryError } from "../types/RepositoryError";
import { isString } from "../../types/String";
import { MySqlDateTime } from "../persisters/mysql/types/MySqlDateTime";
import { parseJson, parseReadonlyJsonObject, ReadonlyJsonObject } from "../../Json";
import { isNumber } from "../../types/Number";
import { LogService } from "../../LogService";
import { isNull } from "../../types/Null";
import { isArray } from "../../types/Array";
import { EntityField } from "../types/EntityField";
import { KeyValuePairs } from "../types/KeyValuePairs";
import { EntityRelationOneToMany } from "../types/EntityRelationOneToMany";
import { EntityRelationManyToOne } from "../types/EntityRelationManyToOne";
import { EntityFieldType } from "../types/EntityFieldType";
import { every } from "../../functions/every";
import { PersisterMetadataManager } from "../persisters/types/PersisterMetadataManager";
import { LogLevel } from "../../types/LogLevel";
import { TemporalProperty } from "../types/TemporalProperty";
import { isJsonColumnDefinition, isTimeColumnDefinition } from "../types/ColumnDefinition";
import { parseIsoDateStringWithMilliseconds } from "../../types/Date";

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
    public static toEntity<T extends Entity> (
        dbEntity: KeyValuePairs,
        parentMetadata: EntityMetadata,
        metadataManager: PersisterMetadataManager
    ): T {

        if (!dbEntity) {
            throw new TypeError(`The dbEntity must be defined: ${dbEntity}`);
        }

        const { createEntity, fields, manyToOneRelations, oneToManyRelations, temporalProperties } = parentMetadata;

        if (!createEntity) throw new TypeError(`Could not create entity: No create function`);

        const ret : T = createEntity() as unknown as T;
        if (!isEntity(ret)) {
            LOG.debug(`The created entity was not extended from Entity class: `, ret);
            throw new TypeError(`Could not create an entity object. This is probably because your entity class was not extended from the Entity base class. See debug log for extra information.`);
        }

        forEach(
            fields,
            (field: EntityField) : void => {
                const {
                    fieldType,
                    propertyName,
                    columnName
                    /*, metadata*/,
                    columnDefinition
                } = field;
                if (fieldType === EntityFieldType.JOINED_ENTITY) {
                    // This is handled below at @ManyToOne
                } else {

                    const temporalProperty : TemporalProperty | undefined = find(temporalProperties, item => item.propertyName === propertyName);
                    const temporalType = temporalProperty?.temporalType;

                    const isTime : boolean = !!temporalType || isTimeColumnDefinition(columnDefinition);
                    if (isTime) {
                        LOG.debug(`toEntity: "${propertyName}": as string "${dbEntity[columnName]}": `, dbEntity[columnName]);
                        (ret as any)[propertyName] = EntityUtils.parseDateAsString(dbEntity[columnName]);
                        return;
                    }

                    const isJson : boolean = isJsonColumnDefinition(columnDefinition);
                    if (isJson) {
                        LOG.debug(`toEntity: "${propertyName}": as string "${dbEntity[columnName]}": `, dbEntity[columnName]);
                        (ret as any)[propertyName] = EntityUtils.parseJsonObject(dbEntity[columnName]);
                        return;
                    }

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
                    LOG.warn(`Warning: @oneToMany: The property "${propertyName}" did not have table mapped`);
                    return;
                }
                const mappedMetadata = metadataManager.getMetadataByTable(mappedTable);
                if (!mappedMetadata) {
                    LOG.debug(`oneToMany: "${propertyName}": mappedMetadata=`, mappedMetadata);
                    throw new TypeError(`Could not find metadata for table "${mappedTable}" (for property ${propertyName}) -- Check that your table names in @OneToMany and @Table match exactly`);
                }

                let dbValue : any = has(dbEntity, propertyName) ? dbEntity[propertyName] : undefined;
                if (dbValue !== undefined) {
                    if (isString(dbValue)) {
                        const jsonString = dbValue;
                        dbValue = parseJson(jsonString);
                        if (dbValue === undefined) throw new TypeError(`Failed to parse JSON: "${jsonString}"`)
                    }
                    if (isNull(dbValue)) {
                        (ret as any)[propertyName] = [];
                        return;
                    }
                    if (!isArray(dbValue)) {
                        LOG.debug(`dbValue for property "${propertyName}" = `, dbValue);
                        throw new TypeError(`Expected the dbValue for property "${propertyName}" to be an array: ${dbValue}`);
                    }
                    (ret as any)[propertyName] = map(
                        filter(
                            dbValue,
                            (value) => !isNull(value)
                        ),
                        (value: any) => {
                            if (!value) throw new TypeError(`Unexpected undefined item in an array for property "${propertyName}"`);
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
                    if (isNull(dbValue)) {
                        (ret as any)[propertyName] = undefined;
                        return;
                    }
                    LOG.debug(`manyToOne: db value=`, dbValue);
                    (ret as any)[propertyName] = this.toEntity(dbValue, mappedMetadata, metadataManager);
                }
            }
        );

        return ret;
    }

    public static getPropertyFromEntity<T extends Entity> (value : T, propertyName: string) : any {

        // TODO: Some day, we'll use this. If the property is JSON, we could already use.
        //       This would support things like `"jsonData.name"`.
        //return get(value, propertyName);

        return has(value, propertyName) ? (value as any)[propertyName] : undefined;
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
        return `${parseIsoDateStringWithMilliseconds(input, true)}`;
    }

    public static parseMySQLDateAsIsoString (value : any) : string | undefined {
        let parsed = MySqlDateTime.parse(EntityUtils.parseDateAsString(value));
        return parsed ? parsed.getISOString() : undefined;
    }

    public static parseDateAsIsoString (value : any) : string | undefined {
        let parsed = EntityUtils.parseDateAsString(value);
        return parsed ? parsed : undefined;
    }

    public static toJsonString (value : any) : string | undefined {
        return JSON.stringify(value);
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

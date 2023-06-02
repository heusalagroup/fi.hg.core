// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { EntityFieldType, explainEntityFieldType, isEntityFieldType, parseEntityFieldType } from "./EntityFieldType";
import { EntityMetadata, explainEntityMetadataOrUndefined, isEntityMetadataOrUndefined } from "./EntityMetadata";
import { ColumnDefinition, explainColumnDefinition, isColumnDefinition, parseColumnDefinition } from "./ColumnDefinition";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { explainBoolean, isBoolean } from "../../types/Boolean";

/**
 * Entity field information
 */
export interface EntityField {

    /**
     * The type of field
     */
    fieldType : EntityFieldType;

    /**
     * The property name on the class
     */
    propertyName : string;

    /**
     * The field name in the database table
     */
    columnName   : string;

    /**
     * The database column definition.
     *
     * E.g. `BIGINT`.
     */
    columnDefinition ?: ColumnDefinition;

    /**
     * If enabled, this field can be left undefined.
     *
     * Default is `true`.
     */
    nullable   : boolean;

    /**
     * If enabled, this field will be included in INSERT queries.
     *
     * Default is `true`.
     */
    insertable : boolean;

    /**
     * If enabled, this field will be included in UPDATE queries.
     *
     * Default is `true`.
     */
    updatable : boolean;

    /**
     * The field metadata if this field is an entity
     */
    metadata   ?: EntityMetadata | undefined;

}

/**
 *
 * @param propertyName
 * @param columnName
 * @param columnDefinition
 * @param nullable
 * @param fieldType
 * @param metadata
 * @param insertable
 * @param updatable
 * @returns {{nullable: boolean, propertyName: string, updatable: boolean, fieldType: EntityFieldType, columnName: string, insertable: boolean}}
 */
export function createEntityField (
    propertyName       : string,
    columnName         : string,
    columnDefinition  ?: ColumnDefinition,
    nullable          ?: boolean | undefined,
    fieldType         ?: EntityFieldType | undefined,
    metadata          ?: EntityMetadata | undefined,
    insertable        ?: boolean | undefined,
    updatable         ?: boolean | undefined,
) : EntityField {
    return {
        propertyName,
        columnName,
        ...(columnDefinition ? {columnDefinition: parseColumnDefinition(columnDefinition)} : {}),
        nullable : nullable ?? true,
        insertable : insertable ?? true,
        updatable : updatable ?? true,
        fieldType : parseEntityFieldType(fieldType) ?? EntityFieldType.UNKNOWN,
        ...(metadata ? {metadata} : {})
    };
}

export function isEntityField (value: unknown) : value is EntityField {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'fieldType',
            'propertyName',
            'columnName',
            'columnDefinition',
            'nullable',
            'insertable',
            'updatable',
            'metadata'
        ])
        && isEntityFieldType(value?.fieldType)         // EntityFieldType;
        && isString(value?.propertyName)      // string;
        && isString(value?.columnName)        // string;
        && isColumnDefinition(value?.columnDefinition)  // ColumnDefinition;
        && isBoolean(value?.nullable)          // boolean;
        && isBoolean(value?.insertable)        // boolean;
        && isBoolean(value?.updatable)         // boolean;
        && isEntityMetadataOrUndefined(value?.metadata)          // EntityMetadata | undefined;
    );
}

export function explainEntityField (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'fieldType',
                'propertyName',
                'columnName',
                'columnDefinition',
                'nullable',
                'insertable',
                'updatable',
                'metadata'
            ])
            , explainProperty("fieldType", explainEntityFieldType(value?.fieldType))
            , explainProperty("propertyName", explainString(value?.propertyName))
            , explainProperty("columnName", explainString(value?.columnName))
            , explainProperty("columnDefinition", explainColumnDefinition(value?.columnDefinition))
            , explainProperty("nullable", explainBoolean(value?.nullable))
            , explainProperty("insertable", explainBoolean(value?.insertable))
            , explainProperty("updatable", explainBoolean(value?.updatable))
            , explainProperty("metadata", explainEntityMetadataOrUndefined(value?.metadata))
        ]
    );
}

export function stringifyEntityField (value : EntityField) : string {
    return `EntityField(${value})`;
}

export function parseEntityField (value: unknown) : EntityField | undefined {
    if (isEntityField(value)) return value;
    return undefined;
}

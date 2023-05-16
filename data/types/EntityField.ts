// Copyright (c) 2022-2023. Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { EntityFieldType, parseEntityFieldType } from "./EntityFieldType";
import { EntityMetadata } from "./EntityMetadata";
import { ColumnDefinition, parseColumnDefinition } from "./ColumnDefinition";

export interface EntityField {

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
    insertable ?: boolean;

    /**
     * If enabled, this field will be included in UPDATE queries.
     *
     * Default is `true`.
     */
    updatable ?: boolean;

    /**
     * The field metadata if this field is an entity
     */
    metadata   ?: EntityMetadata | undefined;

}

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

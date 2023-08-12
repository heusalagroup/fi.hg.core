// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../types/EntityField";
import { TemporalProperty } from "../../types/TemporalProperty";
import { EntityBuilderUtils } from "../../utils/EntityBuilderUtils";
import { SelectQueryBuilder } from "../sql/select/SelectQueryBuilder";

export class EntitySelectQueryUtils {

    /**
     * Include entity fields in the select query results.
     *
     * @param builder
     * @param tableName The table name without the prefix
     * @param fields
     * @param temporalProperties
     */
    public static includeEntityFields (
        builder             : SelectQueryBuilder,
        tableName           : string,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ): void {
        EntityBuilderUtils.includeFields(
            tableName,
            fields,
            temporalProperties,
            (tableName: string, columnName: string /*, propertyName: string*/) => {
                builder.includeColumnAsTimestamp( tableName, columnName, columnName );
            },
            (tableName: string, columnName: string /*, propertyName: string*/) => {
                builder.includeColumnAsTime( tableName, columnName, columnName );
            },
            (tableName: string, columnName: string /*, propertyName: string*/) => {
                builder.includeColumnAsDate( tableName, columnName, columnName );
            },
            (tableName: string, columnName: string /*, propertyName: string*/) => {
                builder.includeColumnAsText( tableName, columnName, columnName );
            },
            (tableName: string, columnName: string /*, propertyName: string*/) => {
                builder.includeColumn( tableName, columnName, columnName );
            },
        );
    }

}

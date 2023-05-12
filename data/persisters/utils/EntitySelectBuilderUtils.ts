// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../types/EntityField";
import { TemporalProperty } from "../../types/TemporalProperty";
import { SelectQueryBuilder } from "../types/SelectQueryBuilder";
import { EntityBuilderUtils } from "./EntityBuilderUtils";

export class EntitySelectBuilderUtils {

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
            (tableName: string, columnName: string, propertyName: string) => {
                builder.includeColumnAsTimestamp( tableName, columnName );
            },
            (tableName: string, columnName: string, propertyName: string) => {
                builder.includeColumnAsTime( tableName, columnName );
            },
            (tableName: string, columnName: string, propertyName: string) => {
                builder.includeColumnAsDate( tableName, columnName );
            },
            (tableName: string, columnName: string, propertyName: string) => {
                builder.includeColumnAsText( tableName, columnName );
            },
            (tableName: string, columnName: string, propertyName: string) => {
                builder.includeColumn( tableName, columnName );
            },
        );
    }

}

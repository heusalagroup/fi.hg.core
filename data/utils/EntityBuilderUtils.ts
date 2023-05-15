// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../functions/forEach";
import { find } from "../../functions/find";
import { EntityField } from "../types/EntityField";
import { TemporalProperty } from "../types/TemporalProperty";
import { TemporalType } from "../types/TemporalType";
import { EntityFieldType } from "../types/EntityFieldType";
import { ColumnDefinition } from "../types/ColumnDefinition";

export type ColumnSelectorCallback = (tableName: string, columnName: string, propertyName : string) => void;

export class EntityBuilderUtils {

    /**
     *
     * @param tableName The table name, without the prefix.
     * @param fields
     * @param temporalProperties
     * @param asTimestamp
     * @param asTime
     * @param asDate
     * @param asBigint
     * @param asSelf
     */
    public static includeFields (
        tableName           : string,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        asTimestamp         : ColumnSelectorCallback,
        asTime              : ColumnSelectorCallback,
        asDate              : ColumnSelectorCallback,
        asBigint            : ColumnSelectorCallback,
        asSelf              : ColumnSelectorCallback,
    ): void {
        forEach(
            fields,
            (field: EntityField) => {
                const { propertyName, columnName, fieldType, columnDefinition } = field;
                if ( columnName && fieldType !== EntityFieldType.JOINED_ENTITY ) {

                    if ( fieldType === EntityFieldType.BIGINT || columnDefinition === ColumnDefinition.BIGINT ) {
                        return asBigint( tableName, columnName, propertyName );
                    }

                    const temporalProperty : TemporalProperty | undefined = find(
                        temporalProperties,
                        (item) => item.propertyName === propertyName
                    );
                    const temporalType = temporalProperty?.temporalType;

                    if ( fieldType === EntityFieldType.DATE_TIME || temporalType === TemporalType.TIMESTAMP || columnDefinition === ColumnDefinition.TIMESTAMP || columnDefinition === ColumnDefinition.TIMESTAMPTZ || columnDefinition === ColumnDefinition.DATETIME || columnDefinition === ColumnDefinition.DATETIMETZ ) {
                        return asTimestamp( tableName, columnName, propertyName );
                    }

                    if ( fieldType === EntityFieldType.TIME || temporalType === TemporalType.TIME || columnDefinition === ColumnDefinition.TIME || columnDefinition === ColumnDefinition.TIMETZ ) {
                        return asTime( tableName, columnName, propertyName );
                    }

                    if ( fieldType === EntityFieldType.DATE || temporalType === TemporalType.DATE || columnDefinition === ColumnDefinition.DATE || columnDefinition === ColumnDefinition.DATETZ ) {
                        return asDate( tableName, columnName, propertyName );
                    }

                    return asSelf( tableName, columnName, propertyName );
                }
            }
        );
    }

}

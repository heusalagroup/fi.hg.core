// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../functions/forEach";
import { find } from "../../functions/find";
import { EntityField } from "../types/EntityField";
import { TemporalProperty } from "../types/TemporalProperty";
import { TemporalType } from "../types/TemporalType";
import { EntityFieldType } from "../types/EntityFieldType";

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

                    if ( fieldType === EntityFieldType.BIGINT || columnDefinition === "BIGINT" ) {
                        return asBigint( tableName, columnName, propertyName );
                    }

                    const temporalProperty : TemporalProperty | undefined = find(
                        temporalProperties,
                        (item) => item.propertyName === propertyName
                    );
                    const temporalType = temporalProperty?.temporalType;

                    if ( fieldType === EntityFieldType.DATE_TIME || columnDefinition === "TIMESTAMP" || temporalType === TemporalType.TIMESTAMP ) {
                        return asTimestamp( tableName, columnName, propertyName );
                    }

                    if ( fieldType === EntityFieldType.TIME || columnDefinition === "TIME" || temporalType === TemporalType.TIME ) {
                        return asTime( tableName, columnName, propertyName );
                    }

                    if ( fieldType === EntityFieldType.DATE || columnDefinition === "DATE" || temporalType === TemporalType.DATE ) {
                        return asDate( tableName, columnName, propertyName );
                    }

                    return asSelf( tableName, columnName, propertyName );
                }
            }
        );
    }

}

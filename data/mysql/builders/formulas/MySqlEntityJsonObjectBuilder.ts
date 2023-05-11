// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../types/EntityField";
import { QueryBuilder } from "../../../persisters/types/QueryBuilder";
import { MySqlJsonObjectQueryBuilder } from "./MySqlJsonObjectQueryBuilder";
import { EntityFieldType } from "../../../types/EntityFieldType";

/**
 * This generates formulas like `JSON_OBJECT(property, table.column[, property2, table2.column2, ...])`
 * but can configure it just by using the table name and entity field array.
 */
export class MySqlEntityJsonObjectBuilder implements QueryBuilder {

    private readonly _jsonBuilder : MySqlJsonObjectQueryBuilder;

    public constructor (
    ) {
        this._jsonBuilder = new MySqlJsonObjectQueryBuilder();
    }

    public setEntityFieldsFromTable (
        tableName : string,
        fields : readonly EntityField[]
    ) {
        fields.forEach(
            (field: EntityField) => {
                const {columnName, fieldType, columnDefinition} = field;
                if (fieldType !== EntityFieldType.JOINED_ENTITY) {
                    if (columnDefinition === "BIGINT") {
                        this._jsonBuilder.setPropertyFromColumnAsChar(
                            columnName,
                            tableName,
                            columnName
                        );
                    } else {
                        this._jsonBuilder.setPropertyFromColumn(
                            columnName,
                            tableName,
                            columnName
                        );
                    }
                }
            }
        );
    }

    public build (): [ string, any[] ] {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        return this._jsonBuilder.buildQueryString();
    }

    public buildQueryValues (): any[] {
        return this._jsonBuilder.buildQueryValues();
    }

    public getQueryValueFactories (): (() => any)[] {
        return this._jsonBuilder.getQueryValueFactories();
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../types/EntityField";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { PgRowBuilder } from "./PgRowBuilder";
import { EntityFieldType } from "../../../types/EntityFieldType";

/**
 * This generates formulas like `ROW(table.column[, table2.column2[, ...]])`
 * but can configure it just by using the table name and entity field array.
 */
export class PgRowEntityBuilder implements QueryBuilder {

    private readonly _jsonBuilder : PgRowBuilder;

    public constructor (
    ) {
        this._jsonBuilder = new PgRowBuilder();
    }

    public static create (
        tableName : string,
        fields    : readonly EntityField[]
    ) : PgRowEntityBuilder {
        const f = new PgRowEntityBuilder();
        f.setEntityFieldsFromTable(tableName, fields);
        return f;
    }

    public setEntityFieldsFromTable (
        tableName : string,
        fields : readonly EntityField[]
    ) {
        fields.forEach(
            (field: EntityField) => {
                const {columnName, fieldType} = field;
                if (fieldType !== EntityFieldType.JOINED_ENTITY) {
                    this._jsonBuilder.setTableColumn(tableName, columnName);
                }
            }
        );
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgRowEntityBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build (): QueryBuildResult {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        return this._jsonBuilder.buildQueryString();
    }

    public buildQueryValues (): readonly any[] {
        return this._jsonBuilder.buildQueryValues();
    }

    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return this._jsonBuilder.getQueryValueFactories();
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../types/EntityField";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { MySqlJsonObjectQueryBuilder } from "./MySqlJsonObjectQueryBuilder";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { EntityBuilderUtils } from "../../../utils/EntityBuilderUtils";

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
        fields : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ) {
        EntityBuilderUtils.includeFields(
            tableName,
            fields,
            temporalProperties,
            (tableName: string, columnName: string/*, propertyName: string*/) => {
                this._jsonBuilder.setPropertyFromColumn( columnName, tableName, columnName );
            },
            (tableName: string, columnName: string/*, propertyName: string*/) => {
                this._jsonBuilder.setPropertyFromColumn( columnName, tableName, columnName );
            },
            (tableName: string, columnName: string/*, propertyName: string*/) => {
                this._jsonBuilder.setPropertyFromColumn( columnName, tableName, columnName );
            },
            (tableName: string, columnName: string/*, propertyName: string*/) => {
                this._jsonBuilder.setPropertyFromColumnAsChar( columnName, tableName, columnName );
            },
            (tableName: string, columnName: string/*, propertyName: string*/) => {
                this._jsonBuilder.setPropertyFromColumn( columnName, tableName, columnName );
            },
        );
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return this._jsonBuilder.toString();
    }

    public build (): QueryBuildResult {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        return this._jsonBuilder.buildQueryString();
    }

    public buildQueryValues () : readonly any[] {
        return this._jsonBuilder.buildQueryValues();
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._jsonBuilder.getQueryValueFactories();
    }

}

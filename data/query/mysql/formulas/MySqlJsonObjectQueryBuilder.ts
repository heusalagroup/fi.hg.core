// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { map } from "../../../../functions/map";
import { MY_PH_TABLE_COLUMN, MY_PH_TABLE_COLUMN_AS_TEXT, MY_PH_VALUE } from "../constants/mysql-queries";

/**
 * This generates formulas like `JSON_OBJECT(property, table.column[, property2, table2.column2, ...])`
 */
export class MySqlJsonObjectQueryBuilder implements QueryBuilder {

    private readonly _keyValueQueries : (() => string)[];
    private readonly _keyValueValues : QueryValueFactory[];

    private readonly _whenNullQueries : (() => string)[];
    private readonly _whenNullValues : QueryValueFactory[];

    public constructor () {
        this._keyValueQueries = [];
        this._keyValueValues = [];
        this._whenNullQueries = [];
        this._whenNullValues = [];
    }


    /**
     *
     * @param propertyName The property name in the JSON object
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    public setPropertyFromColumn (
        propertyName: string,
        tableName: string,
        columnName: string
    ) {

        this._whenNullQueries.push(() => `${MY_PH_TABLE_COLUMN} IS NULL`);
        this._whenNullValues.push(() => tableName);
        this._whenNullValues.push(() => columnName);

        this._keyValueQueries.push(() => `${MY_PH_VALUE}, ${MY_PH_TABLE_COLUMN}`);
        this._keyValueValues.push(() => propertyName);
        this._keyValueValues.push(() => tableName);
        this._keyValueValues.push(() => columnName);

    }

    /**
     *
     * @param propertyName The property name in the JSON object
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    public setPropertyFromColumnAsChar (
        propertyName: string,
        tableName: string,
        columnName: string
    ) {

        this._whenNullQueries.push(() => `${MY_PH_TABLE_COLUMN} IS NULL`);
        this._whenNullValues.push(() => tableName);
        this._whenNullValues.push(() => columnName);

        this._keyValueQueries.push(() => `${MY_PH_VALUE}, ${MY_PH_TABLE_COLUMN_AS_TEXT}`);
        this._keyValueValues.push(() => propertyName);
        this._keyValueValues.push(() => tableName);
        this._keyValueValues.push(() => columnName);

    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `JSON_OBJECT "${this._keyValueQueries.map(item => item.toString()).join('')}" with ${this._keyValueValues.map(item=>item()).join(' ')}`;
    }

    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        const whenNullQueries = map(this._whenNullQueries, (f) => f());
        const keyValueQueries = map(this._keyValueQueries, (f) => f());
        return `CASE WHEN ${whenNullQueries.join(' AND ')} THEN NULL ELSE JSON_OBJECT(${keyValueQueries.join(', ')}) END`;
    }

    public buildQueryValues () : readonly any[] {
        return map(this.getQueryValueFactories(), (f) => f());
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return [
            ...this._whenNullValues,
            ...this._keyValueValues
        ];
    }

}

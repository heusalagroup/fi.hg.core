// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { map } from "../../../../functions/map";
import { PgQueryUtils } from "../utils/PgQueryUtils";

/**
 * This generates formulas like `table.column[, table2.column2, ...]`
 */
export class PgArgumentListBuilder implements QueryBuilder {

    private readonly _queryList : (() => string)[];
    private readonly _valueList : QueryValueFactory[];

    public constructor () {
        this._queryList = [];
        this._valueList = [];
    }


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgArgumentListBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    /**
     * Builds formula like `"table"."column"`.
     *
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    public setTableColumn (
        tableName: string,
        columnName: string
    ) {
        this._queryList.push( () => PgQueryUtils.quoteTableAndColumn(tableName, columnName) );
    }

    /**
     * Builds formula like `"table"."column"::text`.
     *
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    public setTableColumnAsText (
        tableName: string,
        columnName: string
    ) {
        this._queryList.push( () => PgQueryUtils.quoteTableAndColumnAsText(tableName, columnName) );
    }

    /**
     * Builds formula like `"table"."column"::text`.
     *
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    public setTableColumnAsTimestamp (
        tableName: string,
        columnName: string
    ) {
        this._queryList.push( () => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName) );
    }

    /**
     * Builds query like `$1`
     *
     * @param value
     */
    public setParam (
        value: any
    ) {
        this._queryList.push( () => PgQueryUtils.getValuePlaceholder() );
        this._valueList.push( () => value );
    }

    public setParamFactory (
        value: () => any
    ) {
        this._queryList.push( () => PgQueryUtils.getValuePlaceholder() );
        this._valueList.push( value );
    }

    /**
     * Builds query like `$1::text`
     *
     * @param value
     */
    public setParamAsText (
        value: any
    ) {
        this._queryList.push( () => PgQueryUtils.getValuePlaceholderAsText() );
        this._valueList.push( () => value );
    }

    /**
     * Builds query for timestamp string
     *
     * @param value
     */
    public setParamAsTimestamp (
        value: any
    ) {
        this._queryList.push( () => PgQueryUtils.getValuePlaceholderAsTimestampString() );
        this._valueList.push( () => value );
    }


    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        return map(this._queryList, (f) => f()).join(', ');
    }

    public buildQueryValues () : readonly any[] {
        return map(this._valueList, (f) => f());
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._valueList;
    }

}

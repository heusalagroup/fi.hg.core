// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "./QueryBuilder";

/**
 * Defines an interface for a builder of relational database items in a list.
 *
 * For example, the items in the INSERT query value lists.
 */
export interface ListQueryBuilder extends QueryBuilder {

    /**
     * Append expression using factory functions to the expression list.
     *
     * @param queryFactory
     * @param valueFactories
     */
    appendExpression (
        queryFactory  : (() => string),
        ...valueFactories : (() => any)[]
    ) : void;

    /**
     * Appends column expression which references the column as it is
     * in the database
     *
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    setTableColumn (
        tableName: string,
        columnName: string
    ): void;

    /**
     * Appends expression which references the column with a cast to text
     *
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    setTableColumnAsText (
        tableName: string,
        columnName: string
    ): void;

    /**
     * Appends expression which references the column with a cast as ISO timestamp string.
     *
     * @param tableName The table name from where to read the value
     * @param columnName The column name in the table where to read the value
     */
    setTableColumnAsTimestampString (
        tableName: string,
        columnName: string
    ) : void;

    /**
     * Appends expression which maps the value to next item in the list
     *
     * @param value
     */
    setParam (
        value: any
    ) : void;

    /**
     * Appends expression which uses this factory function as the next value
     *
     * @param value
     */
    setParamFactory (
        value: () => any
    ) : void;

    /**
     * Appends expression which maps the value to next item cast as a text
     *
     * @param value
     */
    setParamAsText (
        value: any
    ): void;

    /**
     * Appends expression which maps the value to next item as cast to ISO timestamp string
     *
     * Use this when exporting timestamps from the database.
     *
     * @param value
     */
    setParamFromTimestampString (
        value: any
    ): void;

    /**
     * Appends expression which maps the value to next item as cast to relational database time format from ISO timestamp string
     *
     * Use this when importing data to the database.
     *
     * @param value
     */
    setParamAsTimestampValue (
        value: any
    ): void;



    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     * @see {@link QueryBuilder.toString}
     */
    valueOf() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     * @see {@link QueryBuilder.toString}
     */
    toString() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.build}
     */
    build () : [string, any[]];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     */
    buildQueryString () : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     */
    buildQueryValues () : any[];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     */
    getQueryValueFactories () : (() => any)[];

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "./QueryBuilder";

/**
 * Defines an interface for a builder of relational database items in a list.
 *
 * For example, the items in the INSERT query value lists or the assignment list
 * in the UPDATE query.
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
        ...valueFactories : readonly QueryValueFactory[]
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
     * Appends expression which maps the value to next item as cast to JSON string
     *
     * Use this when importing JSON to the database.
     *
     * @param value
     */
    setParamFromJson (
        value: any
    ): void;

    /**
     * Appends expression which maps the value to next item as cast to ISO timestamp string
     *
     * Use this when importing timestamps to the database.
     *
     * @param value
     */
    setParamFromTimestampString (
        value: any
    ): void;

    /**
     * Appends expression which maps the value to next item as cast to relational database time format from ISO timestamp string
     *
     * Use this when exporting data to the database.
     *
     * @param value
     */
    setParamAsTimestampValue (
        value: any
    ): void;

    /**
     * Set a parameter with an assigment.
     *
     * This is usually used in the update clause, e.g. it is the
     * `columnName = ?` part from the `UPDATE table SET columnName = ?`.
     *
     * @param columnName
     * @param value
     */
    setAssignmentWithParam (
        columnName: string,
        value: any
    ) : void

    /**
     * Set a parameter with an assigment.
     *
     * This is usually used in the update clause, e.g. it is the
     * `columnName = DATE_FORMAT(?, ...)` part from the
     * `UPDATE table SET columnName = DATE_FORMAT(?, ...)`.
     *
     * @param columnName The column name to set
     * @param value The time value
     */
    setAssignmentWithParamAsTimestamp (
        columnName: string,
        value: any
    ) : void

    /**
     * Set a parameter with an assigment.
     *
     * This is usually used in the update clause, e.g. it is the
     * `columnName = ?` part from the
     * `UPDATE table SET columnName = ?`.
     *
     * @param columnName The column name to set
     * @param value The time value
     */
    setAssignmentWithParamAsJson (
        columnName: string,
        value: any
    ) : void


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
    build () : QueryBuildResult;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     */
    buildQueryString () : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     */
    buildQueryValues () : readonly any[];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     */
    getQueryValueFactories () : readonly QueryValueFactory[];

}

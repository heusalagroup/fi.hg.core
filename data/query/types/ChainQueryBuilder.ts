// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "./QueryBuilder";

export type ChainQueryBuilderFactory = () => ChainQueryBuilder;

/**
 * Interface which implements API to objects used in SQL query building for
 * formulas like `expression OR expression2 [ OR ... ]` or
 * `expression AND expression2 [ AND ... ]`
 */
export interface ChainQueryBuilder extends QueryBuilder {

    /**
     * This will add an expression like `table.column IN (value1, value2, ...)`,
     * e.g. the table column's value must match one of the values supplied.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param values An array of values
     */
    setColumnInList (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) : void;

    /**
     * This will add an expression like `table.column IN (value1, value2, ...)`,
     * e.g. the table column's value must match one of the values supplied.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param values An array of values
     */
    setColumnInListAsTime (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) : void;

    /**
     * This will add an expression like `table.column = value`, e.g. the table
     * column's value must match the value.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param value The value
     */
    setColumnEquals (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add an expression like `table.column::jsonb = value::jsonb`
     * in PostgreSQL, e.g. the table column's value must match the value in JSONB format which
     * support logical matching of JSON objects.
     *
     * @param tableName
     * @param columnName
     * @param value
     */
    setColumnEqualsAsJson (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add an expression like `table.column IS NULL`, e.g. the table
     * column's value must be null.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     */
    setColumnIsNull (
        tableName : string,
        columnName : string
    ) : void;

    /**
     * This will add an expression like `table.column = value`, e.g. the table
     * column's value must match the value.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param value The value
     */
    setColumnEqualsAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add an expression like
     * `table.column >= start && table.column <= end`, e.g. the table column's
     * value must be between `start` and `end`.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param start Where the range starts
     * @param end Where the range starts
     */
    setColumnBetween (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) : void;

    /**
     * This will add an expression like
     * `table.column >= start && table.column <= end`, e.g. the table column's
     * value must be between `start` and `end`.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param start Where the range starts
     * @param end Where the range starts
     */
    setColumnBetweenAsTime (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) : void;

    /**
     * This will add an expression like
     * `table.column >= start && table.column <= end`, e.g. the table column's
     * value must be between `start` and `end`.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param value The value
     */
    setColumnBefore (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add an expression like
     * `table.column >= start && table.column <= end`, e.g. the table column's
     * value must be between `start` and `end`.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param value The value
     */
    setColumnBeforeAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add an expression like
     * `table.column >= start && table.column <= end`, e.g. the table column's
     * value must be between `start` and `end`.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param value The value
     */
    setColumnAfter (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add an expression like
     * `table.column >= start && table.column <= end`, e.g. the table column's
     * value must be between `start` and `end`.
     *
     * @param tableName The table name for the column
     * @param columnName The column name
     * @param value The value
     */
    setColumnAfterAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) : void;

    /**
     * This will add the expression by using another QueryBuilder.
     *
     * @param builder
     */
    setFromQueryBuilder (
        builder: QueryBuilder
    ) : void;


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     */
    build () : QueryBuildResult;

    /**
     * @inheritDoc     */
    buildQueryString () : string;

    /**
     * @inheritDoc     */
    buildQueryValues () : readonly any[];

    /**
     * @inheritDoc
     */
    getQueryValueFactories () : readonly QueryValueFactory[];


}

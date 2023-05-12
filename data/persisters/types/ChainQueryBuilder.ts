// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "./QueryBuilder";

export type ChainQueryBuilderFactory = () => ChainQueryBuilder;

/**
 * Interface which implements API to objects used in SQL query building for
 * formulas like `expression OR expression2 [ OR ... ]` or
 * `expression AND expression2 [ AND ... ]`
 */
export interface ChainQueryBuilder extends QueryBuilder {

    /**
     * @inheritDoc
     */
    build () : [string, any[]];

    /**
     * @inheritDoc     */
    buildQueryString () : string;

    /**
     * @inheritDoc     */
    buildQueryValues () : any[];

    /**
     * @inheritDoc
     */
    getQueryValueFactories () : (() => any)[];

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
    setColumnAfter (
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

}

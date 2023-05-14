// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryValueFactory } from "./QueryBuilder";

export interface QueryResultable {

    /**
     * Builds the result query string
     */
    buildResultQueryString () : string;

    /**
     * Builds the result value factory array
     */
    getResultValueFactories () : readonly QueryValueFactory[];

    /**
     * Append expression to column section using factory functions to the expression list.
     *
     * @param queryFactory
     * @param valueFactories
     */
    appendResultExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;

    /**
     * Append factories for the assignment list from another builder.
     *
     * @param builder
     * @param valueFactories
     * @see {@link ListQueryBuilder}
     */
    appendResultExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;


    /**
     * Includes the column in the query in unspecified format.
     *
     * This will result to the type which the internal database system and/or
     * the client library for it uses to map it as JavaScript value.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     * @param asColumnName The column name to use in the result
     */
    includeColumn (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * Includes the column in the query with conversion to text made to string
     * on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     * @param asColumnName The column name to use in the result
     */
    includeColumnAsText (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * Includes the column in the query with conversion made to ISO timestamp
     * string on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     * @param asColumnName The column name to use in the result
     */
    includeColumnAsTime (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * Includes the column in the query with conversion made to ISO timestamp
     * string on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     * @param asColumnName The column name to use in the result
     */
    includeColumnAsDate (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * Includes the column in the query with conversion made to ISO timestamp
     * string on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     * @param asColumnName The column name to use in the result
     */
    includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * Includes all columns from the table. No conversations will be made.
     *
     * In SQL this will usually generate field like `"table"."column".*`.
     *
     * **NOTE!** If you use this method, you will get types mapped by the
     * internal relational database module which may or may not be a correct
     * JavaScript type. Hints in our entity annotations will not control this
     * functionality. You will need to manually handle possible type conversions
     * and/or by configuring the internal persister.
     *
     * @param tableName The table name without prefix
     */
    includeAllColumnsFromTable (tableName: string) : void;

    /**
     * Includes columns using the provided query builder.
     *
     * @param builder The query builder
     * @param asColumnName The name in which the built formula will be mapped to
     *                     in the result row
     */
    includeColumnFromQueryBuilder (builder: QueryBuilder, asColumnName: string) : void;

    /**
     * Includes columns as a custom formula. This must be in the format accepted
     * by the internal persister module.
     *
     * It is not mandatory to support this in the persister implementation. In
     * that case, the persister may throw an exception.
     *
     * @param formula The raw format to use, e.g. `COUNT(*)`
     * @param asColumnName The name of the column where to map in the result
     * @throws Error If the internal persister does not support this feature
     */
    includeFormulaByString (formula: string, asColumnName: string): void;


}

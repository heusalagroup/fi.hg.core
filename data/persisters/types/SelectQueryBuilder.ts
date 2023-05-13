// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "./QueryBuilder";

/**
 * Defines an interface for a builder of relational database read query.
 */
export interface SelectQueryBuilder extends QueryBuilder {

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     */
    valueOf() : string;

    /**
     * @inheritDoc
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


    /**
     * Set an optional prefix for each table name.
     *
     * This allows you to use same database for multiple purposes.
     *
     * @param prefix
     */
    setTablePrefix (prefix: string) : void;

    /**
     * Get the optional table prefix.
     *
     * Will return empty string if not defined.
     */
    getTablePrefix () : string;

    /**
     * Returns complete table name including the prefix.
     *
     * @param tableName The table name without prefix
     * @returns The table name with prefix added
     */
    getCompleteTableName (tableName : string) : string;

    /**
     * Includes the column in the query in unspecified format.
     *
     * This will result to the type which the internal database system and/or
     * the client library for it uses to map it as JavaScript value.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     */
    includeColumn (tableName: string, columnName: string) : void;

    /**
     * Includes the column in the query with conversion to text made to string
     * on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     */
    includeColumnAsText (tableName: string, columnName: string) : void;

    /**
     * Includes the column in the query with conversion made to ISO timestamp
     * string on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     */
    includeColumnAsTime (tableName: string, columnName: string) : void;

    /**
     * Includes the column in the query with conversion made to ISO timestamp
     * string on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     */
    includeColumnAsDate (tableName: string, columnName: string) : void;

    /**
     * Includes the column in the query with conversion made to ISO timestamp
     * string on the database side.
     *
     * @param tableName The table name without prefix
     * @param columnName The column name
     */
    includeColumnAsTimestamp (tableName: string, columnName: string) : void;

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

    /**
     * Set the main table where this query will look entities from.
     *
     * @param tableName The table name without prefix
     */
    setFromTable (tableName: string) : void;

    /**
     * Get the table name without prefix.
     *
     * @returns The table name without prefix
     */
    getShortFromTable () : string;

    /**
     * Get the table name with prefix included.
     *
     * @returns The full table name as it's used inside the relational database
     */
    getCompleteFromTable () : string;

    /**
     * Set the query to group results by the column name.
     *
     * This is usually used with {@link SelectQueryBuilder.leftJoinTable} and
     * aggregation functions.
     *
     * @param columnName The column name
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    setGroupByColumn (columnName: string) : void;

    /**
     * Maps values from another table to the query base on common column.
     *
     * @param fromTableName
     * @param fromColumnName
     * @param sourceTableName
     * @param sourceColumnName
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) : void;

    /**
     * Maps filtering options to the query from another query builder.
     *
     * @param builder
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export type QueryStringFactory = (() => string);
export type QueryValueFactory = (() => any);
export type QueryBuildResult = readonly [ string, readonly any[] ];

/**
 * Defines an interface for a builder of relational database query.
 *
 * @see {@link ChainQueryBuilder}
 * @see {@link DeleteQueryBuilder}
 * @see {@link SelectQueryBuilder}
 * @see {@link EntitySelectQueryBuilder}
 */
export interface QueryBuilder {

    /**
     * Returns the value of the builder. This will be a string presentation of
     * what this builder would do.
     *
     * @returns Textual presentation of what the builder would do
     * @see {@link QueryBuilder.valueOf}
     * @see {@link QueryBuilder.toString}
     */
    valueOf() : string;

    /**
     * Returns a string presentation of
     * what this builder would do.
     *
     * @returns Textual presentation of what the builder would do
     * @see {@link QueryBuilder.valueOf}
     * @see {@link QueryBuilder.toString}
     */
    toString() : string;

    /**
     * Builds query string and values for SQL query.
     *
     * @returns The query string and linked values for it
     * @see {@link QueryBuilder.build}
     */
    build () : QueryBuildResult;

    /**
     * Builds the SQL query with possible value placeholders and returns it as
     * a string
     *
     * @see {@link QueryBuilder.buildQueryString}
     */
    buildQueryString () : string;

    /**
     * Builds an array of values for placeholders in the SQL query
     *
     * @see {@link QueryBuilder.buildQueryValues}
     */
    buildQueryValues () : readonly any[];

    /**
     * Returns array of factory functions which can be used to build array of
     * values for the SQL query
     *
     * @see {@link QueryBuilder.getQueryValueFactories}
     */
    getQueryValueFactories () : readonly QueryValueFactory[];

}

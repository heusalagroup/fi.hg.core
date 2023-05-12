// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * Interface which implements API to objects used in SQL query building
 */
export interface QueryBuilder {

    valueOf() : string;
    toString() : string;

    /**
     * Builds query string and values for SQL query
     */
    build () : [string, any[]];

    /**
     * Builds the SQL query with possible value placeholders and returns it as
     * a string
     */
    buildQueryString () : string;

    /**
     * Builds an array of values for placeholders in the SQL query
     */
    buildQueryValues () : any[];

    /**
     * Returns array of factory functions which can be used to build array of
     * values for the SQL query
     */
    getQueryValueFactories () : (() => any)[];

}

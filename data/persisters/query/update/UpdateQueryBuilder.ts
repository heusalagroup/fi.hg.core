// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../types/QueryBuilder";

/**
 * Defines an interface for a builder of relational database update query.
 */
export interface UpdateQueryBuilder extends QueryBuilder {


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * Get the table prefix
     *
     * @see {@link UpdateQueryBuilder.getTablePrefix}
     */
    getTablePrefix (): string;

    /**
     * Set the table prefix
     *
     * @see {@link UpdateQueryBuilder.setTablePrefix}
     */
    setTablePrefix (prefix: string) : void;

    /**
     * Get the complete table name with the prefix
     *
     * @param tableName The table name without the prefix
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * Get the table name where to insert rows, without the prefix
     */
    getTableName (): string;

    /**
     * Set the table name where to insert rows, without the prefix
     *
     * @param tableName
     */
    setTableName (tableName: string): void;

    /**
     * Get the complete table name where to insert rows including the prefix
     */
    getFullTableName (): string;


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

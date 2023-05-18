// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InsertQueryBuilder } from "./InsertQueryBuilder";
import { QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";

/**
 * Defines an interface for a builder of relational database create query.
 */
export interface EntityInsertQueryBuilder extends InsertQueryBuilder {





    ///////////////////////         InsertQueryBuilder         ///////////////////////


    /**
     * Get the table prefix
     *
     * @see {@link InsertQueryBuilder.getTablePrefix}
     */
    getTablePrefix (): string;

    /**
     * Set the table prefix
     *
     * @see {@link InsertQueryBuilder.setTablePrefix}
     */
    setTablePrefix (prefix: string) : void;

    /**
     * Get the table name where to insert rows, without the prefix
     *
     * @param tableName
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

    /**
     * Get the complete table name with the prefix
     *
     * @param tableName The table name without the prefix
     */
    getTableNameWithPrefix (tableName : string) : string;


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

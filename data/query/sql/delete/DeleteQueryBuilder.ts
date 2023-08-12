// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { QueryWhereable } from "../../types/QueryWhereable";
import { TablePrefixable } from "../../types/TablePrefixable";

export interface DeleteQueryBuilder extends QueryWhereable, TablePrefixable, QueryBuilder {




    ///////////////////////         QueryWhereable         ///////////////////////

    buildWhereQueryString () : string;

    getWhereValueFactories () : readonly QueryValueFactory[];

    setWhereFromQueryBuilder (builder: QueryBuilder): void;

    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     */
    setTablePrefix (prefix: string) : void;

    /**
     * @inheritDoc
     */
    getTablePrefix (): string;

    /**
     * @inheritDoc
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * @inheritDoc
     */
    setTableName (tableName: string): void;

    /**
     * @inheritDoc
     */
    getTableName (): string;

    /**
     * Get the complete table name where to insert rows including the prefix
     */
    getCompleteTableName (): string;


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

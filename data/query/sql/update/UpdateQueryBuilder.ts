// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { QueryWhereable } from "../../types/QueryWhereable";
import { TablePrefixable } from "../../types/TablePrefixable";

/**
 * Defines an interface for a builder of relational database update query.
 */
export interface UpdateQueryBuilder extends QueryBuilder, QueryWhereable, TablePrefixable {

    /**
     * Append factories for prefix part of the update query.
     *
     * This configures the start of the query, which usually includes
     * `UPDATE ?` with a table name.
     *
     * @param queryFactory
     * @param valueFactories
     */
    addPrefixFactory (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;

    /**
     * Append factories for the assignment list part of the update query.
     *
     * This is the part of `SET ??=?, ??=?` without the SET keyword.
     *
     * @param queryFactory
     * @param valueFactories
     */
    addSetFactory (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;

    /**
     * Append factories for the assignment list from another builder.
     *
     * @param builder
     * @see {@link ListQueryBuilder}
     */
    appendSetListUsingQueryBuilder (builder: QueryBuilder) : void;


    ///////////////////////         QueryWhereable         ///////////////////////


    /**
     * @inheritDoc
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;



    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     */
    getTablePrefix (): string;

    /**
     * @inheritDoc
     */
    setTablePrefix (prefix: string) : void;

    /**
     * @inheritDoc
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * @inheritDoc
     */
    getTableName (): string;

    /**
     * @inheritDoc
     */
    setTableName (tableName: string): void;

    /**
     * @inheritDoc
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

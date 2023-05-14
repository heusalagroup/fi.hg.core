// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryValueFactory } from "./QueryBuilder";

export interface QueryLeftJoinable {


    /**
     * Builds the result query string
     */
    buildLeftJoinQueryString () : string;

    /**
     * Builds the result value factory array
     */
    getLeftJoinValueFactories () : readonly QueryValueFactory[];

    /**
     * Append expression to column section using factory functions to the expression list.
     *
     * @param queryFactory
     * @param valueFactories
     */
    appendLeftJoinExpression (
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
    appendLeftJoinExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;


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


}

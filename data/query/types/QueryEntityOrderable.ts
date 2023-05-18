// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryStringFactory } from "./QueryBuilder";
import { Sort } from "../../Sort";
import { EntityField } from "../../types/EntityField";
import { QueryOrderable } from "./QueryOrderable";

export interface QueryEntityOrderable extends QueryOrderable {

    /**
     *
     * @param sort
     * @param tableName
     * @param fields
     */
    setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ) : void;


    ////////////////////         QueryOrderable         /////////////////////


    /**
     * Builds the result query string
     */
    buildOrderQueryString () : string;

    /**
     * Builds the result value factory array
     */
    getOrderValueFactories () : readonly QueryStringFactory[];

    /**
     * Append expression to ORDER BY section using factory functions to the expression list.
     *
     * @param queryFactory
     * @param valueFactories
     */
    appendOrderExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryStringFactory[]
    ) : void;

    /**
     * Append factories for the ORDER BY section from another builder.
     *
     * @param builder
     * @param valueFactories
     * @see {@link ListQueryBuilder}
     */
    appendOrderExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryStringFactory[]
    ) : void;


}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { TablePrefixable } from "../../types/TablePrefixable";
import { QueryWhereable } from "../../types/QueryWhereable";
import { QueryGroupable } from "../../types/QueryGroupable";
import { QueryLeftJoinable } from "../../types/QueryLeftJoinable";
import { QueryResultable } from "../../types/QueryResultable";
import { QueryOrderable } from "../../types/QueryOrderable";

/**
 * Defines an interface for a builder of relational database read query.
 */
export interface SelectQueryBuilder
    extends
        QueryBuilder,
        TablePrefixable,
        QueryWhereable,
        QueryGroupable,
        QueryLeftJoinable,
        QueryResultable,
        QueryOrderable
{



    ////////////////////         QueryResultable         /////////////////////


    /**
     * @inheritDoc
     */
    appendResultExpression (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;

    /**
     * @inheritDoc
     */
    appendResultExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void;

    /**
     * @inheritDoc
     */
    includeColumn (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     */
    includeColumnAsText (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     */
    includeColumnAsTime (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     */
    includeColumnAsDate (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     */
    includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     */
    includeAllColumnsFromTable (tableName: string) : void;

    /**
     * @inheritDoc
     */
    includeColumnFromQueryBuilder (builder: QueryBuilder, asColumnName: string) : void;

    /**
     * @inheritDoc
     */
    includeFormulaByString (formula: string, asColumnName: string): void;


    ////////////////////         QueryLeftJoinable         /////////////////////


    /**
     * @inheritDoc
     */
    leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) : void;


    /////////////////////         QueryOrderable         ///////////////////////


    buildOrderQueryString () : string;

    getOrderValueFactories () : readonly QueryStringFactory[];

    appendOrderExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryStringFactory[]
    ) : void;

    appendOrderExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryStringFactory[]
    ) : void;


    /////////////////////         QueryGroupable         ///////////////////////


    /**
     * @inheritDoc
     */
    setGroupByColumn (columnName: string) : void;


    ///////////////////////         QueryWhereable         ///////////////////////


    /**
     * @inheritDoc
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;



    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     */
    setTablePrefix (prefix: string) : void;

    /**
     * @inheritDoc
     */
    getTablePrefix () : string;

    /**
     * @inheritDoc
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * @inheritDoc
     */
    setTableName (tableName: string) : void;

    /**
     * @inheritDoc
     */
    getTableName () : string;

    /**
     * @inheritDoc
     */
    getCompleteTableName () : string;


    ///////////////////////         QueryBuilder         ///////////////////////


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

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SelectQueryBuilder } from "./SelectQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { forEach } from "../../../../functions/forEach";
import { map } from "../../../../functions/map";
import { PgQueryUtils } from "../../pg/utils/PgQueryUtils";

/**
 * Base class for SQL select queries.
 */
export abstract class BaseSelectQueryBuilder implements SelectQueryBuilder {

    private readonly _resultSeparator : string;
    private readonly _fieldQueries : QueryStringFactory[];
    private readonly _fieldValues : QueryValueFactory[];

    private readonly _leftJoinSeparator : string;
    private readonly _leftJoinQueries : QueryStringFactory[];
    private readonly _leftJoinValues : QueryValueFactory[];

    private readonly _orderSeparator : string;
    private readonly _orderByQueries : QueryStringFactory[];
    private readonly _orderByValues : QueryValueFactory[];

    private _groupByColumnName : string | undefined;
    private _mainTableName : string | undefined;
    private _tablePrefix : string = '';
    private _where : QueryBuilder | undefined;

    /**
     * Constructs the internal data values for SELECT queries.
     *
     * @protected
     */
    protected constructor (
        resultSeparator: string,
        leftJoinSeparator: string,
        orderSeparator: string,
    ) {
        this._resultSeparator = resultSeparator;
        this._leftJoinSeparator = leftJoinSeparator;
        this._orderSeparator = orderSeparator;
        this._groupByColumnName = undefined;
        this._mainTableName = undefined;
        this._where = undefined;
        this._tablePrefix = '';
        this._fieldQueries = [];
        this._fieldValues = [];
        this._leftJoinQueries = [];
        this._leftJoinValues = [];
        this._orderByQueries = [];
        this._orderByValues = [];
    }


    ///////////////////////         SelectQueryBuilder         ///////////////////////



    ////////////////////         QueryResultable         /////////////////////


    /**
     * @inheritDoc
     */
    buildResultQueryString () : string {
        return map(this._fieldQueries, (f) => f()).join(this._resultSeparator);
    }

    /**
     * @inheritDoc
     */
    getResultValueFactories () : readonly QueryValueFactory[] {
        return map(this._fieldValues, (f) => f);
    }

    /**
     * @inheritDoc
     */
    public appendResultExpression (
        queryFactory  : QueryStringFactory,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._fieldQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._fieldValues.push(factory);
            }
        );
    }

    /**
     * @inheritDoc
     */
    appendResultExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this.appendResultExpression(
            () => builder.buildQueryString(),
            ...builder.getQueryValueFactories(),
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    abstract includeColumn (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    abstract includeColumnAsText (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    abstract includeColumnAsTime (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    abstract includeColumnAsDate (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    abstract includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     */
    abstract includeAllColumnsFromTable (tableName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     */
    abstract includeColumnFromQueryBuilder (builder: QueryBuilder, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeFormulaByString}
     */
    abstract includeFormulaByString (formula: string, asColumnName: string): void;


    ////////////////////         QueryOrderable         /////////////////////


    /**
     * @inheritDoc
     */
    buildOrderQueryString () : string {
        return map(this._orderByQueries, (f) => f()).join(this._orderSeparator);
    }

    /**
     * @inheritDoc
     */
    getOrderValueFactories () : readonly QueryValueFactory[] {
        return map(this._orderByValues, (f) => f);
    }

    /**
     * @inheritDoc
     */
    public appendOrderExpression (
        queryFactory  : QueryStringFactory,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._orderByQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._orderByValues.push(factory);
            }
        );
    }

    /**
     * Append factories for the assignment list from another builder.
     *
     * @param builder
     * @param valueFactories
     * @see {@link ListQueryBuilder}
     */
    appendOrderExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this.appendOrderExpression(
            () => builder.buildQueryString(),
            ...builder.getQueryValueFactories(),
            ...valueFactories
        );
    }


    ////////////////////         QueryGroupable         /////////////////////


    /**
     * Builds the group by query string
     */
    public buildGroupByQueryString () : string {
        if ( this._groupByColumnName ) {
            if (!this._mainTableName) throw new TypeError(`No table initialized`);
            return `${PgQueryUtils.quoteTableAndColumn(this.getTableNameWithPrefix(this._mainTableName), this._groupByColumnName)}`;
        }
        return '';
    }

    /**
     * Builds the group by value factory array
     */
    public getGroupByValueFactories () : readonly QueryStringFactory[] {
        return [];
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setGroupByColumn}
     */
    public setGroupByColumn (columnName: string) {
        this._groupByColumnName = columnName;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getGroupByColumn}
     */
    public getGroupByColumn (): string | undefined {
        if (!this._groupByColumnName) return undefined;
        return this._groupByColumnName;
    }


    ////////////////////         QueryLeftJoinable         /////////////////////


    /**
     * Builds the result query string
     */
    buildLeftJoinQueryString () : string {
        return map(this._leftJoinQueries, (f) => f()).join(this._leftJoinSeparator);
    }

    /**
     * Builds the result value factory array
     */
    getLeftJoinValueFactories () : readonly QueryValueFactory[] {
        return map(this._leftJoinValues, (f) => f);
    }

    /**
     * Append expression to column section using factory functions to the expression list.
     *
     * @param queryFactory
     * @param valueFactories
     */
    public appendLeftJoinExpression (
        queryFactory  : QueryStringFactory,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._leftJoinQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._leftJoinValues.push(factory);
            }
        );
    }

    /**
     * Append factories for the assignment list from another builder.
     *
     * @param builder
     * @param valueFactories
     * @see {@link ListQueryBuilder}
     */
    public appendLeftJoinExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this.appendLeftJoinExpression(
            () => builder.buildQueryString(),
            ...builder.getQueryValueFactories(),
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    abstract leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) : void;


    ///////////////////////         QueryWhereable         ///////////////////////


    /**
     * Builds the result query string
     */
    public buildWhereQueryString () : string {
        if (!this._where) return '';
        return this._where.buildQueryString();
    }

    /**
     * Builds the result value factory array
     */
    public getWhereValueFactories () : readonly QueryValueFactory[] {
        if (!this._where) return [];
        return this._where.getQueryValueFactories();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
    }


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) {
        this._tablePrefix = prefix;
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteTableName}
     */
    public getTableNameWithPrefix (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getShortFromTable}
     */
    public getTableName (): string {
        if (!this._mainTableName) throw new TypeError(`From table has not been initialized yet`);
        return this._mainTableName;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string) {
        this._mainTableName = tableName;
    }

    /**
     * @inheritDoc
     * @see {@link TablePrefixable.getCompleteTableName}
     * @see {@link SelectQueryBuilder.getCompleteTableName}
     */
    public getCompleteTableName (): string {
        if (!this._mainTableName) throw new TypeError(`From table has not been initialized yet`);
        return this.getTableNameWithPrefix(this._mainTableName);
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     */
    abstract valueOf() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.toString}
     */
    abstract toString() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.build}
     */
    abstract build () : QueryBuildResult;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     */
    abstract buildQueryString () : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return map(this.getQueryValueFactories(), (f) => f());
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     */
    abstract getQueryValueFactories () : readonly QueryValueFactory[];


}

export function isBaseSelectQueryBuilder (value: unknown): value is BaseSelectQueryBuilder {
    return value instanceof BaseSelectQueryBuilder;
}

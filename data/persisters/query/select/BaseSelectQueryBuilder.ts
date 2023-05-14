// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SelectQueryBuilder } from "./SelectQueryBuilder";
import { QueryBuilder } from "../types/QueryBuilder";

/**
 * Base class for SQL select queries.
 */
export abstract class BaseSelectQueryBuilder implements SelectQueryBuilder {

    protected readonly _fieldQueries : (() => string)[];
    protected readonly _fieldValues : (() => any)[];
    protected readonly _leftJoinQueries : (() => string)[];
    protected readonly _leftJoinValues : (() => any)[];
    protected readonly _orderByQueries : (() => string)[];
    protected readonly _orderByValues : (() => any)[];
    protected _groupByColumnName : string | undefined;
    protected _mainTableName : string | undefined;
    protected _tablePrefix : string = '';
    protected _where : QueryBuilder | undefined;

    /**
     * Constructs the internal data values for SELECT queries.
     *
     * @protected
     */
    protected constructor () {
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

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
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



    ///////////////////////         SelectQueryBuilder         ///////////////////////




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
    abstract build () : [string, any[]];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     */
    abstract buildQueryString () : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     */
    abstract buildQueryValues () : any[];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     */
    abstract getQueryValueFactories () : (() => any)[];


}

export function isBaseSelectQueryBuilder (value: unknown): value is BaseSelectQueryBuilder {
    return value instanceof BaseSelectQueryBuilder;
}

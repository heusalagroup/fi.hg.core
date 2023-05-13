// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SelectQueryBuilder } from "./SelectQueryBuilder";
import { QueryBuilder } from "./QueryBuilder";

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
    protected _mainIdColumnName : string | undefined;
    protected _mainTableName : string | undefined;
    protected _tablePrefix : string = '';
    protected _where : QueryBuilder | undefined;

    /**
     * Constructs the internal data values for SELECT queries.
     *
     * @protected
     */
    protected constructor () {
        this._mainIdColumnName = undefined;
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


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setTablePrefix}
     */
    abstract setTablePrefix (prefix: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getTablePrefix}
     */
    abstract getTablePrefix () : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteTableName}
     */
    abstract getCompleteTableName (tableName : string) : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    abstract includeColumn (tableName: string, columnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    abstract includeColumnAsText (tableName: string, columnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    abstract includeColumnAsTime (tableName: string, columnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    abstract includeColumnAsDate (tableName: string, columnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    abstract includeColumnAsTimestamp (tableName: string, columnName: string) : void;

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
     * @see {@link SelectQueryBuilder.setFromTable}
     */
    abstract setFromTable (tableName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getShortFromTable}
     */
    abstract getShortFromTable () : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteFromTable}
     */
    abstract getCompleteFromTable () : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setGroupByColumn}
     */
    abstract setGroupByColumn (columnName: string) : void;

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

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     */
    abstract setWhereFromQueryBuilder (builder: QueryBuilder): void;

}

export function isBaseSelectQueryBuilder (value: unknown): value is BaseSelectQueryBuilder {
    return value instanceof BaseSelectQueryBuilder;
}

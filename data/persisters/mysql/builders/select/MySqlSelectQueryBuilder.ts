// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../types/QueryBuilder";
import { SelectQueryBuilder } from "../../../types/SelectQueryBuilder";
import { forEach } from "../../../../../functions/forEach";
import { map } from "../../../../../functions/map";
import { Sort } from "../../../../Sort";
import { EntityField } from "../../../../types/EntityField";
import { EntityUtils } from "../../../../utils/EntityUtils";
import { SortDirection } from "../../../../types/SortDirection";
import {
    PH_AS, PH_FROM_TABLE, PH_GROUP_BY_TABLE_COLUMN, PH_LEFT_JOIN,
    PH_TABLE_ALL_COLUMNS,
    PH_TABLE_COLUMN,
    PH_TABLE_COLUMN_AS_DATE_AS,
    PH_TABLE_COLUMN_AS_TEXT_AS,
    PH_TABLE_COLUMN_AS_TIME_AS,
    PH_TABLE_COLUMN_AS_TIMESTAMP_AS, PH_TABLE_COLUMN_WITH_SORT_ORDER
} from "../../constants/queries";

export class MySqlSelectQueryBuilder implements SelectQueryBuilder {

    private _mainIdColumnName : string | undefined;
    private _mainTableName : string | undefined;
    private _tablePrefix : string = '';
    private readonly _fieldQueries : (() => string)[];
    private readonly _fieldValues : (() => any)[];
    private readonly _leftJoinQueries : (() => string)[];
    private readonly _leftJoinValues : (() => any)[];
    private _where : QueryBuilder | undefined;
    private readonly _orderByQueries : (() => string)[];
    private readonly _orderByValues : (() => any)[];

    public constructor () {
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

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `"${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public setTablePrefix (prefix: string) {
        this._tablePrefix = prefix;
    }

    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    public getCompleteTableName (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }

    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
    }

    public includeColumn (
        tableName: string,
        columnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN);
        this._fieldValues.push(() => this.getCompleteTableName(tableName));
        this._fieldValues.push(() => columnName);
    }

    public includeColumnAsText (
        tableName: string,
        columnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_TEXT_AS);
        this._fieldValues.push(() => this.getCompleteTableName(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    public includeColumnAsTime (
        tableName: string,
        columnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_TIME_AS);
        this._fieldValues.push(() => this.getCompleteTableName(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    public includeColumnAsDate (
        tableName: string,
        columnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_DATE_AS);
        this._fieldValues.push(() => this.getCompleteTableName(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    public includeColumnAsTimestamp (
        tableName: string,
        columnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_TIMESTAMP_AS);
        this._fieldValues.push(() => this.getCompleteTableName(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    public includeAllColumnsFromTable (tableName: string) : void {
        this._fieldQueries.push(() => PH_TABLE_ALL_COLUMNS);
        this._fieldValues.push(() => this.getCompleteTableName(tableName));
    }

    public includeColumnFromQueryBuilder (
        builder: QueryBuilder,
        asColumnName: string
    ) : void {
        this._fieldQueries.push(() => {
            const query = builder.buildQueryString();
            if (!query) throw new TypeError(`Query builder failed to create query string`);
            return PH_AS(query);
        });
        forEach(
            builder.getQueryValueFactories(),
            (item) => {
                this._fieldValues.push(item);
            }
        );
        this._fieldValues.push(() => asColumnName);
    }

    public includeFormulaByString (
        formula: string,
        asColumnName: string
    ): void {
        if (!formula) {
            throw new TypeError(`includeFormulaByString: formula is required`);
        }
        if (!asColumnName) {
            throw new TypeError(`includeFormulaByString: column name is required`);
        }
        this._fieldQueries.push(() => PH_AS(formula));
        this._fieldValues.push(() => asColumnName);
    }

    public setFromTable (tableName: string) {
        this._mainTableName = tableName;
    }

    public getCompleteFromTable (): string {
        if (!this._mainTableName) throw new TypeError(`From table has not been initialized yet`);
        return this.getCompleteTableName(this._mainTableName);
    }

    public getShortFromTable (): string {
        if (!this._mainTableName) throw new TypeError(`From table has not been initialized yet`);
        return this._mainTableName;
    }

    public setGroupByColumn (columnName: string) {
        this._mainIdColumnName = columnName;
    }

    public setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ) {
        forEach(
            sort.getSortOrders(),
            (item) => {
                this._orderByQueries.push( () => PH_TABLE_COLUMN_WITH_SORT_ORDER(item.getDirection()) );
                this._orderByValues.push( () => this.getCompleteTableName(tableName) );
                this._orderByValues.push( () => EntityUtils.getColumnName(item.getProperty(), fields) );
            }
        );
    }

    public getGroupByColumn (): string {
        if (!this._mainIdColumnName) throw new TypeError(`Group by has not been initialized yet`);
        return this._mainIdColumnName;
    }

    public leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) {
        this._leftJoinQueries.push(() => PH_LEFT_JOIN);
        this._leftJoinValues.push( () => this.getCompleteTableName(fromTableName));
        this._leftJoinValues.push( () => this.getCompleteTableName(sourceTableName));
        this._leftJoinValues.push( () => sourceColumnName);
        this._leftJoinValues.push( () => this.getCompleteTableName(fromTableName));
        this._leftJoinValues.push( () => fromColumnName);
    }

    public build () : [string, any[]] {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        const fieldQueries = map(this._fieldQueries, (f) => f());
        const leftJoinQueries = map(this._leftJoinQueries, (f) => f());
        const orderBys = map(this._orderByQueries, (f) => f());
        let query = `SELECT ${fieldQueries.join(', ')}`;
        if (this._mainTableName) {
            query += ` ${PH_FROM_TABLE}`;
        }
        if (leftJoinQueries.length) {
            query += ` ${leftJoinQueries.join(' ')}`;
        }
        if (this._where) {
            query += ` WHERE ${this._where.buildQueryString()}`;
        }
        if ( this._mainIdColumnName ) {
            query += ` ${PH_GROUP_BY_TABLE_COLUMN}`;
        }
        if ( orderBys.length ) {
            query += ` ORDER BY ${ orderBys.join(', ') }`;
        }
        return query;
    }

    public buildQueryValues () : any[] {
        const fieldValues = map(this._fieldValues, (f) => f());
        const leftJoinValues = map(this._leftJoinValues, (f) => f());
        const orderByValues = map(this._orderByValues, (f) => f());
        return [
            ...fieldValues,
            ...( this._mainTableName ? [this.getCompleteTableName(this._mainTableName)] : []),
            ...leftJoinValues,
            ...( this._where ? this._where.buildQueryValues() : []),
            ...( this._mainTableName ? [
                this.getCompleteTableName(this._mainTableName),
                this._mainIdColumnName
            ] : []),
            ...orderByValues
        ];
    }

    public getQueryValueFactories (): (() => any)[] {
        return [
            ...this._fieldValues,
            ...( this._mainTableName ? [() => this._mainTableName ? this.getCompleteTableName(this._mainTableName) : this._mainTableName] : []),
            ...this._leftJoinValues,
            ...( this._where ? this._where.getQueryValueFactories() : []),
            ...( this._mainTableName && this._mainIdColumnName ? [
                () => this._mainTableName ? this.getCompleteTableName(this._mainTableName) : this._mainTableName,
                () => this._mainIdColumnName
            ] : []),
            ...this._orderByValues
        ]
    }

}

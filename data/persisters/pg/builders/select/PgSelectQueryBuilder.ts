// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../types/QueryBuilder";
import { SelectQueryBuilder } from "../../../types/SelectQueryBuilder";
import { forEach } from "../../../../../functions/forEach";
import { PgQueryUtils } from "../../utils/PgQueryUtils";
import { map } from "../../../../../functions/map";
import { Sort } from "../../../../Sort";
import { SortOrder } from "../../../../types/SortOrder";
import { EntityUtils } from "../../../../utils/EntityUtils";
import { EntityField } from "../../../../types/EntityField";
import { SortDirection } from "../../../../types/SortDirection";

export class PgSelectQueryBuilder implements SelectQueryBuilder {

    private _mainIdColumnName : string | undefined;
    private _mainTableName : string | undefined;
    private _tablePrefix : string = '';
    private readonly _fieldQueries : (() => string)[];
    private readonly _fieldValues : (() => any)[];
    private readonly _leftJoinQueries : (() => string)[];
    private readonly _leftJoinValues : (() => any)[];
    private _where : QueryBuilder | undefined;
    private _orderBy : (() => string)[];

    public constructor () {
        this._mainIdColumnName = undefined;
        this._mainTableName = undefined;
        this._where = undefined;
        this._tablePrefix = '';
        this._fieldQueries = [];
        this._fieldValues = [];
        this._leftJoinQueries = [];
        this._leftJoinValues = [];
        this._orderBy = [];
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgSelectQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
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
        const orders = sort.getSortOrders();
        this._orderBy = orders?.length ? [
            () => map(
                orders,
                (item: SortOrder) => `${
                    PgQueryUtils.quoteTableAndColumn(
                        this.getCompleteTableName(tableName),
                        EntityUtils.getColumnName(item.getProperty(), fields)
                    )
                }${item.getDirection() === SortDirection.ASC ? ' ASC' : ' DESC'}`
            ).join(', ')] : [];
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
        this._leftJoinQueries.push(() => `LEFT JOIN ${PgQueryUtils.quoteTableName(this.getCompleteTableName(fromTableName))} ON ${PgQueryUtils.quoteTableAndColumn(this.getCompleteTableName(sourceTableName), sourceColumnName)} = ${PgQueryUtils.quoteTableAndColumn(this.getCompleteTableName(fromTableName), fromColumnName)}`);
    }

    public build () : [string, any[]] {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        const fieldQueries = map(this._fieldQueries, (f) => f());
        const leftJoinQueries = map(this._leftJoinQueries, (f) => f());
        const orderBys = map(this._orderBy, (f) => f());
        let query = `SELECT ${fieldQueries.join(', ')}`;
        if (this._mainTableName) {
            query += ` FROM ${PgQueryUtils.quoteTableName(this.getCompleteTableName(this._mainTableName))}`;
        }
        if (leftJoinQueries.length) {
            query += ` ${leftJoinQueries.join(' ')}`;
        }
        if (this._where) {
            query += ` WHERE ${this._where.buildQueryString()}`;
        }
        if ( this._mainIdColumnName ) {
            if (!this._mainTableName) throw new TypeError(`No table initialized`);
            query += ` GROUP BY ${PgQueryUtils.quoteTableAndColumn(this.getCompleteTableName(this._mainTableName), this._mainIdColumnName)}`;
        }
        if ( orderBys.length ) {
            query += ` ORDER BY ${ orderBys.join(', ') }`;
        }
        return query;
    }

    public buildQueryValues () : any[] {
        const fieldValues = map(this._fieldValues, (f) => f());
        const leftJoinValues = map(this._leftJoinValues, (f) => f());
        return [
            ...fieldValues,
            ...leftJoinValues,
            ...( this._where ? this._where.buildQueryValues() : [])
        ];
    }

    public getQueryValueFactories (): (() => any)[] {
        return [
            ...this._fieldValues,
            ...this._leftJoinValues,
            ...( this._where ? this._where.getQueryValueFactories() : [])
        ]
    }


    public includeAllColumnsFromTable (tableName: string) {
        this._fieldQueries.push(() => `${PgQueryUtils.quoteTableName(this.getCompleteTableName(tableName))}.*`);
    }

    public includeColumnFromQueryBuilder (
        builder: QueryBuilder,
        asColumnName: string
    ) {
        this._fieldQueries.push(() => {
            const query = builder.buildQueryString();
            if (!query) throw new TypeError(`Query builder failed to create query string`);
            return `${query} AS ${PgQueryUtils.quoteColumnName(asColumnName)}`;
        });
        forEach(
            builder.getQueryValueFactories(),
            (item) => {
                this._fieldValues.push(item);
            }
        );
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
        this._fieldQueries.push(() => `${formula} AS ${PgQueryUtils.quoteColumnName(asColumnName)}`);
    }

    public includeColumn (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumn(tableName, columnName));
    }

    public includeColumnAsText (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsText(tableName, columnName));
    }

    public includeColumnAsDate (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName));
    }

    public includeColumnAsTime (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName));
    }

    public includeColumnAsTimestamp (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName));
    }

}

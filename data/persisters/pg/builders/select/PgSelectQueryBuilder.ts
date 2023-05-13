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
import { BaseSelectQueryBuilder } from "../../../types/BaseSelectQueryBuilder";

export class PgSelectQueryBuilder extends BaseSelectQueryBuilder implements SelectQueryBuilder {

    public static create () : PgSelectQueryBuilder {
        return new PgSelectQueryBuilder();
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     * @see {@link SelectQueryBuilder.valueOf}
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.toString}
     * @see {@link SelectQueryBuilder.toString}
     */
    public toString () : string {
        return `PgSelectQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setTablePrefix}
     * @see {@link EntitySelectQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) {
        this._tablePrefix = prefix;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getTablePrefix}
     * @see {@link EntitySelectQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteTableName}
     * @see {@link EntitySelectQueryBuilder.getCompleteTableName}
     */
    public getCompleteTableName (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     * @see {@link EntitySelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setFromTable}
     * @see {@link EntitySelectQueryBuilder.setFromTable}
     */
    public setFromTable (tableName: string) {
        this._mainTableName = tableName;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteFromTable}
     * @see {@link EntitySelectQueryBuilder.getCompleteFromTable}
     */
    public getCompleteFromTable (): string {
        if (!this._mainTableName) throw new TypeError(`From table has not been initialized yet`);
        return this.getCompleteTableName(this._mainTableName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getShortFromTable}
     * @see {@link EntitySelectQueryBuilder.getShortFromTable}
     */
    public getShortFromTable (): string {
        if (!this._mainTableName) throw new TypeError(`From table has not been initialized yet`);
        return this._mainTableName;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setGroupByColumn}
     * @see {@link EntitySelectQueryBuilder.setGroupByColumn}
     */
    public setGroupByColumn (columnName: string) {
        this._mainIdColumnName = columnName;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setOrderByTableFields}
     * @see {@link EntitySelectQueryBuilder.setOrderByTableFields}
     */
    public setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ) {
        const orders = sort.getSortOrders();
        if (orders?.length) {
            this._orderByQueries.push(
                () => map(
                    orders,
                    (item: SortOrder) => `${
                        PgQueryUtils.quoteTableAndColumn(
                            this.getCompleteTableName(tableName),
                            EntityUtils.getColumnName(item.getProperty(), fields)
                        )
                    }${item.getDirection() === SortDirection.ASC ? ' ASC' : ' DESC'}`
                ).join(', ')
            );
        }
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getGroupByColumn}
     * @see {@link EntitySelectQueryBuilder.getGroupByColumn}
     */
    public getGroupByColumn (): string {
        if (!this._mainIdColumnName) throw new TypeError(`Group by has not been initialized yet`);
        return this._mainIdColumnName;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     * @see {@link EntitySelectQueryBuilder.leftJoinTable}
     */
    public leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) {
        this._leftJoinQueries.push(() => `LEFT JOIN ${PgQueryUtils.quoteTableName(this.getCompleteTableName(fromTableName))} ON ${PgQueryUtils.quoteTableAndColumn(this.getCompleteTableName(sourceTableName), sourceColumnName)} = ${PgQueryUtils.quoteTableAndColumn(this.getCompleteTableName(fromTableName), fromColumnName)}`);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.build}
     * @see {@link EntitySelectQueryBuilder.build}
     */
    public build () : [string, any[]] {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     * @see {@link SelectQueryBuilder.buildQueryString}
     * @see {@link EntitySelectQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {
        const fieldQueries = map(this._fieldQueries, (f) => f());
        const leftJoinQueries = map(this._leftJoinQueries, (f) => f());
        const orderBys = map(this._orderByQueries, (f) => f());
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

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     * @see {@link SelectQueryBuilder.buildQueryValues}
     * @see {@link EntitySelectQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : any[] {
        const fieldValues = map(this._fieldValues, (f) => f());
        const leftJoinValues = map(this._leftJoinValues, (f) => f());
        return [
            ...fieldValues,
            ...leftJoinValues,
            ...( this._where ? this._where.buildQueryValues() : [])
        ];
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     * @see {@link EntitySelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): (() => any)[] {
        return [
            ...this._fieldValues,
            ...this._leftJoinValues,
            ...( this._where ? this._where.getQueryValueFactories() : [])
        ]
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     * @see {@link EntitySelectQueryBuilder.includeAllColumnsFromTable}
     */
    public includeAllColumnsFromTable (tableName: string) {
        this._fieldQueries.push(() => `${PgQueryUtils.quoteTableName(this.getCompleteTableName(tableName))}.*`);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     * @see {@link EntitySelectQueryBuilder.includeColumnFromQueryBuilder}
     */
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

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeFormulaByString}
     * @see {@link EntitySelectQueryBuilder.includeFormulaByString}
     */
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

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     * @see {@link EntitySelectQueryBuilder.includeColumn}
     */
    public includeColumn (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumn(tableName, columnName));
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     * @see {@link EntitySelectQueryBuilder.includeColumnAsText}
     */
    public includeColumnAsText (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsText(tableName, columnName));
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     * @see {@link EntitySelectQueryBuilder.includeColumnAsDate}
     */
    public includeColumnAsDate (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName));
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     * @see {@link EntitySelectQueryBuilder.includeColumnAsTime}
     */
    public includeColumnAsTime (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName));
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     * @see {@link EntitySelectQueryBuilder.includeColumnAsTimestamp}
     */
    public includeColumnAsTimestamp (tableName: string, columnName: string): void {
        this._fieldQueries.push(() => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName));
    }

}

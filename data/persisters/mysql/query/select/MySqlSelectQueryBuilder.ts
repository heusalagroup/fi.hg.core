// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../query/types/QueryBuilder";
import { SelectQueryBuilder } from "../../../query/select/SelectQueryBuilder";
import { forEach } from "../../../../../functions/forEach";
import { map } from "../../../../../functions/map";
import { Sort } from "../../../../Sort";
import { EntityField } from "../../../../types/EntityField";
import { EntityUtils } from "../../../../utils/EntityUtils";
import {
    PH_AS, PH_FROM_TABLE,
    PH_GROUP_BY_TABLE_COLUMN,
    PH_LEFT_JOIN,
    PH_TABLE_ALL_COLUMNS,
    PH_TABLE_COLUMN,
    PH_TABLE_COLUMN_AS_DATE_AS,
    PH_TABLE_COLUMN_AS_TEXT_AS,
    PH_TABLE_COLUMN_AS_TIME_AS,
    PH_TABLE_COLUMN_AS_TIMESTAMP_AS,
    PH_TABLE_COLUMN_WITH_SORT_ORDER
} from "../../constants/queries";
import { BaseSelectQueryBuilder } from "../../../query/select/BaseSelectQueryBuilder";

export class MySqlSelectQueryBuilder extends BaseSelectQueryBuilder implements SelectQueryBuilder {

    public static create () : MySqlSelectQueryBuilder {
        return new MySqlSelectQueryBuilder();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    public includeColumn (
        tableName: string,
        columnName: string,
        asColumnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN);
        this._fieldValues.push(() => this.getTableNameWithPrefix(tableName));
        this._fieldValues.push(() => columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    public includeColumnAsText (
        tableName: string,
        columnName: string,
        asColumnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_TEXT_AS);
        this._fieldValues.push(() => this.getTableNameWithPrefix(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    public includeColumnAsTime (
        tableName: string,
        columnName: string,
        asColumnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_TIME_AS);
        this._fieldValues.push(() => this.getTableNameWithPrefix(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    public includeColumnAsDate (
        tableName: string,
        columnName: string,
        asColumnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_DATE_AS);
        this._fieldValues.push(() => this.getTableNameWithPrefix(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    public includeColumnAsTimestamp (
        tableName: string,
        columnName: string,
        asColumnName: string
    ) : void {
        this._fieldQueries.push(() => PH_TABLE_COLUMN_AS_TIMESTAMP_AS);
        this._fieldValues.push(() => this.getTableNameWithPrefix(tableName));
        this._fieldValues.push(() => columnName);
        this._fieldValues.push(() => columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     */
    public includeAllColumnsFromTable (tableName: string) : void {
        this._fieldQueries.push(() => PH_TABLE_ALL_COLUMNS);
        this._fieldValues.push(() => this.getTableNameWithPrefix(tableName));
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     */
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

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeFormulaByString}
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
        this._fieldQueries.push(() => PH_AS(formula));
        this._fieldValues.push(() => asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setGroupByColumn}
     */
    public setGroupByColumn (columnName: string) {
        super.setGroupByColumn(columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getGroupByColumn}
     */
    public getGroupByColumn (): string | undefined {
        return super.getGroupByColumn();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setOrderByTableFields}
     */
    public setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ) {
        forEach(
            sort.getSortOrders(),
            (item) => {
                this._orderByQueries.push( () => PH_TABLE_COLUMN_WITH_SORT_ORDER(item.getDirection()) );
                this._orderByValues.push( () => this.getTableNameWithPrefix(tableName) );
                this._orderByValues.push( () => EntityUtils.getColumnName(item.getProperty(), fields) );
            }
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    public leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) {
        this._leftJoinQueries.push(() => PH_LEFT_JOIN);
        this._leftJoinValues.push( () => this.getTableNameWithPrefix(fromTableName));
        this._leftJoinValues.push( () => this.getTableNameWithPrefix(sourceTableName));
        this._leftJoinValues.push( () => sourceColumnName);
        this._leftJoinValues.push( () => this.getTableNameWithPrefix(fromTableName));
        this._leftJoinValues.push( () => fromColumnName);
    }



    ///////////////////////         TablePrefixable         ///////////////////////



    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setTablePrefix}
     * @see {@link EntitySelectQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) {
        super.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getTablePrefix}
     * @see {@link EntitySelectQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return super.getTablePrefix();
    }


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string) {
        super.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteFromTable}
     */
    public getCompleteTableName (): string {
        return super.getCompleteTableName();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getShortFromTable}
     */
    public getTableName (): string {
        return super.getTableName();
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.valueOf}
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.toString}
     */
    public toString () : string {
        return `"${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.build}
     */
    public build () : [string, any[]] {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {
        const fromTableName = this.getTableName();
        const groupByColumn = this.getGroupByColumn();
        const fieldQueries = map(this._fieldQueries, (f) => f());
        const leftJoinQueries = map(this._leftJoinQueries, (f) => f());
        const orderBys = map(this._orderByQueries, (f) => f());
        let query = `SELECT ${fieldQueries.join(', ')}`;
        if (fromTableName) {
            query += ` ${PH_FROM_TABLE}`;
        }
        if (leftJoinQueries.length) {
            query += ` ${leftJoinQueries.join(' ')}`;
        }
        if (this._where) {
            query += ` WHERE ${this._where.buildQueryString()}`;
        }
        if ( groupByColumn ) {
            query += ` ${PH_GROUP_BY_TABLE_COLUMN}`;
        }
        if ( orderBys.length ) {
            query += ` ORDER BY ${ orderBys.join(', ') }`;
        }
        return query;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : any[] {
        const fromTableName = this.getTableName();
        const groupByColumn = this.getGroupByColumn();
        const fieldValues = map(this._fieldValues, (f) => f());
        const leftJoinValues = map(this._leftJoinValues, (f) => f());
        const orderByValues = map(this._orderByValues, (f) => f());
        return [
            ...fieldValues,
            ...( fromTableName ? [this.getTableNameWithPrefix(fromTableName)] : []),
            ...leftJoinValues,
            ...( this._where ? this._where.buildQueryValues() : []),
            ...( fromTableName ? [
                this.getTableNameWithPrefix(fromTableName),
                groupByColumn
            ] : []),
            ...orderByValues
        ];
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): (() => any)[] {
        const fromTableName = this.getTableName();
        const groupByColumn = this.getGroupByColumn();
        return [
            ...this._fieldValues,
            ...( fromTableName ? [() => fromTableName ? this.getTableNameWithPrefix(fromTableName) : fromTableName] : []),
            ...this._leftJoinValues,
            ...( this._where ? this._where.getQueryValueFactories() : []),
            ...( fromTableName && groupByColumn ? [
                () => fromTableName ? this.getTableNameWithPrefix(fromTableName) : fromTableName,
                () => groupByColumn
            ] : []),
            ...this._orderByValues
        ]
    }


}

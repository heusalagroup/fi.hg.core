// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { SelectQueryBuilder } from "../../sql/select/SelectQueryBuilder";
import { forEach } from "../../../../functions/forEach";
import { map } from "../../../../functions/map";
import { Sort } from "../../../Sort";
import { EntityField } from "../../../types/EntityField";
import { EntityUtils } from "../../../utils/EntityUtils";
import {
    MY_PH_AS, MY_PH_FROM_TABLE,
    MY_PH_GROUP_BY_TABLE_COLUMN,
    MY_PH_LEFT_JOIN,
    MY_PH_TABLE_ALL_COLUMNS,
    MY_PH_TABLE_COLUMN_AS,
    MY_PH_TABLE_COLUMN_AS_DATE_AS,
    MY_PH_TABLE_COLUMN_AS_TEXT_AS,
    MY_PH_TABLE_COLUMN_AS_TIME_AS,
    MY_PH_TABLE_COLUMN_AS_TIMESTAMP_AS,
    MY_PH_TABLE_COLUMN_WITH_SORT_ORDER
} from "../constants/mysql-queries";
import { BaseSelectQueryBuilder } from "../../sql/select/BaseSelectQueryBuilder";

export class MySqlSelectQueryBuilder extends BaseSelectQueryBuilder implements SelectQueryBuilder {

    public static create () : MySqlSelectQueryBuilder {
        return new MySqlSelectQueryBuilder(
            ', ',
            ' ',
            ', ',
        );
    }


    ///////////////////////         QueryResultable         ///////////////////////


    /**
     * @inheritDoc
     */
    public appendResultExpression (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.appendResultExpression(
            queryFactory,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     */
    public appendResultExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.appendResultExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
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
        this.appendResultExpression(
            () => MY_PH_TABLE_COLUMN_AS,
            () => this.getTableNameWithPrefix(tableName),
            () => columnName,
            () => asColumnName ?? columnName,
        );
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
        this.appendResultExpression(
            () => MY_PH_TABLE_COLUMN_AS_TEXT_AS,
            () => this.getTableNameWithPrefix(tableName),
            () => columnName,
            () => asColumnName ?? columnName
        );
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
        this.appendResultExpression(
            () => MY_PH_TABLE_COLUMN_AS_TIME_AS,
            () => this.getTableNameWithPrefix(tableName),
            () => columnName,
            () => asColumnName ?? columnName,
        );
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
        this.appendResultExpression(
            () => MY_PH_TABLE_COLUMN_AS_DATE_AS,
            () => this.getTableNameWithPrefix(tableName),
            () => columnName,
            () => asColumnName ?? columnName,
        );
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
        if (!tableName) {
            throw new TypeError(`includeColumnAsTimestamp: table name is required`);
        }
        if (!columnName) {
            throw new TypeError(`includeColumnAsTimestamp: columnName is required`);
        }
        if (!asColumnName) {
            throw new TypeError(`includeColumnAsTimestamp: asColumnName is required`);
        }
        this.appendResultExpression(
            () => MY_PH_TABLE_COLUMN_AS_TIMESTAMP_AS,
        () => this.getTableNameWithPrefix(tableName),
            () => columnName,
            () => asColumnName ?? columnName,
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     */
    public includeAllColumnsFromTable (tableName: string) : void {
        if (!tableName) {
            throw new TypeError(`includeAllColumnsFromTable: table name is required`);
        }
        this.appendResultExpression(
            () => MY_PH_TABLE_ALL_COLUMNS,
            () => this.getTableNameWithPrefix(tableName),
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     */
    public includeColumnFromQueryBuilder (
        builder: QueryBuilder,
        asColumnName: string
    ) : void {
        if (!asColumnName) {
            throw new TypeError(`includeColumnFromQueryBuilder: column name is required`);
        }
        this.appendResultExpression(
            () => MY_PH_AS(builder.buildQueryString()),
            ...builder.getQueryValueFactories(),
            () => asColumnName
        );
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
        this.appendResultExpression(
            () => MY_PH_AS(formula),
            () => asColumnName
        );
    }

    ///////////////////////         QueryLeftJoinable         ///////////////////////


    /**
     * @inheritDoc
     */
    appendLeftJoinExpression (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.appendLeftJoinExpression(
            queryFactory,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     */
    appendLeftJoinExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.appendLeftJoinExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
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
        this.appendLeftJoinExpression(
            () => MY_PH_LEFT_JOIN,
            () => this.getTableNameWithPrefix(fromTableName),
            () => this.getTableNameWithPrefix(sourceTableName),
            () => sourceColumnName,
            () => this.getTableNameWithPrefix(fromTableName),
            () => fromColumnName,
        )
    }


    ///////////////////////         QueryOrderable         ///////////////////////

    /**
     * @inheritDoc
     */
    appendOrderExpression (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.appendOrderExpression(
            queryFactory,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     */
    appendOrderExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.appendOrderExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setOrderByTableFields}
     */
    public setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ) : void {
        forEach(
            sort.getSortOrders(),
            (item) => {
                this.appendOrderExpression(
                    () => MY_PH_TABLE_COLUMN_WITH_SORT_ORDER(item.getDirection()),
                    () => this.getTableNameWithPrefix(tableName),
                    () => EntityUtils.getColumnName(item.getProperty(), fields)
                );
            }
        );
    }



    ///////////////////////         QueryGroupable         ///////////////////////



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
    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {
        let query = `SELECT ${this.buildResultQueryString()}`;

        const fromTableName = this.getTableName();
        if (fromTableName) {
            query += ` ${MY_PH_FROM_TABLE}`;
        }

        const leftJoinQuery = this.buildLeftJoinQueryString();
        if (leftJoinQuery) {
            query += ` ${leftJoinQuery}`;
        }

        const whereQuery = this.buildWhereQueryString();
        if (whereQuery) {
            query += ` WHERE ${whereQuery}`;
        }

        const groupByColumn = this.getGroupByColumn();
        if ( groupByColumn ) {
            query += ` ${MY_PH_GROUP_BY_TABLE_COLUMN}`;
        }

        const orderBys = this.buildOrderQueryString();
        if ( orderBys ) {
            query += ` ORDER BY ${ orderBys }`;
        }

        return query;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return map(this.getQueryValueFactories(), (f) => f());
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): readonly QueryValueFactory[] {
        const fromTableName = this.getTableName();
        const groupByColumn = this.getGroupByColumn();
        return [
            ...this.getResultValueFactories(),
            ...( fromTableName ? [() => fromTableName ? this.getTableNameWithPrefix(fromTableName) : fromTableName] : []),
            ...this.getLeftJoinValueFactories(),
            ...this.getWhereValueFactories(),
            ...( fromTableName && groupByColumn ? [
                () => fromTableName ? this.getTableNameWithPrefix(fromTableName) : fromTableName,
                () => groupByColumn
            ] : []),
            ...this.getOrderValueFactories()
        ]
    }


}

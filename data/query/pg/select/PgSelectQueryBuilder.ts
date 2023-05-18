// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { SelectQueryBuilder } from "../../sql/select/SelectQueryBuilder";
import { PgQueryUtils, PG_PH_AS, PG_PH_LEFT_JOIN } from "../utils/PgQueryUtils";
import { BaseSelectQueryBuilder } from "../../sql/select/BaseSelectQueryBuilder";

export class PgSelectQueryBuilder extends BaseSelectQueryBuilder implements SelectQueryBuilder {

    private constructor () {
        super(
            ', ',
            ' ',
            ', ',
        );
    }

    public static create () : PgSelectQueryBuilder {
        return new PgSelectQueryBuilder();
    }


    ///////////////////////         QueryResultable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     */
    public includeAllColumnsFromTable (tableName: string) {
        this.appendResultExpression(
            () => `${PgQueryUtils.quoteTableName(this.getTableNameWithPrefix(tableName))}.*`
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     */
    public includeColumnFromQueryBuilder (
        builder: QueryBuilder,
        asColumnName: string
    ) {

        if (!asColumnName) {
            throw new TypeError(`includeColumnFromQueryBuilder: column name is required`);
        }

        this.appendResultExpression(
            () => PG_PH_AS(builder.buildQueryString(), asColumnName),
            ...builder.getQueryValueFactories(),
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
            () => PG_PH_AS(formula, asColumnName)
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    public includeColumn (tableName: string, columnName: string, asColumnName: string): void {
        this.appendResultExpression(
            () => PgQueryUtils.quoteTableAndColumnAsColumnName(this.getTableNameWithPrefix(tableName), columnName, asColumnName)
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    public includeColumnAsText (tableName: string, columnName: string, asColumnName: string): void {
        this.appendResultExpression(
            () => PgQueryUtils.quoteTableAndColumnAsTextAsColumnName(this.getTableNameWithPrefix(tableName), columnName, asColumnName)
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    public includeColumnAsDate (tableName: string, columnName: string, asColumnName: string): void {
        this.appendResultExpression(
() => PgQueryUtils.quoteTableAndColumnAsTimestampStringAsColumnName(this.getTableNameWithPrefix(tableName), columnName, asColumnName)
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    public includeColumnAsTime (tableName: string, columnName: string, asColumnName: string): void {
        this.appendResultExpression(
() => PgQueryUtils.quoteTableAndColumnAsTimestampStringAsColumnName(this.getTableNameWithPrefix(tableName), columnName, asColumnName)
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    public includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string): void {
        this.appendResultExpression(
() => PgQueryUtils.quoteTableAndColumnAsTimestampStringAsColumnName(this.getTableNameWithPrefix(tableName), columnName, asColumnName)
        );
    }


    ///////////////////////         QueryLeftJoinable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    public leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) : void {
        this.appendLeftJoinExpression(
            () => PG_PH_LEFT_JOIN(
                this.getTableNameWithPrefix(fromTableName),
                fromColumnName,
                this.getTableNameWithPrefix(sourceTableName),
                sourceColumnName
            )
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



    ///////////////////////         QueryWhereable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        super.setWhereFromQueryBuilder(builder);
    }


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) {
        super.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getTablePrefix}
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
     * @see {@link SelectQueryBuilder.build}
     */
    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     * @see {@link SelectQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {

        const columns = this.buildResultQueryString();
        const tableName = this.getCompleteTableName();
        const leftJoinQueries = this.buildLeftJoinQueryString();
        const where = this.buildWhereQueryString();
        const groupBy = this.buildGroupByQueryString();
        const orderBys = this.buildOrderQueryString();

        let query = `SELECT ${columns}`;
        if (tableName) {
            query += ` FROM ${PgQueryUtils.quoteTableName(tableName)}`;
        }
        if (leftJoinQueries) {
            query += ` ${leftJoinQueries}`;
        }
        if (where) {
            query += ` WHERE ${where}`;
        }
        if ( groupBy ) {
            query += ` GROUP BY ${groupBy}`;
        }
        if ( orderBys ) {
            query += ` ORDER BY ${ orderBys }`;
        }
        return query;

    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     * @see {@link SelectQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return super.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return [
            ...this.getResultValueFactories(),
            ...this.getLeftJoinValueFactories(),
            ...this.getWhereValueFactories(),
            ...this.getGroupByValueFactories(),
            ...this.getOrderValueFactories(),
        ]
    }


}

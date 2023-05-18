// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MySqlSelectQueryBuilder } from "./MySqlSelectQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { MySqlEntityJsonObjectBuilder } from "../formulas/MySqlEntityJsonObjectBuilder";
import { MySqlJsonArrayAggBuilder } from "../formulas/MySqlJsonArrayAggBuilder";
import { EntityField } from "../../../types/EntityField";
import { EntityRelationOneToMany } from "../../../types/EntityRelationOneToMany";
import { forEach } from "../../../../functions/forEach";
import { EntityRelationManyToOne } from "../../../types/EntityRelationManyToOne";
import { find } from "../../../../functions/find";
import { EntityFieldType } from "../../../types/EntityFieldType";
import { Sort } from "../../../Sort";
import { Where } from "../../../Where";
import { MySqlAndChainBuilder } from "../formulas/MySqlAndChainBuilder";
import { ChainQueryBuilderUtils } from "../../utils/ChainQueryBuilderUtils";
import { MySqlOrChainBuilder } from "../formulas/MySqlOrChainBuilder";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { EntitySelectQueryUtils } from "../../utils/EntitySelectQueryUtils";
import { EntitySelectQueryBuilder, TableFieldInfoCallback } from "../../sql/select/EntitySelectQueryBuilder";

/**
 * Defines an interface for a builder of MySQL database read query from
 * entity types.
 */
export class MySqlEntitySelectQueryBuilder implements EntitySelectQueryBuilder {

    private readonly _builder : MySqlSelectQueryBuilder;

    protected constructor () {
        this._builder = MySqlSelectQueryBuilder.create();
    }

    /**
     * Create select query builder for MySQL
     */
    public static create () : MySqlEntitySelectQueryBuilder {
        return new MySqlEntitySelectQueryBuilder();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setOneToMany}
     */
    public setOneToMany (
        propertyName: string,
        fields: readonly EntityField[],
        temporalProperties: readonly TemporalProperty[],
        targetTableName : string,
        targetColumnName : string,
        sourceTableName  : string,
        sourceColumnName : string
    ) {
        const jsonObjectQueryBuilder = new MySqlEntityJsonObjectBuilder();
        jsonObjectQueryBuilder.setEntityFieldsFromTable( this.getTableNameWithPrefix(targetTableName), fields, temporalProperties );
        const jsonArrayAggBuilder = new MySqlJsonArrayAggBuilder(true);
        jsonArrayAggBuilder.setFormulaFromQueryBuilder(jsonObjectQueryBuilder);
        this._builder.includeColumnFromQueryBuilder(jsonArrayAggBuilder, propertyName);
        this._builder.leftJoinTable(
            targetTableName, targetColumnName,
            sourceTableName, sourceColumnName
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setManyToOne}
     */
    public setManyToOne (
        propertyName: string,
        fields: readonly EntityField[],
        temporalProperties: readonly TemporalProperty[],
        targetTableName : string,
        targetColumnName : string,
        sourceTableName  : string,
        sourceColumnName : string
    ) {
        const jsonObjectQueryBuilder = new MySqlEntityJsonObjectBuilder();
        jsonObjectQueryBuilder.setEntityFieldsFromTable(this.getTableNameWithPrefix(targetTableName), fields, temporalProperties);
        this._builder.includeColumnFromQueryBuilder(jsonObjectQueryBuilder, propertyName);
        this._builder.leftJoinTable(
            targetTableName, targetColumnName,
            sourceTableName, sourceColumnName
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setOneToManyRelations}
     */
    public setOneToManyRelations (
        relations: readonly EntityRelationOneToMany[],
        resolveMappedFieldInfo: TableFieldInfoCallback,
    ) {
        const groupByColumn = this.getGroupByColumn();
        if (!groupByColumn) {
            throw new TypeError(`Group by is required for one to many relations`);
        }
        forEach(
            relations,
            (relation: EntityRelationOneToMany) : void => {
                const { propertyName } = relation;
                const mappedTable = relation?.mappedTable;
                if (!mappedTable) throw new TypeError(`The relation "${propertyName}" did not have table defined`);
                const [mappedFields, mappedTemporalProperties] = resolveMappedFieldInfo(mappedTable);
                this.setOneToMany(
                    propertyName,
                    mappedFields,
                    mappedTemporalProperties,
                    mappedTable, groupByColumn,
                    this.getTableName(), groupByColumn
                );
            }
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setManyToOneRelations}
     */
    public setManyToOneRelations (
        relations: readonly EntityRelationManyToOne[],
        resolveMappedFieldInfo: TableFieldInfoCallback,
        fields: readonly EntityField[]
    ) {
        forEach(
            relations,
            (relation: EntityRelationManyToOne) : void => {
                const { propertyName } = relation;
                const mappedTable = relation?.mappedTable;
                if (!mappedTable) throw new TypeError(`The relation "${propertyName}" did not have table defined`);
                const [mappedFields, mappedTemporalProperties] = resolveMappedFieldInfo(mappedTable);
                const mappedField : EntityField | undefined = find(fields, (field) => field?.propertyName === propertyName && field?.fieldType === EntityFieldType.JOINED_ENTITY);
                if (!mappedField) throw new TypeError(`Could not find field definition for property "${propertyName}"`);
                const mappedColumnName : string = mappedField.columnName;
                if (!mappedColumnName) throw new TypeError(`Could not find column name for property "${propertyName}"`);
                this.setManyToOne(
                    propertyName,
                    mappedFields,
                    mappedTemporalProperties,
                    mappedTable, mappedColumnName,
                    this.getTableName(), mappedColumnName
                );
            }
        );
    }


    ///////////////////////         QueryEntityResultable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeEntityFields}
     */
    public includeEntityFields (
        tableName           : string,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ): void {
        EntitySelectQueryUtils.includeEntityFields(
            this._builder,
            tableName,
            fields,
            temporalProperties
        );
    }


    ///////////////////////         QueryResultable         ///////////////////////

    buildResultQueryString () : string {
        return this._builder.buildResultQueryString();
    }

    getResultValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getResultValueFactories();
    }

    appendResultExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        return this._builder.appendResultExpression(
            queryFactory,
            ...valueFactories
        );
    }

    appendResultExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        return this._builder.appendResultExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeColumn}
     */
    public includeColumn (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumn(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeColumnAsText}
     */
    public includeColumnAsText (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsText(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeColumnAsTime}
     */
    public includeColumnAsTime (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsTime(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeColumnAsDate}
     */
    public includeColumnAsDate (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsDate(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeColumnAsTimestamp}
     */
    public includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsTimestamp(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeAllColumnsFromTable}
     * @deprecated Use MySqlEntitySelectQueryBuilder.includeEntityFields
     */
    public includeAllColumnsFromTable (tableName: string): void {
        return this._builder.includeAllColumnsFromTable(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeColumnFromQueryBuilder}
     */
    public includeColumnFromQueryBuilder (builder: QueryBuilder, asColumnName: string): void {
        return this._builder.includeColumnFromQueryBuilder(builder, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeFormulaByString}
     */
    public includeFormulaByString (formula: string, asColumnName: string): void {
        return this._builder.includeFormulaByString(formula, asColumnName);
    }


    ///////////////////////         QueryEntityWhereable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.buildAnd}
     */
    public buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[],
        temporalProperties     : readonly TemporalProperty[]
    ) {
        const completeTableName = this.getTableNameWithPrefix(tableName);
        const andBuilder = MySqlAndChainBuilder.create();
        ChainQueryBuilderUtils.buildChain(
            andBuilder,
            where,
            completeTableName,
            fields,
            temporalProperties,
            () => MySqlAndChainBuilder.create(),
            () => MySqlOrChainBuilder.create()
        );
        return andBuilder;
    }


    ///////////////////////         QueryWhereable         ///////////////////////

    buildWhereQueryString () : string {
        return this._builder.buildWhereQueryString();
    }

    getWhereValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getWhereValueFactories();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        return this._builder.setWhereFromQueryBuilder(builder);
    }


    ///////////////////////         QueryLeftJoinable         ///////////////////////


    buildLeftJoinQueryString () : string {
        return this._builder.buildLeftJoinQueryString();
    }

    getLeftJoinValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getLeftJoinValueFactories();
    }

    appendLeftJoinExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        return this._builder.appendLeftJoinExpression(
            queryFactory,
            ...valueFactories
        );
    }

    appendLeftJoinExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        return this._builder.appendLeftJoinExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.leftJoinTable}
     */
    public leftJoinTable (fromTableName: string, fromColumnName: string, sourceTableName: string, sourceColumnName: string): void {
        return this._builder.leftJoinTable(fromTableName, fromColumnName, sourceTableName, sourceColumnName);
    }


    ///////////////////////         QueryOrderable         ///////////////////////


    buildOrderQueryString () : string {
        return this._builder.buildOrderQueryString();
    }

    getOrderValueFactories () : readonly QueryStringFactory[] {
        return this._builder.getOrderValueFactories();
    }

    appendOrderExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryStringFactory[]
    ) : void {
        return this._builder.appendOrderExpression(
            queryFactory,
            ...valueFactories
        );
    }

    appendOrderExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryStringFactory[]
    ) : void {
        return this._builder.appendOrderExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }


    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setOrderBy}
     */
    public setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ): void {
        return this._builder.setOrderByTableFields(sort, tableName, fields);
    }


    ///////////////////////         QueryGroupable         ///////////////////////


    buildGroupByQueryString () : string{
        return this._builder.buildGroupByQueryString();
    }

    getGroupByValueFactories () : readonly QueryStringFactory[]{
        return this._builder.getGroupByValueFactories();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setGroupByColumn}
     */
    public setGroupByColumn (columnName: string): void {
        return this._builder.setGroupByColumn(columnName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.getGroupByColumn}
     */
    public getGroupByColumn (): string | undefined {
        return this._builder.getGroupByColumn();
    }



    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.getCompleteTableName}
     */
    public getTableNameWithPrefix (tableName: string): string {
        return this._builder.getTableNameWithPrefix(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.getShortFromTable}
     */
    public getTableName (): string {
        return this._builder.getTableName();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.getCompleteFromTable}
     */
    public getCompleteTableName (): string {
        return this._builder.getCompleteTableName();
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.valueOf}
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.toString}
     */
    public toString () : string {
        return this._builder.toString();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.build}
     */
    public build (): QueryBuildResult {
        return this._builder.build();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.buildQueryString}
     */
    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.buildQueryValues}
     */
    public buildQueryValues (): readonly any[] {
        return this._builder.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return this._builder.getQueryValueFactories();
    }


}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../../../../functions/forEach";
import { find } from "../../../../../functions/find";
import { PgSelectQueryBuilder } from "./PgSelectQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../../query/types/QueryBuilder";
import { EntityField } from "../../../../types/EntityField";
import { EntityRelationOneToMany } from "../../../../types/EntityRelationOneToMany";
import { PersisterMetadataManager } from "../../../types/PersisterMetadataManager";
import { EntityRelationManyToOne } from "../../../../types/EntityRelationManyToOne";
import { EntityFieldType } from "../../../../types/EntityFieldType";
import { PgJsonAggBuilder } from "../formulas/PgJsonAggBuilder";
import { PgJsonBuildObjectEntityBuilder } from "../formulas/PgJsonBuildObjectEntityBuilder";
import { PgJsonIndexBuilder } from "../formulas/PgJsonIndexBuilder";
import { Sort } from "../../../../Sort";
import { PgAndChainBuilder } from "../formulas/PgAndChainBuilder";
import { Where } from "../../../../Where";
import { ChainQueryBuilderUtils } from "../../../query/utils/ChainQueryBuilderUtils";
import { PgOrChainBuilder } from "../formulas/PgOrChainBuilder";
import { TemporalProperty } from "../../../../types/TemporalProperty";
import { EntitySelectQueryUtils } from "../../../query/utils/EntitySelectQueryUtils";
import { EntitySelectQueryBuilder } from "../../../query/select/EntitySelectQueryBuilder";
import { map } from "../../../../../functions/map";
import { SortOrder } from "../../../../types/SortOrder";
import { PgQueryUtils } from "../../utils/PgQueryUtils";
import { EntityUtils } from "../../../../utils/EntityUtils";
import { SortDirection } from "../../../../types/SortDirection";
import { PG_TIME_COLUMN_DEFINITIONS } from "../../constants/pg-queries";

/**
 * Defines an interface for a builder of PostgreSQL database read query from
 * entity types.
 */
export class PgEntitySelectQueryBuilder
    implements
        EntitySelectQueryBuilder
{

    private readonly _builder : PgSelectQueryBuilder;

    protected constructor () {
        this._builder = PgSelectQueryBuilder.create();
    }

    public static create () {
        return new PgEntitySelectQueryBuilder();
    }


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

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setOneToMany}
     */
    public setOneToMany (
        propertyName: string,
        fields: readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        targetTableName : string,
        targetColumnName : string,
        sourceTableName  : string,
        sourceColumnName : string
    ): void {
        this._builder.includeColumnFromQueryBuilder(
            PgJsonAggBuilder.create(
                PgJsonBuildObjectEntityBuilder.create(
                    this.getTableNameWithPrefix(targetTableName),
                    fields,
                    temporalProperties
                )
            ),
            propertyName
        );
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
        temporalProperties  : readonly TemporalProperty[],
        targetTableName : string,
        targetColumnName : string,
        sourceTableName  : string,
        sourceColumnName : string
    ): void {
        this._builder.includeColumnFromQueryBuilder(
            PgJsonIndexBuilder.create(
                PgJsonAggBuilder.create(
                    PgJsonBuildObjectEntityBuilder.create(
                        this.getTableNameWithPrefix(targetTableName),
                        fields,
                        temporalProperties
                    )
                ),
                0
            ),
            propertyName
        );
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
        metadataManager: PersisterMetadataManager
    ): void {
        forEach(
            relations,
            (relation: EntityRelationOneToMany) : void => {
                const { propertyName } = relation;
                const mappedTable = relation?.mappedTable;
                if (!mappedTable) throw new TypeError(`The relation "${propertyName}" did not have table defined`);
                const mappedMetadata = metadataManager.getMetadataByTable(mappedTable);
                if (!mappedMetadata) throw new TypeError(`Could not find metadata for property "${propertyName}"`);
                const groupByColumn = this.getGroupByColumn();
                if (!groupByColumn) throw new TypeError(`Could not find column to group by for property "${propertyName}"`);

                this.setOneToMany(
                    propertyName,
                    mappedMetadata.fields,
                    mappedMetadata.temporalProperties,
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
        metadataManager: PersisterMetadataManager,
        fields: readonly EntityField[],
        temporalProperties: readonly TemporalProperty[]
    ): void {
        forEach(
            relations,
            (relation: EntityRelationManyToOne) : void => {
                const { propertyName } = relation;
                const mappedTable = relation?.mappedTable;
                if (!mappedTable) throw new TypeError(`The relation "${propertyName}" did not have table defined`);
                const mappedMetadata = metadataManager.getMetadataByTable(mappedTable);
                if (!mappedMetadata) throw new TypeError(`Could not find metadata for property "${propertyName}"`);
                const mappedField : EntityField | undefined = find(fields, (field) => field?.propertyName === propertyName && field?.fieldType === EntityFieldType.JOINED_ENTITY);
                if (!mappedField) throw new TypeError(`Could not find field definition for property "${propertyName}"`);
                const mappedColumnName : string = mappedField.columnName;
                if (!mappedColumnName) throw new TypeError(`Could not find column name for property "${propertyName}"`);
                this.setManyToOne(
                    propertyName,
                    mappedMetadata.fields,
                    mappedMetadata.temporalProperties,
                    mappedTable, mappedColumnName,
                    this.getTableName(), mappedColumnName
                );
            }
        );
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
        temporalProperties : readonly TemporalProperty[]
    ) : PgAndChainBuilder {
        const completeTableName = this.getTableNameWithPrefix(tableName);
        const andBuilder = PgAndChainBuilder.create();
        ChainQueryBuilderUtils.buildChain(
            andBuilder,
            where,
            completeTableName,
            fields,
            temporalProperties,
            PG_TIME_COLUMN_DEFINITIONS,
            () => PgAndChainBuilder.create(),
            () => PgOrChainBuilder.create()
        );
        return andBuilder;
    }


    ///////////////////////         QueryEntityOrderable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setOrderByTableFields}
     */
    public setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ) {
        const orders = sort.getSortOrders();
        if (orders?.length) {
            this.appendOrderExpression(
                () => map(
                    orders,
                    (item: SortOrder) => `${
                        PgQueryUtils.quoteTableAndColumn(
                            this.getTableNameWithPrefix( tableName ),
                            EntityUtils.getColumnName( item.getProperty(), fields )
                        )
                    }${item.getDirection() === SortDirection.ASC ? ' ASC' : ' DESC'}`
                ).join( ', ' )
            );
        }
    }


    ///////////////////////         TableResultable         ///////////////////////


    public buildResultQueryString () : string {
        return this._builder.buildResultQueryString();
    }

    public getResultValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getResultValueFactories();
    }


    public appendResultExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        this._builder.appendResultExpression(
            queryFactory,
            ...valueFactories
        );
    }


    public appendResultExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        this._builder.appendResultExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    public includeColumn (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumn(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    public includeColumnAsText (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsText(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    public includeColumnAsTime (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsTime(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    public includeColumnAsDate (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsDate(tableName, columnName, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    public includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string): void {
        this._builder.includeColumnAsTimestamp(tableName, columnName, asColumnName);
    }

    /**
     * @deprecated Use EntitySelectQueryBuilder.includeEntityFields instead of
     * this method.
     *
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeEntityFields}
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     * @see {@link EntitySelectQueryBuilder.includeAllColumnsFromTable}
     */
    public includeAllColumnsFromTable (tableName: string): void {
        return this._builder.includeAllColumnsFromTable(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     */
    public includeColumnFromQueryBuilder (builder: QueryBuilder, asColumnName: string): void {
        return this._builder.includeColumnFromQueryBuilder(builder, asColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeFormulaByString}
     */
    public includeFormulaByString (formula: string, asColumnName: string): void {
        return this._builder.includeFormulaByString(formula, asColumnName);
    }



    ///////////////////////         QueryWhereable         ///////////////////////


    public buildWhereQueryString () : string {
        return this._builder.buildWhereQueryString();
    }


    public getWhereValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getWhereValueFactories();
    }


    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._builder.setWhereFromQueryBuilder(builder);
    }


    ///////////////////////         QueryOrderable         ///////////////////////


    public buildOrderQueryString () : string {
        return this._builder.buildOrderQueryString();
    }


    public getOrderValueFactories () : readonly QueryStringFactory[] {
        return this._builder.getOrderValueFactories();
    }

    public appendOrderExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryStringFactory[]
    ) : void {
        return this._builder.appendOrderExpression(
            queryFactory,
            ...valueFactories
        );
    }

    public appendOrderExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryStringFactory[]
    ) : void {
        return this._builder.appendOrderExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }


    ///////////////////////         QueryGroupable         ///////////////////////


    public buildGroupByQueryString () : string {
        return this._builder.buildGroupByQueryString();
    }

    public getGroupByValueFactories () : readonly QueryStringFactory[] {
        return this._builder.getGroupByValueFactories();
    }


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setGroupByColumn}
     */
    public setGroupByColumn (columnName: string): void {
        return this._builder.setGroupByColumn(columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getGroupByColumn}
     */
    public getGroupByColumn (): string | undefined {
        return this._builder.getGroupByColumn();
    }


    ///////////////////////         QueryLeftjoinable         ///////////////////////


    public buildLeftJoinQueryString () : string {
        return this._builder.buildLeftJoinQueryString();
    }

    public getLeftJoinValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getLeftJoinValueFactories();
    }

    public appendLeftJoinExpression (
        queryFactory  : (() => string),
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        this._builder.appendLeftJoinExpression(
            queryFactory,
            ...valueFactories
        );
    }

    public appendLeftJoinExpressionUsingQueryBuilder (
        builder: QueryBuilder,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        this._builder.appendLeftJoinExpressionUsingQueryBuilder(
            builder,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    public leftJoinTable (fromTableName: string, fromColumnName: string, sourceTableName: string, sourceColumnName: string): void {
        return this._builder.leftJoinTable(fromTableName, fromColumnName, sourceTableName, sourceColumnName);
    }


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link TablePrefixable.setTablePrefix}
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link TablePrefixable.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link TablePrefixable.getCompleteTableName}
     */
    public getTableNameWithPrefix (tableName: string): string {
        return this._builder.getTableNameWithPrefix(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link TablePrefixable.setTableName}
     */
    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link TablePrefixable.getTableName}
     */
    public getTableName (): string {
        return this._builder.getTableName();
    }

    /**
     * @inheritDoc
     * @see {@link TablePrefixable.getCompleteTableName}
     */
    public getCompleteTableName (): string {
        return this._builder.getCompleteTableName();
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
        return `PgEntitySelectQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.build}
     */
    public build (): QueryBuildResult {
        return this._builder.build();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.buildQueryString}
     */
    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return this._builder.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getQueryValueFactories();
    }



}

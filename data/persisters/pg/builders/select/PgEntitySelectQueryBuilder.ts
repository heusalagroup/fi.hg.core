// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../../../../functions/forEach";
import { find } from "../../../../../functions/find";
import { PgSelectQueryBuilder } from "./PgSelectQueryBuilder";
import { QueryBuilder } from "../../../types/QueryBuilder";
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
import { ChainQueryBuilderUtils } from "../../../utils/ChainQueryBuilderUtils";
import { PgOrChainBuilder } from "../formulas/PgOrChainBuilder";
import { TemporalProperty } from "../../../../types/TemporalProperty";
import { EntitySelectBuilderUtils } from "../../../utils/EntitySelectBuilderUtils";
import { EntitySelectQueryBuilder } from "../../../types/EntitySelectQueryBuilder";

/**
 * Defines an interface for a builder of PostgreSQL database read query from
 * entity types.
 */
export class PgEntitySelectQueryBuilder implements EntitySelectQueryBuilder {

    private readonly _builder : PgSelectQueryBuilder;

    protected constructor () {
        this._builder = PgSelectQueryBuilder.create();
    }

    public static create () {
        return new PgEntitySelectQueryBuilder();
    }

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
    public build (): [ string, any[] ] {
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
    public buildQueryValues (): any[] {
        return this._builder.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): (() => any)[] {
        return this._builder.getQueryValueFactories();
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

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    public leftJoinTable (fromTableName: string, fromColumnName: string, sourceTableName: string, sourceColumnName: string): void {
        return this._builder.leftJoinTable(fromTableName, fromColumnName, sourceTableName, sourceColumnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setFromTable}
     */
    public setFromTable (tableName: string): void {
        return this._builder.setFromTable(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getShortFromTable}
     */
    public getShortFromTable (): string {
        return this._builder.getShortFromTable();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteFromTable}
     */
    public getCompleteFromTable (): string {
        return this._builder.getCompleteFromTable();
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
    public getGroupByColumn (): string {
        return this._builder.getGroupByColumn();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteTableName}
     */
    public getCompleteTableName (tableName: string): string {
        return this._builder.getCompleteTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        return this._builder.setWhereFromQueryBuilder(builder);
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
        EntitySelectBuilderUtils.includeEntityFields(
            this._builder,
            tableName,
            fields,
            temporalProperties
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.setOrderBy}
     */
    public setOrderBy (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ): void {
        return this._builder.setOrderByTableFields(sort, tableName, fields);
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
                    this.getCompleteTableName(targetTableName),
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
                        this.getCompleteTableName(targetTableName),
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
                this.setOneToMany(
                    propertyName,
                    mappedMetadata.fields,
                    mappedMetadata.temporalProperties,
                    mappedTable, this.getGroupByColumn(),
                    this.getShortFromTable(), this.getGroupByColumn()
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
        fields: readonly EntityField[]
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
                    this.getShortFromTable(), mappedColumnName
                );
            }
        );
    }

    /**
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.buildAnd}
     */
    public buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[]
    ) : PgAndChainBuilder {
        const completeTableName = this.getCompleteTableName(tableName);
        const andBuilder = new PgAndChainBuilder();
        ChainQueryBuilderUtils.buildChain(
            andBuilder,
            where,
            completeTableName,
            fields,
            () => new PgAndChainBuilder(),
            () => new PgOrChainBuilder()
        );
        return andBuilder;
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    public includeColumn (tableName: string, columnName: string): void {
        this._builder.includeColumn(tableName, columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    public includeColumnAsDate (tableName: string, columnName: string): void {
        this._builder.includeColumnAsDate(tableName, columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    public includeColumnAsText (tableName: string, columnName: string): void {
        this._builder.includeColumnAsText(tableName, columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    public includeColumnAsTime (tableName: string, columnName: string): void {
        this._builder.includeColumnAsTime(tableName, columnName);
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    public includeColumnAsTimestamp (tableName: string, columnName: string): void {
        this._builder.includeColumnAsTimestamp(tableName, columnName);
    }

}

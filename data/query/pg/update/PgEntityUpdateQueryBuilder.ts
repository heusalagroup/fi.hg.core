// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../types/EntityField";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { PgUpdateQueryBuilder } from "./PgUpdateQueryBuilder";
import { EntityUpdateQueryBuilder } from "../../sql/update/EntityUpdateQueryBuilder";
import { Entity } from "../../../Entity";
import { forEach } from "../../../../functions/forEach";
import { has } from "../../../../functions/has";
import { find } from "../../../../functions/find";
import { PgListQueryBuilder } from "../types/PgListQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { isTimeColumnDefinition } from "../../../types/ColumnDefinition";

/**
 * Defines an interface for a builder of MySQL database read query from
 * entity types.
 */
export class PgEntityUpdateQueryBuilder implements EntityUpdateQueryBuilder {

    private readonly _builder : PgUpdateQueryBuilder;

    protected constructor () {
        this._builder = PgUpdateQueryBuilder.create();
    }

    /**
     * Create select query builder for MySQL
     */
    public static create () : PgEntityUpdateQueryBuilder {
        return new PgEntityUpdateQueryBuilder();
    }


    ///////////////////////         EntityUpdateQueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     */
    public appendEntity<T extends Entity> (
        entity              : T,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        ignoreProperties    : readonly string[],
    ) : void {
        const setAssigmentBuilder = PgListQueryBuilder.create();
        forEach(
            fields,
            (field: EntityField) => {
                const { propertyName, columnName, columnDefinition, updatable } = field;
                if (ignoreProperties.includes(propertyName)) return;
                if (!updatable) return;

                const temporalProperty : TemporalProperty | undefined = find(
                    temporalProperties,
                    (item: TemporalProperty) : boolean => item.propertyName === propertyName
                );
                const temporalType = temporalProperty?.temporalType;
                const value : any = has(entity, propertyName) ? (entity as any)[propertyName] : null;
                if ( temporalType || isTimeColumnDefinition(columnDefinition) ) {
                    setAssigmentBuilder.setAssignmentWithParamAsTimestamp(columnName, value);
                } else {
                    setAssigmentBuilder.setAssignmentWithParam(columnName, value);
                }
            }
        );
        this._builder.appendSetListUsingQueryBuilder(setAssigmentBuilder);
    }



    ///////////////////////         UpdateQueryBuilder         ///////////////////////


    public addPrefixFactory (queryFactory: QueryStringFactory, ...valueFactories: readonly QueryValueFactory[]): void {
        this._builder.addPrefixFactory(queryFactory, ...valueFactories);
    }

    public addSetFactory (queryFactory: QueryStringFactory, ...valueFactories: readonly QueryValueFactory[]): void {
        this._builder.addSetFactory(queryFactory, ...valueFactories);
    }

    public appendSetListUsingQueryBuilder (builder: QueryBuilder): void {
        this._builder.appendSetListUsingQueryBuilder(builder);
    }


    ///////////////////////         TableWhereable         ///////////////////////


    buildWhereQueryString () : string {
        return this._builder.buildWhereQueryString();
    }

    getWhereValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getWhereValueFactories();
    }

    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._builder.setWhereFromQueryBuilder(builder);
    }


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getCompleteFromTable}
     */
    public getTableNameWithPrefix (tableName : string): string {
        return this._builder.getTableNameWithPrefix(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getCompleteFromTable}
     */
    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getCompleteFromTable}
     */
    public getTableName (): string {
        return this._builder.getTableName();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getCompleteFromTable}
     */
    public getCompleteTableName (): string {
        return this._builder.getCompleteTableName();
    }



    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.valueOf}
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.toString}
     */
    public toString () : string {
        return this._builder.toString();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.build}
     */
    public build (): QueryBuildResult {
        return this._builder.build();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.buildQueryString}
     */
    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return this._builder.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return this._builder.getQueryValueFactories();
    }


}

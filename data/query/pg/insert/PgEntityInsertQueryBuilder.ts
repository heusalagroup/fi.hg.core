// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { forEach } from "../../../../functions/forEach";
import { has } from "../../../../functions/has";
import { find } from "../../../../functions/find";
import { filter } from "../../../../functions/filter";
import { EntityField } from "../../../types/EntityField";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { PgInsertQueryBuilder } from "./PgInsertQueryBuilder";
import { EntityInsertQueryBuilder } from "../../sql/insert/EntityInsertQueryBuilder";
import { Entity } from "../../../Entity";
import { PgListQueryBuilder } from "../types/PgListQueryBuilder";
import { QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { LogService } from "../../../../LogService";
import { EntityFieldType } from "../../../types/EntityFieldType";
import { LogLevel } from "../../../../types/LogLevel";
import { isTimeColumnDefinition } from "../../../types/ColumnDefinition";

const LOG = LogService.createLogger( 'PgEntityInsertQueryBuilder' );

/**
 * Defines an interface for a builder of PostgreSQL database read query from
 * entity types.
 */
export class PgEntityInsertQueryBuilder implements EntityInsertQueryBuilder {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

    private readonly _builder : PgInsertQueryBuilder;

    protected constructor () {
        this._builder = PgInsertQueryBuilder.create();
    }

    /**
     * Create select query builder for PostgreSQL
     */
    public static create () : PgEntityInsertQueryBuilder {
        return new PgEntityInsertQueryBuilder();
    }



    /**
     *
     * @param fields
     * @param temporalProperties
     * @param ignoreProperties
     * @param entity
     */
    public appendEntity<T extends Entity> (
        entity              : T,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        ignoreProperties    : readonly string[],
    ) : void {

        const filteredFields : EntityField[] = filter(
            fields,
            (field: EntityField) : boolean => {
                const { propertyName, fieldType, insertable } = field;
                return insertable && !ignoreProperties.includes( propertyName ) && fieldType !== EntityFieldType.JOINED_ENTITY;
            }
        );

        const itemBuilder = PgListQueryBuilder.create();
        forEach(
            filteredFields,
            (field: EntityField) => {

                const {propertyName, columnName} = field;

                LOG.debug(`appendEntity: field: `, field);

                const { columnDefinition } = field;

                const temporalProperty : TemporalProperty | undefined = find(
                    temporalProperties,
                    (item: TemporalProperty) : boolean => item.propertyName === propertyName
                );
                const temporalType = temporalProperty?.temporalType;

                const isTime : boolean = !!temporalType || !!(isTimeColumnDefinition(columnDefinition));
                LOG.debug(`appendEntity: isTime: `, isTime, propertyName);

                const value : any = has(entity, propertyName) ? (entity as any)[propertyName] : undefined;
                if (value !== undefined) {
                    if ( isTime ) {
                        this._builder.addColumnName(columnName);
                        itemBuilder.setParamFromTimestampString(value);
                    } else {
                        this._builder.addColumnName(columnName);
                        itemBuilder.setParam(value);
                    }
                }

            }
        );

        this._builder.appendValueListUsingQueryBuilder(itemBuilder);

    }

    public appendEntityList<T extends Entity> (
        list                : readonly T[],
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        ignoreProperties    : readonly string[],
    ) : void {
        forEach(
            list,
            (item) => this.appendEntity(item, fields, temporalProperties, ignoreProperties)
        );
    }

    ///////////////////////         InsertQueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.getCompleteFromTable}
     */
    public getTableName (): string {
        return this._builder.getTableName();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.getCompleteFromTable}
     */
    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.getCompleteFromTable}
     */
    public getFullTableName (): string {
        return this._builder.getFullTableName();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.getCompleteFromTable}
     */
    public getTableNameWithPrefix (tableName : string): string {
        return this._builder.getTableNameWithPrefix(tableName);
    }



    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.valueOf}
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.toString}
     */
    public toString () : string {
        return this._builder.toString();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.build}
     */
    public build (): QueryBuildResult {
        return this._builder.build();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.buildQueryString}
     */
    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return this._builder.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link EntityInsertQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getQueryValueFactories();
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../../types/EntityField";
import { TemporalProperty } from "../../../../types/TemporalProperty";
import { MySqlInsertQueryBuilder } from "./MySqlInsertQueryBuilder";
import { EntityInsertQueryBuilder } from "../../../query/insert/EntityInsertQueryBuilder";
import { Entity } from "../../../../Entity";
import { forEach } from "../../../../../functions/forEach";
import { map } from "../../../../../functions/map";
import { has } from "../../../../../functions/has";
import { find } from "../../../../../functions/find";
import { MySqlListQueryBuilder } from "../types/MySqlListQueryBuilder";
import { filter } from "../../../../../functions/filter";
import { QueryBuildResult, QueryValueFactory } from "../../../query/types/QueryBuilder";
import { MY_TIME_COLUMN_DEFINITIONS } from "../../constants/mysql-queries";
import { LogService } from "../../../../../LogService";
import { EntityFieldType } from "../../../../types/EntityFieldType";
import { LogLevel } from "../../../../../types/LogLevel";

const LOG = LogService.createLogger( 'MySqlEntityInsertQueryBuilder' );

/**
 * Defines an interface for a builder of MySQL database read query from
 * entity types.
 */
export class MySqlEntityInsertQueryBuilder implements EntityInsertQueryBuilder {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

    private readonly _builder : MySqlInsertQueryBuilder;

    protected constructor () {
        this._builder = MySqlInsertQueryBuilder.create();
    }

    /**
     * Create select query builder for MySQL
     */
    public static create () : MySqlEntityInsertQueryBuilder {
        return new MySqlEntityInsertQueryBuilder();
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
        const timeDefinitions : readonly string[] = MY_TIME_COLUMN_DEFINITIONS;

        const properties : string[] = map(
            filter(
                fields,
                (field: EntityField) : boolean => {
                    const { propertyName, fieldType } = field;
                    return !ignoreProperties.includes(propertyName) && fieldType !== EntityFieldType.JOINED_ENTITY;
                }
            ),
            (field: EntityField) : string => {
                const { propertyName, columnName } = field;
                LOG.debug(`appendEntity: columnName: `, columnName);
                this._builder.addColumnName(columnName);
                return propertyName;
            }
        );

        const itemBuilder = MySqlListQueryBuilder.create();
        forEach(
            properties,
            (propertyName : string) => {

                const field = find(fields, (item) => item.propertyName === propertyName);
                if (!field) throw new TypeError(`Field info not found for property "${propertyName}"`);

                LOG.debug(`appendEntity: field: `, field);

                const { columnDefinition } = field;

                const temporalProperty : TemporalProperty | undefined = find(
                    temporalProperties,
                    (item: TemporalProperty) : boolean => item.propertyName === propertyName
                );
                const temporalType = temporalProperty?.temporalType;

                const isTime : boolean = !!temporalType || !!(columnDefinition && timeDefinitions.includes(columnDefinition));
                LOG.debug(`appendEntity: isTime: `, isTime);

                const value : any = has(entity, propertyName) ? (entity as any)[propertyName] : null;
                if ( isTime ) {
                    itemBuilder.setParamFromTimestampString(value);
                } else {
                    itemBuilder.setParam(value);
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

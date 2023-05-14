// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../../types/EntityField";
import { TemporalProperty } from "../../../../types/TemporalProperty";
import { MySqlUpdateQueryBuilder } from "./MySqlUpdateQueryBuilder";
import { EntityUpdateQueryBuilder } from "../../../query/update/EntityUpdateQueryBuilder";
import { Entity } from "../../../../Entity";
import { forEach } from "../../../../../functions/forEach";
import { map } from "../../../../../functions/map";
import { has } from "../../../../../functions/has";
import { find } from "../../../../../functions/find";
import { MySqlListQueryBuilder } from "../types/MySqlListQueryBuilder";
import { filter } from "../../../../../functions/filter";

/**
 * Defines an interface for a builder of MySQL database read query from
 * entity types.
 */
export class MySqlEntityUpdateQueryBuilder implements EntityUpdateQueryBuilder {

    private readonly _builder : MySqlUpdateQueryBuilder;

    protected constructor () {
        this._builder = MySqlUpdateQueryBuilder.create();
    }

    /**
     * Create select query builder for MySQL
     */
    public static create () : MySqlEntityUpdateQueryBuilder {
        return new MySqlEntityUpdateQueryBuilder();
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
        const timeDefinitions : readonly string[] = ['TIMESTAMP', 'DATETIME', 'DATE', 'TIME'];
        const itemBuilder = MySqlListQueryBuilder.create();

        const properties : string[] = map(
            filter(
                fields,
                (field: EntityField) : boolean => {
                    const { propertyName } = field;
                    return !ignoreProperties.includes(propertyName);
                }
            ),
            (field: EntityField) : string => {
                const { propertyName, columnName } = field;
                this._builder.addColumnName(columnName);
                return propertyName;
            }
        );

        forEach(
            properties,
            (propertyName : string) => {

                const field = find(fields, (item) => item.propertyName === propertyName);
                if (!field) throw new TypeError(`Field info not found for property "${propertyName}"`);

                const { columnDefinition } = field;

                const temporalProperty : TemporalProperty | undefined = find(
                    temporalProperties,
                    (item: TemporalProperty) : boolean => item.propertyName === propertyName
                );
                const temporalType = temporalProperty?.temporalType;

                const value : any = has(entity, propertyName) ? (entity as any)[propertyName] : null;

                if ( temporalType || (columnDefinition && timeDefinitions.includes(columnDefinition)) ) {
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

    ///////////////////////         UpdateQueryBuilder         ///////////////////////




    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
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
    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getCompleteFromTable}
     */
    public getFullTableName (): string {
        return this._builder.getFullTableName();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getCompleteFromTable}
     */
    public getTableNameWithPrefix (tableName : string): string {
        return this._builder.getTableNameWithPrefix(tableName);
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
    public build (): [ string, any[] ] {
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
    public buildQueryValues (): any[] {
        return this._builder.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link EntityUpdateQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): (() => any)[] {
        return this._builder.getQueryValueFactories();
    }

}

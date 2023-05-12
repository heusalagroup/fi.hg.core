// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EntityField } from "../../../../types/EntityField";
import { QueryBuilder } from "../../../types/QueryBuilder";
import { PgRowBuilder } from "./PgRowBuilder";
import { EntityFieldType } from "../../../../types/EntityFieldType";
import { PgJsonBuildObjectBuilder } from "./PgJsonBuildObjectBuilder";
import { EntityBuilderUtils } from "../../../utils/EntityBuilderUtils";
import { TemporalProperty } from "../../../../types/TemporalProperty";

/**
 * This generates formulas like `json_build_object(property, table.column[, property2, table2.column2[, ...]])`
 * but can configure it just by using the table name and entity field array.
 */
export class PgJsonBuildObjectEntityBuilder implements QueryBuilder {

    private readonly _builder : PgJsonBuildObjectBuilder;

    public constructor (
    ) {
        this._builder = new PgJsonBuildObjectBuilder();
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgJsonBuildObjectEntityBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public static create (
        tableName : string,
        fields    : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ) : PgJsonBuildObjectEntityBuilder {
        const f = new PgJsonBuildObjectEntityBuilder();
        f.setEntityFieldsFromTable(tableName, fields, temporalProperties);
        return f;
    }

    public setEntityFieldsFromTable (
        tableName : string,
        fields : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ) : void {
        EntityBuilderUtils.includeFields(
            tableName,
            fields,
            temporalProperties,
            (tableName: string, columnName: string, propertyName: string) => {
                this._builder.setPropertyAsTimestamp(columnName, tableName, columnName);
            },
            (tableName: string, columnName: string, propertyName: string) => {
                this._builder.setPropertyAsTimestamp(columnName, tableName, columnName);
            },
            (tableName: string, columnName: string, propertyName: string) => {
                this._builder.setPropertyAsTimestamp(columnName, tableName, columnName);
            },
            (tableName: string, columnName: string, propertyName: string) => {
                this._builder.setPropertyAsText(columnName, tableName, columnName);
            },
            (tableName: string, columnName: string, propertyName: string) => {
                this._builder.setProperty(columnName, tableName, columnName);
            },
        );
    }

    public build (): [ string, any[] ] {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    public buildQueryValues (): any[] {
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories (): (() => any)[] {
        return this._builder.getQueryValueFactories();
    }

}

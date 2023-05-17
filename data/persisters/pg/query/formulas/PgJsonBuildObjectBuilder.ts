// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgFunctionBuilder } from "./PgFunctionBuilder";
import { PgArgumentListBuilder } from "./PgArgumentList";
import { QueryBuilder } from "../../../query/types/QueryBuilder";

/**
 * This generates formulas like `json_build_object('property1', "table1"."column2"[, ...])`
 */
export class PgJsonBuildObjectBuilder extends PgFunctionBuilder {

    protected _arguments : PgArgumentListBuilder;

    public constructor () {
        super(false,'jsonb_build_object');
        this._arguments = new PgArgumentListBuilder();
        this.setFormulaFromQueryBuilder(this._arguments);
    }

    public static create (builder: QueryBuilder) : PgJsonBuildObjectBuilder {
        return new PgJsonBuildObjectBuilder();
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `"${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public setProperty (
        propertyName: string,
        tableName: string,
        columnName: string
    ) : void {
        this._arguments.setParamAsText(propertyName);
        this._arguments.setTableColumn(tableName, columnName);
    }

    public setPropertyAsText (
        propertyName: string,
        tableName: string,
        columnName: string
    ) : void {
        this._arguments.setParamAsText(propertyName);
        this._arguments.setTableColumnAsText(tableName, columnName);
    }

    public setPropertyAsTimestamp (
        propertyName: string,
        tableName: string,
        columnName: string
    ) : void {
        this._arguments.setParamAsText(propertyName);
        this._arguments.setTableColumnAsTimestamp(tableName, columnName);
    }

}

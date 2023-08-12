// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { FunctionQueryBuilder } from "../../types/FunctionQueryBuilder";
import { PgArgumentListBuilder } from "./PgArgumentList";
import { QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { PgAndChainBuilder } from "./PgAndChainBuilder";
import { map } from "../../../../functions/map";

/**
 * This generates formulas like `json_build_object('property1', "table1"."column2"[, ...])`
 */
export class PgJsonBuildObjectBuilder extends FunctionQueryBuilder {

    protected _ifNullChain : PgAndChainBuilder;
    protected _arguments : PgArgumentListBuilder;

    public constructor () {
        super(false,'jsonb_build_object');
        this._ifNullChain = PgAndChainBuilder.create();
        this._arguments = new PgArgumentListBuilder();

        this.setFormulaFromQueryBuilder(this._arguments);
    }

    public static create () : PgJsonBuildObjectBuilder {
        return new PgJsonBuildObjectBuilder();
    }


    public setProperty (
        propertyName: string,
        tableName: string,
        columnName: string
    ) : void {
        this._ifNullChain.setColumnIsNull(tableName, columnName);
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


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `"${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build () : QueryBuildResult {
        return super.build();
    }

    public buildQueryString () : string {
        return `CASE WHEN ${this._ifNullChain.buildQueryString()} THEN NULL ELSE ${super.buildQueryString()} END`;
    }

    public buildQueryValues () : readonly any[] {
        return map(this.getQueryValueFactories(), (f) => f());
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return [
            ...this._ifNullChain.getQueryValueFactories(),
            ...super.getQueryValueFactories()
        ];
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../../functions/map";
import { forEach } from "../../../../functions/forEach";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { PgQueryUtils } from "../utils/PgQueryUtils";
import { PgParameterListBuilder } from "./PgParameterListBuilder";
import { ChainQueryBuilder } from "../../types/ChainQueryBuilder";

/**
 * Generates formulas like `entity1[ AND entity2`
 */
export class PgAndChainBuilder implements ChainQueryBuilder {

    private readonly _formulaQuery : (() => string)[];
    private readonly _formulaValues : QueryValueFactory[];

    protected constructor () {
        this._formulaQuery = [];
        this._formulaValues = [];
    }

    public static create () : PgAndChainBuilder {
        return new PgAndChainBuilder();
    }



    public setColumnInList (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) {
        const builder = new PgParameterListBuilder();
        builder.setParams(values);
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} IN (${builder.buildQueryString()})` );
        forEach(
            builder.getQueryValueFactories(),
            (f) => this._formulaValues.push(f)
        );
    }

    public setColumnEquals (
        tableName : string,
        columnName : string,
        value : any
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} = ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => value);
    }

    public setColumnEqualsAsJson (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumnAsJsonB(tableName, columnName)} = ${PgQueryUtils.getValuePlaceholderAsJsonB()}` );
        this._formulaValues.push(() => value);
    }

    public setColumnIsNull (
        tableName : string,
        columnName : string
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} IS NULL` );
    }

    public setColumnBetween (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} BETWEEN ${PgQueryUtils.getValuePlaceholder()} AND ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => start);
        this._formulaValues.push(() => end);
    }

    public setColumnBefore (
        tableName : string,
        columnName : string,
        value : any,
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} < ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => value);
    }

    public setColumnAfter (
        tableName : string,
        columnName : string,
        value : any,
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} > ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => value);
    }



    public setColumnInListAsTime (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) {
        const builder = new PgParameterListBuilder();
        builder.setParams(values);
        // FIXME: This does not support .getValuePlaceholderAsTimestamp
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} IN (${builder.buildQueryString()})` );
        forEach(
            builder.getQueryValueFactories(),
            (f) => this._formulaValues.push(f)
        );
    }

    public setColumnEqualsAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} = ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => value);
    }

    public setColumnBetweenAsTime (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} BETWEEN ${PgQueryUtils.getValuePlaceholderAsTimestamp()} AND ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => start);
        this._formulaValues.push(() => end);
    }

    public setColumnBeforeAsTime (
        tableName : string,
        columnName : string,
        value : any,
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} < ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => value);
    }

    public setColumnAfterAsTime (
        tableName : string,
        columnName : string,
        value : any,
    ) {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} > ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => value);
    }




    public setFromQueryBuilder (
        builder: QueryBuilder
    ) {
        this._formulaQuery.push( () => builder.buildQueryString() );
        builder.getQueryValueFactories().forEach((factory)=> {
            this._formulaValues.push(factory);
        });
    }





    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgAndChainBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build (): QueryBuildResult {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        const formulaQuery = map(this._formulaQuery, (f) => f());
        return `(${formulaQuery.join(' AND ')})`;
    }

    public buildQueryValues () : readonly any[] {
        return map(this._formulaValues, (f) => f());
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._formulaValues;
    }

}

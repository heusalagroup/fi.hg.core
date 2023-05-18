// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { map } from "../../../../functions/map";
import { PgQueryUtils } from "../utils/PgQueryUtils";
import { PgParameterListBuilder } from "./PgParameterListBuilder";
import { forEach } from "../../../../functions/forEach";
import { ChainQueryBuilder } from "../../types/ChainQueryBuilder";

/**
 * Generates formulas like `(expression OR expression2)`
 */
export class PgOrChainBuilder implements ChainQueryBuilder {

    private readonly _formulaQuery : QueryStringFactory[];
    private readonly _formulaValues : QueryValueFactory[];

    protected constructor () {
        this._formulaQuery = [];
        this._formulaValues = [];
    }

    public static create () {
        return new PgOrChainBuilder();
    }


    /**
     * @inheritDoc
     */
    public setColumnInList (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) : void {
        const builder = new PgParameterListBuilder();
        builder.setParams(values);
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} IN (${builder.buildQueryString()})` );
        forEach(
            builder.getQueryValueFactories(),
            (f) => this._formulaValues.push(f)
        );
    }

    /**
     * @inheritDoc
     */
    public setColumnEquals (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} = ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => value);
    }

    /**
     * @inheritDoc
     */
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

    /**
     * @inheritDoc
     */
    public setColumnBefore (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} < ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => value);
    }

    /**
     * @inheritDoc
     */
    public setColumnAfter (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} > ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => value);
    }

    /**
     * @inheritDoc
     */
    public setColumnBetween (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} BETWEEN ${PgQueryUtils.getValuePlaceholder()} AND ${PgQueryUtils.getValuePlaceholder()}` );
        this._formulaValues.push(() => start);
        this._formulaValues.push(() => end);
    }


    /**
     * @inheritDoc
     */
    public setColumnInListAsTime (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) : void {
        const builder = new PgParameterListBuilder();
        builder.setParams(values);
        // FIXME: This does not support times
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} IN (${builder.buildQueryString()})` );
        forEach(
            builder.getQueryValueFactories(),
            (f) => this._formulaValues.push(f)
        );
    }

    /**
     * @inheritDoc
     */
    public setColumnEqualsAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} = ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => value);
    }

    /**
     * @inheritDoc
     */
    public setColumnBeforeAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} < ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => value);
    }

    /**
     * @inheritDoc
     */
    public setColumnAfterAsTime (
        tableName : string,
        columnName : string,
        value : any
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} > ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => value);
    }

    /**
     * @inheritDoc
     */
    public setColumnBetweenAsTime (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) : void {
        this._formulaQuery.push( () => `${PgQueryUtils.quoteTableAndColumn(tableName, columnName)} BETWEEN ${PgQueryUtils.getValuePlaceholderAsTimestamp()} AND ${PgQueryUtils.getValuePlaceholderAsTimestamp()}` );
        this._formulaValues.push(() => start);
        this._formulaValues.push(() => end);
    }





    /**
     * @inheritDoc
     */
    public setFromQueryBuilder (
        builder: QueryBuilder
    ) : void {
        this._formulaQuery.push( () => builder.buildQueryString() );
        builder.getQueryValueFactories().forEach((factory)=> {
            this._formulaValues.push(factory);
        });
    }






    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgOrChainBuilder ${this.buildQueryString()} with [${this.buildQueryValues().join(', ')}]`;
    }

    /**
     * @inheritDoc
     */
    public build (): QueryBuildResult {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    /**
     * @inheritDoc
     */
    public buildQueryString (): string {
        const formulaQuery = map(this._formulaQuery, (f) => f());
        return `(${formulaQuery.join(' OR ')})`;
    }

    /**
     * @inheritDoc
     */
    public buildQueryValues () : readonly any[] {
        return map(this._formulaValues, (f) => f());
    }

    /**
     * @inheritDoc
     */
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._formulaValues;
    }

}

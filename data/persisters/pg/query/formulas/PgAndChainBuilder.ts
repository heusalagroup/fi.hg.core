// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../query/types/QueryBuilder";
import { map } from "../../../../../functions/map";
import { PgQueryUtils } from "../../utils/PgQueryUtils";
import { PgParameterListBuilder } from "./PgParameterListBuilder";
import { forEach } from "../../../../../functions/forEach";
import { Where } from "../../../../Where";
import { ChainQueryBuilder } from "../../../query/types/ChainQueryBuilder";

/**
 * Generates formulas like `entity1[ AND entity2`
 */
export class PgAndChainBuilder implements ChainQueryBuilder {

    private readonly _formulaQuery : (() => string)[];
    private readonly _formulaValues : (() => any)[];

    constructor () {
        this._formulaQuery = [];
        this._formulaValues = [];
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgAndChainBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
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

    public setFromQueryBuilder (
        builder: QueryBuilder
    ) {
        this._formulaQuery.push( () => builder.buildQueryString() );
        builder.getQueryValueFactories().forEach((factory)=> {
            this._formulaValues.push(factory);
        });
    }

    public build (): [ string, any[] ] {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        const formulaQuery = map(this._formulaQuery, (f) => f());
        return `(${formulaQuery.join(' AND ')})`;
    }

    public buildQueryValues (): any[] {
        return map(this._formulaValues, (f) => f());
    }

    public getQueryValueFactories (): (() => any)[] {
        return this._formulaValues;
    }

}

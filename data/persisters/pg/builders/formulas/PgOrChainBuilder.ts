// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../types/QueryBuilder";
import { map } from "../../../../../functions/map";
import { PgQueryUtils } from "../../utils/PgQueryUtils";
import { PgParameterListBuilder } from "./PgParameterListBuilder";
import { forEach } from "../../../../../functions/forEach";
import { ChainQueryBuilder } from "../../../types/ChainQueryBuilder";

/**
 * Generates formulas like `(expression OR expression2)`
 */
export class PgOrChainBuilder implements ChainQueryBuilder {

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
        return `PgOrChainBuilder ${this.buildQueryString()} with [${this.buildQueryValues().join(', ')}]`;
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
    public setFromQueryBuilder (
        builder: QueryBuilder
    ) : void {
        this._formulaQuery.push( () => builder.buildQueryString() );
        builder.getQueryValueFactories().forEach((factory)=> {
            this._formulaValues.push(factory);
        });
    }

    /**
     * @inheritDoc
     */
    public build (): [ string, any[] ] {
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
    public buildQueryValues (): any[] {
        return map(this._formulaValues, (f) => f());
    }

    /**
     * @inheritDoc
     */
    public getQueryValueFactories (): (() => any)[] {
        return this._formulaValues;
    }

}

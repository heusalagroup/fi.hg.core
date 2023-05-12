// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../types/QueryBuilder";

/**
 * This generates formulas like `JSON_ARRAYAGG(formula)`
 */
export class MySqlJsonArrayAggBuilder implements QueryBuilder {

    private _builder : QueryBuilder | undefined;

    public constructor () {
        this._builder = undefined;
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return this._builder ? this._builder.toString() : 'unset MySqlJsonArrayAggBuilder';
    }

    public build (): [ string, any[] ] {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public setFormulaFromQueryBuilder (builder : QueryBuilder) {
        this._builder = builder;
    }

    public buildQueryString (): string {
        if (!this._builder) throw new TypeError(`Could not build JSON_ARRAYAGG() query: Query builder not initialized`);
        return `JSON_ARRAYAGG(${this._builder.buildQueryString()})`;
    }

    public buildQueryValues (): any[] {
        if (!this._builder) throw new TypeError(`Could not build JSON_ARRAYAGG() query: Query builder not initialized`);
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories (): (() => any)[] {
        if (!this._builder) throw new TypeError(`Could not build JSON_ARRAYAGG() query: Query builder not initialized`);
        return this._builder.getQueryValueFactories();
    }

}

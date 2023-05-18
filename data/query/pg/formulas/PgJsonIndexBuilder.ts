// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";

/**
 * This generates formulas like `formula->index` which return json array value by
 * index number.
 */
export class PgJsonIndexBuilder implements QueryBuilder {

    protected readonly _index : number;
    protected _builder : QueryBuilder | undefined;

    public constructor (index : number) {
        this._index = index;
        this._builder = undefined;
    }

    public static create (
        builder: QueryBuilder,
        index: number
    ) : PgJsonIndexBuilder {
        const f = new PgJsonIndexBuilder(index);
        f.setFormulaFromQueryBuilder(builder);
        return f;
    }

    public setFormulaFromQueryBuilder (builder : QueryBuilder) {
        this._builder = builder;
    }

    ///////////////////////         QueryBuilder         ///////////////////////

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgJsonIndexBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build (): QueryBuildResult {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        if (!this._builder) throw new TypeError(`Query builder not initialized`);
        return `${this._builder.buildQueryString()}->${this._index}`;
    }

    public buildQueryValues (): readonly any[] {
        if (!this._builder) throw new TypeError(`Query builder not initialized`);
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories (): readonly QueryValueFactory[] {
        if (!this._builder) throw new TypeError(`Query builder not initialized`);
        return this._builder.getQueryValueFactories();
    }

}

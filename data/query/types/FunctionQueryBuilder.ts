// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "./QueryBuilder";

/**
 * This generates formulas like `f(formula)`
 */
export class FunctionQueryBuilder implements QueryBuilder {

    /**
     * The function name
     * @private
     */
    protected readonly _name : string;

    /**
     * This is used in aggregate functions
     *
     * @private
     */
    protected readonly _distinct : boolean;

    protected _builder : QueryBuilder | undefined;

    /**
     *
     * @param distinct If enabled, will result in `f(DISTINCT formula)`.
     * @param name
     * @protected
     */
    protected constructor (
        distinct : boolean,
        name     : string
    ) {
        this._name = name ?? '';
        this._builder = undefined;
        this._distinct = distinct;
    }

    public static create (
        builder: QueryBuilder,
        distinct: boolean,
        name: string
    ) : FunctionQueryBuilder {
        const f = new FunctionQueryBuilder(distinct, name);
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
        return `PgFunctionBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build (): QueryBuildResult {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        if (!this._builder) throw new TypeError(`Could not build ${this._name}() query string: Query builder not initialized`);
        return `${this._name}(${this._distinct ? 'DISTINCT ': ''}${this._builder.buildQueryString()})`;
    }

    public buildQueryValues (): readonly any[] {
        if (!this._builder) throw new TypeError(`Could not build ${this._name}() query values: Query builder not initialized`);
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories (): readonly QueryValueFactory[] {
        if (!this._builder) throw new TypeError(`Could not build ${this._name}() query factories: Query builder not initialized`);
        return this._builder.getQueryValueFactories();
    }

}

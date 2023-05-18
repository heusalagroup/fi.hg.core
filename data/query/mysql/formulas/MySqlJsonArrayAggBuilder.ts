// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../types/QueryBuilder";
import { FunctionQueryBuilder } from "../../types/FunctionQueryBuilder";

/**
 * This generates formulas like `JSON_ARRAYAGG(formula)`
 *
 * If distinct option is enabled, this implementation will use workaround and
 * implement it using `CONCAT('[', GROUP_CONCAT(DISTINCT formula))` because
 * MySQL does not support DISTINCT on like `JSON_ARRAYAGG(DISTINCT formula)`
 * where formula is `JSON_OBJECT(...)`.
 *
 * @see https://stackoverflow.com/questions/70993552/how-to-return-distinct-values-in-a-json-arrayagg-when-using-json-object
 */
export class MySqlJsonArrayAggBuilder extends FunctionQueryBuilder {

    public constructor (distinct: boolean) {
        super(
            distinct,
            'JSON_ARRAYAGG'
        );
    }


    ///////////////////         FunctionQueryBuilder         ///////////////////


    public setFormulaFromQueryBuilder (builder : QueryBuilder) {
        super.setFormulaFromQueryBuilder(builder);
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public build (): readonly [ string, readonly any[] ] {
        return super.build();
    }

    public buildQueryString (): string {
        if (this._distinct) {
            if (!this._builder) throw new TypeError(`Could not build JSON_ARRAYAGG() query: Query builder not initialized`);
            return `CONCAT('[', GROUP_CONCAT(DISTINCT ${this._builder.buildQueryString()}), ']')`;
        }
        return super.buildQueryString();
    }

    public buildQueryValues (): readonly any[] {
        return super.buildQueryValues();
    }

    public getQueryValueFactories (): readonly (() => any)[] {
        return super.getQueryValueFactories();
    }


}

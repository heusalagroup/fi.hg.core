// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { FunctionQueryBuilder } from "../../types/FunctionQueryBuilder";
import { QueryBuilder } from "../../types/QueryBuilder";

/**
 * This generates formulas like `unnest(formula)`
 */
export class PgUnnestBuilder extends FunctionQueryBuilder {

    public constructor () {
        super(false,'unnest');
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgUnnestBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public static create (builder: QueryBuilder) : PgUnnestBuilder {
        const f = new PgUnnestBuilder();
        f.setFormulaFromQueryBuilder(builder);
        return f;
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgFunctionBuilder } from "./PgFunctionBuilder";
import { QueryBuilder } from "../../../types/QueryBuilder";

/**
 * This generates formulas like `array_agg(formula)`
 */
export class PgArrayAggBuilder extends PgFunctionBuilder {

    public constructor () {
        super('array_agg');
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgArrayAggBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public static create (builder: QueryBuilder) : PgArrayAggBuilder {
        const f = new PgArrayAggBuilder();
        f.setFormulaFromQueryBuilder(builder);
        return f;
    }

}

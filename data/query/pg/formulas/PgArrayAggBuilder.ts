// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { FunctionQueryBuilder } from "../../types/FunctionQueryBuilder";
import { QueryBuilder } from "../../types/QueryBuilder";

/**
 * This generates formulas like `array_agg([DISTINCT] formula)`
 */
export class PgArrayAggBuilder extends FunctionQueryBuilder {

    protected constructor (
        distinct : boolean,
        name     : string
    ) {
        super(distinct, name);
    }

    public static create (
        builder: QueryBuilder,
        distinct: boolean
    ) : PgArrayAggBuilder {
        const f = new PgArrayAggBuilder(distinct, 'array_agg');
        f.setFormulaFromQueryBuilder(builder);
        return f;
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgArrayAggBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

}

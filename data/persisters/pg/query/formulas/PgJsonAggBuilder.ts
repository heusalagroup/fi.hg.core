// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgFunctionBuilder } from "./PgFunctionBuilder";
import { QueryBuilder } from "../../../query/types/QueryBuilder";

/**
 * This generates formulas like `array_agg(formula)`
 */
export class PgJsonAggBuilder extends PgFunctionBuilder {

    public constructor () {
        super('json_agg');
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgJsonAggBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public static create (builder: QueryBuilder) : PgJsonAggBuilder {
        const f = new PgJsonAggBuilder();
        f.setFormulaFromQueryBuilder(builder);
        return f;
    }

}

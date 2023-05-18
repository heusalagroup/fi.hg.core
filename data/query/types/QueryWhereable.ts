// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryValueFactory } from "./QueryBuilder";

export interface QueryWhereable {


    /**
     * Builds the result query string
     */
    buildWhereQueryString () : string;

    /**
     * Builds the result value factory array
     */
    getWhereValueFactories () : readonly QueryValueFactory[];

    /**
     * Maps filtering options to the query from another query builder.
     *
     * @param builder
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;


}

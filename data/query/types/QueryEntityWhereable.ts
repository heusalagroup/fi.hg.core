// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryValueFactory } from "./QueryBuilder";
import { Where } from "../../Where";
import { EntityField } from "../../types/EntityField";
import { ChainQueryBuilder } from "./ChainQueryBuilder";
import { QueryWhereable } from "./QueryWhereable";
import { TemporalProperty } from "../../types/TemporalProperty";

export interface QueryEntityWhereable extends QueryWhereable {


    /**
     * Build a chain of "and" operations for filtering criteria.
     *
     * @param where The criteria to filter entities
     * @param tableName The table name without prefix
     * @param fields Entity field definitions
     * @param temporalProperties
     */
    buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[],
        temporalProperties     : readonly TemporalProperty[]
    ) : ChainQueryBuilder;


    ///////////////////////         QueryWhereable         ///////////////////////


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

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryStringFactory } from "./QueryBuilder";

export interface QueryGroupable {

    /**
     * Builds the group by query string
     */
    buildGroupByQueryString () : string;

    /**
     * Builds the group by value factory array
     */
    getGroupByValueFactories () : readonly QueryStringFactory[];

    /**
     * Set the query to group results by the column name.
     *
     * This is usually used with {@link SelectQueryBuilder.leftJoinTable} and
     * aggregation functions.
     *
     * @param columnName The column name
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    setGroupByColumn (columnName: string) : void;

    /**
     * Set group by column.
     *
     * @see {@link SelectQueryBuilder.getGroupByColumn}
     * @see {@link EntitySelectQueryBuilder.getGroupByColumn}
     */
    getGroupByColumn (): string | undefined;

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../types/QueryBuilder";
import { DeleteQueryBuilder } from "./DeleteQueryBuilder";
import { Where } from "../../../Where";
import { EntityField } from "../../../types/EntityField";
import { ChainQueryBuilder } from "../types/ChainQueryBuilder";

export interface EntityDeleteQueryBuilder extends DeleteQueryBuilder {



    ///////////////////////         DeleteQueryBuilder         ///////////////////////



    ///////////////////////         QueryWhereable         ///////////////////////


    /**
     * @inheritDoc
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;

    /**
     * @inheritDoc
     */
    buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[]
    ) : ChainQueryBuilder;


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     */
    getTablePrefix (): string;

    /**
     * @inheritDoc
     */
    setTablePrefix (prefix: string) : void;

    /**
     * @inheritDoc
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * @inheritDoc
     */
    getTableName (): string;

    /**
     * @inheritDoc
     */
    setTableName (tableName: string): void;

    /**
     * @inheritDoc
     */
    getCompleteTableName (): string;


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     * @see {@link QueryBuilder.toString}
     */
    valueOf() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     * @see {@link QueryBuilder.toString}
     */
    toString() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.build}
     */
    build () : QueryBuildResult;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     */
    buildQueryString () : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     */
    buildQueryValues () : readonly any[];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     */
    getQueryValueFactories () : readonly QueryValueFactory[];


}

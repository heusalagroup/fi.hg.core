// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { UpdateQueryBuilder } from "./UpdateQueryBuilder";
import { Entity } from "../../../Entity";
import { EntityField } from "../../../types/EntityField";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";

/**
 * Defines an interface for a builder of relational database create query.
 */
export interface EntityUpdateQueryBuilder extends UpdateQueryBuilder {


    /**
     * Sets the assigment list on the update query based on this entity.
     *
     * @param entity
     * @param fields
     * @param temporalProperties
     * @param ignoreProperties
     */
    appendEntity<T extends Entity> (
        entity              : T,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        ignoreProperties    : readonly string[],
    ) : void;


    ///////////////////////         UpdateQueryBuilder         ///////////////////////



    ///////////////////////         TableWhereable         ///////////////////////


    /**
     * @inheritDoc
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;


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

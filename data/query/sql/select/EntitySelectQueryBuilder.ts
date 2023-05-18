// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SelectQueryBuilder } from "./SelectQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { EntityField } from "../../../types/EntityField";
import { TemporalProperty } from "../../../types/TemporalProperty";
import { EntityRelationOneToMany } from "../../../types/EntityRelationOneToMany";
import { EntityRelationManyToOne } from "../../../types/EntityRelationManyToOne";
import { Where } from "../../../Where";
import { ChainQueryBuilder } from "../../types/ChainQueryBuilder";
import { Sort } from "../../../Sort";
import { QueryEntityWhereable } from "../../types/QueryEntityWhereable";
import { QueryEntityResultable } from "../../types/QueryEntityResultable";
import { QueryEntityOrderable } from "../../types/QueryEntityOrderable";

export type TableFieldInfoResponse = [EntityField[], TemporalProperty[]];
export type TableFieldInfoCallback = (tableName: string) => TableFieldInfoResponse;

/**
 * Defines an interface for a builder of relational database read query from
 * entity types.
 */
export interface EntitySelectQueryBuilder
    extends
        SelectQueryBuilder,
        QueryEntityWhereable,
        QueryEntityResultable,
        QueryEntityOrderable
{

    /**
     * Append a relation from one entity to many, e.g. the property will be an
     * array.
     *
     * The PostgreSQL query will look like this:
     *
     * ```
     * SELECT
     *   "carts".*,
     *   array_agg(ROW("cart_items"."cart_item_id", "cart_items"."cart_id", "cart_items"."cart_item_name")) AS "cartItems"
     * FROM carts
     * LEFT JOIN "cart_items" ON "carts"."cart_id" = "cart_items"."cart_id"
     * GROUP BY "carts"."cart_id";
     * ```
     *
     * MySQL persister will build a query like this:
     * SELECT
     *   carts.*,
     *   JSON_ARRAYAGG(JSON_OBJECT("cart_item_id", cart_items.cart_item_id, "cart_id", cart_items.cart_id, "cart_item_name", cart_items.cart_item_name)) AS cartItems
     * FROM carts
     * LEFT JOIN cart_items ON carts.cart_id = cart_items.cart_id
     * GROUP BY carts.cart_id;
     *
     * e.g.:
     *
     * SELECT
     *   ??.*,
     *   JSON_ARRAYAGG(JSON_OBJECT(?, ??.??, ?, ??.??, ?, ??.??)) AS ??
     * FROM ??
     * LEFT JOIN ?? ON ??.?? = ??.??
     * GROUP BY ??.??;
     *
     * @param propertyName
     * @param fields
     * @param temporalProperties
     * @param targetTableName
     * @param targetColumnName
     * @param sourceTableName
     * @param sourceColumnName
     */
    setOneToMany (
        propertyName: string,
        fields: readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        targetTableName : string,
        targetColumnName : string,
        sourceTableName  : string,
        sourceColumnName : string
    ): void;

    /**
     * Append a relation from many entities to one, e.g. the property will be
     * single entity object.
     *
     * The PostgreSQL query will look like this:
     * ```
     * SELECT
     *   "cart_items".*,
     *   json_agg(json_build_object('cart_id', "carts"."cart_id", 'cart_name', "carts"."cart_name"))->0 AS cart
     * FROM "cart_items"
     * LEFT JOIN "carts" ON "carts"."cart_id" = "cart_items"."cart_id"
     * GROUP BY "cart_items"."cart_item_id";
     * ```
     *
     * ***Note*** that this only works if the "carts"."carts_id" is unique!
     * There will be multiple entities returned if not.
     *
     *
     * MySQL persister will do query like this:
     *
     * SELECT
     *   cart_items.*,
     *   JSON_OBJECT("cart_id", carts.cart_id, "cart_name", carts.cart_name) AS cart
     * FROM cart_items
     * LEFT JOIN carts ON carts.cart_id = cart_items.cart_id
     * GROUP BY cart_items.cart_item_id;
     *
     * SELECT
     *   ??.*,
     *   JSON_OBJECT(?, ??.??, ?, ??.??) AS ??
     * FROM ??
     * LEFT JOIN ?? ON ??.?? = ??.??
     * GROUP BY ??.??;
     *
     * @param propertyName
     * @param fields
     * @param temporalProperties
     * @param targetTableName
     * @param targetColumnName
     * @param sourceTableName
     * @param sourceColumnName
     */
    setManyToOne (
        propertyName: string,
        fields: readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[],
        targetTableName : string,
        targetColumnName : string,
        sourceTableName  : string,
        sourceColumnName : string
    ): void;

    /**
     *
     * @param relations
     * @param resolveMappedFieldInfo
     */
    setOneToManyRelations (
        relations: readonly EntityRelationOneToMany[],
        resolveMappedFieldInfo: TableFieldInfoCallback,
    ): void;

    /**
     *
     * @param relations
     * @param resolveMappedFieldInfo
     * @param fields
     * @param temporalProperties
     */
    setManyToOneRelations (
        relations: readonly EntityRelationManyToOne[],
        resolveMappedFieldInfo: TableFieldInfoCallback,
        fields: readonly EntityField[],
        temporalProperties: readonly TemporalProperty[]
    ): void;


    ///////////////////////         QueryEntityResultable         ///////////////////////


    includeEntityFields (
        tableName           : string,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ): void;


    ///////////////////////         TableResultable         ///////////////////////



    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumn}
     */
    includeColumn (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsText}
     */
    includeColumnAsText (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTime}
     */
    includeColumnAsTime (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsDate}
     */
    includeColumnAsDate (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnAsTimestamp}
     */
    includeColumnAsTimestamp (tableName: string, columnName: string, asColumnName: string) : void;

    /**
     * @deprecated Use EntitySelectQueryBuilder.includeEntityFields instead of
     * this method.
     *
     * @inheritDoc
     * @see {@link EntitySelectQueryBuilder.includeEntityFields}
     * @see {@link SelectQueryBuilder.includeAllColumnsFromTable}
     */
    includeAllColumnsFromTable (tableName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeColumnFromQueryBuilder}
     */
    includeColumnFromQueryBuilder (builder: QueryBuilder, asColumnName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.includeFormulaByString}
     */
    includeFormulaByString (formula: string, asColumnName: string): void;


    /**
     * Include fields from an entity in to the query.
     *
     * @param tableName The table name
     * @param fields Entity field definitions
     * @param temporalProperties Temporal property definitions
     */
    includeEntityFields (
        tableName           : string,
        fields              : readonly EntityField[],
        temporalProperties  : readonly TemporalProperty[]
    ): void;


    ///////////////////////         QueryGroupable         ///////////////////////



    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setGroupByColumn}
     */
    setGroupByColumn (columnName: string) : void;


    ///////////////////////         QueryOrderable         ///////////////////////


    /**
     * Set order of fields.
     *
     * @param sort The sorting configuration
     * @param tableName The table name
     * @param fields Entity field definitions
     */
    setOrderByTableFields (
        sort      : Sort,
        tableName : string,
        fields    : readonly EntityField[]
    ): void;


    ///////////////////////         QueryLeftJoinable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.leftJoinTable}
     */
    leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) : void;


    ///////////////////////         QueryEntityWhereable         ///////////////////////


    /**
     * @inheritDoc
     */
    buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[],
        temporalProperties    : readonly TemporalProperty[]
    ) : ChainQueryBuilder;


    ///////////////////////         QueryWhereable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     */
    setWhereFromQueryBuilder (builder: QueryBuilder): void;


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setTablePrefix}
     */
    setTablePrefix (prefix: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getTablePrefix}
     */
    getTablePrefix () : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteTableName}
     */
    getTableNameWithPrefix (tableName : string) : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setFromTable}
     */
    setTableName (tableName: string) : void;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getShortFromTable}
     */
    getTableName () : string;

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.getCompleteFromTable}
     */
    getCompleteTableName () : string;




    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link QueryBuilder.valueOf}
     * @see {@link SelectQueryBuilder.valueOf}
     */
    valueOf() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.toString}
     * @see {@link SelectQueryBuilder.toString}
     */
    toString() : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.build}
     * @see {@link SelectQueryBuilder.build}
     */
    build () : QueryBuildResult;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryString}
     * @see {@link SelectQueryBuilder.buildQueryString}
     */
    buildQueryString () : string;

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.buildQueryValues}
     * @see {@link SelectQueryBuilder.buildQueryValues}
     */
    buildQueryValues () : readonly any[];

    /**
     * @inheritDoc
     * @see {@link QueryBuilder.getQueryValueFactories}
     * @see {@link SelectQueryBuilder.getQueryValueFactories}
     */
    getQueryValueFactories () : readonly QueryValueFactory[];



}

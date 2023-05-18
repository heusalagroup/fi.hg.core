// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MySqlDeleteQueryBuilder } from "./MySqlDeleteQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { EntityField } from "../../../types/EntityField";
import { Where } from "../../../Where";
import { MySqlAndChainBuilder } from "../formulas/MySqlAndChainBuilder";
import { ChainQueryBuilderUtils } from "../../utils/ChainQueryBuilderUtils";
import { MySqlOrChainBuilder } from "../formulas/MySqlOrChainBuilder";
import { EntityDeleteQueryBuilder } from "../../sql/delete/EntityDeleteQueryBuilder";
import { ChainQueryBuilder } from "../../types/ChainQueryBuilder";
import { TemporalProperty } from "../../../types/TemporalProperty";

export class MySqlEntityDeleteQueryBuilder implements EntityDeleteQueryBuilder {

    private _builder : MySqlDeleteQueryBuilder;

    public constructor () {
        this._builder = new MySqlDeleteQueryBuilder();
    }

    public buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[],
        temporalProperties     : readonly TemporalProperty[]
    ) : ChainQueryBuilder {
        const completeTableName = this.getTableNameWithPrefix(tableName);
        const andBuilder = MySqlAndChainBuilder.create();
        ChainQueryBuilderUtils.buildChain(
            andBuilder,
            where,
            completeTableName,
            fields,
            temporalProperties,
            () => MySqlAndChainBuilder.create(),
            () => MySqlOrChainBuilder.create()
        );
        return andBuilder;
    }


    ///////////////////////         EntityDeleteQueryBuilder         ///////////////////////



    ///////////////////////         QueryWhereable         ///////////////////////


    buildWhereQueryString () : string {
        return this._builder.buildWhereQueryString();
    }

    getWhereValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getWhereValueFactories();
    }

    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        return this._builder.setWhereFromQueryBuilder(builder);
    }


    ///////////////////////         TablePrefixable         ///////////////////////


    /**
     * @inheritDoc
     */
    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     */
    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    /**
     * @inheritDoc
     */
    public getTableNameWithPrefix (tableName: string): string {
        return this._builder.getTableNameWithPrefix(tableName);
    }

    /**
     * @inheritDoc
     */
    public getTableName (): string {
        return this._builder.getTableName();
    }

    /**
     * @inheritDoc
     */
    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    /**
     * @inheritDoc
     */
    public getCompleteTableName (): string {
        return this._builder.getCompleteTableName();
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return this._builder.toString();
    }

    public build (): QueryBuildResult {
        return this._builder.build();
    }

    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    public buildQueryValues () : readonly any[] {
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._builder.getQueryValueFactories();
    }


}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgDeleteQueryBuilder } from "./PgDeleteQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { EntityField } from "../../../types/EntityField";
import { PgAndChainBuilder } from "../formulas/PgAndChainBuilder";
import { Where } from "../../../Where";
import { ChainQueryBuilderUtils } from "../../utils/ChainQueryBuilderUtils";
import { PgOrChainBuilder } from "../formulas/PgOrChainBuilder";
import { EntityDeleteQueryBuilder } from "../../sql/delete/EntityDeleteQueryBuilder";
import { TemporalProperty } from "../../../types/TemporalProperty";

export class PgEntityDeleteQueryBuilder implements EntityDeleteQueryBuilder {

    private _builder : PgDeleteQueryBuilder;

    public constructor () {
        this._builder = new PgDeleteQueryBuilder();
    }


    ///////////////////////         EntityDeleteQueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     */
    public buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[],
        temporalProperties    : readonly TemporalProperty[],
    ) : PgAndChainBuilder {
        const completeTableName = this.getTableNameWithPrefix(tableName);
        const andBuilder = PgAndChainBuilder.create();
        ChainQueryBuilderUtils.buildChain(andBuilder, where, completeTableName, fields, temporalProperties, () => PgAndChainBuilder.create(), () => PgOrChainBuilder.create());
        return andBuilder;
    }


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


    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    public getTableNameWithPrefix (tableName: string): string {
        return this._builder.getTableNameWithPrefix(tableName);
    }

    public setTableName (tableName: string): void {
        return this._builder.setTableName(tableName);
    }

    public getTableName (): string {
        return this._builder.getTableName();
    }

    public getCompleteTableName (): string {
        return this._builder.getCompleteTableName();
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgEntityDeleteQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build (): QueryBuildResult {
        return this._builder.build();
    }

    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    public buildQueryValues (): readonly any[] {
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return this._builder.getQueryValueFactories();
    }


}

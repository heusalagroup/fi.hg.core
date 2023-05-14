// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MySqlDeleteQueryBuilder } from "./MySqlDeleteQueryBuilder";
import { DeleteQueryBuilder } from "../../../query/delete/DeleteQueryBuilder";
import { QueryBuilder } from "../../../query/types/QueryBuilder";
import { EntityField } from "../../../../types/EntityField";
import { Where } from "../../../../Where";
import { MySqlAndChainBuilder } from "../formulas/MySqlAndChainBuilder";
import { ChainQueryBuilderUtils } from "../../../query/utils/ChainQueryBuilderUtils";
import { MySqlOrChainBuilder } from "../formulas/MySqlOrChainBuilder";

export class MySqlEntityDeleteQueryBuilder implements DeleteQueryBuilder {

    private _builder : MySqlDeleteQueryBuilder;

    public constructor () {
        this._builder = new MySqlDeleteQueryBuilder();
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return this._builder.toString();
    }

    public build (): [ string, any[] ] {
        return this._builder.build();
    }

    public buildQueryString (): string {
        return this._builder.buildQueryString();
    }

    public buildQueryValues (): any[] {
        return this._builder.buildQueryValues();
    }

    public getQueryValueFactories (): (() => any)[] {
        return this._builder.getQueryValueFactories();
    }

    public setFromTable (tableName: string): void {
        return this._builder.setFromTable(tableName);
    }

    public getShortFromTable (): string {
        return this._builder.getShortFromTable();
    }

    public getCompleteFromTable (): string {
        return this._builder.getCompleteFromTable();
    }

    public setTablePrefix (prefix: string): void {
        return this._builder.setTablePrefix(prefix);
    }

    public getTablePrefix (): string {
        return this._builder.getTablePrefix();
    }

    public getCompleteTableName (tableName: string): string {
        return this._builder.getCompleteTableName(tableName);
    }

    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        return this._builder.setWhereFromQueryBuilder(builder);
    }

    public buildAnd (
        where     : Where,
        tableName : string,
        fields    : readonly EntityField[]
    ) {
        const completeTableName = this.getCompleteTableName(tableName);
        const andBuilder = new MySqlAndChainBuilder();
        ChainQueryBuilderUtils.buildChain(
            andBuilder,
            where,
            completeTableName,
            fields,
            () => new MySqlAndChainBuilder(),
            () => new MySqlOrChainBuilder()
        );
        return andBuilder;
    }

}

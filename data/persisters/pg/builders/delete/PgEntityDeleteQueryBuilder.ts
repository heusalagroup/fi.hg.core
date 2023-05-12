// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgDeleteQueryBuilder } from "./PgDeleteQueryBuilder";
import { DeleteQueryBuilder } from "../../../types/DeleteQueryBuilder";
import { QueryBuilder } from "../../../types/QueryBuilder";
import { EntityField } from "../../../../types/EntityField";
import { PgAndChainBuilder } from "../formulas/PgAndChainBuilder";
import { Where } from "../../../../Where";
import { ChainQueryBuilderUtils } from "../../../utils/ChainQueryBuilderUtils";
import { PgOrChainBuilder } from "../formulas/PgOrChainBuilder";

export class PgEntityDeleteQueryBuilder implements DeleteQueryBuilder {

    private _builder : PgDeleteQueryBuilder;

    public constructor () {
        this._builder = new PgDeleteQueryBuilder();
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgEntityDeleteQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
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
    ) : PgAndChainBuilder {
        const completeTableName = this.getCompleteTableName(tableName);
        const andBuilder = new PgAndChainBuilder();
        ChainQueryBuilderUtils.buildChain(andBuilder, where, completeTableName, fields, () => new PgAndChainBuilder(), () => new PgOrChainBuilder());
        return andBuilder;
    }

}

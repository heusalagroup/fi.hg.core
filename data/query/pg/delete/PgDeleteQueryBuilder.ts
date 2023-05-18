// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { DeleteQueryBuilder } from "../../sql/delete/DeleteQueryBuilder";
import { PgQueryUtils } from "../utils/PgQueryUtils";

export class PgDeleteQueryBuilder implements DeleteQueryBuilder {

    private _tableName   : string | undefined;
    private _tablePrefix : string = '';
    private _where       : QueryBuilder | undefined;

    public constructor () {
        this._tableName = undefined;
        this._where = undefined;
        this._tablePrefix = '';
    }



    ///////////////////////         QueryWhereable         ///////////////////////


    buildWhereQueryString () : string {
        return this._where ? this._where.buildQueryString() : '';
    }

    getWhereValueFactories () : readonly QueryValueFactory[] {
        return this._where ? this._where.getQueryValueFactories() : [];
    }

    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
    }



    ///////////////////////         TablePrefixable         ///////////////////////



    public setTablePrefix (prefix: string) {
        this._tablePrefix = prefix;
    }

    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    public getTableNameWithPrefix (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }

    public setTableName (tableName: string) {
        this._tableName = tableName;
    }

    public getTableName (): string {
        if (!this._tableName) throw new TypeError(`From table has not been initialized yet`);
        return this._tableName;
    }

    public getCompleteTableName (): string {
        if (!this._tableName) throw new TypeError(`From table has not been initialized yet`);
        return this.getTableNameWithPrefix(this._tableName);
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     */
    public toString () : string {
        return `PgDeleteQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    /**
     * @inheritDoc
     */
    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    /**
     * @inheritDoc
     */
    public buildQueryString () : string {
        let query = `DELETE FROM ${PgQueryUtils.quoteTableName(this.getCompleteTableName())}`;
        if (this._where) {
            query += ` WHERE ${this._where.buildQueryString()}`;
        }
        return query;
    }

    /**
     * @inheritDoc
     */
    public buildQueryValues () : readonly any[] {
        return [
            ...( this._where ? this._where.buildQueryValues() : [])
        ];
    }

    /**
     * @inheritDoc
     */
    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return [
            ...( this._where ? this._where.getQueryValueFactories() : [])
        ];
    }


}

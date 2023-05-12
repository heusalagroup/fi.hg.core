// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../types/QueryBuilder";
import { DeleteQueryBuilder } from "../../../types/DeleteQueryBuilder";
import { PgQueryUtils } from "../../utils/PgQueryUtils";

export class PgDeleteQueryBuilder implements DeleteQueryBuilder {

    private _tableName   : string | undefined;
    private _tablePrefix : string = '';
    private _where       : QueryBuilder | undefined;

    public constructor () {
        this._tableName = undefined;
        this._where = undefined;
        this._tablePrefix = '';
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `PgDeleteQueryBuilder "${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public setTablePrefix (prefix: string) {
        this._tablePrefix = prefix;
    }

    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    public getCompleteTableName (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }

    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
    }

    public setFromTable (tableName: string) {
        this._tableName = tableName;
    }

    public getCompleteFromTable (): string {
        if (!this._tableName) throw new TypeError(`From table has not been initialized yet`);
        return this.getCompleteTableName(this._tableName);
    }

    public getShortFromTable (): string {
        if (!this._tableName) throw new TypeError(`From table has not been initialized yet`);
        return this._tableName;
    }

    public build () : [string, any[]] {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        if (!this._tableName) throw new TypeError('Table must be selected');
        let query = `DELETE FROM ${PgQueryUtils.quoteTableName(this.getCompleteTableName(this._tableName))}`;
        if (this._where) {
            query += ` WHERE ${this._where.buildQueryString()}`;
        }
        return query;
    }

    public buildQueryValues () : any[] {
        return [
            ...( this._where ? this._where.buildQueryValues() : [])
        ];
    }

    public getQueryValueFactories (): (() => any)[] {
        return [
            ...( this._where ? this._where.getQueryValueFactories() : [])
        ]
    }

}

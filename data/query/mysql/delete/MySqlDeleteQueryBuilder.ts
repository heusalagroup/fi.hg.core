// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";
import { DeleteQueryBuilder } from "../../sql/delete/DeleteQueryBuilder";
import { MY_PH_FROM_TABLE } from "../constants/mysql-queries";

export class MySqlDeleteQueryBuilder implements DeleteQueryBuilder {

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


    /**
     * @inheritDoc
     */
    public setTablePrefix (prefix: string) {
        this._tablePrefix = prefix;
    }

    /**
     * @inheritDoc
     */
    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    /**
     * @inheritDoc
     */
    public getTableNameWithPrefix (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }

    /**
     * @inheritDoc
     */
    public setTableName (tableName: string) {
        this._tableName = tableName;
    }

    /**
     * @inheritDoc
     */
    public getTableName (): string {
        if (!this._tableName) throw new TypeError(`From table has not been initialized yet`);
        return this._tableName;
    }

    /**
     * @inheritDoc
     */
    public getCompleteTableName (): string {
        if (!this._tableName) throw new TypeError(`From table has not been initialized yet`);
        return this.getTableNameWithPrefix(this._tableName);
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `DELETE "${this._tablePrefix}${this._tableName}" ${this._where}`;
    }

    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        if (!this._tableName) throw new TypeError('Table must be selected');
        let query = `DELETE ${MY_PH_FROM_TABLE}`;
        if (this._where) {
            query += ` WHERE ${this._where.buildQueryString()}`;
        }
        return query;
    }

    public buildQueryValues () : readonly any[] {
        return [
            this.getCompleteTableName(),
            ...( this._where ? this._where.buildQueryValues() : [])
        ];
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return [
            () => this.getCompleteTableName(),
            ...( this._where ? this._where.getQueryValueFactories() : [])
        ]
    }


}

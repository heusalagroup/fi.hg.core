// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "../../../persisters/types/QueryBuilder";
import { map } from "../../../../functions/map";

export class MySqlAndBuilder implements QueryBuilder {

    private _formulaQuery : (() => string)[];
    private _formulaValues : (() => any)[];

    constructor () {
        this._formulaQuery = [];
        this._formulaValues = [];
    }

    public setColumnInList (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) {
        this._formulaQuery.push( () => `??.?? IN (?)` );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => values);
    }

    public setColumnEquals (
        tableName : string,
        columnName : string,
        value : any
    ) {
        this._formulaQuery.push( () => `??.?? = ?` );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => value);
    }

    public setColumnEqualsByLastInsertId (
        tableName : string,
        columnName : string
    ) {
        this._formulaQuery.push( () => `??.?? = LAST_INSERT_ID()` );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
    }

    public build (): [ string, any[] ] {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        const formulaQuery = map(this._formulaQuery, (f) => f());
        return formulaQuery.join(' AND ');
    }

    public buildQueryValues (): any[] {
        return map(this._formulaValues, (f) => f());
    }

    public getQueryValueFactories (): (() => any)[] {
        return this._formulaValues;
    }

}

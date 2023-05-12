// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../../../functions/map";
import { ChainQueryBuilder } from "../../../types/ChainQueryBuilder";
import { QueryBuilder } from "../../../types/QueryBuilder";
import { PH_TABLE_COLUMN_AFTER, PH_TABLE_COLUMN_BEFORE, PH_TABLE_COLUMN_BETWEEN_RANGE, PH_TABLE_COLUMN_EQUAL, PH_TABLE_COLUMN_EQUALS_LAST_INSERT_ID, PH_TABLE_COLUMN_IN } from "../../constants/queries";

export class MySqlOrChainBuilder implements ChainQueryBuilder {

    private readonly _formulaQuery : (() => string)[];
    private readonly _formulaValues : (() => any)[];

    constructor () {
        this._formulaQuery = [];
        this._formulaValues = [];
    }

    public valueOf () {
        return this.toString();
    }

    public toString () : string {
        return `"${this._formulaQuery.map(item => item.toString()).join(' OR ')}" with ${this._formulaValues.map(item=>item()).join(' ')}`;
    }

    public setColumnInList (
        tableName : string,
        columnName : string,
        values : readonly any[]
    ) {
        this._formulaQuery.push( () => PH_TABLE_COLUMN_IN );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => values);
    }

    public setColumnEquals (
        tableName : string,
        columnName : string,
        value : any
    ) {
        this._formulaQuery.push( () => PH_TABLE_COLUMN_EQUAL );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => value);
    }

    public setColumnBefore (
        tableName : string,
        columnName : string,
        value : any
    ) {
        this._formulaQuery.push( () => PH_TABLE_COLUMN_BEFORE );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => value);
    }

    public setColumnAfter (
        tableName : string,
        columnName : string,
        value : any
    ) {
        this._formulaQuery.push( () => PH_TABLE_COLUMN_AFTER );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => value);
    }

    public setColumnBetween (
        tableName : string,
        columnName : string,
        start : any,
        end : any,
    ) {
        this._formulaQuery.push( () => PH_TABLE_COLUMN_BETWEEN_RANGE );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
        this._formulaValues.push(() => start);
        this._formulaValues.push(() => end);
    }

    public setColumnEqualsByLastInsertId (
        tableName : string,
        columnName : string
    ) {
        this._formulaQuery.push( () => PH_TABLE_COLUMN_EQUALS_LAST_INSERT_ID );
        this._formulaValues.push(() => tableName);
        this._formulaValues.push(() => columnName);
    }

    public build (): [ string, any[] ] {
        return [ this.buildQueryString(), this.buildQueryValues() ];
    }

    public buildQueryString (): string {
        const formulaQuery = map(this._formulaQuery, (f) => f());
        return `(${formulaQuery.join(') OR (')})`;
    }

    public buildQueryValues (): any[] {
        return map(this._formulaValues, (f) => f());
    }

    public getQueryValueFactories (): (() => any)[] {
        return this._formulaValues;
    }

    public setFromQueryBuilder (builder: QueryBuilder): void {
        this._formulaQuery.push( () => builder.buildQueryString() );
        builder.getQueryValueFactories().forEach((factory)=> {
            this._formulaValues.push(factory);
        });
    }

}

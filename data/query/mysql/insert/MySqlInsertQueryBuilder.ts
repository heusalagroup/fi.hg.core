// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InsertQueryBuilder } from "../../sql/insert/InsertQueryBuilder";
import {
    MY_PH_COLUMN,
    MY_PH_INTO_TABLE,
    MY_PH_VALUE
} from "../constants/mysql-queries";
import { BaseInsertQueryBuilder } from "../../sql/insert/BaseInsertQueryBuilder";
import { map } from "../../../../functions/map";
import { reduce } from "../../../../functions/reduce";
import { has } from "../../../../functions/has";
import { QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";

export class MySqlInsertQueryBuilder extends BaseInsertQueryBuilder implements InsertQueryBuilder {

    private readonly _columnNames : string[];

    protected constructor () {
        super(', ');
        this._columnNames = [];
        this.addPrefixFactory(
            () => `INSERT ${MY_PH_INTO_TABLE}`,
            () => this.getFullTableName()
        );
    }

    public static create () : MySqlInsertQueryBuilder {
        return new MySqlInsertQueryBuilder();
    }

    public addPrefixFactory (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.addPrefixFactory(queryFactory, ...valueFactories);
    }

    public addValueFactory (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        super.addValueFactory(queryFactory, ...valueFactories);
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.includeColumn}
     */
    public appendValueList (
        list: readonly any[]
    ) : void {
        const queryString = `(${map(list, () => MY_PH_VALUE).join(', ')})`;
        const valueFactories = map(list, (item) => () => item);
        this.addValueFactory(
            () : string => queryString,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.includeColumn}
     */
    public appendValueObject (
        columnNames: readonly string[],
        obj: {readonly [key: string] : any}
    ) : void {
        if (!columnNames?.length) throw new TypeError(`There must be at least one column name`);
        this.appendValueList(
            reduce(
                columnNames,
                (list: any[], columnName: string) : any[] => {
                    if (has(obj, columnName)) {
                        list.push(obj[columnName]);
                    } else {
                        list.push(null);
                    }
                    return list;
                },
                []
            )
        );
    }


    public addColumnName (
        name: string
    ) : void {
        if (this._columnNames.includes(name)) return;
        this._columnNames.push(name);
        this.addColumnFactory(
            () => MY_PH_COLUMN,
            () => name
        );
    }


    ///////////////////////      InsertQueryBuilder      ///////////////////////


    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return super.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) : void {
        super.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getTablePrefix}
     */
    public getTableName (): string {
        return super.getTableName();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string) : void {
        super.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getCompleteFromTable}
     */
    public getFullTableName (): string {
        return super.getFullTableName();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getCompleteTableName}
     */
    public getTableNameWithPrefix (tableName : string) : string {
        return super.getTableNameWithPrefix(tableName);
    }



    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.valueOf}
     */
    public valueOf () {
        return super.valueOf();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.toString}
     */
    public toString () : string {
        return super.toString();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.build}
     */
    public build () : QueryBuildResult {
        return super.build();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {
        return super.buildQueryString();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return super.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return super.getQueryValueFactories();
    }

}

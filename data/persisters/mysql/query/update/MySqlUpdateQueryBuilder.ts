// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { UpdateQueryBuilder } from "../../../query/update/UpdateQueryBuilder";
import {
    PH_TABLE_NAME,
    PH_VALUE
} from "../../constants/queries";
import { BaseUpdateQueryBuilder } from "../../../query/update/BaseUpdateQueryBuilder";
import { map } from "../../../../../functions/map";
import { reduce } from "../../../../../functions/reduce";
import { has } from "../../../../../functions/has";

export class MySqlUpdateQueryBuilder extends BaseUpdateQueryBuilder implements UpdateQueryBuilder {

    protected constructor () {
        super();
        this.addPrefixFactory(
            () => `UDDATE ${PH_TABLE_NAME}`,
            () => this.getFullTableName()
        );
    }

    public static create () : MySqlUpdateQueryBuilder {
        return new MySqlUpdateQueryBuilder();
    }

    public addPrefixFactory (
        queryFactory  : (() => string),
        ...valueFactories : (() => any)[]
    ) : void {
        super.addPrefixFactory(queryFactory, ...valueFactories);
    }

    public addValueFactory (
        queryFactory  : (() => string),
        ...valueFactories : (() => any)[]
    ) : void {
        super.addValueFactory(queryFactory, ...valueFactories);
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.includeColumn}
     */
    public appendValueList (
        list: readonly any[]
    ) : void {
        const queryString = `(${map(list, () => PH_VALUE).join(', ')})`;
        const valueFactories = map(list, (item) => () => item);
        this.addValueFactory(
            () : string => queryString,
            ...valueFactories
        );
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.includeColumn}
     */
    public appendValueObject (
        obj: {readonly [key: string] : any}
    ) : void {
        const columnNames = this.getColumnNames();
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


    ///////////////////////      UpdateQueryBuilder      ///////////////////////


    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return super.getTablePrefix();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) : void {
        super.setTablePrefix(prefix);
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getTablePrefix}
     */
    public getTableName (): string {
        return super.getTableName();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string) : void {
        super.setTableName(tableName);
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getCompleteFromTable}
     */
    public getFullTableName (): string {
        return super.getFullTableName();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getCompleteTableName}
     */
    public getTableNameWithPrefix (tableName : string) : string {
        return super.getTableNameWithPrefix(tableName);
    }



    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.valueOf}
     */
    public valueOf () {
        return super.valueOf();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.toString}
     */
    public toString () : string {
        return super.toString();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.build}
     */
    public build () : [string, any[]] {
        return super.build();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {
        return super.buildQueryString();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : any[] {
        return super.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): (() => any)[] {
        return super.getQueryValueFactories();
    }

}

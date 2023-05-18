// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BaseUpdateQueryBuilder } from "../../sql/update/BaseUpdateQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";
import { PgQueryUtils } from "../utils/PgQueryUtils";

export class PgUpdateQueryBuilder extends BaseUpdateQueryBuilder {

    protected constructor () {
        super();
        this.addPrefixFactory(
            () => `UPDATE ${PgQueryUtils.quoteTableName(this.getCompleteTableName())}`
        );
    }

    public static create () : PgUpdateQueryBuilder {
        return new PgUpdateQueryBuilder();
    }


    ///////////////////////      BaseUpdateQueryBuilder      ///////////////////////





    ///////////////////////      UpdateQueryBuilder      ///////////////////////


    /**
     * @inheritDoc
     */
    public addPrefixFactory (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        super.addPrefixFactory(queryFactory, ...valueFactories);
    }

    /**
     * @inheritDoc
     */
    public addSetFactory (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        super.addSetFactory(queryFactory, ...valueFactories);
    }

    /**
     * @inheritDoc
     */
    public appendSetListUsingQueryBuilder (builder: QueryBuilder) : void {
        super.appendSetListUsingQueryBuilder(builder);
    }


    ///////////////////////      TablePrefixable      ///////////////////////


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
    public getCompleteTableName (): string {
        return super.getCompleteTableName();
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
    public build () : QueryBuildResult {
        return super.build();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.buildQueryString}
     */
    public buildQueryString () : string {
        return `${super.buildQueryString()} RETURNING *`;
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.buildQueryValues}
     */
    public buildQueryValues () : readonly any[] {
        return super.buildQueryValues();
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getQueryValueFactories}
     */
    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return super.getQueryValueFactories();
    }

}

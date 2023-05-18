// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../../functions/map";
import { forEach } from "../../../../functions/forEach";
import { UpdateQueryBuilder } from "./UpdateQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryStringFactory, QueryValueFactory } from "../../types/QueryBuilder";

/**
 * Defines an abstract class for a builder of relational database create query.
 */
export abstract class BaseUpdateQueryBuilder implements UpdateQueryBuilder {

    private readonly _prefixQueries : QueryStringFactory[];
    private readonly _prefixValues : QueryValueFactory[];
    private readonly _setQueries : QueryStringFactory[];
    private readonly _setValues : QueryValueFactory[];

    private _tableName : string | undefined;
    private _tablePrefix : string = '';
    private _where : QueryBuilder | undefined;

    /**
     * Constructs the internal data values for SELECT queries.
     *
     * @protected
     */
    protected constructor () {
        this._tableName = undefined;
        this._tablePrefix = '';
        this._prefixQueries = [];
        this._prefixValues = [];
        this._setQueries = [];
        this._setValues = [];
    }


    ///////////////////////      UpdateQueryBuilder      ///////////////////////


    /**
     * @inheritDoc
     */
    public addPrefixFactory (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        this._prefixQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._prefixValues.push(factory);
            }
        );
    }

    /**
     * @inheritDoc
     */
    public addSetFactory (
        queryFactory  : QueryStringFactory,
        ...valueFactories : readonly QueryValueFactory[]
    ) : void {
        this._setQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._setValues.push(factory);
            }
        );
    }

    /**
     * @inheritDoc
     */
    public appendSetListUsingQueryBuilder (builder: QueryBuilder) : void {
        this.addSetFactory(
            () => builder.buildQueryString(),
            ...builder.getQueryValueFactories()
        );
    }


    ///////////////////////         QueryWhereable         ///////////////////////



    buildWhereQueryString () : string {
        return this._where ? this._where.buildQueryString() : '';
    }

    getWhereValueFactories () : readonly QueryValueFactory[] {
        return this._where ? this._where.getQueryValueFactories() : [];
    }

    /**
     * @inheritDoc
     * @see {@link SelectQueryBuilder.setWhereFromQueryBuilder}
     */
    public setWhereFromQueryBuilder (builder: QueryBuilder): void {
        this._where = builder;
    }


    ///////////////////////      TablePrefixable      ///////////////////////


    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) : void {
        this._tablePrefix = prefix;
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getTablePrefix}
     */
    public getTableName (): string {
        if (!this._tableName) throw new TypeError('The table name where to update entities has not been configured in the query builder');
        return this._tableName;
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string) {
        this._tableName = tableName;
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getCompleteFromTable}
     */
    public getCompleteTableName (): string {
        if (!this._tableName) throw new TypeError(`The table where to update rows has not been initialized yet`);
        return this.getTableNameWithPrefix(this._tableName);
    }

    /**
     * @inheritDoc
     * @see {@link UpdateQueryBuilder.getCompleteTableName}
     */
    public getTableNameWithPrefix (tableName : string) : string {
        return `${this._tablePrefix}${tableName}`;
    }


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     */
    public valueOf() : string {
        return this.toString();
    }

    /**
     * @inheritDoc
     */
    public toString() : string {
        return `"${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    /**
     * @inheritDoc
     */
    public build (): QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    /**
     * @inheritDoc
     */
    public buildQueryString (): string {
        const prefixes = map(this._prefixQueries, (f) => f());
        if (!prefixes.length) throw new TypeError('No prefix factories detected for update query builder! This must be an error.');
        const setQuery = map(this._setQueries, (f) => f());
        if (!setQuery.length) throw new TypeError('No value placeholders detected for update query builder! This must be an error.');
        const where = this._where ? this._where.buildQueryString() : '';
        return `${
            prefixes.join(' ')
        } SET ${
            setQuery.join(', ')
        }${
            where ? ` WHERE ${where}` : ''
        }`;
    }

    /**
     * @inheritDoc
     */
    public buildQueryValues () : readonly any[]  {
        return map(this.getQueryValueFactories(), (f) => f());
    }

    /**
     * @inheritDoc
     */
    public getQueryValueFactories (): readonly QueryValueFactory[] {
        return [
            ...this._prefixValues,
            ...this._setValues,
            ...(this._where ? this._where.getQueryValueFactories() : [])
        ];
    }


}

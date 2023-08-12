// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../../functions/map";
import { forEach } from "../../../../functions/forEach";
import { InsertQueryBuilder } from "./InsertQueryBuilder";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../../types/QueryBuilder";

/**
 * Defines an abstract class for a builder of relational database create query.
 */
export abstract class BaseInsertQueryBuilder implements InsertQueryBuilder {


    private readonly _prefixQueries : (() => string)[];
    private readonly _prefixValues : QueryValueFactory[];

    private readonly _inputQueries : (() => string)[];
    private readonly _inputValues : QueryValueFactory[];

    private readonly _columnNameSeparator : string;
    private readonly _columnNameQueries : (() => string)[];
    private readonly _columnNameValues : QueryValueFactory[];

    private _intoTableName : string | undefined;
    private _tablePrefix : string = '';

    /**
     * Constructs the internal data values for SELECT queries.
     *
     * @protected
     */
    protected constructor (
        columnNameSeparator : string
    ) {
        this._intoTableName = undefined;
        this._tablePrefix = '';
        this._columnNameSeparator = columnNameSeparator;
        this._prefixQueries = [];
        this._prefixValues = [];
        this._inputQueries = [];
        this._inputValues = [];
        this._columnNameQueries = [];
        this._columnNameValues = [];
    }

    public addColumnFactory (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._columnNameQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._columnNameValues.push(factory);
            }
        );
    }

    public abstract addColumnName (
        name: string
    ) : void;


    public addPrefixFactory (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._prefixQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._prefixValues.push(factory);
            }
        );
    }

    public addValueFactory (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._inputQueries.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._inputValues.push(factory);
            }
        );
    }

    public abstract appendValueList (list: any[]) : void;

    public abstract appendValueObject (
        columnNames: readonly string[],
        list: {readonly [key: string] : any}
    ) : void;

    public appendValueListUsingQueryBuilder (builder: QueryBuilder) : void {
        this.addValueFactory(
            () => `(${builder.buildQueryString()})`,
            ...builder.getQueryValueFactories()
        );
    }

    ///////////////////////      InsertQueryBuilder      ///////////////////////


    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getTablePrefix}
     */
    public getTablePrefix (): string {
        return this._tablePrefix;
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.setTablePrefix}
     */
    public setTablePrefix (prefix: string) : void {
        this._tablePrefix = prefix;
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getTablePrefix}
     */
    public getTableName (): string {
        if (!this._intoTableName) throw new TypeError('The table name where to insert entities has not been configured in the query builder');
        return this._intoTableName;
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.setFromTable}
     */
    public setTableName (tableName: string) {
        this._intoTableName = tableName;
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getCompleteFromTable}
     */
    public getFullTableName (): string {
        if (!this._intoTableName) throw new TypeError(`The table where to insert rows has not been initialized yet`);
        return this.getTableNameWithPrefix(this._intoTableName);
    }

    /**
     * @inheritDoc
     * @see {@link InsertQueryBuilder.getCompleteTableName}
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
        if (!prefixes.length) throw new TypeError('No prefix factories detected for insert query builder! This must be an error.');
        const columnNameValues = map(this._columnNameQueries, (f) => f());
        if (!columnNameValues.length) throw new TypeError('No value placeholders detected for insert query builder! This must be an error.');
        const inputValues = map(this._inputQueries, (f) => f());
        if (!inputValues.length) throw new TypeError('No value placeholders detected for insert query builder! This must be an error.');
        return `${prefixes.join(' ')} (${columnNameValues.join(this._columnNameSeparator)}) VALUES ${inputValues.join(', ')}`;
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
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return [
            ...this._prefixValues,
            ...this._columnNameValues,
            ...this._inputValues
        ];
    }


}

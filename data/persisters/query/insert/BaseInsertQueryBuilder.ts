// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InsertQueryBuilder } from "./InsertQueryBuilder";
import { map } from "../../../../functions/map";
import { forEach } from "../../../../functions/forEach";
import { QueryBuilder, QueryBuildResult, QueryValueFactory } from "../types/QueryBuilder";
import { MY_PH_COLUMN, MY_PH_TABLE_COLUMN, MY_PH_VALUE } from "../../mysql/constants/mysql-queries";

/**
 * Defines an abstract class for a builder of relational database create query.
 */
export abstract class BaseInsertQueryBuilder implements InsertQueryBuilder {


    private readonly _prefixQueries : (() => string)[];
    private readonly _prefixValues : QueryValueFactory[];
    private readonly _inputQueries : (() => string)[];
    private readonly _inputValues : QueryValueFactory[];
    private readonly _columnNames : string[];

    private _intoTableName : string | undefined;
    private _tablePrefix : string = '';

    /**
     * Constructs the internal data values for SELECT queries.
     *
     * @protected
     */
    protected constructor () {
        this._columnNames = [];
        this._intoTableName = undefined;
        this._tablePrefix = '';
        this._prefixQueries = [];
        this._prefixValues = [];
        this._inputQueries = [];
        this._inputValues = [];
    }

    public addColumnName (
        name: string
    ) : void {
        if (this._columnNames.includes(name)) {
            // TODO: Throw an exception and fix uses?
        } else {
            this._columnNames.push(name);
        }
    }

    public getColumnNames () : readonly string[] {
        return this._columnNames;
    }

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

    public abstract appendValueObject (list: {readonly [key: string] : any}) : void;

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
        const inputValues = map(this._inputQueries, (f) => f());
        if (!inputValues.length) throw new TypeError('No value placeholders detected for insert query builder! This must be an error.');
        return `${prefixes.join(' ')} (${this._columnNames.map(() => MY_PH_COLUMN).join(', ')}) VALUES ${inputValues.join(', ')}`;
    }

    /**
     * @inheritDoc
     */
    public buildQueryValues () : readonly any[]  {
        const prefixValues = map(this._prefixValues, (f) => f());
        const columnValues = map(this._columnNames, (name: string) : string => name);
        const paramValues = map(this._inputValues, (f) => f());
        return [
            ...prefixValues,
            ...columnValues,
            ...paramValues,
        ];
    }

    /**
     * @inheritDoc
     */
    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return [
            ...this._prefixValues,
            ...map(this._columnNames, (name : string) => (() : string => name) ),
            ...this._inputValues
        ];
    }


}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { forEach } from "../../../functions/forEach";
import { ListQueryBuilder } from "./ListQueryBuilder";
import { QueryBuildResult, QueryValueFactory } from "./QueryBuilder";

/**
 * This generates formulas like `(expression[, expression2, ...])` intended to
 * be used inside the INSERT query values.
 */
export abstract class BaseListQueryBuilder implements ListQueryBuilder {

    private readonly _separator : string;
    private readonly _queryList : (() => string)[];
    private readonly _valueList : QueryValueFactory[];

    protected constructor (
        separator: string
    ) {
        this._separator = separator;
        this._queryList = [];
        this._valueList = [];
    }


    ///////////////////         ListQueryBuilder         ///////////////////


    /**
     * @inheritDoc
     */
    public appendExpression (
        queryFactory  : (() => string),
        ...valueFactories : QueryValueFactory[]
    ) : void {
        this._queryList.push(queryFactory);
        forEach(
            valueFactories,
            (factory) => {
                this._valueList.push(factory);
            }
        );
    }

    /**
     * @inheritDoc
     */
    public abstract setTableColumn (
        tableName: string,
        columnName: string
    ): void;

    /**
     * @inheritDoc
     */
    public abstract setTableColumnAsText (
        tableName: string,
        columnName: string
    ): void;

    /**
     * @inheritDoc
     */
    public abstract setTableColumnAsTimestampString (
        tableName: string,
        columnName: string
    ) : void;

    /**
     * @inheritDoc
     */
    public abstract setParam (
        value: any
    ) : void;

    /**
     * @inheritDoc
     */
    public abstract setParamFactory (
        value: () => any
    ) : void;

    /**
     * @inheritDoc
     */
    public abstract setParamAsText (
        value: any
    ): void;

    /**
     * @inheritDoc
     */
    public abstract setParamFromJson (
        value: any
    ): void;

    /**
     * @inheritDoc
     */
    public abstract setParamFromTimestampString (
        value: any
    ): void;

    /**
     * @inheritDoc
     */
    public abstract setParamAsTimestampValue (
        value: any
    ): void;

    /**
     * @inheritDoc
     */
    public abstract setAssignmentWithParam (
        columnName: string,
        value: any
    ) : void;

    /**
     * @inheritDoc
     */
    public abstract setAssignmentWithParamAsTimestamp (
        columnName: string,
        value: any
    ) : void;

    /**
     * @inheritDoc
     */
    public abstract setAssignmentWithParamAsJson (
        columnName: string,
        value: any
    ) : void;


    ///////////////////////         QueryBuilder         ///////////////////////


    /**
     * @inheritDoc
     */
    public valueOf () {
        return this.toString();
    }

    /**
     * @inheritDoc
     */
    public toString () : string {
        return `"${this.buildQueryString()}" with ${this.buildQueryValues().map(item=>item()).join(' ')}`;
    }

    public build () : QueryBuildResult {
        return [this.buildQueryString(), this.buildQueryValues()];
    }

    public buildQueryString () : string {
        return map(this._queryList, (f) => f()).join(this._separator);
    }

    public buildQueryValues () : readonly any[] {
        return map(this._valueList, (f) => f());
    }

    public getQueryValueFactories () : readonly QueryValueFactory[] {
        return this._valueList;
    }


}

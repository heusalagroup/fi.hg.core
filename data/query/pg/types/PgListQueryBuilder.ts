// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BaseListQueryBuilder } from "../../types/BaseListQueryBuilder";
import { PgQueryUtils } from "../utils/PgQueryUtils";

export class PgListQueryBuilder extends BaseListQueryBuilder {

    protected constructor (separator : string) {
        super(separator);
    }

    public static create (
        separator ?: string
    ) : PgListQueryBuilder {
        return new PgListQueryBuilder( separator ?? ', ' );
    }

    /**
     * @inheritDoc
     */
    public setParam (value: any): void {
        this.appendExpression(
            () => PgQueryUtils.getValuePlaceholder(),
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamAsText (value: any): void {
        this.appendExpression(
            () => PgQueryUtils.getValuePlaceholderAsText(),
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamFromJson (value: any): void {
        this.appendExpression(
            () => PgQueryUtils.getValuePlaceholder(),
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamFromTimestampString (value: any): void {
        this.appendExpression(
            () => PgQueryUtils.getValuePlaceholderAsTimestamp(),
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamAsTimestampValue (value: any): void {
        this.appendExpression(
            () => PgQueryUtils.getValuePlaceholderAsTimestampString(),
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamFactory (
        factory: () => any
    ): void {
        this.appendExpression(
            () => PgQueryUtils.getValuePlaceholder(),
            factory
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumn (tableName: string, columnName: string): void {
        this.appendExpression(
            () => PgQueryUtils.quoteTableAndColumn(tableName, columnName)
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumnAsText (tableName: string, columnName: string): void {
        this.appendExpression(
            () => PgQueryUtils.quoteTableAndColumnAsText(tableName, columnName),
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumnAsTimestampString (tableName: string, columnName: string): void {
        this.appendExpression(
            () => PgQueryUtils.quoteTableAndColumnAsTimestampString(tableName, columnName),
        );
    }

    /**
     * @inheritDoc
     */
    public setAssignmentWithParam (
        columnName: string,
        value: any
    ) : void {
        this.appendExpression(
            () => `${PgQueryUtils.quoteColumnName(columnName)} = ${PgQueryUtils.getValuePlaceholder()}`,
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setAssignmentWithParamAsTimestamp (
        columnName: string,
        value: any
    ) : void {
        this.appendExpression(
            () => `${PgQueryUtils.quoteColumnName(columnName)} = ${PgQueryUtils.getValuePlaceholderAsTimestampString()}`,
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setAssignmentWithParamAsJson (
        columnName: string,
        value: any
    ) : void {
        this.appendExpression(
            () => `${PgQueryUtils.quoteColumnName(columnName)} = ${PgQueryUtils.getValuePlaceholder()}`,
            () => value
        );
    }

}

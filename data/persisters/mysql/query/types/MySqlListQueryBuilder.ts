// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BaseListQueryBuilder } from "../../../query/types/BaseListQueryBuilder";
import { MY_PH_TABLE_COLUMN, MY_PH_TABLE_COLUMN_AS_TEXT, MY_PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP, MY_PH_VALUE, MY_PH_VALUE_AS_TEXT, MY_PH_VALUE_TO_ISO_STRING, MY_PH_ASSIGN_VALUE } from "../../constants/mysql-queries";
import { EntityUtils } from "../../../../utils/EntityUtils";

export class MySqlListQueryBuilder extends BaseListQueryBuilder {

    protected constructor (separator : string) {
        super(separator);
    }

    public static create (
        separator ?: string
    ) : MySqlListQueryBuilder {
        return new MySqlListQueryBuilder( separator ?? ', ' );
    }

    /**
     * @inheritDoc
     */
    public setParam (value: any): void {
        this.appendExpression(
            () => MY_PH_VALUE,
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamAsText (value: any): void {
        this.appendExpression(
            () => MY_PH_VALUE_AS_TEXT,
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamFromTimestampString (value: any): void {
        this.appendExpression(
            () => MY_PH_VALUE,
            () => EntityUtils.parseIsoStringAsMySQLDateString(value)
        );
    }

    /**
     * @inheritDoc
     */
    public setParamAsTimestampValue (value: any): void {
        this.appendExpression(
            () => MY_PH_VALUE_TO_ISO_STRING,
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
            () => MY_PH_VALUE,
            factory
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumn (tableName: string, columnName: string): void {
        this.appendExpression(
            () => MY_PH_TABLE_COLUMN,
            () => tableName,
            () => columnName
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumnAsText (tableName: string, columnName: string): void {
        this.appendExpression(
            () => MY_PH_TABLE_COLUMN_AS_TEXT,
            () => tableName,
            () => columnName
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumnAsTimestampString (tableName: string, columnName: string): void {
        this.appendExpression(
            () => MY_PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP,
            () => tableName,
            () => columnName
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
            () => MY_PH_ASSIGN_VALUE,
            () => columnName,
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
            () => MY_PH_ASSIGN_VALUE,
            () => columnName,
            () => EntityUtils.parseIsoStringAsMySQLDateString(value)
        );
    }

}

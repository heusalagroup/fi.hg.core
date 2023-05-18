// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BaseListQueryBuilder } from "../../types/BaseListQueryBuilder";
import { MY_PH_TABLE_COLUMN, MY_PH_TABLE_COLUMN_AS_TEXT, MY_PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP, MY_PH_VALUE, MY_PH_VALUE_AS_TEXT, MY_PH_VALUE_TO_ISO_STRING, MY_PH_ASSIGN_VALUE, MY_PH_ASSIGN_TIMESTAMP_VALUE } from "../constants/mysql-queries";
import { EntityUtils } from "../../../utils/EntityUtils";

export class MySqlListQueryBuilder extends BaseListQueryBuilder {

    protected constructor (separator : string) {
        super(separator);
    }

    public static create (
        separator ?: string
    ) : MySqlListQueryBuilder {
        return new MySqlListQueryBuilder( separator ?? ', ' );
    }




    ///////////////////         ListQueryBuilder         ///////////////////



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
    public setParam (value: any): void {
        this.appendExpression(
            () => MY_PH_VALUE,
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
    public setParamFromJson (value: any): void {
        this.appendExpression(
            () => MY_PH_VALUE,
            () => EntityUtils.toJsonString(value)
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
            () => MY_PH_ASSIGN_TIMESTAMP_VALUE,
            () => columnName,
            () => EntityUtils.parseIsoStringAsMySQLDateString(value)
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
            () => MY_PH_ASSIGN_VALUE,
            () => columnName,
            () => EntityUtils.toJsonString(value)
        );
    }

}

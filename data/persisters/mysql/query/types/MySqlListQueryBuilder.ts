// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BaseListQueryBuilder } from "../../../query/types/BaseListQueryBuilder";
import { PH_TABLE_COLUMN, PH_TABLE_COLUMN_AS_TEXT, PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP, PH_VALUE, PH_VALUE_AS_TEXT, PH_VALUE_TO_DATETIME, PH_VALUE_TO_ISO_STRING } from "../../constants/queries";
import { EntityUtils } from "../../../../utils/EntityUtils";

export class MySqlListQueryBuilder extends BaseListQueryBuilder {

    protected constructor () {
        super(', ');
    }

    public static create () : MySqlListQueryBuilder {
        return new MySqlListQueryBuilder();
    }

    /**
     * @inheritDoc
     */
    public setParam (value: any): void {
        this.appendExpression(
            () => PH_VALUE,
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamAsText (value: any): void {
        this.appendExpression(
            () => PH_VALUE_AS_TEXT,
            () => value
        );
    }

    /**
     * @inheritDoc
     */
    public setParamFromTimestampString (value: any): void {
        this.appendExpression(
            () => PH_VALUE,
            () => EntityUtils.parseIsoStringAsMySQLDateString(value)
        );
    }

    /**
     * @inheritDoc
     */
    public setParamAsTimestampValue (value: any): void {
        this.appendExpression(
            () => PH_VALUE_TO_ISO_STRING,
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
            () => PH_VALUE,
            factory
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumn (tableName: string, columnName: string): void {
        this.appendExpression(
            () => PH_TABLE_COLUMN,
            () => tableName,
            () => columnName
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumnAsText (tableName: string, columnName: string): void {
        this.appendExpression(
            () => PH_TABLE_COLUMN_AS_TEXT,
            () => tableName,
            () => columnName
        );
    }

    /**
     * @inheritDoc
     */
    public setTableColumnAsTimestampString (tableName: string, columnName: string): void {
        this.appendExpression(
            () => PH_FROM_TIMESTAMP_TABLE_COLUMN_AS_TIMESTAMP,
            () => tableName,
            () => columnName
        );
    }


}

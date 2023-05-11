// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "./QueryBuilder";

export interface SelectQueryBuilder extends QueryBuilder {
    setTablePrefix (prefix: string) : void;
    getTablePrefix () : string;
    getCompleteTableName (tableName : string) : string;
    includeAllColumnsFromTable (tableName: string) : void;
    includeColumnFromQueryBuilder (
        builder: QueryBuilder,
        asColumnName: string
    ) : void;
    setFromTable (tableName: string) : void;
    getShortFromTable () : string;
    getCompleteFromTable () : string;
    setGroupByColumn (columnName: string) : void;
    leftJoinTable (
        fromTableName : string,
        fromColumnName : string,
        sourceTableName : string,
        sourceColumnName : string
    ) : void;

}

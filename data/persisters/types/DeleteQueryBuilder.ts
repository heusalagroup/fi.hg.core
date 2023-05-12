// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { QueryBuilder } from "./QueryBuilder";
export interface DeleteQueryBuilder extends QueryBuilder {

    setTablePrefix (prefix: string) : void;
    getTablePrefix () : string;
    getCompleteTableName (tableName : string) : string;
    setFromTable (tableName: string) : void;
    getShortFromTable () : string;
    getCompleteFromTable () : string;
    setWhereFromQueryBuilder (builder: QueryBuilder): void;

}

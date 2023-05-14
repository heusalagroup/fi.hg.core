// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgQueryUtils } from "../utils/PgQueryUtils";

function assertExists (value: string, message: string) : string {
    if (!value) throw new TypeError(message);
    return value;
}

const qc = (column: string) => PgQueryUtils.quoteColumnName(column);
const qt = (table: string) => PgQueryUtils.quoteTableName(table);

const qtc = (table: string, column: string) => PgQueryUtils.quoteTableAndColumn(table, column);

export const PG_PH_AS = (
    expression: string,
    columnName: string
) => `${assertExists(
    expression, 
    `Expression required for column "${columnName}"`
)} AS ${qc( 
    assertExists(columnName, `Column name required for expression: "${expression}"`)
)}`;


export const PG_PH_LEFT_JOIN = (
    fromTable: string, fromColumn: string,
    sourceTable: string, sourceColumn: string,
) => `LEFT JOIN ${qt(fromTable)} ON ${qtc(sourceTable, sourceColumn)} = ${qtc(fromTable, fromColumn)}`;

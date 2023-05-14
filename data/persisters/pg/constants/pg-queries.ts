// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PgQueryUtils } from "../utils/PgQueryUtils";

export const PG_TIME_COLUMN_DEFINITIONS : readonly string[] = ['TIMESTAMP', 'DATETIME', 'TIME'];

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

// export const TO_CHAR_TIMESTAMP = (value: string) => `to_json(${value})#>>'{}'`;
export const PG_TO_CHAR_TIMESTAMP = (value: string) => `${value}`;

export const PG_TO_TIMESTAMP = (value: string) => `${value}`;

export const PG_AS_COLUMN_NAME = (value: string, asColumnName: string) => `${value} AS ${qc( asColumnName )}`;

export const PG_TO_TEXT = (value: string) => `${value}::text`;

export const PG_ESCAPE_TABLE_OR_COLUMN = (value: string): string => {
    const doubleQuote = '"';
    const escapedIdentifier = value.split( doubleQuote ).join( doubleQuote + doubleQuote );
    return doubleQuote + escapedIdentifier + doubleQuote;
};

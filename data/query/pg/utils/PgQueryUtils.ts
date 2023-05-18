// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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
export const PG_TO_JSONB = (value: string) => `${value}::jsonb`;

export const PG_ESCAPE_TABLE_OR_COLUMN = (value: string): string => {
    const doubleQuote = '"';
    const escapedIdentifier = value.split( doubleQuote ).join( doubleQuote + doubleQuote );
    return doubleQuote + escapedIdentifier + doubleQuote;
};

export class PgQueryUtils {

    public static quoteTableName (value: string) : string {
        return PG_ESCAPE_TABLE_OR_COLUMN(value);
    }

    public static quoteColumnName (value: string) : string {
        return PG_ESCAPE_TABLE_OR_COLUMN(value);
    }


    public static quoteTableAndColumn (tableName: string, columnName: string) : string {
        return `${PgQueryUtils.quoteTableName(tableName)}.${PgQueryUtils.quoteColumnName(columnName)}`;
    }

    public static quoteTableAndColumnAsJsonB (tableName: string, columnName: string) : string {
        return `${PgQueryUtils.quoteTableName(tableName)}.${PgQueryUtils.quoteColumnName(columnName)}::jsonb`;
    }

    public static quoteTableAndColumnAsText (tableName: string, columnName: string) : string {
        return PG_TO_TEXT(PgQueryUtils.quoteTableAndColumn(tableName, columnName));
    }

    public static quoteTableAndColumnAsTimestampString (tableName: string, columnName: string) : string {
        return PG_TO_CHAR_TIMESTAMP(PgQueryUtils.quoteTableAndColumn(tableName, columnName));
    }

    public static quoteTableAndColumnAsColumnName (tableName: string, columnName: string, asColumnName: string) : string {
        return PG_AS_COLUMN_NAME(PgQueryUtils.quoteTableAndColumnAsText(tableName, columnName), asColumnName);
    }

    public static quoteTableAndColumnAsTextAsColumnName (tableName: string, columnName: string, asColumnName: string) : string {
        return PG_AS_COLUMN_NAME(PG_TO_TEXT(PgQueryUtils.quoteTableAndColumn(tableName, columnName)), asColumnName);
    }

    public static quoteTableAndColumnAsTimestampStringAsColumnName (tableName: string, columnName: string, asColumnName: string) : string {
        return PG_AS_COLUMN_NAME(PG_TO_CHAR_TIMESTAMP(PgQueryUtils.quoteTableAndColumn(tableName, columnName)), asColumnName);
    }


    /**
     * Returns the placeholder for values
     *
     * This will be `$#` which will be later changed to `$1`, `$2` etc.
     */
    public static getValuePlaceholder () : string {
        return '$#';
    }

    public static getValuePlaceholderAsText () : string {
        return PG_TO_TEXT(this.getValuePlaceholder());
    }

    public static getValuePlaceholderAsJsonB () : string {
        return PG_TO_JSONB(this.getValuePlaceholder());
    }

    public static getValuePlaceholderAsTimestamp () : string {
        return PG_TO_TIMESTAMP(this.getValuePlaceholder());
    }

    public static getValuePlaceholderAsTimestampString () : string {
        return PG_TO_CHAR_TIMESTAMP(this.getValuePlaceholder());
    }


    /**
     * Converts any parameter placeholder in a string to `$N` where `N` is 1, 2, 3, etc.
     *
     * E.g. a string like `"SELECT * FROM table WHERE foo = $# AND bar = $#"`
     * will be changed to: `"SELECT * FROM table WHERE foo = $1 AND bar = $2"`
     *
     * @param query
     * @see {@link PgQueryUtils.getValuePlaceholder}
     */
    public static parametizeQuery (query: string) : string {
        const placeholder = this.getValuePlaceholder();
        let i = 1;
        while ( query.indexOf(placeholder) >= 0 ) {
            query = query.replace(placeholder, () => `$${i++}`);
        }
        return query;
    }

}

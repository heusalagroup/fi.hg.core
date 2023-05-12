// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export class PgQueryUtils {

    public static quoteTableName (value: string) : string {
        return ESCAPE_TABLE_OR_COLUMN(value);
    }

    public static quoteColumnName (value: string) : string {
        return ESCAPE_TABLE_OR_COLUMN(value);
    }


    public static quoteTableAndColumn (tableName: string, columnName: string) : string {
        return `${PgQueryUtils.quoteTableName(tableName)}.${PgQueryUtils.quoteColumnName(columnName)}`;
    }

    public static quoteTableAndColumnAsText (tableName: string, columnName: string) : string {
        return TO_TEXT(PgQueryUtils.quoteTableAndColumn(tableName, columnName));
    }

    public static quoteTableAndColumnAsTimestampString (tableName: string, columnName: string) : string {
        return TO_CHAR_TIMESTAMP(PgQueryUtils.quoteTableAndColumn(tableName, columnName));
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
        return TO_TEXT(this.getValuePlaceholder());
    }

    public static getValuePlaceholderAsTimestampString () : string {
        return TO_CHAR_TIMESTAMP(this.getValuePlaceholder());
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

const ESCAPE_TABLE_OR_COLUMN = (value: string) : string => {
    const doubleQuote = '"';
    const escapedIdentifier = value.split(doubleQuote).join(doubleQuote + doubleQuote);
    return doubleQuote + escapedIdentifier + doubleQuote;
}

const TO_TEXT = (value: string) => `${value}::text`;

const TO_CHAR_TIMESTAMP = (value: string) => `to_char (${value}::timestamp at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`;
// Copyright (c) 2022. Heusala Group Oy <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

/**
 * This module provides functions for working with CSV (Comma Separated Values)
 * data in TypeScript. It includes functions for parsing CSV data into an array
 * of rows (each of which is an array of cell values), and for converting an
 * array of rows into CSV data as a string.
 * @see https://docs.hg.fi/common/csv/
 * @file
 */

import { endsWith} from "./functions/endsWith";
import { get } from "./functions/get";
import { has } from "./functions/has";
import { map } from "./functions/map";
import { split } from "./functions/split";
import { startsWith } from "./functions/startsWith";

import { ReadonlyJsonObject } from "./Json";
import { isArray, isArrayOf } from "./types/Array";
import { isString } from "./types/String";
import { replaceAll } from "./functions/replaceAll";
import { keys } from "./functions/keys";

export const DEFAULT_CSV_SEPARATOR  = ',';
export const DEFAULT_CSV_QUOTE      = '"';
export const DEFAULT_CSV_LINE_BREAK = '\n';
export const DEFAULT_CSV_LINE_BREAK_REPLACE_CHARACTER : string = ' ';

// FIXME: Add unit tests
export type CsvRow = string[];
export type Csv = CsvRow[];

export type ReadonlyCsvRow = readonly string[];
export type ReadonlyCsv = ReadonlyCsvRow[];

export function isCsvRow (value: any): value is CsvRow {
    return isArrayOf<string>(value, isString);
}

export function isCsv (value: any): value is Csv {
    return isArrayOf<CsvRow>(value, isCsvRow);
}

export interface CsvPropertyTransformerCallback<T> {
    (item: T, key: string) : string;
}

export interface CsvPropertyTransformerMap<T> {
    [key: string]: CsvPropertyTransformerCallback<T>;
}

/**
 * The `stringifyCsvCellValue` function converts a single cell value into a string
 * suitable for inclusion in a CSV file. It handles arrays by joining the
 * elements with commas. If the input value is undefined, an empty string is
 * returned.
 *
 * @param value
 */
export function stringifyCsvCellValue (value: any) : string {
    if (value === undefined) return '';
    if (isArray(value)) {
        return `${value.join(',') ?? ''}`;
    }
    return `${value ?? ''}`;
}

/**
 * The `getCsvCellFromProperty` function retrieves the value of a property from an
 * object and converts it to a string suitable for inclusion in a CSV file using
 * the stringifyCsvCellValue function. It takes an object and the name of the
 * property to retrieve as parameters.
 *
 * @param item
 * @param key
 */
export function getCsvCellFromProperty<T> (item: T, key: string) : string {
    return stringifyCsvCellValue( get(item, key) );
}

/**
 * The `getCsvRowFromJsonObject` function generates a row of CSV data from an
 * object. It takes an object, an array of property names to include in the row,
 * and an optional map of property transformers as parameters. The property
 * transformers are functions that take an object and a property name, and
 * return the value to be included in the row for that property. If no property
 * transformer is provided for a given property, the value of the property is
 * retrieved using the `getCsvCellFromProperty` function.
 *
 * @param item
 * @param properties
 * @param propertyTransformer
 */
export function getCsvRowFromJsonObject<T = ReadonlyJsonObject> (
    item: T,
    properties: readonly string[],
    propertyTransformer : CsvPropertyTransformerMap<T> = {}
): CsvRow {
    return map(
        properties,
        (key: string): string => {
            if (has(propertyTransformer, key)) {
                return stringifyCsvCellValue( propertyTransformer[key](item, key) );
            }
            return getCsvCellFromProperty(item, key);
        }
    );
}

/**
 * The `getCsvFromJsonObjectList` function generates a CSV file from a list of
 * objects. It takes a list of objects, an optional array of property names to
 * include in the file, an optional flag indicating whether to include a header
 * row with the property names, and an optional map of property transformers as
 * parameters. It uses the `getCsvRowFromJsonObject` function to generate rows for
 * each object in the list.
 *
 * If no property names are provided, the properties of the first object in the
 * list are used.
 *
 * @param list
 * @param properties
 * @param includeHeader If the `includeHeader` flag is `true`, the
 *                      first row of the CSV file will be a header row with the property names.
 *                      If the `includeHeader` flag is `false` or not provided, no header row will be
 *                      included.
 * @param propertyTransformer
 */
export function getCsvFromJsonObjectList<T = ReadonlyJsonObject> (
    list: readonly T[],
    properties: readonly string[] | undefined = undefined,
    includeHeader : boolean = true,
    propertyTransformer : CsvPropertyTransformerMap<T> = {}
): Csv {

    const keyList : CsvRow = (
        properties === undefined ? (
            list.length === 0 ? [] : keys(list[0])
        ) : (
            map(properties, (item: string) : string => item)
        )
    );

    const rows : Csv = map(
        list,
        (item: T): CsvRow => getCsvRowFromJsonObject<T>(
            item,
            keyList,
            propertyTransformer
        )
    );

    if (includeHeader) {
        return [
            keyList,
            ...rows
        ];
    }

    return rows;
}

/**
 * The `parseCsvRow` function parses a single row of CSV data into an array of
 * cell values. It takes the row to be parsed as a string, and optional
 * separator and quote characters as parameters. If no separator character is
 * provided, the default value of ',' (a comma) is used. If no quote character
 * is provided, the default value of '"' (a double quote) is used. The function
 * handles quoted cell values and escaped quote characters within cell values.
 *
 *
 * @fixme Add support to parse quoted line breaks
 * @param value
 * @param separator
 * @param quote
 */
export function parseCsvRow (
    value: any,
    separator: string = DEFAULT_CSV_SEPARATOR,
    quote: string = DEFAULT_CSV_QUOTE
): CsvRow {

    separator = separator ? separator : DEFAULT_CSV_SEPARATOR;
    quote     = quote     ? quote     : DEFAULT_CSV_QUOTE;

    if ( separator?.length !== 1 ) {
        throw new TypeError(`The separator must be exactly 1 character long: ${separator}`);
    }

    if ( quote?.length !== 1 ) {
        throw new TypeError(`The quote must be exactly 1 character long: ${quote}`);
    }

    if ( isCsvRow(value) ) {
        return value;
    }

    if ( !isString(value) ) {
        value = `${value}`;
    }

    let pieces: string[] = [];
    let lastIndex = 0;
    while ( lastIndex < value.length ) {

        const nextIndex = value.indexOf(separator, lastIndex);

        if ( nextIndex < 0 ) {
            pieces.push(value.substr(lastIndex));
            lastIndex = pieces.length;
            break;
        }

        let piece = value.substr(lastIndex, nextIndex - lastIndex);
        if ( piece.length >= 2 && startsWith(piece, quote) && endsWith(piece, quote) ) {
            piece = piece.substr(1, piece.length - 2).split(piece + piece).join(piece);
        }
        pieces.push(piece);
        lastIndex = nextIndex + 1;

    }

    return pieces;

}

/**
 *
 * @fixme Add support to detect if the input was just a single CsvRow
 * @fixme Add support to convert arrays with (JSON able) objects as Csv
 *
 * @param value
 * @param separator
 * @param quote
 * @param lineBreak
 */
export function parseCsv (
    value: any,
    separator: string = DEFAULT_CSV_SEPARATOR,
    quote: string = DEFAULT_CSV_QUOTE,
    lineBreak: string = DEFAULT_CSV_LINE_BREAK
): Csv | undefined {
    separator = separator ? separator : DEFAULT_CSV_SEPARATOR;
    quote     = quote     ? quote     : DEFAULT_CSV_QUOTE;
    lineBreak = lineBreak ? lineBreak : DEFAULT_CSV_LINE_BREAK;
    if ( isCsv(value) ) return value;
    if ( !isString(value) ) {
        value = `${value}`;
    }
    return map(
        split(value, lineBreak),
        (item: any): CsvRow => parseCsvRow(item, separator, quote)
    );
}

export function stringifyCsvRow (
    value: CsvRow,
    separator: string = DEFAULT_CSV_SEPARATOR,
    quote: string = DEFAULT_CSV_QUOTE,
): string {
    separator = separator ? separator : DEFAULT_CSV_SEPARATOR;
    quote     = quote     ? quote     : DEFAULT_CSV_QUOTE;
    return map(value, (column: string) => {
        if ( column.length === 0 ) return column;
        if ( column.indexOf(separator) >= 0 || (column[0] === quote) ) {
            if ( column.indexOf(quote) >= 0 ) {
                return `${quote}${column.split(quote).join(quote + quote)}${quote}`;
            } else {
                return `${quote}${column}${quote}`;
            }
        } else {
            return column;
        }
    }).join(separator);
}

/**
 * @param value
 * @param separator
 * @param quote
 * @param lineBreak
 * @param replaceLineBreak
 */
export function stringifyCsv (
    value            : Csv,
    separator        : string = DEFAULT_CSV_SEPARATOR,
    quote            : string = DEFAULT_CSV_QUOTE,
    lineBreak        : string = DEFAULT_CSV_LINE_BREAK,
    replaceLineBreak : string | false = DEFAULT_CSV_LINE_BREAK_REPLACE_CHARACTER
): string {
    separator = separator ? separator : DEFAULT_CSV_SEPARATOR;
    quote     = quote     ? quote     : DEFAULT_CSV_QUOTE;
    lineBreak = lineBreak ? lineBreak : DEFAULT_CSV_LINE_BREAK;

    if (replaceLineBreak !== false ) {
        value = replaceCsvContentLineBreaks(
            value,
            lineBreak,
            replaceLineBreak
        );
    }

    return map(
        value,
        (row: CsvRow) => stringifyCsvRow(row, separator, quote)
    ).join(lineBreak);
}

/**
 * Can be used to modify Csv data structure so that line breaks in the Csv content
 * are replaced to different character
 * @param value
 * @param lineBreak
 * @param replaceTo
 */
export function replaceCsvContentLineBreaks (
    value     : Csv,
    lineBreak : string = DEFAULT_CSV_LINE_BREAK,
    replaceTo : string = DEFAULT_CSV_LINE_BREAK_REPLACE_CHARACTER
) : Csv {
    return map(
        value,
        (row: CsvRow) : CsvRow =>
            map(
                row,
                (column: string): string => replaceAll(column, lineBreak, replaceTo)
            )
    );
}

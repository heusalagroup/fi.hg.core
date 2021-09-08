// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    endsWith,
    isArrayOf,
    isString, map, split, startsWith
} from "./modules/lodash";

// FIXME: Add unit tests
export type CsvRow = string[];
export type Csv = CsvRow[];

export function isCsvRow (value: any): value is CsvRow {
    return isArrayOf<string>(value, isString);
}

export function isCsv (value: any): value is Csv {
    return isArrayOf<CsvRow>(value, isCsvRow);
}

/**
 *
 * @fixme Add support to parse quoted line breaks
 *
 * @param value
 * @param separator
 * @param quote
 * @param lineBreak
 */
export function parseCsvRow (
    value     : any,
    separator : string = ',',
    quote     : string = '"',
    lineBreak : string = '\n'
): CsvRow {

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
    value     : any,
    separator : string = ',',
    quote     : string = '"',
    lineBreak : string = '\n'
): Csv | undefined {

    if ( isCsv(value) ) {
        return value;
    }

    if ( !isString(value) ) {
        value = `${value}`;
    }

    return map(
        split(value, lineBreak),
        (item: any): CsvRow => parseCsvRow(item, separator, quote)
    );

}

export function stringifyCsvRow (
    value     : CsvRow,
    separator : string = ',',
    quote     : string = '"',
    lineBreak : string = '\n'
): string {

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
 */
export function stringifyCsv (
    value     : Csv,
    separator : string = ',',
    quote     : string = '"',
    lineBreak : string = '\n'
): string {

    return map(value, (row: CsvRow) => {
        return stringifyCsvRow(row, separator, quote, lineBreak);
    }).join(lineBreak);

}

export default Csv;

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "./types/String";
import { map } from "./functions/map";
import { isFunction } from "./types/Function";
import { isBoolean } from "./types/Boolean";
import { has } from "./functions/has";
import { isObject } from "./types/Object";
import { reduce } from "./functions/reduce";
import { trimEnd } from "lodash";

export class LogUtils {

    public static stringifyArray (args: readonly any[]) : string {
        return map(args, (arg) => LogUtils.stringifyValue(arg)).join(' ');
    }

    public static stringifyValue (value: any) : string {
        try {
            if ( isString(value) ) return value;
            if ( value === undefined ) return 'undefined';
            if ( value === null ) return 'null';
            if ( isBoolean(value) ) return value ? 'true' : 'false';
            if ( value && isObject(value) ) {
                if ( value instanceof Error ) return `${value}`;
                if ( value instanceof Date ) return value.toISOString();
                if ( has(value, 'toString') && isFunction(value?.toString) ) {
                    return value.toString();
                }
            }
            return JSON.stringify(value);
        } catch (err) {
            return `${value}`;
        }
    }

    /**
     * Turns a long string into multiple rows with prefix and suffix
     * added to the split rows.
     *
     * Notice, that this function will take into account that `maxSize` must
     * include the complete prefix and suffix (including any newlines). E.g.
     * it will split strings to exactly 19 character long when a maximum is 20
     * characters and suffix has a linebreak.
     *
     * @param value The target string to split
     * @param maxSize Maximum line length, including newline characters.
     * @param prefix The prefix to add to start of a split line, e.g. `...`
     * @param suffix The suffix to add to end of a split line, e.g. `...\n`,
     *               including new line characters.
     * @returns Array of chunks of strings without new line characters
     * @see {@link LogUtils.splitStringArray} for full arrays
     */
    public static splitStringValue (
        value: string,
        maxSize: number,
        prefix: string,
        suffix: string
    ) : readonly string[] {
        if (maxSize < prefix.length + suffix.length + 1) {
            throw new TypeError(`Max size to splitStringValue() must be greater than the length of prefix and suffix (${maxSize} < ${prefix.length + suffix.length})`);
        }
        let str : string = value;
        let chunks : string[] = [];
        while (str.length) {
            const chunkPrefix : string = chunks.length === 0 ? '' : prefix;
            const chunkSuffix : string = str.length <= maxSize - chunkPrefix.length ? '' : suffix;
            const chunkSize : number = maxSize - chunkPrefix.length - chunkSuffix.length;
            const chunkStr : string = str.substring(0, chunkSize);
            // console.debug(`chunkStr = "${chunkStr}", size=${chunkSize}, prefix="${chunkPrefix}", suffix="${chunkSuffix}"`);
            str = str.substring(chunkSize);
            chunks.push( chunkPrefix + chunkStr + chunkSuffix );
        }
        return chunks;
    }

    /**
     * Splits array of rows in a way that each chunk is maximum `maxSize`
     * in length.
     *
     * Uses {@link LogUtils.splitStringValue} for the splitting.
     *
     * Notice, that this function will take into account that `maxSize` must
     * include the complete prefix and suffix (including any newlines). E.g.
     * it will split strings to exactly 19 character long when a maximum is 20
     * characters and suffix has a linebreak.
     *
     * @param input The input rows as a array of strings
     * @param maxSize Maximum line length, including newline characters.
     * @param prefix The prefix to add to start of a split line, e.g. `...`
     * @param suffix The suffix to add to end of a split line, e.g. `...\n`
     * @param linebreak The line break character, e.g. `\n`
     * @returns Array of chunks of strings without new line characters
     */
    public static splitStringArray (
        input: readonly string[],
        maxSize: number,
        prefix: string,
        suffix: string,
        linebreak: string
    ) : string[] {
        return reduce(
            input,
            (prevRows: string[], row : string) : string[] => {
                let chunks = LogUtils.splitStringValue(row + linebreak, maxSize, prefix, suffix);
                return [
                    ...prevRows,
                    ...map(chunks, (chunk: string) => trimEnd(chunk, linebreak))
                ];
            },
            []
        );
    }

    /**
     * This function takes an array of rows and merges them with line break
     * character to chunks of maximum `chunkSize` characters, line breaks
     * included.
     *
     * @param value Array of strings to merge
     * @param chunkSize The maximum size for each chunk, line break characters
     *                  included in the size.
     * @param lineBreak The line break character
     * @returns All chunks which are maximum of `chunkSize` in length
     */
    public static mergeStringArray (
        value     : readonly string[],
        chunkSize : number,
        lineBreak : string
    ) : string[] {
        let rows = map(value, (item: string) : string => item);
        let chunks : string[] = [];
        let nextChunk : string = '';
        while ( rows.length ) {
            const row = rows.shift();
            if ( row !== undefined ) {
                let nextRow = nextChunk ? lineBreak + row : row;
                if ( nextChunk && nextChunk.length + nextRow.length > chunkSize ) {
                    chunks.push(nextChunk);
                    nextChunk = '';
                    nextRow = row;
                }
                nextChunk += nextRow;
            }
        }
        if ( nextChunk ) {
            chunks.push(nextChunk);
        }
        return chunks;
    }

}

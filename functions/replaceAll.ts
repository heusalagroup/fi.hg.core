// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../types/String";

/**
 * Replaces all occurrences of a string in the input string.
 *
 * @param {string} value - The input string.
 * @param {string} from - The string to be replaced.
 * @param {string} to - The string to replace all occurrences of `from`.
 * @returns {string} The input string with all occurrences of `from` replaced with `to`.
 *
 * @throws {TypeError} If `value`, `from`, or `to` are not strings.
 */
export function replaceAll (value: string, from: string, to: string): string {
    if ( !isString(from) ) throw new TypeError('replaceAll: from is required');
    if ( !isString(value) ) throw new TypeError('replaceAll: value is not a string');
    if ( !isString(to) ) throw new TypeError('replaceAll: to is not a string');
    if ( from === '' ) return [ '', ...value.split(''), '' ].join(to);
    let ret = '';
    let p = 0;
    let i = value.indexOf(from);
    while ( i >= p ) {
        ret += value.substring(p, i) + to;
        p = i + from.length;
        i = value.indexOf(from, p);
    }
    ret += value.substring(p);
    return ret;
}

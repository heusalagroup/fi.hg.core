/*
 * Finnish Identity Number Library
 *
 * Copyright (C) 2022-2023 by Heusala Group <info@hg.fi> (http://www.hg.fi),
 * Copyright (C) 2014 by Sendanor <info@sendanor.fi> (http://www.sendanor.fi),
 * Copyright (c) 2014 by Jaakko-Heikki Heusala <jheusala@iki.fi>
 * Copyright (c) 2014 by Juho Vähäkangas <juhov@iki.fi>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { LogService } from "../LogService";
import { isString } from "../types/String";
import { parseInteger } from "../types/Number";
import { isNumberArray } from "../types/NumberArray";

const LOG = LogService.createLogger('yTunnus');

/** Generate Finnish business IDs
 * @param id_ {string} The business ID with or without checksum
 * @returns {string} The business ID with checksum
 * @throws TypeError
 */
export function yTunnusWithSum (id_: string): string {
    let numbers : number[] = [ 7, 9, 10, 5, 8, 4, 2 ];
    let parts : string[] = ('' + id_).split("-");
    let id : string | undefined = parts.shift();
    if ( !id ) {
        throw new TypeError("id not valid: " + id_);
    }
    if ( id.length === 6 ) {
        id = '0' + id;
    }
    if ( id.length !== 7 ) {
        throw new TypeError("id length not valid: " + id_);
    }

    const id_array : (number|undefined)[] = id.split('').map(parseInteger);
    if (!isNumberArray(id_array)) {
        throw new TypeError("id is not valid: "+ id_);
    }
    if ( id_array.length > 7 ) {
        throw new TypeError("id array too long (" + id_array.length + ") for " + id_);
    }

    let sum : number = id_array.reduce( (sum : number, n : number, i : number) => {
        const x : number = numbers[i];
        return sum + n * x;
    }, 0);

    sum = (sum % 11);
    if ( !((sum === 0) || ((sum >= 2) && (sum <= 10))) ) {
        throw new TypeError("Illegal checksum for " + id_);
    }
    sum = (sum === 0) ? 0 : 11 - sum;

    let sum_ : string = parts.join('-');
    if ( sum_ && ('' + sum !== sum_) ) {
        throw new TypeError("Illegal checksum in " + id_);
    }

    return id + "-" + sum;
}

/** Check existance of checksum
 * @param id {string} Finnish business ID
 * @returns {boolean} `true` if `id` has a checksum
 */
export function yTunnusHasSum (id: string): boolean {
    return ('' + id).match("-") !== null;
}

/** Parse Finnish business ID
 * @param id {string} ID with or without checksum
 * @returns {string} ID with checksum
 * @throws TypeError
 */
export function yTunnusParse (id: string): string {
    return yTunnusWithSum(id);
}

/** Non-throwing version of _parse()
 * @param id {string} The ID to parse
 * @returns {string} ID with checksum otherwise undefined
 */
export function yTunnusParseNoThrow (id: string): string | undefined {
    try {
        return yTunnusParse(id);
    } catch (err) {
        LOG.error(`Failed to parse "${id}": `, err);
        return undefined;
    }
}

/** Compare two business IDs
 * @param a {string} First business ID
 * @param b {string} Second business ID
 * @returns {boolean} `true` if both ids are identical
 */
export function yTunnusCompare (a: string, b: string): boolean {
    return yTunnusParseNoThrow(a) === yTunnusParseNoThrow(b);
}

/** Check Finnish business ID validity. This function might throw an exception! See _check_nothrow().
 * @param id {string} The ID to check
 * @returns {boolean} `true` if ID was valid
 * @throws TypeError
 */
export function yTunnusCheck (id: unknown): id is string {
    if (!isString(id)) return false;
    return yTunnusHasSum(id) ? yTunnusCompare(id, yTunnusWithSum(id)) : false;
}

/** Non-throwing version of _check()
 * @param id {string} The ID to check
 * @returns {boolean} `true` if ID was valid
 */
export function yTunnusCheckNoThrow (id: string): boolean {
    try {
        return yTunnusCheck(id);
    } catch (err) {
        return false;
    }
}

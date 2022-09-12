/*
 * Finnish Identity Number Library
 *
 * Copyright (C) 2022 by Heusala Group <info@hg.fi> (http://www.hg.fi),
 * Copyright (C) 2014 by Sendanor <info@sendanor.fi> (http://www.sendanor.fi),
 * Copyright (C) 2011-2014 by Jaakko-Heikki Heusala <jheusala@iki.fi> (http://www.jhh.me),
 * Copyright (C) 2009 by Mux F-Production <contact@mux.fi> (http://mux.fi/)
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
 *
 * Finnish Referer Number Library (for JavaScript)
 * by: eXtranium 2009 http://extranium.net/
 * (c) Sendanor 2009 http://www.sendanor.fi/
 *
 * created: Mo 2009-01-05
 * updated: We 2009-01-07
 * -----
 *
 * Functions:
 ** refNumLeave_only_digits  - remove non-digits from string
 ** refNumCalculate_digit    - calculate check-digit needed in referer number
 ** refNumCreate             - generate referer number
 ** refNumCheck              - check referer number
 *
 */

/** Remove non-digits from string
 *
 * Removes any non-digit (0..9) chars from string s
 *
 */
export function refNumLeaveOnlyDigits (s: string | number): string {
    let leading = true;
    s = '' + s;
    let t = '';		// new string
    let l = s.length;	// length of old string
    for ( let i = 0 ; i < l ; i++ ) {
        if ( leading ) {
            if ( s[i] === '0' ) {
                continue;
            } else if ( (s[i] >= '0') && (s[i] <= '9') ) {
                leading = false;
            }
        }
        if ( (s[i] >= '0') && (s[i] <= '9') ) t += s[i];	// get only the digits
    }
    return t;
}

/** Calculate check-digit needed in referer number
 *
 * function calculates check-digit for complete referer number
 *
 *  `num = string of digits ('0'..'9')`
 *
 */
export function refNumCalculateDigit (num: string | number): string | undefined {

    num = refNumLeaveOnlyDigits(num); // we need only digits 0..9

    let index = num.length;			// set char pointer to end-of-string

    // real referer number is 1..19 + 1 chars long
    if ( !index || (index > 19) ) {
        return undefined;
    }

    let calc = 9;	// sum calculator
    let mult = 0;	// multiplier aka weight (7, 3, 1, 7, 3, 1,...)

    // loop with all digits in num backwards
    while ( index-- ) {
        if ( !(mult >>= 1) ) mult = 7;	// update weight (7, 3, 1, 7, 3, 1,...)
        calc += mult * (num[index].charCodeAt(0) - 48);	// add weight*digit to sum
    } // while

    return String.fromCharCode(57 - (calc % 10));
}

/** Generate referer number
 *
 * create referer number by adding check-digit to num
 * `num = string of digits ('0'..'9')`
 */
export function refNumCreate (num: string | number): string | undefined {
    const numString = refNumLeaveOnlyDigits(num);
    const digit = refNumCalculateDigit(numString);
    if ( digit === undefined ) {
        return undefined;
    }
    return numString + digit;
}

/** Remove check num from reference number
 * check is referer number legal
 * `refnum = referer number, string of digits '0'..'9'`
 */
export function refNumStrip (refnum: string | number): string | undefined {

    refnum = '' + refnum;

    // this becomes to fixed string
    let t = '';

    for ( let i = 0 ; i < refnum.length ; i++ ) {
        let c = refnum[i];
        if ( c == ' ' ) continue;	// space-bar allowed (but not used in calculations)

        // non-digits not allowed
        if ( (c < '0') || (c > '9') ) {
            return undefined;
        }

        t += c;
    } // for

    return t.substring(0, t.length - 1);
}

/** Check referer number */
export function refNumCheck (refNum: string | number): boolean {
    const refNumStripped = refNumStrip(refNum);
    const refNumCreated = refNumStripped !== undefined ? refNumCreate(refNumStripped) : undefined;
    return refNumCreated !== undefined && refNumCreated === refNum;
}

/** Parse reference number
 * @returns {string|undefined} The parsed reference number if valid, otherwise undefined.
 */
export function refNumParse (refnum: string | number): string | undefined {
    refnum = refNumLeaveOnlyDigits(refnum);
    if ( refNumCheck(refnum) ) {
        return refnum;
    }
}

/** Compare reference numbers
 * @returns {boolean} True if a equals to b
 */
export function refNumCmp (a: string | number, b: string | number): boolean {
    const a2 : string | undefined = refNumParse(a);
    const b2 : string | undefined = refNumParse(b);
    return !!a2 && !!b2 && (a2 === b2);
}

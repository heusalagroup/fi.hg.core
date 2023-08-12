/*
 * Finnish Identity Number Library
 *
 * Copyright (C) 2022 by Heusala Group <info@hg.fi> (https://www.hg.fi),
 * Copyright (C) 2014 by Sendanor <info@sendanor.fi> (https://www.sendanor.fi),
 * Copyright (C) 2011-2014 by Jaakko-Heikki Heusala <jheusala@iki.fi> (https://www.jhh.me),
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
 */

import { refNumParse } from './refNum';
import { moment } from "../modules/moment";
import { isString } from "../types/String";

export interface PankkiViivakoodi {
    readonly iban: string;
    readonly euros: number;
    readonly cents: number;
    readonly refNum: string | undefined;
    readonly dueDate: string;
}

/** Parse finnish IBAN as 16 numbers
 * Example: 'FI21 1234 5600 0007 85', more examples: http://www.rbs.co.uk/corporate/international/g0/guide-to-international-business/regulatory-information/iban/iban-example.ashx
 * @returns {string} The result as 16 numeric characters.
 */
export function parseFiIBAN (iban : string) : string | undefined {
    iban = ('' + iban).trim().toLowerCase();
    const prefixString = iban.substring(0, 2);
    if (prefixString !== 'fi') return undefined;
    iban = iban.replace(/^[^0-9]+/, "").replace(/ +/g, "");
    if (iban?.length !== 16) return undefined;
    return iban;
}

/** */
export function padZeros (num : string | number, l: number) : string {
    num = '' + num;
    let ll = num.length;
    if (ll >= l) {
        return num;
    }
    return new Array((l-ll)+1).join('0') + num;
}

/** Parse finnish reference numbers and pad it
 * @returns {string} The reference number as 20 long string padded with zeros.
 */
export function parseRefNum(num : string) : string {
    num = (''+num).trim().replace(/[^0-9]/g, "");
    // debug.assert(num).is('string').maxLength(20);
    if(num.length !== 20) {
        return padZeros(num, 20);
    }
    // debug.assert(num).is('string').length(20).is('integer');
    return num;
}

/** Parse cents and pad it. If the amount is wrong, use all zeros (8 characters).
 * @returns {string} The reference number as 20 long string padded with zeros.
 */
export function parseCents(
    euros  : string | number | undefined,
    cents ?: string | number | undefined
) : string {

    euros = padZeros(euros||'', 6);
    cents = padZeros(cents||'', 2);

    if(euros.length !== 6) {
        return '00000000';
    }

    let res;
    if( (!euros) && (cents.length > 2) ) {
        euros = '';
        res = padZeros('' + euros + cents, 8);
    } else {
        if(cents.length !== 2) {
            return '00000000';
        }
        res = padZeros('' + euros + cents, 8);
    }
    if(!(res && (res.length === 8))) {
        return '00000000';
    }
    // debug.assert(res).is('string').length(8).is('integer');
    return res;
}

/** Parse dates as a string in format "YYMMDD"
 * @returns {string} The date as a string
 */
export function parseDueDate(date : string) : string {
    if(!date) {
        return '000000';
    }
    // FIXME: Use TimeService here
    let str = moment(date).format("YYMMDD");
    // debug.assert(str).is('string').length(6).is('integer');
    return str;
}

/** */
export function viivakoodiCreate (
    iban: string,
    euros: string,
    cents: string,
    refNum: string,
    dueDate: string
) : string | undefined {
    // debug.assert(opts).is('object');
    const ibanOrUndefined = parseFiIBAN(iban);
    if (!ibanOrUndefined) return undefined;
    cents = parseCents(euros, cents);
    refNum = parseRefNum(refNum);
    dueDate = parseDueDate(dueDate);
    let viite = '4' + ibanOrUndefined + cents + "000" + refNum + dueDate;
    // debug.assert(viite).is('string').length(54).is('integer');
    return viite;
}

/** */
export function viivakoodiCheck(code : string) : boolean {
    if(!isString(code)) { return false; }
    let version = code[0];
    if(! ( (version === '4') || (version === '5') ) ) { return false; }
    if(code.length !== 54) { return false; }
    //if(!is.integer(code)) { return false; }
    return true;
}

/** */
export function viivakoodiParse4(code : string) : PankkiViivakoodi {
    // debug.assert(code).is('string');

    if(!viivakoodiCheck(code)) {
        throw new TypeError("code is invalid: "+ code);
    }

    // let version = code[0];
    // // debug.assert(version).is('string').equals('4');
    //
    // let duedate = code.substring(1+16+6+2+3+20, 6);
    // //debug.log('duedate = ', duedate);

    const refNum = refNumParse( code.substring(1+16+6+2+3, 20) );

    let parsed : PankkiViivakoodi = {
        iban : 'FI' + code.substring(1, 16),
        euros : parseInt( code.substring(1+16, 6).replace(/^0+([0-9])/, "$1") , 10),
        cents : parseInt( code.substring(1+16+6, 2).replace(/^0+([0-9])/, "$1") , 10),
        refNum : refNum,
        dueDate : moment( '20' + code.substring(1+16+6+2+3+20, 6), "YYYYMMDD" ).toISOString()
    };

    return parsed;
}

/**
 * @returns normal reference number
 */
export function parseRfRefNum(code: string) : string | undefined {
    // debug.assert(code).is('string');
    if(code.substring(0, 2) === 'RF') {
        return refNumParse( code.substring(4) );
    }
}

/** */
export function viivakoodiParse5(code: string) : PankkiViivakoodi {
    // debug.assert(code).is('string');
    if(!viivakoodiCheck(code)) {
        throw new TypeError("code is invalid: "+ code);
    }
    // let version = code[0];
    // // debug.assert(version).is('string').equals('5');
    let duedate = code.substring(1+16+6+2+23, 6);
    //debug.log('duedate = ', duedate);
    let parsed = {
        iban: 'FI' + code.substring(1, 16),
        euros: parseInt( code.substring(1+16, 6).replace(/^0+([0-9])/, "$1") , 10),
        cents: parseInt( code.substring(1+16+6, 2).replace(/^0+([0-9])/, "$1") , 10),
        refNum: parseRfRefNum('RF' + code.substring(1+16+6+2, 23)),
        dueDate: moment( '20' + duedate, "YYYYMMDD" ).toISOString()
    };
    return parsed;
}

/** */
export function viivakoodiParse(code: string) : PankkiViivakoodi {
    // debug.assert(code).is('string');
    let version = code[0];
    if(version === '5') {
        return viivakoodiParse5(code);
    }
    return viivakoodiParse4(code);
}

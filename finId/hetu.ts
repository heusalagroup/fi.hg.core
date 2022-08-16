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
 */

/*
 * *** Tarkisteiden laskemisia ***
 * luonut:	Mux F-Production | http://mux.fi/ | 2009
 * käyttöoikeus: Sendanor - http://sendanor.fi/
 * Käyttöoikeus sisältää vapaan muokkauksen ja soveltamisen
 * sekä käyttötarkoituksen (kaupallisuus, avoin lähdekoodi,...).
 *
 * created: Su 2009-05-17
 * updated: Su 2009-05-17
 * $Id: hetu.js 8373 2009-06-30 08:38:04Z jheusala $
 * -----
 * FUNKTIOT:
 * - TarkistaHETU	Tarkista henkilötunnuksen oikeellisuus.
 *
 * SUUNNITELMISSA:
 * - pankkitilin oikeellisuuden laskenta (kotimaisen ja IBAN)
 *
 */

/** Calculate check sum for finnish hetu ID object */
export function hetuChecksum (id: Hetu) : string {
    // luodaan iso luku äsken luetuista numeroista ja samalla lasketaan tarkiste
    let n = (id.n + id.yy*1000 + id.mm*100000 + id.dd*10000000)%31;
    let s = '0123456789ABCDEFHJKLMNPRSTUVWXY';
    return s[n];
}

export function hetuParseCentury (x: string) : number | undefined {
    switch(x) {
        case '+': return 1800;
        case '-': return 1900;
        case 'A': return 2000;
    }
    return undefined;
}

export enum HetuSex {
    MALE = "male",
    FEMALE = "female"
}

export interface Hetu {
    readonly x: string;
    readonly dd : number;
    readonly mm : number;
    readonly yy : number;
    readonly n : number;
    readonly t : string;
}

/** Parse hetu string to an object */
export function parseHetuString (hetu: string) : Hetu | undefined {
    // Tarkista henkilötunnus hetu (merkkijono muotoa PPKKVVXNNNT).
    // dd = 01..31 (päivä)
    // mm = 01..12 (kuukausi)
    // yy = 00..99 (vuosi)
    // x = "+" tarkoittaa 1800-lukua, "-" 1900-lukua ja "A" 2000-lukua
    // n = 3-numeroinen yksilönumero (miehillä pariton, naisilla parillinen)
    // t = tarkistemerkki (jokin seuraavista: 0123456789ABCDEFHJKLMNPRSTUVWXY)

    // vaaditaan 11 merkin pituus
    if (hetu.length !== 11) { return; }
    let dd = parseInt(hetu.substring(0, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
    let mm = parseInt(hetu.substring(2, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
    let yy = parseInt(hetu.substring(4, 2).replace('/^0+/', '').replace('/^$/', ''), 10);
    let century = hetu[6].toUpperCase();
    let id = parseInt(hetu.substring(7, 3).replace('/^0+/', '').replace('/^$/', ''), 10);
    let checksum = hetu[10].toUpperCase();
    if ((dd<1) || (dd>31)) { return; }
    if ((mm<1) || (mm>12)) { return; }
    if (isNaN(yy) || (yy<0)) { return; }
    if ((century!=='+') && (century!=='-') && (century!=='A')) { return; }
    if (isNaN(id) || (id<0)) { return; }
    return {
        x : century,
        dd : dd,
        mm : mm,
        yy : yy,
        n : id,
        t : checksum
    };
}

/** Check hetu from a string */
export function checkParsedHetu (id: Hetu) : boolean {
    if( (!id) || (id && (!id.t)) ) { return false; }
    return hetuChecksum(id) === id.t;
}

/** Parse date from hetu object */
export function parseHetuDate (id : Hetu) : Date | undefined {
    let century = hetuParseCentury(id.x);
    if(century && id.mm && id.dd) {
        return new Date(century+id.yy, id.mm-1, id.dd, 12);
    }
    return undefined;
}

/** Parse sex */
export function parseSex (parsed_hetu : Hetu) : HetuSex | undefined {
    let n = parsed_hetu.n;
    if((n === undefined) || (typeof n !== "number")) { return; }
    /* jslint bitwise: false */
    /* jshint bitwise: false */
    n = n & 1;
    /* jshint bitwise: true */
    /* jslint bitwise: true */
    switch(n) {
        case 0: return HetuSex.FEMALE;
        case 1: return HetuSex.MALE;
    }
}

export class HetuObject {

    private _value : Hetu | undefined;

    public constructor (hetu : string) {
        this._value = parseHetuString(hetu);
    }

    public change (h: string) : HetuObject {
        this._value = parseHetuString(h);
        return this;
    }

    public check () : boolean {
        return this._value ? checkParsedHetu(this._value) : false;
    }

    public getDate () : Date | undefined {
        return this._value ? parseHetuDate(this._value) : undefined;
    }

    public getSex () : HetuSex | undefined {
        return this._value ? parseSex(this._value) : undefined;
    }

}

/** Parse hetu string and return it as an object */
export function parseHetuObject (hetu : string) : HetuObject {
    return new HetuObject(hetu);
}

/** Check hetu from a string */
export function checkHetuString (hetu: string) : boolean {
    return parseHetuObject(hetu).check();
}

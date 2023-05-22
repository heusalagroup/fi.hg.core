// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isNumber } from "./Number";
import { isString } from "./String";
import { explainNot, explainOk, explainOr } from "./explain";
import { trimStart } from "../functions/trimStart";
import { isUndefined } from "./undefined";

export function isValidDate (time: any) : time is Date {
    try {
        if (!time) return false;
        if (!(time instanceof Date)) return false;
        const utcFullYear = time.getUTCFullYear();
        const utcMonth = time.getUTCMonth();
        const utcDate = time.getUTCDate();
        const utcHours = time.getUTCHours();
        const utcMinutes = time.getUTCMinutes();
        const utcSeconds = time.getUTCSeconds();
        return (
            isNumber(utcFullYear) && utcFullYear >= 0
            && isNumber(utcMonth) && utcMonth >= 0
            && isNumber(utcDate) && utcDate >= 0
            && isNumber(utcHours) && utcHours >= 0
            && isNumber(utcMinutes) && utcMinutes >= 0
            && isNumber(utcSeconds) && utcSeconds >= 0
        );
    } catch (err) {
        return false;
    }
}

export function parseValidDate (value : unknown) : Date | undefined {
    if ( isValidDate(value) ) return value;
    if ( isNumber(value) ) {
        const date = new Date();
        date.setTime(value);
        return isValidDate(date) ? date : undefined;
    }
    if ( isIsoDateStringWithMilliseconds(value) ) {
        const date = new Date(value);
        return isValidDate(date) ? date : undefined;
    }
    if ( isString(value) ) {
        const date = new Date(value);
        return isValidDate(date) ? date : undefined;
    }
    return undefined;
}


////////////////////// IsoDateStringWithMilliseconds ///////////////////////////


export type IsoDateStringWithMilliseconds = string;

export function isIsoDateStringWithMilliseconds (value: unknown): value is IsoDateStringWithMilliseconds {
    if ( !isString( value ) ) return false;
    if ( !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test( value ) ) return false;
    const d = new Date( value );
    return d.toISOString() === value;
}

export function parseIsoDateStringWithMilliseconds (
    value: any,
    trimFractions ?: boolean
): IsoDateStringWithMilliseconds | undefined {
    if ( isIsoDateStringWithMilliseconds( value ) ) return value;
    const date = parseValidDate( value );
    if ( !date ) return undefined;
    const str = date.toISOString();
    if ( trimFractions !== true ) {
        return str;
    } else {
        const i = str.lastIndexOf( '.' );
        if ( i < 0 ) return str;
        return str.substring( 0, i ) + trimStart( str.substring( i + 1 ), '0123456789' );
    }
}

export function createIsoDateStringWithMilliseconds (
    value: string | Date
): IsoDateStringWithMilliseconds {
    const parsedValue = parseIsoDateStringWithMilliseconds( value );
    if ( !parsedValue ) throw new TypeError( `Value is not ISO data string: '${value}'` );
    return parsedValue;
}

export function explainIsoDateStringWithMilliseconds (value: unknown): string {
    return isIsoDateStringWithMilliseconds( value ) ? explainOk() : explainNot( `Expected '${value}' to be a valid IsoDateString` );
}

export function isIsoDateStringWithMillisecondsOrUndefined (value: unknown): value is IsoDateStringWithMilliseconds | undefined {
    return isUndefined( value ) || isIsoDateStringWithMilliseconds( value );
}

export function explainIsoDateStringWithMillisecondsOrUndefined (value: unknown): string {
    return isIsoDateStringWithMillisecondsOrUndefined( value ) ? explainOk() : explainNot( explainOr( [ 'IsoDateStringWithMilliseconds', 'undefined' ] ) );
}


////////////////////// IsoDateString ///////////////////////////


export type IsoDateString = string;

export function isIsoDateString (value: unknown): value is IsoDateString {
    if ( !isString( value ) ) return false;
    if ( !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d:[0-5]\d|Z)/.test( value ) ) return false;
    const d = new Date( value );
    return d.toISOString() === value || _trimFractions(d.toISOString()) === value;
}

export function parseIsoDateString (
    value: any,
    trimFractions ?: boolean
): IsoDateString | undefined {
    if ( isIsoDateString( value ) ) return value;
    const date = parseValidDate( value );
    if ( !date ) return undefined;
    const str = date.toISOString();
    return trimFractions !== true ? str : _trimFractions( str );
}

function _trimFractions (str : string) : string {
    const i = str.lastIndexOf( '.' );
    if ( i < 0 ) return str;
    return str.substring( 0, i ) + trimStart( str.substring( i + 1 ), '0123456789' );
}

export function createIsoDateString (
    value: string | Date
): IsoDateString {
    const parsedValue = parseIsoDateString( value );
    if ( !parsedValue ) throw new TypeError( `Value is not ISO data string: '${value}'` );
    return parsedValue;
}

export function explainIsoDateString (value: unknown): string {
    return isIsoDateString( value ) ? explainOk() : explainNot( `Expected '${value}' to be a valid IsoDateString` );
}

export function isIsoDateStringOrUndefined (value: unknown): value is IsoDateString | undefined {
    return isUndefined( value ) || isIsoDateString( value );
}

export function explainIsoDateStringOrUndefined (value: unknown): string {
    return isIsoDateStringOrUndefined( value ) ? explainOk() : explainNot( explainOr( [ 'IsoDateString', 'undefined' ] ) );
}

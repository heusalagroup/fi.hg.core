// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "./String";
import { explainNot, explainOk, explainOr } from "./explain";
import { parseValidDate } from "./Date";
import { isUndefined } from "./undefined";
import { trimStart } from "../functions/trimStart";

export type IsoDateString = string;

export function createIsoDateString (
    value: string | Date
) : IsoDateString {
    const parsedValue = parseIsoDateString(value);
    if (!parsedValue) throw new TypeError(`Value is not ISO data string: '${value}'`);
    return parsedValue;
}

export function isIsoDateString (value: unknown) : value is IsoDateString {
    if (!isString(value)) return false;
    if ( !/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(value) ) return false;
    const d = new Date(value);
    return d.toISOString() === value;
}

export function explainIsoDateString (value: unknown) : string {
    return isIsoDateString(value) ? explainOk() : explainNot(`Expected '${value}' to be a valid IsoDateString`);
}

export function stringifyIsoDateString (value : IsoDateString) : string {
    return `IsoDateString(${value})`;
}

export function parseIsoDateString (
    value: any,
    trimFractions : boolean = false
) : IsoDateString | undefined {
    if (isIsoDateString(value)) return value;
    const date = parseValidDate(value);
    if (!date) return undefined;
    const str = date.toISOString();
    if ( !trimFractions ) return str;
    const i = str.lastIndexOf( '.' );
    if ( i < 0 ) return str;
    return str.substring( 0, i ) + trimStart( str.substring( i + 1 ), '0123456789' );
}

export function isIsoDateStringOrUndefined (value: unknown): value is IsoDateString | undefined {
    return isUndefined(value) || isIsoDateString(value);
}

export function explainIsoDateStringOrUndefined (value: unknown): string {
    return isIsoDateStringOrUndefined(value) ? explainOk() : explainNot(explainOr(['IsoDateString', 'undefined']));
}

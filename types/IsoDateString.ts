// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "./String";
import { explainNot, explainOk } from "./explain";
import { isValidDate, parseValidDate } from "./Date";
import { isNumber } from "./Number";

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

export function parseIsoDateString (value: any) : IsoDateString | undefined {
    if (isIsoDateString(value)) return value;
    const date = parseValidDate(value);
    return date ? date.toISOString() : undefined;
}

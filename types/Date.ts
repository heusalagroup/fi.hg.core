// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isNumber } from "./Number";
import { isString } from "./String";
import { isIsoDateString } from "./IsoDateString";

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
    if ( isIsoDateString(value) ) {
        const date = new Date(value);
        return isValidDate(date) ? date : undefined;
    }
    if ( isString(value) ) {
        const date = new Date(value);
        return isValidDate(date) ? date : undefined;
    }
    return undefined;
}
// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "./String";
import { isRegularObject } from "./RegularObject";
import { hasNoOtherKeys } from "./OtherKeys";

export interface CalendarEvent {
    readonly start        : string;
    readonly end          : string;
    readonly repeatRule   : string;
    readonly stamp        : string;
    readonly uid          : string;
    readonly created      : string;
    readonly description  : string;
    readonly lastModified : string;
    readonly location     : string;
    readonly sequence     : string;
    readonly status       : string;
    readonly summary      : string;
    readonly transparency : string;
}

export function createCalendarEvent (
    start        : string,
    end          : string,
    repeatRule   : string,
    stamp        : string,
    uid          : string,
    created      : string,
    description  : string,
    lastModified : string,
    location     : string,
    sequence     : string,
    status       : string,
    summary      : string,
    transparency : string
): CalendarEvent {
    return {
        start,
        end,
        repeatRule,
        stamp,
        uid,
        created,
        description,
        lastModified,
        location,
        sequence,
        status,
        summary,
        transparency
    };
}

export function isCalendarEvent (value: any): value is CalendarEvent {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'start',
            'end',
            'repeatRule',
            'stamp',
            'uid',
            'created',
            'description',
            'lastModified',
            'location',
            'sequence',
            'status',
            'summary',
            'transparency'
        ])
        && isString(value?.start)
        && isString(value?.end)
        && isString(value?.repeatRule)
        && isString(value?.stamp)
        && isString(value?.uid)
        && isString(value?.created)
        && isString(value?.description)
        && isString(value?.lastModified)
        && isString(value?.location)
        && isString(value?.sequence)
        && isString(value?.status)
        && isString(value?.summary)
        && isString(value?.transparency)
    );
}

export function stringifyCalendarEvent (value: CalendarEvent): string {
    return `CalendarEvent(${value})`;
}

export function parseCalendarEvent (value: any): CalendarEvent | undefined {
    if ( isCalendarEvent(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../modules/lodash";

export interface CalendarEvent {

}

export function createCalendarEvent (

): CalendarEvent {
    return {};
}

export function isCalendarEvent (value: any): value is CalendarEvent {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [

        ])
        && isString(value?.foo)
    );
}

export function stringifyCalendarEvent (value: CalendarEvent): string {
    return `CalendarEvent(${value})`;
}

export function parseCalendarEvent (value: any): CalendarEvent | undefined {
    if ( isCalendarEvent(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CalendarEvent, isCalendarEvent } from "./CalendarEvent";
import { map } from "../functions/map";
import { isRegularObject } from "./RegularObject";
import { hasNoOtherKeys } from "./OtherKeys";
import { isArrayOf } from "./Array";

export interface CalendarDTO {
    readonly events : readonly CalendarEvent[];
}

export function createCalendarDTO (
    events: readonly CalendarEvent[] | CalendarEvent[]
): CalendarDTO {
    return {
        events: map(events, item => item)
    };
}

export function isCalendarDTO (value: any): value is CalendarDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'events'
        ])
        && isArrayOf<CalendarEvent>(value?.events, isCalendarEvent)
    );
}

export function stringifyCalendarDTO (value: CalendarDTO): string {
    return `CalendarDTO(${value})`;
}

export function parseCalendarDTO (value: any): CalendarDTO | undefined {
    if ( isCalendarDTO(value) ) return value;
    return undefined;
}

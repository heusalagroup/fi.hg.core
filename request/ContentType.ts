// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum ContentType {
    TEXT     = "text/plain",
    CALENDAR = "text/calendar",
    JSON     = "application/json",
}

export function isContentType (value: any): value is ContentType {
    switch (value) {
        case ContentType.TEXT:
        case ContentType.CALENDAR:
        case ContentType.JSON:
            return true;

        default:
            return false;

    }
}

export function stringifyContentType (value: ContentType): string {
    switch (value) {
        case ContentType.TEXT  : return ContentType.TEXT;
        case ContentType.CALENDAR  : return ContentType.CALENDAR;
        case ContentType.JSON  : return ContentType.JSON;
    }
    throw new TypeError(`Unsupported ContentType value: ${value}`);
}

export function parseContentType (value: any): ContentType | undefined {

    switch (`${value}`.toLowerCase()) {

        case ContentType.TEXT:
        case 'text' : return ContentType.TEXT;

        case ContentType.CALENDAR:
        case 'calendar' : return ContentType.CALENDAR;

        case ContentType.JSON:
        case 'json' : return ContentType.JSON;

        default     : return undefined;

    }

}

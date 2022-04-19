// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../modules/lodash";

export interface InternetCalendarParam {
    readonly name  : string;
    readonly value : string;
}

export function createInternetCalendarParam (
    name  : string,
    value : string
): InternetCalendarParam {
    return {
        name,
        value
    };
}

export function isInternetCalendarParam (value: any): value is InternetCalendarParam {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name',
            'value'
        ])
        && isString(value?.name)
        && isString(value?.value)
    );
}

export function stringifyInternetCalendarParam (value: InternetCalendarParam): string {
    return `InternetCalendarParam(${value})`;
}

export function parseInternetCalendarParam (value: any): InternetCalendarParam | undefined {
    if ( isInternetCalendarParam(value) ) return value;
    return undefined;
}

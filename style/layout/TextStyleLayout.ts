// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isStringOrUndefined } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface TextStyleLayout {
    readonly font   ?: string;
    readonly color  ?: string;
    readonly size   ?: string;
}

export function createTextStyleLayout (
    font  ?: string,
    color ?: string,
    size  ?: string
): TextStyleLayout {
    return {
        font,
        color,
        size
    };
}

export function isTextStyleLayout (value: any): value is TextStyleLayout {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'font',
            'color',
            'size'
        ])
        && isStringOrUndefined(value?.font)
        && isStringOrUndefined(value?.color)
        && isStringOrUndefined(value?.size)
    );
}

export function stringifyTextStyleLayout (value: TextStyleLayout): string {
    return `ComponentTextStyle(${value})`;
}

export function parseTextStyleLayout (value: any): TextStyleLayout | undefined {
    if ( isTextStyleLayout(value) ) return value;
    return undefined;
}

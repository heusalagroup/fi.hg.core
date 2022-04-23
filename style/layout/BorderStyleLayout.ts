// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString, isUndefined } from "../../modules/lodash";
import { BorderType, isBorderType } from "../types/BorderType";

export interface BorderStyleLayout {
    readonly size      ?: string;
    readonly type      ?: BorderType;
    readonly radius    ?: string;
    readonly color     ?: string;
}

export function createBorderStyleLayout (
    size    ?: string,
    color   ?: string,
    type    ?: BorderType,
    radius  ?: string,
): BorderStyleLayout {
    return {
        size,
        color,
        type,
        radius
    };
}

export function isBorderStyleLayout (value: any): value is BorderStyleLayout {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'size',
            'type',
            'radius',
            'color'
        ])
        && ( isUndefined(value?.size) || isString(value?.size) )
        && ( isUndefined(value?.type) || isBorderType(value?.type) )
        && ( isUndefined(value?.radius) || isString(value?.radius) )
        && ( isUndefined(value?.color) || isString(value?.color) )
    );
}

export function stringifyBorderStyleLayout (value: BorderStyleLayout): string {
    return `ComponentBorderStyle(${value})`;
}

export function parseBorderStyleLayout (value: any): BorderStyleLayout | undefined {
    if ( isBorderStyleLayout(value) ) return value;
    return undefined;
}

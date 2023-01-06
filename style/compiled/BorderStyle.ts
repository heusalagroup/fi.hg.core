// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BorderType, isBorderType } from "../types/BorderType";
import { Size, isSize } from "../types/Size";
import { Color, isColor } from "../types/Color";
import { isUndefined } from "../../types/undefined";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface BorderStyle {
    readonly size      ?: Size;
    readonly type      ?: BorderType;
    readonly radius    ?: Size;
    readonly color     ?: Color;
}

export function createBorderStyle (
    size    ?: Size,
    color   ?: Color,
    type    ?: BorderType,
    radius  ?: Size,
): BorderStyle {
    return {
        size,
        color,
        type,
        radius
    };
}

export function isBorderStyle (value: any): value is BorderStyle {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'size',
            'type',
            'radius',
            'color'
        ])
        && ( isUndefined(value?.size) || isSize(value?.size) )
        && ( isUndefined(value?.type) || isBorderType(value?.type) )
        && ( isUndefined(value?.radius) || isSize(value?.radius) )
        && ( isUndefined(value?.color) || isColor(value?.color) )
    );
}

export function stringifyBorderStyle (value: BorderStyle): string {
    return `BorderStyle(${value})`;
}

export function parseBorderStyle (value: any): BorderStyle | undefined {
    if ( isBorderStyle(value) ) return value;
    return undefined;
}

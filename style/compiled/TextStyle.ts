// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isUndefined } from "../../modules/lodash";
import { Font, isFont } from "../types/Font";
import { Color, isColor } from "../types/Color";
import { Size, isSize } from "../types/Size";

export interface TextStyle {
    readonly font  ?: Font;
    readonly color ?: Color;
    readonly size  ?: Size;
}

export function createTextStyle (
    font  ?: Font,
    color ?: Color,
    size  ?: Size
): TextStyle {
    return {
        font,
        color,
        size
    };
}

export function isTextStyle (value: any): value is TextStyle {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'font',
            'color',
            'size'
        ])
        && (isUndefined(value?.font) || isFont(value?.font))
        && (isUndefined(value?.color) || isColor(value?.color))
        && (isUndefined(value?.size) || isSize(value?.size))
    );
}

export function stringifyTextStyle (value: TextStyle): string {
    return `ComponentTextStyle(${value})`;
}

export function parseTextStyle (value: any): TextStyle | undefined {
    if ( isTextStyle(value) ) return value;
    return undefined;
}

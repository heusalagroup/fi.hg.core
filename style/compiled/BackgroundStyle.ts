// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Color, isColor } from "../types/Color";
import { isUndefined } from "../../types/undefined";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface BackgroundStyle {
    readonly color ?: Color;
}

export function createBackgroundStyle (
    color ?: Color
): BackgroundStyle {
    return {
        color
    };
}

export function isBackgroundStyle (value: any): value is BackgroundStyle {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'color'
        ])
        && ( isUndefined(value?.color) || isColor(value?.color) )
    );
}

export function stringifyBackgroundStyle (value: BackgroundStyle): string {
    return `BackgroundStyle(${value})`;
}

export function parseBackgroundStyle (value: any): BackgroundStyle | undefined {
    if ( isBackgroundStyle(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../types/String";

export type Color = string;

export function createColor (
    value: string
): Color {
    return value;
}

export function isColor (value: any): value is Color {
    return (
        isString(value)
    );
}

export function stringifyColor (value: Color): string {
    return `Color(${value})`;
}

export function parseColor (value: any): Color | undefined {
    if ( isColor(value) ) return value;
    return undefined;
}

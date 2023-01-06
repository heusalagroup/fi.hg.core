// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TextStyle, isTextStyle } from "./TextStyle";
import { BorderStyle, isBorderStyle } from "./BorderStyle";
import { BackgroundStyle, isBackgroundStyle } from "./BackgroundStyle";
import { Size, isSize } from "../types/Size";
import { isUndefined } from "../../types/undefined";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface ComponentStyle {
    readonly text       ?: TextStyle;
    readonly border     ?: BorderStyle;
    readonly background ?: BackgroundStyle;
    readonly padding    ?: Size;
}

export function createComponentStyle (
    text       ?: TextStyle,
    border     ?: BorderStyle,
    background ?: BackgroundStyle,
    padding    ?: Size
): ComponentStyle {
    return {
        background,
        padding,
        text,
        border
    };
}

export function isComponentStyle (value: any): value is ComponentStyle {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'background',
            'padding',
            'text',
            'border'
        ])
        && ( isUndefined(value?.background) || isBackgroundStyle(value?.background) )
        && ( isUndefined(value?.text) || isTextStyle(value?.text) )
        && ( isUndefined(value?.border) || isBorderStyle(value?.border) )
        && ( isUndefined(value?.padding) || isSize(value?.padding) )
    );
}

export function stringifyComponentStyle (value: ComponentStyle): string {
    return `ComponentStyle(${value})`;
}

export function parseComponentStyle (value: any): ComponentStyle | undefined {
    if ( isComponentStyle(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Color, isColor } from "./types/Color";
import { Font, isFont } from "./types/Font";
import { ColorScheme, isColorScheme } from "./types/ColorScheme";
import { ComponentStyleLayout, isComponentStyleLayout } from "./layout/ComponentStyleLayout";
import { isSize, Size } from "./types/Size";
import { isString } from "../types/String";
import { isRegularObject } from "../types/RegularObject";
import { isObjectOf } from "../types/Object";
import { hasNoOtherKeys } from "../types/OtherKeys";

export interface ColorMapping {
    readonly [key: string]: Color;
}

export function isColorMapping (value : any) : value is ColorMapping {
    return isObjectOf<string, Color>(value, isString, isColor);
}

export interface FontMapping {
    readonly [key: string]: Font;
}

export function isFontMapping (value : any) : value is FontMapping {
    return isObjectOf<string, Font>(value, isString, isFont);
}

export interface SizeMapping {
    readonly [key: string]: Size;
}

export function isSizeMapping (value : any) : value is SizeMapping {
    return isObjectOf<string, Size>(value, isString, isSize);
}

export interface ComponentStyleLayoutMapping {
    readonly [key: string]: ComponentStyleLayout;
}

export function isComponentStyleLayoutMapping (value : any) : value is ComponentStyleLayoutMapping {
    return isObjectOf<string, ComponentStyleLayout>(value, isString, isComponentStyleLayout);
}

export interface StyleLayout {
    readonly colorScheme : ColorScheme;
    readonly colors      : ColorMapping;
    readonly fonts       : FontMapping;
    readonly sizes       : SizeMapping;
    readonly components  : ComponentStyleLayoutMapping;
}

export function createStyleLayout (
    colorScheme : ColorScheme,
    colors      : ColorMapping,
    fonts       : FontMapping,
    sizes       : SizeMapping,
    components  : ComponentStyleLayoutMapping
): StyleLayout {
    return {
        colorScheme,
        colors,
        fonts,
        sizes,
        components
    };
}

export function isStyleLayout (value: any): value is StyleLayout {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'colorScheme',
            'colors',
            'fonts',
            'components'
        ])
        && isColorMapping(value?.colors)
        && isFontMapping(value?.fonts)
        && isComponentStyleLayoutMapping(value?.components)
        && isColorScheme(value?.colorScheme)
    );
}

export function stringifyStyleLayout (value: StyleLayout): string {
    return `StyleLayout(${value})`;
}

export function parseStyleLayout (value: any): StyleLayout | undefined {
    if ( isStyleLayout(value) ) return value;
    return undefined;
}

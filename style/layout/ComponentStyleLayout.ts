// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TextStyleLayout, isTextStyleLayout } from "./TextStyleLayout";
import { BorderStyleLayout, isBorderStyleLayout } from "./BorderStyleLayout";
import { BackgroundStyleLayout, isBackgroundStyleLayout } from "./BackgroundStyleLayout";
import { isUndefined } from "../../types/undefined";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface ComponentStyleLayout {
    readonly text        ?: TextStyleLayout;
    readonly border      ?: BorderStyleLayout;
    readonly background  ?: BackgroundStyleLayout;
    readonly padding     ?: string;
}

export function createComponentStyleLayout (
    text       ?: TextStyleLayout,
    border     ?: BorderStyleLayout,
    background ?: BackgroundStyleLayout,
    padding    ?: string
): ComponentStyleLayout {
    return {
        background,
        padding,
        text,
        border
    };
}

export function isComponentStyleLayout (value: any): value is ComponentStyleLayout {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'background',
            'padding',
            'text',
            'border',
        ])
        && ( isUndefined(value?.background) || isBackgroundStyleLayout(value?.background) )
        && ( isUndefined(value?.text) || isTextStyleLayout(value?.text) )
        && ( isUndefined(value?.border) || isBorderStyleLayout(value?.border) )
        && ( isUndefined(value?.padding) || isString(value?.padding) )
    );
}

export function stringifyComponentStyleLayout (value: ComponentStyleLayout): string {
    return `ComponentStyleLayout(${value})`;
}

export function parseComponentStyleLayout (value: any): ComponentStyleLayout | undefined {
    if ( isComponentStyleLayout(value) ) return value;
    return undefined;
}

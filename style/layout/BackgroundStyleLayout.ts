// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface BackgroundStyleLayout {
    readonly color : string;
}

export function createBackgroundStyleLayout (
    color: string
): BackgroundStyleLayout {
    return {
        color
    };
}

export function isBackgroundStyleLayout (value: any): value is BackgroundStyleLayout {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'color'
        ])
        && isString(value?.color)
    );
}

export function stringifyBackgroundStyleLayout (value: BackgroundStyleLayout): string {
    return `BackgroundStyle(${value})`;
}

export function parseBackgroundStyleLayout (value: any): BackgroundStyleLayout | undefined {
    if ( isBackgroundStyleLayout(value) ) return value;
    return undefined;
}

// Copyright (c) 2021-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { trim } from "../../functions/trim";
import { isString } from "../../types/String";

export enum ColorScheme {
    DARK,
    LIGHT
}

/**
 * Also available `ColorScheme.test(value) : boolean`
 * @param value
 */
export function isColorScheme (value: any): value is ColorScheme {
    switch (value) {

        case ColorScheme.DARK:
        case ColorScheme.LIGHT:
            return true;

        default:
            return false;
    }
}

/**
 * Also available `ColorScheme.parse(value: any) : ColorScheme | undefined`
 * @param value
 */
export function parseColorScheme (value: any): ColorScheme | undefined {

    if (isColorScheme(value)) return value;

    if (isString(value)) {
        value = trim(value).toUpperCase();
        switch (value) {

            case '0':
            case 'DARK'  : return ColorScheme.DARK;

            case '1':
            case 'LIGHT' : return ColorScheme.LIGHT;

            default      : return undefined;
        }
    }

    return undefined;

}

/**
 * Also available `ColorScheme.stringify(value: ColorScheme | undefined) : string`
 * @param value
 */
export function stringifyColorScheme (value: ColorScheme | undefined): string {
    if (value === undefined) return 'undefined';
    switch (value) {
        case ColorScheme.DARK  : return 'DARK';
        case ColorScheme.LIGHT : return 'LIGHT';
        default                : return `ColorScheme(${value})`;
    }
}

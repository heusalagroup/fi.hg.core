// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallbackNonStandard } from "./TestCallback";
import { EXPLAIN_OK } from "./explain";
import { values } from "../functions/values";
import { join } from "../functions/join";
import { isString } from "./String";
import { isNumber } from "./Number";
import { keys } from "../functions/keys";
import { indexOf } from "../functions/indexOf";
import { map } from "../functions/map";

export interface Enum<T extends number | string> {
    readonly [key: string]: T;
}

/**
 * Checks the given value is of the given enum.
 *
 * @template EnumType - The type of the enum.
 * @param {Enum} type - The enum.
 * @param {unknown} value - The value to explain.
 * @returns {string} A string explaining the value with respect to the enum.
 */
export function isEnum<T extends number | string = string> (
    type: Enum<T>,
    value: unknown
): value is T {
    if ( isNumber(value) || isString(value) ) {
        return indexOf(values(type), value as T) >= 0;
    } else {
        return false;
    }
}

/**
 * Explain the given value with respect to the given enum.
 *
 * @template EnumType - The type of the enum.
 * @param {string} name - The name of the enum.
 * @param {Enum} type - The enum.
 * @param {TestCallbackNonStandard} isType - A function that tests if a value is of the correct type.
 * @param {unknown} value - The value to explain.
 * @returns {string} A string explaining the value with respect to the enum.
 */
export function explainEnum<T extends number | string = string> (
    name: string,
    type: Enum<T>,
    isType: TestCallbackNonStandard,
    value: unknown
): string {
    if ( !isType(value) ) {
        return `incorrect enum value "${value}" for ${name}: Accepted values ${join(values(type), ', ')}`;
    } else {
        return EXPLAIN_OK;
    }
}

/**
 *
 * @param type
 * @param value
 */
export function stringifyEnum<T extends number | string = string> (
    type  : Enum<T>,
    value : T
) : string {
    const enumValues = values(type);
    const enumKeys = keys(type);
    const index = indexOf(enumValues, value);
    if (index < 0) throw new TypeError(`Unsupported enum value: ${value}`);
    const key = enumKeys[index];
    return `${key}`;
}

/**
 *
 * @param type
 * @param value
 */
export function parseEnum<T extends number | string = string> (
    type  : Enum<T>,
    value : any
) : T | undefined {

    if (value === undefined) return undefined;

    if ( isEnum<T>(type, value) ) {
        return value;
    }

    if ( isString(value) ) {
        value = value.toUpperCase();
        const uppercaseKeys = map(keys(type), (key) => key.toUpperCase());
        const index = indexOf(uppercaseKeys, value);
        if ( index >= 0 ) {
            const enumValues = values(type);
            return enumValues[index];
        }
    }

    return undefined;
}

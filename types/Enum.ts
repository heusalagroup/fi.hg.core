// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallbackNonStandard } from "./TestCallback";
import { EXPLAIN_OK } from "./explain";
import { join } from "../functions/join";
import { isString } from "./String";
import { isNumber } from "./Number";
import { indexOf } from "../functions/indexOf";
import { map } from "../functions/map";
import { trim } from "../functions/trim";
import { EnumUtils } from "../EnumUtils";

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
        return indexOf(EnumUtils.getValues(type), value as T) >= 0;
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
        return `incorrect enum value "${value}" for ${name}: Accepted values ${join(EnumUtils.getValues(type), ', ')}`;
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
    const enumValues = EnumUtils.getValues(type);
    const enumKeys = EnumUtils.getKeys(type);
    const index = indexOf(enumValues, value);
    if (index < 0) throw new TypeError(`Unsupported enum value: ${value}`);
    const key = enumKeys[index];
    return `${key}`;
}

/**
 * Parse enum value
 *
 * @param type The enum type
 * @param value The expected value of an enum
 * @param ignoreSpaces Ignore any space in the key when matching
 * @param ignoreDashes Ignore any dash (`-`, or `_`) in the key when matching
 */
export function parseEnum<T extends number | string = string> (
    type  : Enum<T>,
    value : any,
    ignoreSpaces : boolean = false,
    ignoreDashes : boolean = false,
) : T | undefined {

    if (value === undefined) return undefined;

    if ( isEnum<T>(type, value) ) {
        return value;
    }

    if ( isString(value) ) {

        const normalize = (v: string) : string => {
            v = trim(v).toUpperCase();
            if (ignoreSpaces) {
                v = v.replace(/\s+/g, "");
            }
            if (ignoreDashes) {
                v = v.replace(/[_-]+/g, "");
            }
            return v;
        };

        value = normalize(value);

        const normalizedKeys = map(EnumUtils.getKeys(type), (key) => normalize(key));
        const index = indexOf(normalizedKeys, value);
        if ( index >= 0 ) {
            const enumValues = EnumUtils.getValues(type);
            return enumValues[index];
        }
    }

    return undefined;
}

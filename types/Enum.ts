// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallbackNonStandard } from "./TestCallback";
import map from "lodash/map";
import join from "lodash/join";
import { EXPLAIN_OK } from "./explain";
import { keys } from "../functions/keys";

export interface Enum<T extends number | string> {
    [key: string]: T;
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
export function explainEnum (
    name: string,
    type: Enum<string>,
    isType: TestCallbackNonStandard,
    value: unknown
): string {
    if ( !isType(value) ) {
        const enumValues = map(keys(type), (k: string): string => type[k]);
        return `incorrect enum value "${value}" for ${name}: Accepted values ${join(enumValues, ', ')}`;
    } else {
        return EXPLAIN_OK;
    }
}

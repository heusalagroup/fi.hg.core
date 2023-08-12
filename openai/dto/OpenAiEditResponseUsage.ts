// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainNumber, isNumber } from "../../types/Number";
import { isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * @typedef {Object} OpenAiEditResponseUsage
 *
 * Property "usage" from the completion response item returned by the OpenAI API.
 */
export interface OpenAiEditResponseUsage {

    /**
     */
    readonly prompt_tokens: number;

    /**
     */
    readonly completion_tokens: number;

    /**
     */
    readonly total_tokens: number;

}

/**
 * Creates an `OpenAiEditResponseUsage` object.
 *
 * @param {number} prompt_tokens -
 * @param {number} completion_tokens -
 * @param {number} total_tokens -
 * @returns {OpenAiEditResponseUsage} The created `OpenAiEditResponseUsage` object.
 */
export function createOpenAiEditResponseUsage (
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
) : OpenAiEditResponseUsage {
    return {
        prompt_tokens,
        completion_tokens,
        total_tokens
    };
}

/**
 * Check if the given value is a valid `OpenAiEditResponseUsage` object.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiEditResponseUsage} `true` if the value is a valid `OpenAiEditResponseUsage` object, `false` otherwise.
 */
export function isOpenAiEditResponseUsage (value: unknown) : value is OpenAiEditResponseUsage {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'prompt_tokens',
            'completion_tokens',
            'total_tokens'
        ])
        && isNumber(value?.prompt_tokens)
        && isNumber(value?.completion_tokens)
        && isNumber(value?.total_tokens)
    );
}

/**
 * Attempts to explain why the given value is not a valid OpenAiEditResponseUsage object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiEditResponseUsage object.
 */
export function explainOpenAiEditResponseUsage (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'prompt_tokens',
                'completion_tokens',
                'total_tokens'
            ])
            , explainProperty("prompt_tokens", explainNumber(value?.prompt_tokens))
            , explainProperty("completion_tokens", explainNumber(value?.completion_tokens))
            , explainProperty("total_tokens", explainNumber(value?.total_tokens))
        ]
    );
}

/**
 * Convert the given `OpenAiEditResponseUsage` object to a string.
 *
 * @param {OpenAiEditResponseUsage} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiEditResponseUsage` object.
 */
export function stringifyOpenAiEditResponseUsage (value : OpenAiEditResponseUsage) : string {
    return `OpenAiEditResponseUsage(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiEditResponseUsage` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiEditResponseUsage|undefined} The parsed `OpenAiEditResponseUsage` object, or `undefined` if the value is not a valid `OpenAiEditResponseUsage` object.
 */
export function parseOpenAiEditResponseUsage (value: unknown) : OpenAiEditResponseUsage | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiEditResponseUsage(")) {
            value = value.substring("OpenAiEditResponseUsage(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiEditResponseUsage(value)) return value;
    return undefined;
}

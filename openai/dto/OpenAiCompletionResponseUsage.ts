// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainNumber, isNumber } from "../../types/Number";
import { isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * @typedef {Object} OpenAiCompletionResponseUsage
 *
 * Property "usage" from the completion response item returned by the OpenAI API.
 */
export interface OpenAiCompletionResponseUsage {

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
 * Creates an `OpenAiCompletionResponseUsage` object.
 *
 * @param {number} prompt_tokens -
 * @param {number} completion_tokens -
 * @param {number} total_tokens -
 * @returns {OpenAiCompletionResponseUsage} The created `OpenAiCompletionResponseUsage` object.
 */
export function createOpenAiCompletionResponseUsage (
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number
) : OpenAiCompletionResponseUsage {
    return {
        prompt_tokens,
        completion_tokens,
        total_tokens
    };
}

/**
 * Check if the given value is a valid `OpenAiCompletionResponseUsage` object.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiCompletionResponseUsage} `true` if the value is a valid `OpenAiCompletionResponseUsage` object, `false` otherwise.
 */
export function isOpenAiCompletionResponseUsage (value: unknown) : value is OpenAiCompletionResponseUsage {
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
 * Attempts to explain why the given value is not a valid OpenAiCompletionResponseUsage object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiCompletionResponseUsage object.
 */
export function explainOpenAiCompletionResponseUsage (value: any) : string {
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
 * Convert the given `OpenAiCompletionResponseUsage` object to a string.
 *
 * @param {OpenAiCompletionResponseUsage} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiCompletionResponseUsage` object.
 */
export function stringifyOpenAiCompletionResponseUsage (value : OpenAiCompletionResponseUsage) : string {
    return `OpenAiCompletionResponseUsage(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiCompletionResponseUsage` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiCompletionResponseUsage|undefined} The parsed `OpenAiCompletionResponseUsage` object, or `undefined` if the value is not a valid `OpenAiCompletionResponseUsage` object.
 */
export function parseOpenAiCompletionResponseUsage (value: unknown) : OpenAiCompletionResponseUsage | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiCompletionResponseUsage(")) {
            value = value.substring("OpenAiCompletionResponseUsage(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiCompletionResponseUsage(value)) return value;
    return undefined;
}

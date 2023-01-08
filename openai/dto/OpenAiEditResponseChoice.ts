// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import {
    explainNumber,
    explainNumberOrNullOrUndefined,
    isNumber,
    isNumberOrNullOrUndefined
} from "../../types/Number";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * @typedef {Object} OpenAiEditResponseChoice
 *
 * A completion response item returned by the OpenAI API.
 */
export interface OpenAiEditResponseChoice {

    /**
     * The completed text.
     */
    readonly text: string;
    readonly index : number;
    readonly logprobs ?: number | null;
    readonly finish_reason ?: string;

}

/**
 * Creates an `OpenAiEditResponseChoice` object.
 *
 * @param {string} text - The completed text.
 * @param {number} index -
 * @param {number|null} logprobs -
 * @param {string} finish_reason -
 * @returns {OpenAiEditResponseChoice} The created `OpenAiEditResponseChoice` object.
 */
export function createOpenAiEditResponseChoice (
    text: string,
    index: number,
    logprobs ?: number|null,
    finish_reason ?: string
) : OpenAiEditResponseChoice {
    return {
        text,
        index,
        logprobs,
        finish_reason
    };
}

/**
 * Check if the given value is a valid `OpenAiEditResponseChoice` object.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiEditResponseChoice} `true` if the value is a valid `OpenAiEditResponseChoice` object, `false` otherwise.
 */
export function isOpenAiEditResponseChoice (value: unknown) : value is OpenAiEditResponseChoice {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'text',
            'index',
            'logprobs',
            'finish_reason'
        ])
        && isString(value?.text)
        && isNumber(value?.index)
        && isNumberOrNullOrUndefined(value?.logprobs)
        && isStringOrUndefined(value?.finish_reason)
    );
}

/**
 * Attempts to explain why the given value is not a valid OpenAiEditResponseChoice object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiEditResponseChoice object.
 */
export function explainOpenAiEditResponseChoice (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'text',
                'index',
                'logprobs',
                'finish_reason'
            ])
            , explainProperty("text", explainString(value?.text))
            , explainProperty("index", explainNumber(value?.index))
            , explainProperty("logprobs", explainNumberOrNullOrUndefined(value?.logprobs))
            , explainProperty("finish_reason", explainStringOrUndefined(value?.finish_reason))
        ]
    );
}

/**
 * Convert the given `OpenAiEditResponseChoice` object to a string.
 *
 * @param {OpenAiEditResponseChoice} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiEditResponseChoice` object.
 */
export function stringifyOpenAiEditResponseChoice (value : OpenAiEditResponseChoice) : string {
    return `OpenAiEditResponseChoice(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiEditResponseChoice` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiEditResponseChoice|undefined} The parsed `OpenAiEditResponseChoice` object, or `undefined` if the value is not a valid `OpenAiEditResponseChoice` object.
 */
export function parseOpenAiEditResponseChoice (value: unknown) : OpenAiEditResponseChoice | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiEditResponseChoice(")) {
            value = value.substring("OpenAiEditResponseChoice(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiEditResponseChoice(value)) return value;
    return undefined;
}

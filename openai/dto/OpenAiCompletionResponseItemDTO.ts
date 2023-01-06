// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";
import { explainNumber, isNumber } from "../../types/Number";
import { explainString, isString } from "../../types/String";
import { explainStringArray, isStringArray } from "../../types/StringArray";
import { explain, explainProperty } from "../../types/explain";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * @typedef {Object} OpenAiCompletionResponseItemDTO
 *
 * A completion response item returned by the OpenAI API.
 */
export interface OpenAiCompletionResponseItemDTO {

    /**
     * The completed text.
     */
    readonly text: string;

    /**
     * The score of the completed text.
     */
    readonly score: number;

    /**
     * The possible completions for each token in the completed text.
     */
    readonly choices: readonly string[];

}

/**
 * Creates an `OpenAiCompletionResponseItemDTO` object.
 *
 * @param {string} text - The completed text.
 * @param {number} score - The score of the completed text.
 * @param {readonly string[]} choices - The possible completions for each token in the completed text.
 * @returns {OpenAiCompletionResponseItemDTO} The created `OpenAiCompletionResponseItemDTO` object.
 */
export function createOpenAiCompletionResponseItemDTO (
    text: string,
    score: number,
    choices: readonly string[]
) : OpenAiCompletionResponseItemDTO {
    return {
        text,
        score,
        choices
    };
}

/**
 * Check if the given value is a valid `OpenAiCompletionResponseItemDTO` object.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiCompletionResponseItemDTO} `true` if the value is a valid `OpenAiCompletionResponseItemDTO` object, `false` otherwise.
 */
export function isOpenAiCompletionResponseItemDTO (value: unknown) : value is OpenAiCompletionResponseItemDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'text',
            'score',
            'choices'
        ])
        && isString(value?.text)
        && isNumber(value?.score)
        && isStringArray(value?.choices)
    );
}

/**
 * Attempts to explain why the given value is not a valid OpenAiCompletionResponseItemDTO object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiCompletionResponseItemDTO object.
 */
export function explainOpenAiCompletionResponseItemDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'text',
                'score',
                'choices'
            ])
            , explainProperty("text", explainString(value?.text))
            , explainProperty("score", explainNumber(value?.score))
            , explainProperty("choices", explainStringArray(value?.choices))
        ]
    );
}

/**
 * Convert the given `OpenAiCompletionResponseItemDTO` object to a string.
 *
 * @param {OpenAiCompletionResponseItemDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiCompletionResponseItemDTO` object.
 */
export function stringifyOpenAiCompletionResponseItemDTO (value : OpenAiCompletionResponseItemDTO) : string {
    return `OpenAiCompletionResponseItemDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiCompletionResponseItemDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiCompletionResponseItemDTO|undefined} The parsed `OpenAiCompletionResponseItemDTO` object, or `undefined` if the value is not a valid `OpenAiCompletionResponseItemDTO` object.
 */
export function parseOpenAiCompletionResponseItemDTO (value: unknown) : OpenAiCompletionResponseItemDTO | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiCompletionResponseItemDTO(")) {
            value = value.substring("OpenAiCompletionResponseItemDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiCompletionResponseItemDTO(value)) return value;
    return undefined;
}

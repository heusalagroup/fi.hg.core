// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenAiModel, isOpenAiModel, OpenAiModel } from "../types/OpenAiModel";
import { explain, explainProperty } from "../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../types/Number";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * Data Transfer Object for requesting an edit from the OpenAI API.
 *
 * @see https://beta.openai.com/docs/api-reference/edits
 */
export interface OpenAiEditRequestDTO {

    /**
     * @see https://beta.openai.com/docs/api-reference/edits/create#edits/create-instruction
     */
    readonly instruction : string;

    /**
     * The model to use for edit.
     *
     * @see https://beta.openai.com/docs/api-reference/edits/create#edits/create-model
     */
    readonly model : OpenAiModel | string;

    /**
     * The input text to use as the starting point for the edit.
     *
     * Defaults to `""`
     *
     * @see https://beta.openai.com/docs/api-reference/edits/create#edits/create-input
     */
    readonly input ?: string;

    /**
     * How many edits to generate for each prompt.
     *
     * Defaults to 1
     *
     * @see https://beta.openai.com/docs/api-reference/edits/create#edits/create-n
     */
    readonly n ?: number;

    /**
     * The temperature to use for sampling.
     *
     * Defaults to `1`
     *
     * @see https://beta.openai.com/docs/api-reference/edits/create#edits/create-temperature
     */
    readonly temperature ?: number;

    /**
     * The top probability to use for sampling.
     *
     * Defaults to `1`
     *
     * @see https://beta.openai.com/docs/api-reference/edits/create#edits/create-top_p
     */
    readonly top_p ?: number;

}

/**
 * Create an `OpenAiEditRequestDTO` object with the given properties.
 *
 * @param {string} instruction - How to edit the text
 * @param {string} input - Input text as the starting point for edit
 * @param {OpenAiModel} model - The model to use for edit.
 * @param {number} n - How many edits
 * @param {number} temperature - The temperature to use for sampling.
 * @param {number} top_p - The top probability to use for sampling.
 * @returns {OpenAiEditRequestDTO} An `OpenAiEditRequestDTO` object with the given properties.
 */
export function createOpenAiEditRequestDTO (
    instruction  : string,
    input       ?: string,
    model       ?: OpenAiModel | string,
    n           ?: number,
    temperature ?: number,
    top_p       ?: number
) : OpenAiEditRequestDTO {
    if (!isString(instruction)) throw new TypeError(`Invalid OpenAiEditRequestDTO.instruction: ${instruction}`);
    if (!isStringOrUndefined(input)) throw new TypeError(`Invalid OpenAiEditRequestDTO.input: ${input}`);
    if (!isStringOrUndefined(model)) throw new TypeError(`Invalid OpenAiEditRequestDTO.model: ${model}`);
    if (!isNumberOrUndefined(n)) throw new TypeError(`Invalid OpenAiEditRequestDTO.n: ${n}`);
    if (!isNumberOrUndefined(temperature)) throw new TypeError(`Invalid OpenAiEditRequestDTO.temperature: ${temperature}`);
    if (!isNumberOrUndefined(top_p)) throw new TypeError(`Invalid OpenAiEditRequestDTO.top_p: ${top_p}`);
    return {
        model : model ?? OpenAiModel.DAVINCI_EDIT_TEXT,
        instruction,
        ...(isString(input) ? {input} : {}),
        ...(isNumber(n) ? {n} : {}),
        ...(isNumber(temperature) ? {temperature} : {}),
        ...(isNumber(top_p) ? {top_p} : {})
    };
}

/**
 * Test whether the given value is an `OpenAiEditRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {value is OpenAiEditRequestDTO} `true` if the value is an `OpenAiEditRequestDTO` object, `false` otherwise.
 */
export function isOpenAiEditRequestDTO (value: any) : value is OpenAiEditRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'instruction',
            'input',
            'model',
            'n',
            'temperature',
            'top_p'
        ])
        && isOpenAiModel(value?.model)
        && isString(value?.instruction)
        && isStringOrUndefined(value?.input)
        && isNumberOrUndefined(value?.n)
        && isNumberOrUndefined(value?.temperature)
        && isNumberOrUndefined(value?.top_p)
    );
}

/**
 * Explain why the given value is not an `OpenAiEditRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiEditRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiEditRequestDTO (value: unknown) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'instruction',
                'input',
                'model',
                'n',
                'temperature',
                'top_p'
            ])
            , explainProperty("instruction", explainString((value as any)?.instruction))
            , explainProperty("input", explainStringOrUndefined((value as any)?.input))
            , explainProperty("model", explainOpenAiModel((value as any)?.model))
            , explainProperty("n", explainNumberOrUndefined((value as any)?.n))
            , explainProperty("temperature", explainNumberOrUndefined((value as any)?.temperature))
            , explainProperty("top_p", explainNumberOrUndefined((value as any)?.top_p))
        ]
    );
}

/**
 * Convert the given `OpenAiEditRequestDTO` object to a string.
 *
 * @param {OpenAiEditRequestDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiEditRequestDTO` object.
 */
export function stringifyOpenAiEditRequestDTO (value : OpenAiEditRequestDTO) : string {
    return `OpenAiEditRequestDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiEditRequestDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiEditRequestDTO|undefined} The parsed `OpenAiEditRequestDTO` object, or `undefined` if the value is not a valid `OpenAiEditRequestDTO` object.
 */
export function parseOpenAiEditRequestDTO (value: unknown) : OpenAiEditRequestDTO | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiEditRequestDTO(")) {
            value = value.substring("OpenAiEditRequestDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiEditRequestDTO(value)) return value;
    return undefined;
}

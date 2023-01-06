// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenApiModel, isOpenApiModel, OpenAiApiModel } from "../types/OpenAiApiModel";
import { explain, explainProperty } from "../../types/explain";
import { explainString, isString } from "../../types/String";
import { explainNumber, isNumber } from "../../types/Number";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";

/**
 * Data Transfer Object for requesting a completion from the OpenAI API.
 */
export interface OpenAiCompletionRequestDTO {
    /**
     * The prompt to complete.
     */
    readonly prompt: string;

    /**
     * The model to use for completion.
     */
    readonly model: OpenAiApiModel;

    /**
     * The maximum number of tokens to generate in the completion.
     */
    readonly max_tokens: number;

    /**
     * The temperature to use for sampling.
     */
    readonly temperature: number;

    /**
     * The top probability to use for sampling.
     */
    readonly top_p: number;

    /**
     * The frequency penalty to use for sampling.
     */
    readonly frequency_penalty: number;

    /**
     * The presence penalty to use for sampling.
     */
    readonly presence_penalty: number;
}

/**
 * Create an `OpenAiCompletionRequestDTO` object with the given properties.
 *
 * @param {string} prompt - The prompt to complete.
 * @param {OpenAiApiModel} model - The model to use for completion.
 * @param {number} max_tokens - The maximum number of tokens to generate in the completion.
 * @param {number} temperature - The temperature to use for sampling.
 * @param {number} top_p - The top probability to use for sampling.
 * @param {number} frequency_penalty - The frequency penalty to use for sampling.
 * @param {number} presence_penalty - The presence penalty to use for sampling.
 * @returns {OpenAiCompletionRequestDTO} An `OpenAiCompletionRequestDTO` object with the given properties.
 */
export function createOpenAiCompletionRequestDTO (
    prompt: string,
    model: OpenAiApiModel,
    max_tokens: number,
    temperature: number,
    top_p: number,
    frequency_penalty: number,
    presence_penalty: number,
) : OpenAiCompletionRequestDTO {
    if (!isString(prompt)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.prompt: ${prompt}`);
    if (!isOpenApiModel(model)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.model: ${model}`);
    if (!isNumber(max_tokens)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.max_tokens: ${max_tokens}`);
    if (!isNumber(temperature)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.temperature: ${temperature}`);
    if (!isNumber(top_p)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.top_p: ${top_p}`);
    if (!isNumber(frequency_penalty)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.frequency_penalty: ${frequency_penalty}`);
    if (!isNumber(presence_penalty)) throw new TypeError(`Invalid OpenAiCompletionRequestDTO.presence_penalty: ${presence_penalty}`);
    return {
        prompt,
        model,
        max_tokens,
        temperature,
        top_p,
        frequency_penalty,
        presence_penalty,
    };
}

/**
 * Test whether the given value is an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {value is OpenAiCompletionRequestDTO} `true` if the value is an `OpenAiCompletionRequestDTO` object, `false` otherwise.
 */
export function isOpenAiCompletionRequestDTO (value: any) : value is OpenAiCompletionRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'prompt',
            'model',
            'max_tokens',
            'temperature',
            'top_p',
            'frequency_penalty',
            'presence_penalty'
        ])
        && isString(value?.prompt)
        && isOpenApiModel(value?.model)
        && isNumber(value?.max_tokens)
        && isNumber(value?.temperature)
        && isNumber(value?.top_p)
        && isNumber(value?.frequency_penalty)
        && isNumber(value?.presence_penalty)
    );
}

/**
 * Explain why the given value is not an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiCompletionRequestDTO (value: unknown) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'prompt',
                'model',
                'max_tokens',
                'temperature',
                'top_p',
                'frequency_penalty',
                'presence_penalty',
            ])
            , explainProperty("prompt", explainString((value as any)?.prompt))
            , explainProperty("model", explainOpenApiModel((value as any)?.model))
            , explainProperty("max_tokens", explainNumber((value as any)?.max_tokens))
            , explainProperty("temperature", explainNumber((value as any)?.temperature))
            , explainProperty("top_p", explainNumber((value as any)?.top_p))
            , explainProperty("frequency_penalty", explainNumber((value as any)?.frequency_penalty))
            , explainProperty("presence_penalty", explainNumber((value as any)?.presence_penalty))
        ]
    );
}

/**
 * Convert the given `OpenAiCompletionRequestDTO` object to a string.
 *
 * @param {OpenAiCompletionRequestDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiCompletionRequestDTO` object.
 */
export function stringifyOpenAiCompletionRequestDTO (value : OpenAiCompletionRequestDTO) : string {
    return `OpenAiCompletionRequestDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiCompletionRequestDTO|undefined} The parsed `OpenAiCompletionRequestDTO` object, or `undefined` if the value is not a valid `OpenAiCompletionRequestDTO` object.
 */
export function parseOpenAiCompletionRequestDTO (value: unknown) : OpenAiCompletionRequestDTO | undefined {

    if (isString(value)) {
        if (startsWith(value, "OpenAiCompletionRequestDTO(")) {
            value = value.substring("OpenAiCompletionRequestDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }

    if (isOpenAiCompletionRequestDTO(value)) return value;
    return undefined;
}

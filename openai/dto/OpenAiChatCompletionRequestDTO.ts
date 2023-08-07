// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenAiModel, isOpenAiModel, OpenAiModel } from "../types/OpenAiModel";
import { explain, explainProperty } from "../../types/explain";
import { isString } from "../../types/String";
import { explainNumber, isNumber, isNumberOrUndefined } from "../../types/Number";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";
import { startsWith } from "../../functions/startsWith";
import { parseJson, ReadonlyJsonObject } from "../../Json";
import { isUndefined } from "../../types/undefined";
import {isArrayOf} from "../../types/Array";
import {
    explainOpenAiChatCompletionMessageDTO,
    isOpenAiChatCompletionMessageDTO,
    OpenAiChatCompletionMessageDTO
} from "./OpenAiChatCompletionMessageDTO";

/**
 * Data Transfer Object for requesting a completion from the OpenAI API.
 *
 * @see https://beta.openai.com/docs/api-reference/completions/create
 */
export interface OpenAiChatCompletionRequestDTO {

    /**
     * The model to use for completion.
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-model
     */
    readonly model: OpenAiModel | string;

    /**
     * The messages to chat with.
     * Forms a message array
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-messages
     */
    readonly messages ?: OpenAiChatCompletionMessageDTO[];

    /**
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-suffix
     */
    readonly suffix ?: string;

    /**
     * The maximum number of tokens to generate in the completion.
     *
     * Defaults to 16
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-max_tokens
     */
    readonly max_tokens ?: number;

    /**
     * The temperature to use for sampling.
     *
     * Defaults to 1
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-temperature
     */
    readonly temperature ?: number;

    /**
     * The top probability to use for sampling.
     *
     * Defaults to 1
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-top_p
     */
    readonly top_p ?: number;

    /**
     * How many completions to generate for each messages.
     *
     * Defaults to 1
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-n
     */
    readonly n ?: number;

    /**
     * Defaults to `false`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
     */
    readonly stream ?: boolean;

    /**
     * Defaults to `null`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create
     */
    readonly logprobs ?: number | null;

    /**
     * Defaults to `false`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-echo
     */
    readonly echo ?: boolean;

    /**
     * Defaults to `false`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-stop
     */
    readonly stop ?: boolean;

    /**
     * The presence penalty to use for sampling.
     *
     * Defaults to `0`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-presence_penalty
     */
    readonly presence_penalty ?: number;

    /**
     * The frequency penalty to use for sampling.
     *
     * Defaults to `0`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-frequency_penalty
     */
    readonly frequency_penalty ?: number;

    /**
     * Defaults to `1`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-best_of
     */
    readonly best_of ?: number;

    /**
     * Detaults to `null`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-logit_bias
     */
    readonly logit_bias ?: ReadonlyJsonObject;

    /**
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-user
     */
    readonly user ?: string;

}

/**
 * Create an `OpenAiChatCompletionRequestDTO` object with the given properties.
 *
 * @param {string} messages - The messages to complete.
 * @param {OpenAiModel} model - The model to use for completion.
 * @param {number} max_tokens - The maximum number of tokens to generate in the completion.
 * @param {number} temperature - The temperature to use for sampling.
 * @param {number} top_p - The top probability to use for sampling.
 * @param {number} frequency_penalty - The frequency penalty to use for sampling.
 * @param {number} presence_penalty - The presence penalty to use for sampling.
 * @returns {OpenAiChatCompletionRequestDTO} An `OpenAiChatCompletionRequestDTO` object with the given properties.
 */
export function createOpenAiChatCompletionRequestDTO (
    messages           : OpenAiChatCompletionMessageDTO[],
    model             ?: OpenAiModel | string,
    max_tokens        ?: number,
    temperature       ?: number,
    top_p             ?: number,
    frequency_penalty ?: number,
    presence_penalty  ?: number,
) : OpenAiChatCompletionRequestDTO {
    if (!isArrayOf<OpenAiChatCompletionRequestDTO>(messages, isOpenAiChatCompletionMessageDTO)) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.messages: ${messages}`);
    if (!(isString(model) || isUndefined(model))) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.model: ${model}`);
    if (!isNumberOrUndefined(max_tokens)) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.max_tokens: ${max_tokens}`);
    if (!isNumberOrUndefined(temperature)) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.temperature: ${temperature}`);
    if (!isNumberOrUndefined(top_p)) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.top_p: ${top_p}`);
    if (!isNumberOrUndefined(frequency_penalty)) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.frequency_penalty: ${frequency_penalty}`);
    if (!isNumberOrUndefined(presence_penalty)) throw new TypeError(`Invalid OpenAiChatCompletionRequestDTO.presence_penalty: ${presence_penalty}`);
    return {
        messages,
        model: model ?? OpenAiModel.DAVINCI,
        ...(isNumber(max_tokens) ? {max_tokens} : {}),
        ...(isNumber(temperature) ? {temperature} : {}),
        ...(isNumber(top_p) ? {top_p} : {}),
        ...(isNumber(frequency_penalty) ? {frequency_penalty} : {}),
        ...(isNumber(presence_penalty) ? {presence_penalty} : {}),
    };
}

/**
 * Test whether the given value is an `OpenAiChatCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {value is OpenAiChatCompletionRequestDTO} `true` if the value is an `OpenAiChatCompletionRequestDTO` object, `false` otherwise.
 */
export function isOpenAiChatCompletionRequestDTO (value: any) : value is OpenAiChatCompletionRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'messages',
            'model',
            'max_tokens',
            'temperature',
            'top_p',
            'frequency_penalty',
            'presence_penalty'
        ])
        && isOpenAiChatCompletionMessageDTO(value?.messages)
        && isOpenAiModel(value?.model)
        && isNumber(value?.max_tokens)
        && isNumber(value?.temperature)
        && isNumber(value?.top_p)
        && isNumber(value?.frequency_penalty)
        && isNumber(value?.presence_penalty)
    );
}

/**
 * Explain why the given value is not an `OpenAiChatCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiChatCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiChatCompletionRequestDTO (value: unknown) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'messages',
                'model',
                'max_tokens',
                'temperature',
                'top_p',
                'frequency_penalty',
                'presence_penalty',
            ])
            , explainProperty("messages", explainOpenAiChatCompletionMessageDTO((value as any)?.messages))
            , explainProperty("model", explainOpenAiModel((value as any)?.model))
            , explainProperty("max_tokens", explainNumber((value as any)?.max_tokens))
            , explainProperty("temperature", explainNumber((value as any)?.temperature))
            , explainProperty("top_p", explainNumber((value as any)?.top_p))
            , explainProperty("frequency_penalty", explainNumber((value as any)?.frequency_penalty))
            , explainProperty("presence_penalty", explainNumber((value as any)?.presence_penalty))
        ]
    );
}

/**
 * Convert the given `OpenAiChatCompletionRequestDTO` object to a string.
 *
 * @param {OpenAiChatCompletionRequestDTO} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiChatCompletionRequestDTO` object.
 */
export function stringifyOpenAiChatCompletionRequestDTO (value : OpenAiChatCompletionRequestDTO) : string {
    return `OpenAiChatCompletionRequestDTO(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiChatCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiChatCompletionRequestDTO|undefined} The parsed `OpenAiChatCompletionRequestDTO` object, or `undefined` if the value is not a valid `OpenAiChatCompletionRequestDTO` object.
 */
export function parseOpenAiChatCompletionRequestDTO (value: unknown) : OpenAiChatCompletionRequestDTO | undefined {

    if (isString(value)) {
        if (startsWith(value, "OpenAiChatCompletionRequestDTO(")) {
            value = value.substring("OpenAiChatCompletionRequestDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }

    if (isOpenAiChatCompletionRequestDTO(value)) return value;
    return undefined;
}

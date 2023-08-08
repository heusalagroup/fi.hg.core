// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenAiModel, isOpenAiModel, OpenAiModel } from "../../types/OpenAiModel";
import { explain, explainProperty } from "../../../types/explain";
import {explainString, explainStringOrUndefined, isString, isStringOrUndefined} from "../../../types/String";
import {explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined} from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";
import { startsWith } from "../../../functions/startsWith";
import {isReadonlyJsonObject, parseJson, ReadonlyJsonObject} from "../../../Json";
import { isUndefined } from "../../../types/undefined";
import {explainArrayOf, isArrayOf} from "../../../types/Array";
import {
    explainOpenAiChatCompletionMessageDTO,
    isOpenAiChatCompletionMessageDTO,
    OpenAiChatCompletionMessageDTO
} from "./OpenAiChatCompletionMessageDTO";
import {
    explainOpenAiChatCompletionFunctions,
    isOpenAiChatCompletionFunctions,
    OpenAiChatCompletionFunctions
} from "./OpenAiChatCompletionFunctions";
import {isStringArray} from "../../../types/StringArray";
import {isBoolean, isBooleanOrUndefined} from "../../../types/Boolean";
import {isObject} from "../../../types/Object";

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
     * A list of messages comprising the conversation so far.
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-messages
     */
    readonly messages               ?: OpenAiChatCompletionMessageDTO[];

    /**
     * A list of functions the model may generate JSON inputs for.
     */
    readonly functions              ?: OpenAiChatCompletionFunctions[];

    /**
     * Controls how the model responds to function calls.
     * "none" means the model does not call a function, and responds to the end-user.
     * "auto" means the model can pick between an end-user or calling a function.
     * Specifying a particular function via {"name":\ "my_function"}
     * forces the model to call that function.
     * "none" is the default when no functions are present.
     * "auto" is the default if functions are present.
     */
    readonly function_call          ?: string | object;

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
     * How many chat completion choices to generate for each input message.
     */
    readonly n ?: number;

    /**
     * If set, partial message deltas will be sent, like in ChatGPT.
     * Tokens will be sent as data-only server-sent events as they become available,
     * with the stream terminated by a data: [DONE]
     */
    readonly stream ?: boolean;

    /**
     * Up to 4 sequences where the API will stop generating further tokens.
     */
    readonly stop ?: string | string[];

    /**
     * Detaults to `null`
     *
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-logit_bias
     * Modify the likelihood of specified tokens appearing in the completion.
     */
    readonly logit_bias ?: ReadonlyJsonObject;

    /**
     * @see https://beta.openai.com/docs/api-reference/completions/create#completions/create-user
     * A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.
     */
    readonly user ?: string;

}

/**
 * Create an `OpenAiChatCompletionRequestDTO` object with the given properties.
 *
 * @param {OpenAiChatCompletionMessageDTO} messages - The messages to complete.
 * @param {OpenAiModel} model - The model to use for completion.
 * @param {OpenAiChatCompletionFunctions} functions
 * @param {number} max_tokens - The maximum number of tokens to generate in the completion.
 * @param {number} temperature - The temperature to use for sampling.
 * @param {number} top_p - The top probability to use for sampling.
 * @param {number} frequency_penalty - The frequency penalty to use for sampling.
 * @param {number} presence_penalty - The presence penalty to use for sampling.
 * @param {number} function_call
 * @param {number} n
 * @param {number} stream
 * @param {number} stop
 * @param {number} logit_bias
 * @param {number} user
 * @returns {OpenAiChatCompletionRequestDTO} An `OpenAiChatCompletionRequestDTO` object with the given properties.
 */
export function createOpenAiChatCompletionRequestDTO (
    messages              : OpenAiChatCompletionMessageDTO[],
    model                ?: OpenAiModel | string,
    functions            ?: OpenAiChatCompletionFunctions[],
    max_tokens           ?: number,
    temperature          ?: number,
    top_p                ?: number,
    frequency_penalty    ?: number,
    presence_penalty     ?: number,
    function_call        ?: string | object,
    n                    ?: number,
    stream               ?: boolean,
    stop                 ?: string | string[],
    logit_bias           ?: ReadonlyJsonObject,
    user                 ?: string,
) : OpenAiChatCompletionRequestDTO {
    return {
        messages,
        model: model ?? OpenAiModel.GPT_4,
        ...(isOpenAiChatCompletionFunctions(functions) ? {functions} : {}),
        ...(isNumber(max_tokens) ? {max_tokens} : {}),
        ...(isNumber(temperature) ? {temperature} : {}),
        ...(isNumber(top_p) ? {top_p} : {}),
        ...(isNumber(frequency_penalty) ? {frequency_penalty} : {}),
        ...(isNumber(presence_penalty) ? {presence_penalty} : {}),
        ...(isString(function_call) || isObject(function_call) ? {function_call} : {}),
        ...(isNumber(n) ? {n} : {}),
        ...(isBoolean(stream) ? {stream} : {}),
        ...(isStringArray(stop) || isString(stop) ? {stop} : {}),
        ...(isReadonlyJsonObject(logit_bias) ? {logit_bias} : {}),
        ...(isString(user) ? {user} : {}),
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
            'functions',
            'max_tokens',
            'temperature',
            'top_p',
            'frequency_penalty',
            'presence_penalty',
            'function_call',
            'n',
            'stream',
            'stop',
            'logit_bias',
            'user',
        ])
        && isArrayOf<OpenAiChatCompletionMessageDTO>(value.messages, isOpenAiChatCompletionMessageDTO)
        && isOpenAiModel(value?.model)
        && isArrayOf<OpenAiChatCompletionFunctions>(value?.functions, isOpenAiChatCompletionFunctions)
        && isNumberOrUndefined(value?.max_tokens)
        && isNumberOrUndefined(value?.temperature)
        && isNumberOrUndefined(value?.top_p)
        && isNumberOrUndefined(value?.frequency_penalty)
        && isNumberOrUndefined(value?.presence_penalty)
        && isStringOrUndefined(value?.function_call)
        && isNumberOrUndefined(value?.n)
        && isBooleanOrUndefined(value?.stream)
        && isStringArray(value?.stop) || isString(value?.stop)
        && isReadonlyJsonObject(value?.logit_bias)
        && isStringOrUndefined(value?.user)
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
                'functions',
                'max_tokens',
                'temperature',
                'top_p',
                'frequency_penalty',
                'presence_penalty',
                'function_call',
                'n',
                'stream',
                'stop',
                'logit_bias',
                'user',
            ])
            , explainProperty("messages", explainArrayOf<OpenAiChatCompletionMessageDTO>("OpenAiChatCompletionMessageDTO", explainOpenAiChatCompletionMessageDTO, value?.messages, isOpenAiChatCompletionMessageDTO))
            , explainProperty("model", explainArrayOf<OpenAiModel>("OpenAiModel", explainOpenAiModel, value?.model, isOpenAiModel))
            , explainProperty("functions", explainArrayOf<OpenAiChatCompletionFunctions>("OpenAiChatCompletionFunctions", explainOpenAiChatCompletionFunctions, value?.functions, isOpenAiChatCompletionFunctions))
            , explainProperty("max_tokens", explainNumberOrUndefined(value?.max_tokens))
            , explainProperty("temperature", explainNumberOrUndefined(value?.temperature))
            , explainProperty("top_p", explainNumberOrUndefined(value?.top_p))
            , explainProperty("frequency_penalty", explainNumberOrUndefined(value?.frequency_penalty))
            , explainProperty("presence_penalty", explainNumberOrUndefined(value?.presence_penalty))
            , explainProperty("function_call", explainStringOrUndefined(value?.function_call))
            , explainProperty("n", explainStringOrUndefined(value?.n))
            , explainProperty("stream", explainStringOrUndefined(value?.stream))
            , explainProperty("stop", explainStringOrUndefined(value?.stop))
            , explainProperty("logit_bias", explainStringOrUndefined(value?.logit_bias))
            , explainProperty("user", explainStringOrUndefined(value?.user))
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

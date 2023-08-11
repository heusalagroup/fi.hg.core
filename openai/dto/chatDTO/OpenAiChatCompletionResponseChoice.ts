// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import {
    explainNumber,
    isNumber,
} from "../../../types/Number";
import { explainString, isString } from "../../../types/String";
import { explain, explainOk, explainProperty } from "../../../types/explain";
import { startsWith } from "../../../functions/startsWith";
import { parseJson } from "../../../Json";
import { isOpenAiError, OpenAiError } from "../OpenAiError";
import {
    explainOpenAiChatCompletionMessage,
    isOpenAiChatCompletionMessage,
    OpenAiChatCompletionMessage
} from "./OpenAiChatCompletionMessage";

/**
 * @typedef {Object} OpenAiChatCompletionResponseChoice
 *
 * A completion response item returned by the OpenAI API.
 */
export interface OpenAiChatCompletionResponseChoice {

    /**
     * The completed text.
     */
    readonly index : number;
    readonly message: OpenAiChatCompletionMessage;
    readonly finish_reason: string;

}

/**
 * Creates an `OpenAiChatCompletionResponseChoice` object.
 *
 * @param {number} index -
 * @param {OpenAiChatCompletionMessageDTO} message -
 * @param {string} finish_reason -
 * @returns {OpenAiChatCompletionResponseChoice} The created `OpenAiChatCompletionResponseChoice` object.
 */
export function createOpenAiChatCompletionResponseChoice (
    index: number,
    message: OpenAiChatCompletionMessage,
    finish_reason: string
) : OpenAiChatCompletionResponseChoice {
    return {
        index,
        message: message,
        finish_reason
    };
}

/**
 * Check if the given value is a valid `OpenAiChatCompletionResponseChoice` object.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiChatCompletionResponseChoice} `true` if the value is a valid `OpenAiChatCompletionResponseChoice` object, `false` otherwise.
 */
export function isOpenAiChatCompletionResponseChoice (value: unknown) : value is OpenAiChatCompletionResponseChoice {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'index',
            'message',
            'finish_reason'
        ])
        && isNumber(value?.index)
        && isOpenAiChatCompletionMessage(value?.message)
        && isString(value?.finish_reason)
    );
}

/**
 * Attempts to explain why the given value is not a valid OpenAiChatCompletionResponseChoice object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiChatCompletionResponseChoice object.
 */
export function explainOpenAiChatCompletionResponseChoice (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'index',
                'message',
                'finish_reason'
            ])
            , explainProperty("index", explainNumber(value?.index))
            , explainProperty("message", explainOpenAiChatCompletionMessage(value?.message))
            , explainProperty("finish_reason", explainString(value?.finish_reason))
        ]
    );
}

/**
 * Check if the given value is a valid `OpenAiChatCompletionResponseChoice` object or an OpenAiError.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is OpenAiChatCompletionResponseChoice| OpenAiError} `true` if the value is a valid `OpenAiChatCompletionResponseChoice` object, `false` otherwise.
 */
export function isOpenAiChatCompletionResponseChoiceOrError (value: unknown) : value is (OpenAiChatCompletionResponseChoice | OpenAiError) {
    return isOpenAiChatCompletionResponseChoice(value) || isOpenAiError(value);
}

/**
 * Attempts to explain why the given value is not a valid OpenAiChatCompletionResponseChoice or OpenAiError object.
 *
 * @param {unknown} value - The value to explain.
 * @returns {string} A human-readable string explaining why the value is not a valid OpenAiChatCompletionResponseChoice or an OpenAiError object.
 */
export function explainOpenAiChatCompletionResponseChoiceOrError (value: any) : string {
    return isOpenAiChatCompletionResponseChoiceOrError(value) ? explainOk() : 'Not OpenAiError or OpenAiChatCompletionResponseChoice';
}

/**
 * Convert the given `OpenAiChatCompletionResponseChoice` object to a string.
 *
 * @param {OpenAiChatCompletionResponseChoice} value - The value to convert.
 * @returns {string} A string representation of the `OpenAiChatCompletionResponseChoice` object.
 */
export function stringifyOpenAiChatCompletionResponseChoice (value : OpenAiChatCompletionResponseChoice) : string {
    return `OpenAiChatCompletionResponseChoice(${JSON.stringify(value)})`;
}

/**
 * Attempt to parse the given value as an `OpenAiChatCompletionResponseChoice` object.
 *
 * @param {unknown} value - The value to parse.
 * @returns {OpenAiChatCompletionResponseChoice|undefined} The parsed `OpenAiChatCompletionResponseChoice` object, or `undefined` if the value is not a valid `OpenAiChatCompletionResponseChoice` object.
 */
export function parseOpenAiChatCompletionResponseChoice (value: unknown) : OpenAiChatCompletionResponseChoice | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiChatCompletionResponseChoice(")) {
            value = value.substring("OpenAiChatCompletionResponseChoice(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiChatCompletionResponseChoice(value)) return value;
    return undefined;
}

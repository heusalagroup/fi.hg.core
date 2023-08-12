// Copyright (c) 2022. Heusala Group <info@heusalagroup.fi>. All rights reserved.

import {explainRegularObject, isRegularObject} from "../../../types/RegularObject";
import {explainNoOtherKeys, hasNoOtherKeysInDevelopment} from "../../../types/OtherKeys";
import {explainString, explainStringOrUndefined, isString, isStringOrUndefined} from "../../../types/String";
import {explain, explainNot, explainOk, explainProperty} from "../../../types/explain";
import {explainObject, isObject} from "../../../types/Object";
import {isUndefined} from "../../../types/undefined";

export interface OpenAiChatCompletionFunctions {
    /**
     * The name of the function to be called.
     * Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
     */
    name                         : string;

    /**
     * A description of what the function does, used by the model to choose when and how to call the function.
     */
    parameters                   : object;

    /**
     * The parameters the functions accepts, described as a JSON Schema object.
     * To describe a function that accepts no parameters,
     * provide the value {"type": "object", "properties": {}}.
     */
    description                 ?: string;
}

export function createOpenAiChatCompletionFunctions (
    name                        :string,
    parameters                  :object,
    description                ?:string
) : OpenAiChatCompletionFunctions {
    return {
        name,
        parameters,
        description
    }
}

export function isOpenAiChatCompletionFunctions (value: unknown): value is OpenAiChatCompletionFunctions {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            "name",
            "parameters",
            "description",
        ])
        && isString(value?.name)
        && isObject(value?.parameters)
        && isStringOrUndefined(value?.description)
    )
};

/**
 * Explain why the given value is not an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiChatCompletionFunctions (value: unknown) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                "name",
                "parameters",
                "description",
            ])
            , explainProperty("name", explainString((value as any)?.name))
            , explainProperty("parameters", explainObject((value as any)?.parameters))
            , explainProperty("description", explainStringOrUndefined((value as any)?.description))
        ]
    );
}

export function isOpenAiChatCompletionFunctionsOrUndefined (value: unknown): value is OpenAiChatCompletionFunctions | undefined {
    return isOpenAiChatCompletionFunctions(value) || isUndefined(value);
}

export function explainOpenAiChatCompletionFunctionsOrUndefined (value: any): string {
    return isOpenAiChatCompletionFunctionsOrUndefined(value) ? explainOk() : explainNot('OpenAiChatCompletionFunctions or undefined');
}
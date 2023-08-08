// Copyright (c) 2022. Heusala Group <info@heusalagroup.fi>. All rights reserved.



import {explainRegularObject, explainRegularObjectOrUndefined, isRegularObject} from "../../../types/RegularObject";
import {explainNoOtherKeys, hasNoOtherKeysInDevelopment} from "../../../types/OtherKeys";
import {explainString, explainStringOrUndefined, isString} from "../../../types/String";
import {explain, explainProperty} from "../../../types/explain";
import {isUndefined} from "../../../types/undefined";

export interface OpenAiChatCompletionFunctionCall {
    name                        : string;
    args                        : string;
}

export function createOpenAiChatCompletionFunctionCall (
    name                        :string,
    args                        :string
) : OpenAiChatCompletionFunctionCall {
    return {
        name,
        args,
    }
}

export function isOpenAiChatCompletionFunctionCall (value: unknown): value is OpenAiChatCompletionFunctionCall {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            "name",
            "args",
        ])
        && isString(value?.name)
        && isString(value?.args)
    )
};

/**
 * Explain why the given value is not an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiChatCompletionFunctionCall (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                "name",
                "args",
            ])
            , explainProperty("name", explainString((value as any)?.name))
            , explainProperty("args", explainString((value as any)?.args))
        ]
    );
}

export function isOpenAiChatCompletionFunctionCallOrUndefined (value: unknown): boolean {
    return isUndefined(value) ? false : (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            "name",
            "args",
        ])
        && isString(value?.name)
        && isString(value?.args)
    )
};

export function explainOpenAiChatCompletionFunctionCallOrUndefined (value: any) : string {
    return explain(
        [
            explainRegularObjectOrUndefined(value),
            explainNoOtherKeys(value, [
                "name",
                "args",
            ])
            , explainProperty("name", explainStringOrUndefined((value as any)?.name))
            , explainProperty("args", explainStringOrUndefined((value as any)?.args))
        ]
    );
}
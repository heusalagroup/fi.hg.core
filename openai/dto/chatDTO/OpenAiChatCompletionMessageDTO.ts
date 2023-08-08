// Copyright (c) 2022. Heusala Group <info@heusalagroup.fi>. All rights reserved.



import {explainOpenAiUserType, isOpenAiUserType, OpenAiUserType} from "../../types/OpenAiUserType";
import {explainRegularObject, isRegularObject} from "../../../types/RegularObject";
import {explainNoOtherKeys, hasNoOtherKeysInDevelopment} from "../../../types/OtherKeys";
import {explainString, explainStringOrUndefined, isString, isStringOrUndefined} from "../../../types/String";
import {explain, explainProperty} from "../../../types/explain";
import {
    explainOpenAiChatCompletionFunctionCall, explainOpenAiChatCompletionFunctionCallOrUndefined,
    isOpenAiChatCompletionFunctionCall, isOpenAiChatCompletionFunctionCallOrUndefined,
    OpenAiChatCompletionFunctionCall
} from "./OpenAiChatCompletionFunctionCall";
import {parseOpenAiType} from "../../../../../heusalagroup/core/types/OpenAiType";

export interface OpenAiChatCompletionMessageDTO {
    role                    : OpenAiUserType;
    content                 : string;
    name                   ?: string;
    function_call          ?: OpenAiChatCompletionFunctionCall
}

export function createOpenAiChatCompletionMessageDTO (
    role                    :OpenAiUserType,
    content                 :string,
    name                   ?:string,
    function_call          ?:OpenAiChatCompletionFunctionCall,
) : OpenAiChatCompletionMessageDTO {
    return {
        role,
        content,
        ...(isString(name) ? {name} : {}),
        ...(isOpenAiChatCompletionFunctionCall(function_call) ? {function_call} : {})
    }
}

export function isOpenAiChatCompletionMessageDTO (value: unknown): value is OpenAiChatCompletionMessageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            "role",
            "content",
            "name",
            "function_call"
        ])
        && isOpenAiUserType(parseOpenAiType(value?.role))
        && isString(value?.content)
        && isStringOrUndefined(value?.name)
        && isOpenAiChatCompletionFunctionCallOrUndefined(value?.function_call)
    )
};

/**
 * Explain why the given value is not an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiChatCompletionMessageDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                "role",
                "content",
                "name",
                "function_call"
            ])
            , explainProperty("role", explainOpenAiUserType(parseOpenAiType(value.role)))
            , explainProperty("content", explainString(value.content))
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("function_call", explainOpenAiChatCompletionFunctionCallOrUndefined(value?.function_call))
        ]
    );
}
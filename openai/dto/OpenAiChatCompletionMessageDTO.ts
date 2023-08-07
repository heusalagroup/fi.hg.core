// Copyright (c) 2022. Heusala Group <info@heusalagroup.fi>. All rights reserved.



import {explainOpenAiUserType, isOpenAiUserType, OpenAiUserType} from "../types/OpenAiUserType";
import {explainRegularObject, isRegularObject} from "../../types/RegularObject";
import {explainNoOtherKeys, hasNoOtherKeysInDevelopment} from "../../types/OtherKeys";
import {explainString, isString} from "../../types/String";
import {explain, explainProperty} from "../../types/explain";

export interface OpenAiChatCompletionMessageDTO {
    role                    : OpenAiUserType;
    content                 : string;
}

export function createOpenAiChatCompletionMessageDTO (
    role                    :OpenAiUserType,
    content                 :string,
) : OpenAiChatCompletionMessageDTO {
    return {
        role,
        content
    }
}

export function isOpenAiChatCompletionMessageDTO (value: unknown): value is OpenAiChatCompletionMessageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            "role",
            "content",
        ])
        && isOpenAiUserType(value?.role)
        && isString(value?.content)
    )
};

/**
 * Explain why the given value is not an `OpenAiCompletionRequestDTO` object.
 *
 * @param {unknown} value - The value to test.
 * @returns {string} A human-readable message explaining why the value is not an `OpenAiCompletionRequestDTO` object, or `'ok'` if it is.
 */
export function explainOpenAiChatCompletionMessageDTO (value: unknown) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                "role",
                "content",
            ])
            , explainProperty("role", explainOpenAiUserType((value as any)?.role))
            , explainProperty("content", explainString((value as any)?.content))
        ]
    );
}
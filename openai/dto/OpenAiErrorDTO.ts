// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";
import { isString } from "../../types/String";
import { startsWith } from "../../functions/startsWith";
import { parseJson } from "../../Json";
import { explainOpenAiError, isOpenAiError, OpenAiError } from "./OpenAiError";

export interface OpenAiErrorDTO {
    readonly error : OpenAiError;
}

export function createOpenAiErrorDTO (
    error : OpenAiError
) : OpenAiErrorDTO {
    return {
        error
    };
}

export function isOpenAiErrorDTO (value: unknown) : value is OpenAiErrorDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'error'
        ])
        && isOpenAiError(value?.error)
    );
}

export function explainOpenAiErrorDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'error'
            ])
            , explainProperty("error", explainOpenAiError(value?.error))
        ]
    );
}

export function stringifyOpenAiErrorDTO (value : OpenAiErrorDTO) : string {
    return `OpenAiErrorDTO(${JSON.stringify(value)})`;
}

export function parseOpenAiErrorDTO (value: unknown) : OpenAiErrorDTO | undefined {
    if (isString(value)) {
        if (startsWith(value, "OpenAiErrorDTO(")) {
            value = value.substring("OpenAiErrorDTO(".length, value.length -1 );
        }
        value = parseJson(value);
    }
    if (isOpenAiErrorDTO(value)) return value;
    return undefined;
}

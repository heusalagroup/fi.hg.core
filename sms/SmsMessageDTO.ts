// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    explainString,
    hasNoOtherKeys,
    isRegularObject,
    isString
} from "../modules/lodash";

export interface SmsMessageDTO {
    readonly to : string;
    readonly body : string;
}

export function createSmsMessageDTO (
    to : string,
    body : string
) : SmsMessageDTO {
    return {
        to,
        body
    };
}

export function isSmsMessageDTO (value: any) : value is SmsMessageDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'to',
            'body'
        ])
        && isString(value?.to)
        && isString(value?.body)
    );
}

export function explainSmsMessageDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'to',
                'body'
            ])
            , explainProperty("to", explainString(value?.to))
            , explainProperty("body", explainString(value?.body))
        ]
    );
}

export function stringifySmsMessageDTO (value : SmsMessageDTO) : string {
    return `SmsMessageDTO(${value})`;
}

export function parseSmsMessageDTO (value: any) : SmsMessageDTO | undefined {
    if (isSmsMessageDTO(value)) return value;
    return undefined;
}

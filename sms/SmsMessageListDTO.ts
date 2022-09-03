// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainArrayOf,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    hasNoOtherKeys,
    isArrayOf,
    isRegularObject
} from "../modules/lodash";
import { explainSmsMessageDTO, isSmsMessageDTO, SmsMessageDTO } from "./SmsMessageDTO";

export interface SmsMessageListDTO {
    readonly payload: readonly SmsMessageDTO[];
}

export function createSmsMessageListDTO (
    payload: readonly SmsMessageDTO[]
): SmsMessageListDTO {
    return {
        payload
    };
}

export function isSmsMessageListDTO (value: any): value is SmsMessageListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'payload'
        ])
        && isArrayOf<SmsMessageDTO>(value?.payload, isSmsMessageDTO)
    );
}

export function explainSmsMessageListDTO (value: any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'payload'
            ]),
            explainProperty(
                "payload",
                explainArrayOf<SmsMessageDTO>(
                    "SmsMessageDTO",
                    explainSmsMessageDTO,
                    value?.payload,
                    isSmsMessageDTO
                )
            )
        ]
    );
}

export function stringifySmsMessageListDTO (value: SmsMessageListDTO): string {
    return `SmsMessageListDTO(${value})`;
}

export function parseSmsMessageListDTO (value: any): SmsMessageListDTO | undefined {
    if ( isSmsMessageListDTO(value) ) return value;
    return undefined;
}

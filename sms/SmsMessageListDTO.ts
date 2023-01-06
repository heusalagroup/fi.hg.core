// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainSmsMessageDTO, isSmsMessageDTO, SmsMessageDTO } from "./SmsMessageDTO";
import { explain, explainProperty } from "../types/explain";
import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../types/Array";

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

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";

export interface PaytrailResponseDTO {
    readonly transactionId: string;
}

export function createPaytrailResponseDTO (
    transactionId : string
) : PaytrailResponseDTO {
    return {
        transactionId
    };
}

export function isPaytrailResponseDTO (value: unknown) : value is PaytrailResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'transactionId',
        ])
        && isString(value?.transactionId)
    );
}

export function explainPaytrailResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'transactionId',
            ])
            , explainProperty("transactionId", explainString(value?.transactionId))
        ]
    );
}

export function stringifyPaytrailResponseDTO (value : PaytrailResponseDTO) : string {
    return `PaytrailResponseDTO(${value})`;
}

export function parsePaytrailResponseDTO (value: unknown) : PaytrailResponseDTO | undefined {
    if (isPaytrailResponseDTO(value)) return value;
    return undefined;
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, isString } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";

/**
 * @see https://docs.paytrail.com/#/?id=response-6
 * @see https://docs.paytrail.com/#/?id=response-10
 */
export interface PaytrailErrorDTO {

    /**
     * Always "error"
     */
    readonly status: 'error';

    /**
     * The error message
     */
    readonly message: string;

}

export function createPaytrailErrorDTO (
    message : string
) : PaytrailErrorDTO {
    return {
        status: 'error',
        message
    };
}

export function isPaytrailErrorDTO (value: unknown) : value is PaytrailErrorDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'status',
            'message',
        ])
        && value?.status === 'error'
        && isString(value?.message)
    );
}

export function explainPaytrailErrorDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'status',
                'message',
            ])
            , explainProperty("status", value?.status === 'error' ? explainOk() : `Property "status" is not 'error'`)
            , explainProperty("message", explainString(value?.message))
        ]
    );
}

export function parsePaytrailErrorDTO (value: unknown) : PaytrailErrorDTO | undefined {
    if (isPaytrailErrorDTO(value)) return value;
    return undefined;
}

export function isPaytrailErrorDTOOrUndefined (value: unknown): value is PaytrailErrorDTO | undefined {
    return isUndefined(value) || isPaytrailErrorDTO(value);
}

export function explainPaytrailErrorDTOOrUndefined (value: unknown): string {
    return isPaytrailErrorDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailErrorDTO', 'undefined']));
}

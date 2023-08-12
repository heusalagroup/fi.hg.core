// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBoolean } from "../../types/Boolean";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrNull, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

/**
 * SMS Queue DTO
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
 *
 */
export interface NewSmsQueueDTO {
    readonly invoiceId: string;
    readonly clientId: string;
    readonly senderAddress: string;
    readonly targetAddress: string;
    readonly message: string;
    readonly sent: boolean;
    readonly failed: boolean;
    readonly isTerminated: boolean;
}

export function createNewSmsQueueDTO (
    invoiceId: string,
    clientId: string,
    senderAddress: string,
    targetAddress: string,
    message: string,
    sent: boolean,
    failed: boolean,
    isTerminated: boolean,
) : NewSmsQueueDTO {
    return {
        invoiceId,
        clientId,
        senderAddress,
        targetAddress,
        message,
        sent,
        failed,
        isTerminated,
    };
}

export function isNewSmsQueueDTO (value: unknown) : value is NewSmsQueueDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceId',
            'clientId',
            'senderAddress',
            'targetAddress',
            'message',
            'sent',
            'failed',
            'isTerminated',
        ])
        && isString(value?.invoiceId)
        && isString(value?.clientId)
        && isString(value?.senderAddress)
        && isString(value?.targetAddress)
        && isString(value?.message)
        && isBoolean(value?.sent)
        && isBoolean(value?.failed)
        && isBoolean(value?.isTerminated)
    );
}

export function explainNewSmsQueueDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'invoiceId',
                'clientId',
                'senderAddress',
                'targetAddress',
                'message',
                'sent',
                'failed',
                'isTerminated',
            ])
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("senderAddress", explainString(value?.senderAddress))
            , explainProperty("targetAddress", explainString(value?.targetAddress))
            , explainProperty("message", explainString(value?.message))
            , explainProperty("sent", explainStringOrNull(value?.sent))
            , explainProperty("failed", explainStringOrNull(value?.failed))
            , explainProperty("isTerminated", explainString(value?.isTerminated))
        ]
    );
}

export function parseNewSmsQueueDTO (value: unknown) : NewSmsQueueDTO | undefined {
    if (isNewSmsQueueDTO(value)) return value;
    return undefined;
}

export function isNewSmsQueueDTOOrUndefined (value: unknown): value is NewSmsQueueDTO | undefined {
    return isUndefined(value) || isNewSmsQueueDTO(value);
}

export function explainNewSmsQueueDTOOrUndefined (value: unknown): string {
    return isNewSmsQueueDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['NewSmsQueueDTO', 'undefined']));
}

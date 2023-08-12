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
export interface SmsQueueDTO {
    readonly smsQueueId: string;
    readonly invoiceId: string;
    readonly clientId: string;
    readonly updated: string;
    readonly created: string;
    readonly senderAddress: string;
    readonly targetAddress: string;
    readonly message: string;
    readonly sent: boolean;
    readonly failed: boolean;
    readonly isTerminated: boolean;
}

export function createSmsQueueDTO (
    smsQueueId: string,
    invoiceId: string,
    clientId: string,
    updated: string,
    created: string,
    senderAddress: string,
    targetAddress: string,
    message: string,
    sent: boolean,
    failed: boolean,
    isTerminated: boolean,
) : SmsQueueDTO {
    return {
        smsQueueId,
        invoiceId,
        clientId,
        updated,
        created,
        senderAddress,
        targetAddress,
        message,
        sent,
        failed,
        isTerminated,
    };
}

export function isSmsQueueDTO (value: unknown) : value is SmsQueueDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'smsQueueId',
            'invoiceId',
            'clientId',
            'updated',
            'created',
            'senderAddress',
            'targetAddress',
            'message',
            'sent',
            'failed',
            'isTerminated',
        ])
        && isString(value?.smsQueueId)
        && isString(value?.invoiceId)
        && isString(value?.clientId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.senderAddress)
        && isString(value?.targetAddress)
        && isString(value?.message)
        && isBoolean(value?.sent)
        && isBoolean(value?.failed)
        && isBoolean(value?.isTerminated)
    );
}

export function explainSmsQueueDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'smsQueueId',
                'invoiceId',
                'clientId',
                'updated',
                'created',
                'senderAddress',
                'targetAddress',
                'message',
                'sent',
                'failed',
                'isTerminated',
            ])
            , explainProperty("smsQueueId", explainString(value?.smsQueueId))
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("updated", explainStringOrNull(value?.updated))
            , explainProperty("created", explainStringOrNull(value?.created))
            , explainProperty("senderAddress", explainString(value?.senderAddress))
            , explainProperty("targetAddress", explainString(value?.targetAddress))
            , explainProperty("message", explainString(value?.message))
            , explainProperty("sent", explainStringOrNull(value?.sent))
            , explainProperty("failed", explainStringOrNull(value?.failed))
            , explainProperty("isTerminated", explainString(value?.isTerminated))
        ]
    );
}

export function parseSmsQueueDTO (value: unknown) : SmsQueueDTO | undefined {
    if (isSmsQueueDTO(value)) return value;
    return undefined;
}

export function isSmsQueueDTOOrUndefined (value: unknown): value is SmsQueueDTO | undefined {
    return isUndefined(value) || isSmsQueueDTO(value);
}

export function explainSmsQueueDTOOrUndefined (value: unknown): string {
    return isSmsQueueDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SmsQueueDTO', 'undefined']));
}

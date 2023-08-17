// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainString, explainStringOrNull, isString, isStringOrNull } from "../../types/String";
import { isUndefined } from "../../types/undefined";

/**
 * @example
 *    {
 *     "archiveId": "20190524593156999999999999999999999",
 *     "amount": "12.35",
 *     "message": "Less money, fewer problems",
 *     "accountIban": "FI4550009420888888",
 *     "transactionDate": "2023-01-14",
 *     "endToEndId": "544652-end2end"
 *   }
 */
export interface OpRefundRequestDTO {
    readonly archiveId: string;
    readonly amount: string;
    readonly message: string;
    readonly accountIban: string;
    readonly transactionDate: string;
    readonly endToEndId: string | null;
}

export function createOpRefundRequestDTO (
    archiveId : string,
    amount : string,
    message : string,
    accountIban : string,
    transactionDate : string,
    endToEndId : string | null,
) : OpRefundRequestDTO {
    return {
        archiveId,
        amount,
        message,
        accountIban,
        transactionDate,
        endToEndId,
    };
}

export function isOpRefundRequestDTO (value: unknown) : value is OpRefundRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'archiveId',
            'amount',
            'message',
            'accountIban',
            'transactionDate',
            'endToEndId',
            'foo',
        ])
        && isString(value?.archiveId)
        && isString(value?.amount)
        && isString(value?.message)
        && isString(value?.accountIban)
        && isString(value?.transactionDate)
        && isStringOrNull(value?.endToEndId)
    );
}

export function explainOpRefundRequestDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'archiveId',
                'amount',
                'message',
                'accountIban',
                'transactionDate',
                'endToEndId',
            ])
            , explainProperty("archiveId", explainString(value?.archiveId))
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("message", explainString(value?.message))
            , explainProperty("accountIban", explainString(value?.accountIban))
            , explainProperty("transactionDate", explainString(value?.transactionDate))
            , explainProperty("endToEndId", explainStringOrNull(value?.endToEndId))
        ]
    );
}

export function parseOpRefundRequestDTO (value: unknown) : OpRefundRequestDTO | undefined {
    if (isOpRefundRequestDTO(value)) return value;
    return undefined;
}

export function isOpRefundRequestDTOOrUndefined (value: unknown): value is OpRefundRequestDTO | undefined {
    return isUndefined(value) || isOpRefundRequestDTO(value);
}

export function explainOpRefundRequestDTOOrUndefined (value: unknown): string {
    return isOpRefundRequestDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentRefundRequestDTO', 'undefined']));
}

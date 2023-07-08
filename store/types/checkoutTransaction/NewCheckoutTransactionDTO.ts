// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainProperty } from "../../../types/explain";

export interface NewCheckoutTransactionDTO {
    readonly invoiceId               : string;
    readonly transactionId           : string;
    readonly href                    : string;
    readonly reference               : string;
    readonly raw                     : string;
    readonly status                  : string;
    readonly amount                  : number;
}

export function createNewCheckoutTransactionDTO (
    invoiceId             : string,
    transactionId         : string,
    href                  : string,
    reference             : string,
    raw                   : string,
    status                : string,
    amount                : number,
): NewCheckoutTransactionDTO {
    return {
        invoiceId,
        transactionId,
        href,
        reference,
        raw,
        status,
        amount,
    };
}

export function isNewCheckoutTransactionDTO (value: any): value is NewCheckoutTransactionDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceId',
            'transactionId',
            'href',
            'reference',
            'raw',
            'status',
            'amount',
        ])
        && isString(value?.invoiceId)
        && isString(value?.transactionId)
        && isString(value?.href)
        && isString(value?.reference)
        && isString(value?.raw)
        && isString(value?.status)
        && isNumber(value?.amount)
    );
}

export function explainNewCheckoutTransactionDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'invoiceId',
                'transactionId',
                'href',
                'reference',
                'raw',
                'status',
                'amount',
            ])
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("transactionId", explainString(value?.transactionId))
            , explainProperty("href", explainString(value?.href))
            , explainProperty("reference", explainString(value?.reference))
            , explainProperty("raw", explainString(value?.raw))
            , explainProperty("status", explainString(value?.status))
            , explainProperty("amount", explainNumber(value?.amount))
        ]
    );
}

export function parseNewCheckoutTransactionDTO (value: any): NewCheckoutTransactionDTO | undefined {
    if ( isNewCheckoutTransactionDTO(value) ) return value;
    return undefined;
}

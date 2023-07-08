// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainProperty } from "../../../types/explain";

export interface CheckoutTransactionDTO {
    readonly checkoutTransactionId   : string;
    readonly invoiceId               : string;
    readonly creation                : string;
    readonly updated                 : string;
    readonly transactionId           : string;
    readonly href                    : string;
    readonly reference               : string;
    readonly raw                     : string;
    readonly status                  : string;
    readonly amount                  : number;
}

export function createCheckoutTransactionDTO (
    checkoutTransactionId : string,
    invoiceId             : string,
    creation              : string,
    updated               : string,
    transactionId         : string,
    href                  : string,
    reference             : string,
    raw                   : string,
    status                : string,
    amount                : number,
): CheckoutTransactionDTO {
    return {
        checkoutTransactionId,
        invoiceId,
        creation,
        updated,
        transactionId,
        href,
        reference,
        raw,
        status,
        amount,
    };
}

export function isCheckoutTransactionDTO (value: any): value is CheckoutTransactionDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'checkoutTransactionId',
            'invoiceId',
            'creation',
            'updated',
            'transactionId',
            'href',
            'reference',
            'raw',
            'status',
            'amount',
        ])
        && isString(value?.checkoutTransactionId)
        && isString(value?.invoiceId)
        && isString(value?.creation)
        && isString(value?.updated)
        && isString(value?.transactionId)
        && isString(value?.href)
        && isString(value?.reference)
        && isString(value?.raw)
        && isString(value?.status)
        && isNumber(value?.amount)
    );
}

export function explainCheckoutTransactionDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'checkoutTransactionId',
                'invoiceId',
                'creation',
                'updated',
                'transactionId',
                'href',
                'reference',
                'raw',
                'status',
                'amount',
            ])
            , explainProperty("checkoutTransactionId", explainString(value?.checkoutTransactionId))
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("creation", explainString(value?.creation))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("transactionId", explainString(value?.transactionId))
            , explainProperty("href", explainString(value?.href))
            , explainProperty("reference", explainString(value?.reference))
            , explainProperty("raw", explainString(value?.raw))
            , explainProperty("status", explainString(value?.status))
            , explainProperty("amount", explainNumber(value?.amount))
        ]
    );
}

export function parseCheckoutTransactionDTO (value: any): CheckoutTransactionDTO | undefined {
    if ( isCheckoutTransactionDTO(value) ) return value;
    return undefined;
}

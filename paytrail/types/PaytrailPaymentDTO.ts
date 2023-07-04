// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { isPaytrailStatus, PaytrailStatus } from "./PaytrailStatus";
import { explainPaytrailCurrency, isPaytrailCurrency, PaytrailCurrency } from "./PaytrailCurrency";
import { explainNumber, isNumber } from "../../types/Number";

/**
 * @see https://docs.paytrail.com/#/?id=get
 */
export interface PaytrailPaymentDTO {
    readonly transactionId: string;
    readonly status: PaytrailStatus;
    readonly amount: number;
    readonly currency: PaytrailCurrency;
    readonly stamp : string;
    readonly reference : string;
    readonly createdAt : string;
    readonly href ?: string;
    readonly provider ?: string;
    readonly fillingCode ?: string;
    readonly paidAt ?: string;
    readonly settlementReference ?: string;
}

export function createPaytrailPaymentDTO (
    transactionId : string,
    status: PaytrailStatus,
    amount: number,
    currency: PaytrailCurrency,
    stamp : string,
    reference : string,
    createdAt : string,
    href ?: string,
    provider ?: string,
    fillingCode ?: string,
    paidAt ?: string,
    settlementReference ?: string,
) : PaytrailPaymentDTO {
    return {
        transactionId,
        status,
        amount,
        currency,
        stamp,
        reference,
        createdAt,
        href,
        provider,
        fillingCode,
        paidAt,
        settlementReference,
    };
}

export function isPaytrailPaymentDTO (value: unknown) : value is PaytrailPaymentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'transactionId',
            'status',
            'amount',
            'currency',
            'stamp',
            'reference',
            'createdAt',
            'href',
            'provider',
            'fillingCode',
            'paidAt',
            'settlementReference',
        ])
        && isString(value?.transactionId)
        && isPaytrailStatus(value?.status)
        && isNumber(value?.amount)
        && isPaytrailCurrency(value?.currency)
        && isString(value?.stamp)
        && isString(value?.reference)
        && isString(value?.createdAt)
        && isStringOrUndefined(value?.href)
        && isStringOrUndefined(value?.provider)
        && isStringOrUndefined(value?.fillingCode)
        && isStringOrUndefined(value?.paidAt)
        && isStringOrUndefined(value?.settlementReference)
    );
}

export function explainPaytrailPaymentDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'transactionId',
                'status',
                'amount',
                'currency',
                'stamp',
                'reference',
                'createdAt',
                'href',
                'provider',
                'fillingCode',
                'paidAt',
                'settlementReference',
            ])
            , explainProperty("transactionId", explainString(value?.transactionId))
            , explainProperty("status", explainString(value?.status))
            , explainProperty("amount", explainNumber(value?.amount))
            , explainProperty("currency", explainPaytrailCurrency(value?.currency))
            , explainProperty("stamp", explainString(value?.stamp))
            , explainProperty("reference", explainString(value?.reference))
            , explainProperty("createdAt", explainString(value?.createdAt))
            , explainProperty("href", explainStringOrUndefined(value?.href))
            , explainProperty("provider", explainStringOrUndefined(value?.provider))
            , explainProperty("fillingCode", explainStringOrUndefined(value?.fillingCode))
            , explainProperty("paidAt", explainStringOrUndefined(value?.paidAt))
            , explainProperty("settlementReference", explainStringOrUndefined(value?.settlementReference))
        ]
    );
}

export function stringifyPaytrailPaymentDTO (value : PaytrailPaymentDTO) : string {
    return `PaytrailPaymentDTO(${value})`;
}

export function parsePaytrailPaymentDTO (value: unknown) : PaytrailPaymentDTO | undefined {
    if (isPaytrailPaymentDTO(value)) return value;
    return undefined;
}

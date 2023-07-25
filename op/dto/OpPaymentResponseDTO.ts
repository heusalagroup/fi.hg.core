// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainOpPaymentStatus, isOpPaymentStatus, OpPaymentStatus } from "../types/OpPaymentStatus";
import { explainOpPaymentType, isOpPaymentType, OpPaymentType } from "../types/OpPaymentType";
import { Currency } from "../../types/Currency";

/**
 * @example
 *
 *    {
 *    "amount": "3.45",
 *    "status": "PROCESSED",
 *    "currency": "EUR",
 *    "archiveId": "20190524593156999999",
 *    "debtorIban": "FI4550009420888888",
 *    "ultimateDebtorName": "Ultimate Debtor",
 *    "bookingDate": "2019-05-12",
 *    "paymentType": "SCT_INST",
 *    "creditorIban": "FI4550009420999999",
 *    "creditorName": "Cedric Creditor",
 *    "ultimateCreditorName": "Ultimate Creditor",
 *    "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
 *    "transactionDate": "2019-05-11",
 *    "endToEndId": "544652-end2end"
 *    }
 */
export interface OpPaymentResponseDTO {
    readonly amount: string;
    readonly status: OpPaymentStatus;
    readonly currency: Currency;
    readonly archiveId: string;
    readonly debtorIban: string;
    readonly bookingDate: string;
    readonly paymentType: OpPaymentType;
    readonly creditorIban: string;
    readonly creditorName: string;
    readonly ultimateDebtorName ?: string;
    readonly ultimateCreditorName ?: string;
    readonly transactionId: string;
    readonly transactionDate: string;
    readonly endToEndId: string;
}

export function createOpPaymentResponseDTO (
    amount : string,
    status : OpPaymentStatus,
    currency : Currency,
    archiveId : string,
    debtorIban : string,
    ultimateDebtorName : string | undefined,
    bookingDate : string,
    paymentType : OpPaymentType,
    creditorIban : string,
    creditorName : string,
    ultimateCreditorName : string | undefined,
    transactionId : string,
    transactionDate : string,
    endToEndId : string,
) : OpPaymentResponseDTO {
    return {
        amount,
        status,
        currency,
        archiveId,
        debtorIban,
        bookingDate,
        paymentType,
        creditorIban,
        creditorName,
        transactionId,
        transactionDate,
        endToEndId,
        ...(ultimateDebtorName !== undefined ? {ultimateDebtorName} : {}),
        ...(ultimateCreditorName !== undefined ? {ultimateCreditorName} : {}),
    };
}

export function isOpPaymentResponseDTO (value: unknown) : value is OpPaymentResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'amount',
            'status',
            'currency',
            'archiveId',
            'debtorIban',
            'ultimateDebtorName',
            'bookingDate',
            'paymentType',
            'creditorIban',
            'creditorName',
            'ultimateCreditorName',
            'transactionId',
            'transactionDate',
            'endToEndId',
        ])
        && isString(value?.amount)
        && isOpPaymentStatus(value?.status)
        && isString(value?.currency)
        && isString(value?.archiveId)
        && isString(value?.debtorIban)
        && isStringOrUndefined(value?.ultimateDebtorName)
        && isString(value?.bookingDate)
        && isOpPaymentType(value?.paymentType)
        && isString(value?.creditorIban)
        && isString(value?.creditorName)
        && isStringOrUndefined(value?.ultimateCreditorName)
        && isString(value?.transactionId)
        && isString(value?.transactionDate)
        && isString(value?.endToEndId)
    );
}

export function explainOpPaymentResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'amount',
                'status',
                'currency',
                'archiveId',
                'debtorIban',
                'ultimateDebtorName',
                'bookingDate',
                'paymentType',
                'creditorIban',
                'creditorName',
                'ultimateCreditorName',
                'transactionId',
                'transactionDate',
                'endToEndId',
            ])
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("status", explainOpPaymentStatus(value?.status))
            , explainProperty("currency", explainString(value?.currency))
            , explainProperty("archiveId", explainString(value?.archiveId))
            , explainProperty("debtorIban", explainString(value?.debtorIban))
            , explainProperty("ultimateDebtorName", explainStringOrUndefined(value?.ultimateDebtorName))
            , explainProperty("bookingDate", explainString(value?.bookingDate))
            , explainProperty("paymentType", explainOpPaymentType(value?.paymentType))
            , explainProperty("creditorIban", explainString(value?.creditorIban))
            , explainProperty("creditorName", explainString(value?.creditorName))
            , explainProperty("ultimateCreditorName", explainStringOrUndefined(value?.ultimateCreditorName))
            , explainProperty("transactionId", explainString(value?.transactionId))
            , explainProperty("transactionDate", explainString(value?.transactionDate))
            , explainProperty("endToEndId", explainString(value?.endToEndId))
        ]
    );
}

export function parseOpPaymentResponseDTO (value: unknown) : OpPaymentResponseDTO | undefined {
    if (isOpPaymentResponseDTO(value)) return value;
    return undefined;
}

export function isOpPaymentResponseDTOOrUndefined (value: unknown): value is OpPaymentResponseDTO | undefined {
    return isUndefined(value) || isOpPaymentResponseDTO(value);
}

export function explainOpPaymentResponseDTOOrUndefined (value: unknown): string {
    return isOpPaymentResponseDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentResponseDTO', 'undefined']));
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainString, explainStringOrNull, isString, isStringOrNull } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { isOpPaymentType } from "./OpPaymentType";
import { explainOpRefundPaymentType, OpRefundPaymentType } from "./OpRefundPaymentType";
import { explainOpRefundStatus, isOpRefundStatus, OpRefundStatus } from "./OpRefundStatus";

/**
 * @example
 *    {
 *      "amount": "3.45",
 *      "status": "PROCESSED",
 *      "message": "MAKSUN PALAUTUS. Maksun tiedot: 01.01.2020 Your own refund message",
 *      "currency": "EUR",
 *      "archiveId": "20190524593156999999",
 *      "debtorIban": "FI4550009420888888",
 *      "bookingDate": "2019-05-12",
 *      "paymentType": "SCT_INST",
 *      "creditorName": "Cedric Creditor",
 *      "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
 *      "transactionDate": "2019-05-11",
 *      "endToEndId": "544652-end2end"
 *    }
 */
export interface OpRefundRefundObject {
    readonly amount: string;
    readonly status: OpRefundStatus;
    readonly message: string;
    readonly currency: string;
    readonly archiveId: string;
    readonly debtorIban: string;
    readonly bookingDate: string;
    readonly paymentType: OpRefundPaymentType;
    readonly creditorName: string;
    readonly transactionId: string;
    readonly transactionDate: string;
    readonly endToEndId: string | null;
}

export function createOpRefundRefundObject (
    amount : string,
    status : OpRefundStatus,
    message : string,
    currency : string,
    archiveId : string,
    debtorIban : string,
    bookingDate : string,
    paymentType : OpRefundPaymentType,
    creditorName : string,
    transactionId : string,
    transactionDate : string,
    endToEndId : string | null,
) : OpRefundRefundObject {
    return {
        amount,
        status,
        message,
        currency,
        archiveId,
        debtorIban,
        bookingDate,
        paymentType,
        creditorName,
        transactionId,
        transactionDate,
        endToEndId,
    };
}

export function isOpRefundRefundObject (value: unknown) : value is OpRefundRefundObject {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'amount',
            'status',
            'message',
            'currency',
            'archiveId',
            'debtorIban',
            'bookingDate',
            'paymentType',
            'creditorName',
            'transactionId',
            'transactionDate',
            'endToEndId',
        ])
        && isString(value?.amount)
        && isOpRefundStatus(value?.status)
        && isString(value?.message)
        && isString(value?.currency)
        && isString(value?.archiveId)
        && isString(value?.debtorIban)
        && isString(value?.bookingDate)
        && isOpPaymentType(value?.paymentType)
        && isString(value?.creditorName)
        && isString(value?.transactionId)
        && isString(value?.transactionDate)
        && isStringOrNull(value?.endToEndId)
    );
}

export function explainOpRefundRefundObject (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'amount',
                'status',
                'message',
                'currency',
                'archiveId',
                'debtorIban',
                'bookingDate',
                'paymentType',
                'creditorName',
                'transactionId',
                'transactionDate',
                'endToEndId',
            ])
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("status", explainOpRefundStatus(value?.status))
            , explainProperty("message", explainString(value?.message))
            , explainProperty("currency", explainString(value?.currency))
            , explainProperty("archiveId", explainString(value?.archiveId))
            , explainProperty("debtorIban", explainString(value?.debtorIban))
            , explainProperty("bookingDate", explainString(value?.bookingDate))
            , explainProperty("paymentType", explainOpRefundPaymentType(value?.paymentType))
            , explainProperty("creditorName", explainString(value?.creditorName))
            , explainProperty("transactionId", explainString(value?.transactionId))
            , explainProperty("transactionDate", explainString(value?.transactionDate))
            , explainProperty("endToEndId", explainStringOrNull(value?.endToEndId))
        ]
    );
}

export function parseOpRefundRefundObject (value: unknown) : OpRefundRefundObject | undefined {
    if (isOpRefundRefundObject(value)) return value;
    return undefined;
}

export function isOpRefundRefundObjectOrUndefined (value: unknown): value is OpRefundRefundObject | undefined {
    return isUndefined(value) || isOpRefundRefundObject(value);
}

export function explainOpRefundRefundObjectOrUndefined (value: unknown): string {
    return isOpRefundRefundObjectOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpRefundRefundObject', 'undefined']));
}

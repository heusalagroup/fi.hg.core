// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainString, explainStringOrNull, isString, isStringOrNull } from "../../types/String";
import { isUndefined } from "../../types/undefined";

/**
 * @example
 *   {
 *     "archiveId": "20190524593156999999999999999999999",
 *     "message": "Less money, fewer problems",
 *     "reference": "00000000000000482738",
 *     "amount": "12.35",
 *     "bookingDate": "2019-05-12",
 *     "debtorName": "Debbie Debtor"
 *   }
 */
export interface OpRefundOriginalObject {
    readonly archiveId: string;
    readonly message: string;
    readonly reference: string | null;
    readonly amount: string;
    readonly bookingDate: string;
    readonly debtorName: string;
}

export function createOpRefundOriginalObject (
    archiveId : string,
    message : string,
    reference : string | null,
    amount : string,
    bookingDate : string,
    debtorName : string,
) : OpRefundOriginalObject {
    return {
        archiveId,
        message,
        reference,
        amount,
        bookingDate,
        debtorName,
    };
}

export function isOpRefundOriginalObject (value: unknown) : value is OpRefundOriginalObject {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'archiveId',
            'message',
            'reference',
            'amount',
            'bookingDate',
            'debtorName',
        ])
        && isString(value?.archiveId)
        && isString(value?.message)
        && isStringOrNull(value?.reference)
        && isString(value?.amount)
        && isString(value?.bookingDate)
        && isString(value?.debtorName)
    );
}

export function explainOpRefundOriginalObject (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'archiveId',
                'message',
                'reference',
                'amount',
                'bookingDate',
                'debtorName',
            ])
            , explainProperty("archiveId", explainString(value?.archiveId))
            , explainProperty("message", explainString(value?.message))
            , explainProperty("reference", explainStringOrNull(value?.reference))
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("bookingDate", explainString(value?.bookingDate))
            , explainProperty("debtorName", explainString(value?.debtorName))
        ]
    );
}

export function parseOpRefundOriginalObject (value: unknown) : OpRefundOriginalObject | undefined {
    if (isOpRefundOriginalObject(value)) return value;
    return undefined;
}

export function isOpRefundOriginalObjectOrUndefined (value: unknown): value is OpRefundOriginalObject | undefined {
    return isUndefined(value) || isOpRefundOriginalObject(value);
}

export function explainOpRefundOriginalObjectOrUndefined (value: unknown): string {
    return isOpRefundOriginalObjectOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpRefundOriginalObject', 'undefined']));
}

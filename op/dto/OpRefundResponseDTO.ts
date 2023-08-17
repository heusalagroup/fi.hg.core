// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { isUndefined } from "../../types/undefined";
import { explainOpRefundOriginalObject, isOpRefundOriginalObject, OpRefundOriginalObject } from "../types/OpRefundOriginalObject";
import { explainOpRefundRefundObject, isOpRefundRefundObject, OpRefundRefundObject } from "../types/OpRefundRefundObject";

/**
 * @example
 *   {
 *     "original": {
 *       "archiveId": "20190524593156999999999999999999999",
 *       "message": "Less money, fewer problems",
 *       "reference": "00000000000000482738",
 *       "amount": "12.35",
 *       "bookingDate": "2019-05-12",
 *       "debtorName": "Debbie Debtor"
 *     },
 *     "refund": {
 *       "amount": "3.45",
 *       "status": "PROCESSED",
 *       "message": "MAKSUN PALAUTUS. Maksun tiedot: 01.01.2020 Your own refund message",
 *       "currency": "EUR",
 *       "archiveId": "20190524593156999999",
 *       "debtorIban": "FI4550009420888888",
 *       "bookingDate": "2019-05-12",
 *       "paymentType": "SCT_INST",
 *       "creditorName": "Cedric Creditor",
 *       "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
 *       "transactionDate": "2019-05-11",
 *       "endToEndId": "544652-end2end"
 *     }
 *   }
 */
export interface OpRefundResponseDTO {
    readonly original: OpRefundOriginalObject;
    readonly refund : OpRefundRefundObject;
}

export function createOpRefundResponseDTO (
    original : OpRefundOriginalObject,
    refund : OpRefundRefundObject,
) : OpRefundResponseDTO {
    return {
        original,
        refund,
    };
}

export function isOpRefundResponseDTO (value: unknown) : value is OpRefundResponseDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'original',
            'refund',
        ])
        && isOpRefundOriginalObject(value?.original)
        && isOpRefundRefundObject(value?.refund)
    );
}

export function explainOpRefundResponseDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'original',
                'refund',
            ])
            , explainProperty("original", explainOpRefundOriginalObject(value?.original))
            , explainProperty("refund", explainOpRefundRefundObject(value?.refund))
        ]
    );
}

export function parseOpRefundResponseDTO (value: unknown) : OpRefundResponseDTO | undefined {
    if (isOpRefundResponseDTO(value)) return value;
    return undefined;
}

export function isOpRefundResponseDTOOrUndefined (value: unknown): value is OpRefundResponseDTO | undefined {
    return isUndefined(value) || isOpRefundResponseDTO(value);
}

export function explainOpRefundResponseDTOOrUndefined (value: unknown): string {
    return isOpRefundResponseDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpRefundResponseDTO', 'undefined']));
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpPaymentResponseDTO, isOpPaymentResponseDTO, OpPaymentResponseDTO } from "./OpPaymentResponseDTO";
import { map } from "../../functions/map";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

/**
 * OP payment list response DTO.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#operation/instantPaymentStatus
 *
 * @example
 *     [
 *       {
 *         "amount": "3.45",
 *         "status": "PROCESSED",
 *         "currency": "EUR",
 *         "archiveId": "20190524593156999999",
 *         "debtorIban": "FI4550009420888888",
 *         "ultimateDebtorName": "Ultimate Debtor",
 *         "bookingDate": "2019-05-12",
 *         "paymentType": "SCT_INST",
 *         "creditorIban": "FI4550009420999999",
 *         "creditorName": "Cedric Creditor",
 *         "ultimateCreditorName": "Ultimate Creditor",
 *         "transactionId": "A_50009420112088_2019-05-24_20190524593156999999_0",
 *         "transactionDate": "2019-05-11",
 *         "endToEndId": "544652-end2end"
 *       }
 *     ]
 */
export type OpPaymentListDTO = readonly OpPaymentResponseDTO[];

export function createOpPaymentListDTO (
    list : readonly OpPaymentResponseDTO[]
) : OpPaymentListDTO {
    return map(
        list,
        (item : OpPaymentResponseDTO ) : OpPaymentResponseDTO => item
    );
}

export function isOpPaymentListDTO (value: unknown) : value is OpPaymentListDTO {
    return isArrayOf<OpPaymentResponseDTO>(value, isOpPaymentResponseDTO);
}

export function explainOpPaymentListDTO (value: any) : string {
    return explainArrayOf<OpPaymentResponseDTO>("OpPaymentResponseDTO", explainOpPaymentResponseDTO, value, isOpPaymentResponseDTO);
}

export function parseOpPaymentListDTO (value: unknown) : OpPaymentListDTO | undefined {
    if (isOpPaymentListDTO(value)) return value;
    return undefined;
}

export function isOpPaymentListDTOOrUndefined (value: unknown): value is OpPaymentListDTO | undefined {
    return isUndefined(value) || isOpPaymentListDTO(value);
}

export function explainOpPaymentListDTOOrUndefined (value: unknown): string {
    return isOpPaymentListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentListDTO', 'undefined']));
}

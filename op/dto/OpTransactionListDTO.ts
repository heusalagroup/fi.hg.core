// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpTransactionDTO, isOpTransactionDTO, OpTransactionDTO } from "./OpTransactionDTO";
import { map } from "../../functions/map";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

/**
 * OP Bank account transaction list response DTO.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
 *
 * @example
 *     [
 *       {
 *         "amount": "-12.35",
 *         "balanceBefore": "100.00",
 *         "balanceAfter": "87.65",
 *         "message": "More money, more problems",
 *         "currency": "EUR",
 *         "objectId": "50009420112088_2019-05-21_20190521599956999617_9",
 *         "archiveId": 20190521599957000000,
 *         "debtorBic": "OKOYFIHH",
 *         "reference": "00000000000000001245",
 *         "rfReference": "RF481245",
 *         "valueDate": "2019-05-01",
 *         "debtorName": "Debtor",
 *         "bookingDate": "2019-05-01",
 *         "creditorBic": "OKOYFIHH",
 *         "paymentDate": "2019-05-01",
 *         "creditorName": "Creditor",
 *         "debtorAccount": "FI7450009420999999",
 *         "creditorAccount": "FI7450009420999999",
 *         "endToEndId": "544652-end2end",
 *         "timestamp": 1556139630605000,
 *         "transactionTypeCode": 101,
 *         "transactionTypeDescription": "NOSTO",
 *         "uetr": "97ed4827-7b6f-4491-a06f-b548d5a7512d"
 *       }
 *     ]
 */
export type OpTransactionListDTO = readonly OpTransactionDTO[];

export function createOpTransactionListDTO (
    list : readonly OpTransactionDTO[]
) : OpTransactionListDTO {
    return map(
        list,
        (item : OpTransactionDTO ) : OpTransactionDTO => item
    );
}

export function isOpTransactionListDTO (value: unknown) : value is OpTransactionListDTO {
    return isArrayOf<OpTransactionDTO>(value, isOpTransactionDTO);
}

export function explainOpTransactionListDTO (value: any) : string {
    return explainArrayOf<OpTransactionDTO>("OpTransactionDTO", explainOpTransactionDTO, value, isOpTransactionDTO);
}

export function parseOpTransactionListDTO (value: unknown) : OpTransactionListDTO | undefined {
    if (isOpTransactionListDTO(value)) return value;
    return undefined;
}

export function isOpTransactionListDTOOrUndefined (value: unknown): value is OpTransactionListDTO | undefined {
    return isUndefined(value) || isOpTransactionListDTO(value);
}

export function explainOpTransactionListDTOOrUndefined (value: unknown): string {
    return isOpTransactionListDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpTransactionListDTO', 'undefined']));
}

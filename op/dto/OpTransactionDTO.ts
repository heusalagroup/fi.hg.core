// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, explainStringOrNull, isString, isStringOrNull } from "../../types/String";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainNumber, isNumber } from "../../types/Number";

/**
 * OP bank account transaction information inside a response list.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-account-data-api#operation/accounts
 *
 * @example
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
 */
export interface OpTransactionDTO {

    /**
     * Amount transferred in the transaction. Debit transactions are marked with
     * a minus sign.
     */
    readonly amount: string;

    /**
     * Account balance before the transaction.
     */
    readonly balanceBefore: string;

    /**
     * Account balance after the transaction.
     */
    readonly balanceAfter: string;

    /**
     * Message that the payer gave for this transaction
     */
    readonly message: string | null;

    /**
     * ISO currency code
     */
    readonly currency: string | null;

    /**
     * Transaction identifier, can be used as a basis of further transaction
     * queries
     */
    readonly objectId: string;

    /**
     * Archive identifier
     */
    readonly archiveId: string;

    /**
     * Debtor account BIC
     */
    readonly debtorBic: string;

    /**
     * Finnish Creditor Reference for the transaction
     */
    readonly reference: string | null;

    /**
     * RF Creditor Reference for the transaction
     */
    readonly rfReference: string | null;

    /**
     * Value date
     */
    readonly valueDate: string;

    /**
     * Name of the owner of the debtor account
     */
    readonly debtorName: string;

    /**
     * Booking date
     */
    readonly bookingDate: string;

    /**
     * Creditor account BIC
     */
    readonly creditorBic : string | null;

    /**
     * Payment date
     */
    readonly paymentDate: string;

    /**
     * Name of the owner of the creditor account
     */
    readonly creditorName: string;

    /**
     * Debtor account IBAN
     */
    readonly debtorAccount: string;

    /**
     * Creditor account IBAN
     */
    readonly creditorAccount: string | null;

    /**
     * Unique identification, as assigned by the original initiating party, to
     * unambiguously identify the original transaction.
     */
    readonly endToEndId: string | null;

    /**
     * The timestamp the transaction was registered with internally, given in
     * microseconds.
     */
    readonly timestamp: number;

    /**
     * The transaction type code.
     */
    readonly transactionTypeCode: string;

    /**
     * The description of the transaction type code.
     */
    readonly transactionTypeDescription: string;

    /**
     * The unique end-to-end transaction reference.
     */
    readonly uetr: string;

}

export function createOpTransactionDTO (
    amount: string,
    balanceBefore: string,
    balanceAfter: string,
    message: string | null,
    currency: string | null,
    objectId: string,
    archiveId: string,
    debtorBic: string,
    reference: string | null,
    rfReference: string | null,
    valueDate: string,
    debtorName: string,
    bookingDate: string,
    creditorBic: string | null,
    paymentDate: string,
    creditorName: string,
    debtorAccount: string,
    creditorAccount: string | null,
    endToEndId: string | null,
    timestamp: number,
    transactionTypeCode: string,
    transactionTypeDescription: string,
    uetr: string,
) : OpTransactionDTO {
    return {
        amount,
        balanceBefore,
        balanceAfter,
        message,
        currency,
        objectId,
        archiveId,
        debtorBic,
        reference,
        rfReference,
        valueDate,
        debtorName,
        bookingDate,
        creditorBic,
        paymentDate,
        creditorName,
        debtorAccount,
        creditorAccount,
        endToEndId,
        timestamp,
        transactionTypeCode,
        transactionTypeDescription,
        uetr,
    };
}

export function isOpTransactionDTO (value: unknown) : value is OpTransactionDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'amount',
            'balanceBefore',
            'balanceAfter',
            'message',
            'currency',
            'objectId',
            'archiveId',
            'debtorBic',
            'reference',
            'rfReference',
            'valueDate',
            'debtorName',
            'bookingDate',
            'creditorBic',
            'paymentDate',
            'creditorName',
            'debtorAccount',
            'creditorAccount',
            'endToEndId',
            'timestamp',
            'transactionTypeCode',
            'transactionTypeDescription',
            'uetr',
        ])
        && isString(value?.amount)
        && isString(value?.balanceBefore)
        && isString(value?.balanceAfter)
        && isStringOrNull(value?.message)
        && isStringOrNull(value?.currency)
        && isString(value?.objectId)
        && isString(value?.archiveId)
        && isString(value?.debtorBic)
        && isStringOrNull(value?.reference)
        && isStringOrNull(value?.rfReference)
        && isString(value?.valueDate)
        && isString(value?.debtorName)
        && isString(value?.bookingDate)
        && isStringOrNull(value?.creditorBic)
        && isString(value?.paymentDate)
        && isString(value?.creditorName)
        && isString(value?.debtorAccount)
        && isStringOrNull(value?.creditorAccount)
        && isStringOrNull(value?.endToEndId)
        && isNumber(value?.timestamp)
        && isString(value?.transactionTypeCode)
        && isString(value?.transactionTypeDescription)
        && isString(value?.uetr)
    );
}

export function explainOpTransactionDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'amount',
                'balanceBefore',
                'balanceAfter',
                'message',
                'currency',
                'objectId',
                'archiveId',
                'debtorBic',
                'reference',
                'rfReference',
                'valueDate',
                'debtorName',
                'bookingDate',
                'creditorBic',
                'paymentDate',
                'creditorName',
                'debtorAccount',
                'creditorAccount',
                'endToEndId',
                'timestamp',
                'transactionTypeCode',
                'transactionTypeDescription',
                'uetr',
            ])
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("balanceBefore", explainString(value?.balanceBefore))
            , explainProperty("balanceAfter", explainString(value?.balanceAfter))
            , explainProperty("message", explainStringOrNull(value?.message))
            , explainProperty("currency", explainStringOrNull(value?.currency))
            , explainProperty("objectId", explainString(value?.objectId))
            , explainProperty("archiveId", explainString(value?.archiveId))
            , explainProperty("debtorBic", explainString(value?.debtorBic))
            , explainProperty("reference", explainStringOrNull(value?.reference))
            , explainProperty("rfReference", explainStringOrNull(value?.rfReference))
            , explainProperty("valueDate", explainString(value?.valueDate))
            , explainProperty("debtorName", explainString(value?.debtorName))
            , explainProperty("bookingDate", explainString(value?.bookingDate))
            , explainProperty("creditorBic", explainStringOrNull(value?.creditorBic))
            , explainProperty("paymentDate", explainString(value?.paymentDate))
            , explainProperty("creditorName", explainString(value?.creditorName))
            , explainProperty("debtorAccount", explainString(value?.debtorAccount))
            , explainProperty("creditorAccount", explainStringOrNull(value?.creditorAccount))
            , explainProperty("endToEndId", explainStringOrNull(value?.endToEndId))
            , explainProperty("timestamp", explainNumber(value?.timestamp))
            , explainProperty("transactionTypeCode", explainString(value?.transactionTypeCode))
            , explainProperty("transactionTypeDescription", explainString(value?.transactionTypeDescription))
            , explainProperty("uetr", explainString(value?.uetr))
        ]
    );
}

export function parseOpTransactionDTO (value: unknown) : OpTransactionDTO | undefined {
    if (isOpTransactionDTO(value)) return value;
    return undefined;
}

export function isOpTransactionDTOOrUndefined (value: unknown): value is OpTransactionDTO | undefined {
    return isUndefined(value) || isOpTransactionDTO(value);
}

export function explainOpTransactionDTOOrUndefined (value: unknown): string {
    return isOpTransactionDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpTransactionDTO', 'undefined']));
}

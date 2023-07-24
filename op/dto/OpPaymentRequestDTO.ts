// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainOpPaymentCreditor, isOpPaymentCreditor, OpPaymentCreditor } from "../types/OpPaymentCreditor";
import { explainOpPaymentDebtor, isOpPaymentDebtor, OpPaymentDebtor } from "../types/OpPaymentDebtor";
import { explainOpPaymentInstructedAmount, isOpPaymentInstructedAmount, OpPaymentInstructedAmount } from "../types/OpPaymentInstructedAmount";
import { explainOpUltimateDebtorOrUndefined, isOpUltimateDebtorOrUndefined, OpUltimateDebtor } from "../types/OpUltimateDebtor";
import { explainOpUltimateCreditorOrUndefined, isOpUltimateCreditorOrUndefined, OpUltimateCreditor } from "../types/OpUltimateCreditor";

/**
 * SEPA and SEPA instant payment request DTO.
 *
 * @see https://op-developer.fi/products/banking/docs/op-corporate-payment-api#operation/payment
 * @example
 *   {
 *      "instructionId":"$INSTRUCTIONID",
 *      "endToEndId":"endToEndId",
 *      "creditor":{
 *          "name":"Creditor Name",
 *          "iban":"FI3859991620004143",
 *          "address":{
 *              "addressLine":["a1","a2"],
 *              "country":"FI"
*           }
 *      },
 *      "debtor":{
 *          "name":"Debtor Name",
 *          "iban":"FI6359991620004275",
 *          "address":{
 *              "addressLine":["a1","a2"],
 *              "country":"FI"
*           }
 *      },
 *      "instructedAmount":{
 *          "currency":"EUR",
 *          "amount":"0.16"
 *      },
 *      "reference":"00000000000000482738"
 *   }
 *
 * @example
 *
 *     {
 *       "debtor": {
 *         "iban": "FI4550009420999999",
 *         "name": "Debtor Name",
 *         "address": {
 *           "country": "FI",
 *           "addressLine": [
 *             "string",
 *             "string"
 *           ]
 *         }
 *       },
 *       "ultimateDebtor": {
 *         "name": "Ultimate Debtor",
 *         "identification": {
 *           "id": "1234567-8",
 *           "schemeName": "BIC",
 *           "issuer": "string"
 *         },
 *         "address": {
 *           "country": "FI",
 *           "addressLine": [
 *             "string",
 *             "string"
 *           ]
 *         }
 *       },
 *       "message": "Less money, fewer problems",
 *       "creditor": {
 *         "iban": "FI4550009420888888",
 *         "name": "Creditor Name",
 *         "address": {
 *           "country": "FI",
 *           "addressLine": [
 *             "string",
 *             "string"
 *           ]
 *         }
 *       },
 *       "ultimateCreditor": {
 *         "name": "Ultimate Creditor",
 *         "identification": {
 *           "id": "1234567-8",
 *           "schemeName": "BIC",
 *           "issuer": "string"
 *         },
 *         "address": {
 *           "country": "FI",
 *           "addressLine": [
 *             "string",
 *             "string"
 *           ]
 *         }
 *       },
 *       "reference": "00000000000000482738",
 *       "endToEndId": "544652-end2end",
 *       "instructionId": "AtoZatoz01234567898NoLongerThan35",
 *       "instructedAmount": {
 *         "amount": "12.35",
 *         "currency": "EUR"
 *       }
 *     }
 *
 */
export interface OpPaymentRequestDTO {

    /**
     * ^[a-zA-Z0-9]{1,35}$
     *
     * Unique identification, as assigned by the original instructing party for
     * the original instructed party, to unambiguously identify the original
     * instruction. This is used to check for duplicate payments, for example,
     * in cases where the end-user has not received a response from the server.
     * In this case the end user can initiate the same payment with the same
     * instructionId and the server can check if the payment has already been
     * processed based on the value of the instructionId.
     */
    readonly instructionId: string;

    /**
     * Creditor for the payment
     */
    readonly creditor: OpPaymentCreditor;

    /**
     * Debtor for the payment
     */
    readonly debtor: OpPaymentDebtor;

    /**
     *
     */
    readonly instructedAmount: OpPaymentInstructedAmount;

    /**
     * Structured creditor reference, either international RF reference (ISO
     * 11649) or Finnish reference number (viitenumero). Either reference or
     * message should be given for an outgoing payment.
     */
    readonly reference ?: string;

    /**
     * Free form message from debtor to creditor. Either message or reference
     * should be given to an outgoing payment.
     *
     * [ 1 .. 140 ] characters
     */
    readonly message ?: string;

    /**
     * Unique identification, as assigned by the original initiating party, to
     * unambiguously identify the original transaction.
     *
     * ^[0-9A-Za-z-åäöÅÄÖ_=:.,+]{1,35}$
     */
    readonly endToEndId ?: string;

    /**
     * Ultimate debtor for the payment
     */
    readonly ultimateDebtor ?: OpUltimateDebtor;

    /**
     * Ultimate creditor for the payment
     */
    readonly ultimateCreditor ?: OpUltimateCreditor;

}

export function createOpPaymentRequestDTO (
    instructionId: string,
    creditor: OpPaymentCreditor,
    debtor: OpPaymentDebtor,
    instructedAmount: OpPaymentInstructedAmount,
    reference ?: string,
    message ?: string,
    endToEndId ?: string,
    ultimateDebtor ?: OpUltimateDebtor,
    ultimateCreditor ?: OpUltimateCreditor,
) : OpPaymentRequestDTO {
    return {
        instructionId,
        creditor,
        debtor,
        instructedAmount,
        ...(reference !== undefined ? {reference}: {}),
        ...(message !== undefined ? {message}: {}),
        ...(endToEndId !== undefined ? {endToEndId}: {}),
        ...(ultimateDebtor !== undefined ? {ultimateDebtor}: {}),
        ...(ultimateCreditor !== undefined ? {ultimateCreditor}: {}),
    };
}

export function isOpPaymentRequestDTO (value: unknown) : value is OpPaymentRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'instructionId',
            'creditor',
            'debtor',
            'instructedAmount',
            'reference',
            'message',
            'endToEndId',
            'ultimateDebtor',
            'ultimateCreditor',
        ])
        && isString(value?.instructionId)
        && isOpPaymentCreditor(value?.creditor)
        && isOpPaymentDebtor(value?.debtor)
        && isOpPaymentInstructedAmount(value?.instructedAmount)
        && isStringOrUndefined(value?.reference)
        && isStringOrUndefined(value?.message)
        && isStringOrUndefined(value?.endToEndId)
        && isOpUltimateDebtorOrUndefined(value?.ultimateDebtor)
        && isOpUltimateCreditorOrUndefined(value?.ultimateCreditor)
    );
}

export function explainOpPaymentRequestDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'instructionId',
                'creditor',
                'debtor',
                'instructedAmount',
                'reference',
                'message',
                'endToEndId',
                'ultimateDebtor',
                'ultimateCreditor',
            ])
            , explainProperty("instructionId", explainString(value?.instructionId))
            , explainProperty("creditor", explainOpPaymentCreditor(value?.creditor))
            , explainProperty("debtor", explainOpPaymentDebtor(value?.debtor))
            , explainProperty("instructedAmount", explainOpPaymentInstructedAmount(value?.instructedAmount))
            , explainProperty("reference", explainStringOrUndefined(value?.reference))
            , explainProperty("message", explainStringOrUndefined(value?.message))
            , explainProperty("endToEndId", explainStringOrUndefined(value?.endToEndId))
            , explainProperty("ultimateDebtor", explainOpUltimateDebtorOrUndefined(value?.ultimateDebtor))
            , explainProperty("ultimateCreditor", explainOpUltimateCreditorOrUndefined(value?.ultimateCreditor))
        ]
    );
}

export function parseOpPaymentRequestDTO (value: unknown) : OpPaymentRequestDTO | undefined {
    if (isOpPaymentRequestDTO(value)) return value;
    return undefined;
}

export function isOpPaymentRequestDTOOrUndefined (value: unknown): value is OpPaymentRequestDTO | undefined {
    return isUndefined(value) || isOpPaymentRequestDTO(value);
}

export function explainOpPaymentRequestDTOOrUndefined (value: unknown): string {
    return isOpPaymentRequestDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentRequestDTO', 'undefined']));
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../types/String";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainOpPaymentCreditor, isOpPaymentCreditor, OpPaymentCreditor } from "../types/OpPaymentCreditor";
import { explainOpPaymentDebtor, isOpPaymentDebtor, OpPaymentDebtor } from "../types/OpPaymentDebtor";
import { explainOpPaymentInstructedAmount, isOpPaymentInstructedAmount, OpPaymentInstructedAmount } from "../types/OpPaymentInstructedAmount";

/**
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

}

export function createOpPaymentRequestDTO (
    instructionId: string,
    creditor: OpPaymentCreditor,
    debtor: OpPaymentDebtor,
    instructedAmount: OpPaymentInstructedAmount,
    reference ?: string,
    message ?: string,
    endToEndId ?: string,
) : OpPaymentRequestDTO {
    return {
        instructionId,
        creditor,
        debtor,
        instructedAmount,
        reference,
        message,
        endToEndId,
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
        ])
        && isString(value?.instructionId)
        && isOpPaymentCreditor(value?.creditor)
        && isOpPaymentDebtor(value?.debtor)
        && isOpPaymentInstructedAmount(value?.instructedAmount)
        && isStringOrUndefined(value?.reference)
        && isStringOrUndefined(value?.message)
        && isStringOrUndefined(value?.endToEndId)
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
            ])
            , explainProperty("instructionId", explainString(value?.instructionId))
            , explainProperty("creditor", explainOpPaymentCreditor(value?.creditor))
            , explainProperty("debtor", explainOpPaymentDebtor(value?.debtor))
            , explainProperty("instructedAmount", explainOpPaymentInstructedAmount(value?.instructedAmount))
            , explainProperty("reference", explainStringOrUndefined(value?.reference))
            , explainProperty("message", explainStringOrUndefined(value?.message))
            , explainProperty("endToEndId", explainStringOrUndefined(value?.endToEndId))
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

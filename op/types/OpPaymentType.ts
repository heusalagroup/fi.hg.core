// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

export enum OpPaymentType {

    /**
     * SEPA_CREDIT_TRANSFER if the payment was processed as a SEPA payment.
     */
    SEPA_CREDIT_TRANSFER = "SEPA_CREDIT_TRANSFER",

    /**
     * SCT_INST if the payment was processed as a SEPA Instant payment.
     */
    SCT_INST = "SCT_INST",

}

export function isOpPaymentType (value: unknown) : value is OpPaymentType {
    return isEnum(OpPaymentType, value);
}

export function explainOpPaymentType (value : unknown) : string {
    return explainEnum("OpPaymentType", OpPaymentType, isOpPaymentType, value);
}

export function stringifyOpPaymentType (value : OpPaymentType) : string {
    return stringifyEnum(OpPaymentType, value);
}

export function parseOpPaymentType (value: any) : OpPaymentType | undefined {
    return parseEnum(OpPaymentType, value) as OpPaymentType | undefined;
}

export function isOpPaymentTypeOrUndefined (value: unknown): value is OpPaymentType | undefined {
    return isUndefined(value) || isOpPaymentType(value);
}

export function explainOpPaymentTypeOrUndefined (value: unknown): string {
    return isOpPaymentTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpPaymentType', 'undefined']));
}

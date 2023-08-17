// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export enum OpRefundPaymentType {
    SEPA_CREDIT_TRANSFER = "SEPA_CREDIT_TRANSFER",
    SCT_INST = "SCT_INST",
}

export function isOpRefundPaymentType (value: unknown) : value is OpRefundPaymentType {
    return isEnum(OpRefundPaymentType, value);
}

export function explainOpRefundPaymentType (value : unknown) : string {
    return explainEnum("OpRefundPaymentType", OpRefundPaymentType, isOpRefundPaymentType, value);
}

export function stringifyOpRefundPaymentType (value : OpRefundPaymentType) : string {
    return stringifyEnum(OpRefundPaymentType, value);
}

export function parseOpRefundPaymentType (value: any) : OpRefundPaymentType | undefined {
    return parseEnum(OpRefundPaymentType, value, true, true) as OpRefundPaymentType | undefined;
}

export function isOpRefundPaymentTypeOrUndefined (value: unknown): value is OpRefundPaymentType | undefined {
    return isUndefined(value) || isOpRefundPaymentType(value);
}

export function explainOpRefundPaymentTypeOrUndefined (value: unknown): string {
    return isOpRefundPaymentTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpRefundPaymentType', 'undefined']));
}

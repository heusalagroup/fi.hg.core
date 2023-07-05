// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

export enum PaytrailPaymentMethodGroup {
    MOBILE = "mobile",
    BANK = "bank",
    CREDIT_CARD = "creditcard",
    CREDIT = "credit",
}

export function isPaytrailPaymentMethodGroup (value: unknown) : value is PaytrailPaymentMethodGroup {
    return isEnum(PaytrailPaymentMethodGroup, value);
}

export function explainPaytrailPaymentMethodGroup (value : unknown) : string {
    return explainEnum("PaytrailPaymentMethodGroup", PaytrailPaymentMethodGroup, isPaytrailPaymentMethodGroup, value);
}

export function stringifyPaytrailPaymentMethodGroup (value : PaytrailPaymentMethodGroup) : string {
    return stringifyEnum(PaytrailPaymentMethodGroup, value);
}

export function parsePaytrailPaymentMethodGroup (value: any) : PaytrailPaymentMethodGroup | undefined {
    return parseEnum(PaytrailPaymentMethodGroup, value) as PaytrailPaymentMethodGroup | undefined;
}

export function isPaytrailPaymentMethodGroupOrUndefined (value: unknown): value is PaytrailPaymentMethodGroup | undefined {
    return isUndefined(value) || isPaytrailPaymentMethodGroup(value);
}

export function explainPaytrailPaymentMethodGroupOrUndefined (value: unknown): string {
    return isPaytrailPaymentMethodGroupOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailPaymentMethodGroup', 'undefined']));
}

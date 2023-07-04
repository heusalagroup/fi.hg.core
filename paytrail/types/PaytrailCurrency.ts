// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk, explainOr } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";

export enum PaytrailCurrency {
    EUR = "EUR"
}

export function isPaytrailCurrency (value: unknown) : value is PaytrailCurrency {
    return isEnum(PaytrailCurrency, value);
}

export function explainPaytrailCurrency (value : unknown) : string {
    return explainEnum("PaytrailCurrency", PaytrailCurrency, isPaytrailCurrency, value);
}

export function stringifyPaytrailCurrency (value : PaytrailCurrency) : string {
    return stringifyEnum(PaytrailCurrency, value);
}

export function parsePaytrailCurrency (value: any) : PaytrailCurrency | undefined {
    return parseEnum(PaytrailCurrency, value) as PaytrailCurrency | undefined;
}

export function isPaytrailCurrencyOrUndefined (value: unknown): value is PaytrailCurrency | undefined {
    return isUndefined(PaytrailCurrency) || isPaytrailCurrency(value);
}

export function explainPaytrailCurrencyOrUndefined (value: unknown): string {
    return isPaytrailCurrencyOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailCurrency', 'undefined']));
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

export enum PaytrailLanguage {
    FI = "FI",
    SV = "SV",
    EN = "EN",
}

export function isPaytrailLanguage (value: unknown) : value is PaytrailLanguage {
    return isEnum(PaytrailLanguage, value);
}

export function explainPaytrailLanguage (value : unknown) : string {
    return explainEnum("PaytrailLanguage", PaytrailLanguage, isPaytrailLanguage, value);
}

export function stringifyPaytrailLanguage (value : PaytrailLanguage) : string {
    return stringifyEnum(PaytrailLanguage, value);
}

export function parsePaytrailLanguage (value: any) : PaytrailLanguage | undefined {
    return parseEnum(PaytrailLanguage, value) as PaytrailLanguage | undefined;
}

export function isPaytrailLanguageOrUndefined (value: unknown): value is PaytrailLanguage | undefined {
    return isUndefined(PaytrailLanguage) || isPaytrailLanguage(value);
}

export function explainPaytrailLanguageOrUndefined (value: unknown): string {
    return isPaytrailLanguageOrUndefined(value) ? explainOk() : explainNot(explainOr(['PaytrailLanguage', 'undefined']));
}

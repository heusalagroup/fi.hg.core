// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "../../types/Enum";
import { isUndefined } from "../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../types/explain";

export enum TemporalType {
    DATE = "DATE",
    TIME = "TIME",
    TIMESTAMP = "TIMESTAMP"
}

export function isTemporalType (value: unknown) : value is TemporalType {
    return isEnum(TemporalType, value);
}

export function explainTemporalType (value : unknown) : string {
    return explainEnum("TemporalType", TemporalType, isTemporalType, value);
}

export function stringifyTemporalType (value : TemporalType) : string {
    return stringifyEnum(TemporalType, value);
}

export function parseTemporalType (value: any) : TemporalType | undefined {
    return parseEnum(TemporalType, value) as TemporalType | undefined;
}

export function isTemporalTypeOrUndefined (value: unknown): value is TemporalType | undefined {
    return isUndefined(TemporalType) || isTemporalType(value);
}

export function explainTemporalTypeOrUndefined (value: unknown): string {
    return isTemporalTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['TemporalType', 'undefined']));
}

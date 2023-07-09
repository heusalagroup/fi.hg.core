// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum, isEnum, parseEnum, stringifyEnum } from "./Enum";
import { explainNot, explainOk, explainOr } from "./explain";
import { isUndefined } from "./undefined";

export enum Sovereignty {
    DISPUTED_Z = 0,
    UN_MEMBER_STATE = 1,
    FINLAND = 2,
    UNITED_STATES = 3,
    UNITED_KINGDOM = 4,
    ANTARCTIC_TREATY = 5,
    NETHERLANDS = 6,
    NORWAY = 7,
    AUSTRALIA = 8,
    NEW_ZEALAND = 9,
    DENMARK = 10,
    FRANCE = 11,
    DISPUTED_AI = 12,
    BRITISH_CROWN = 13,
    UN_OBSERVER = 14,
    CHINA = 15
}

export function isSovereignty (value: unknown) : value is Sovereignty {
    return isEnum(Sovereignty, value);
}

export function explainSovereignty (value : unknown) : string {
    return explainEnum("Sovereignty", Sovereignty, isSovereignty, value);
}

export function stringifySovereignty (value : Sovereignty) : string {
    return stringifyEnum(Sovereignty, value);
}

export function parseSovereignty (value: any) : Sovereignty | undefined {
    return parseEnum(Sovereignty, value, true, true) as Sovereignty | undefined;
}

export function isSovereigntyOrUndefined (value: unknown): value is Sovereignty | undefined {
    return isUndefined(value) || isSovereignty(value);
}

export function explainSovereigntyOrUndefined (value: unknown): string {
    return isSovereigntyOrUndefined(value) ? explainOk() : explainNot(explainOr(['Sovereignty', 'undefined']));
}

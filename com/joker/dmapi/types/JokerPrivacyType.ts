// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerPrivacyType {
    BASIC = "basic",
    PRO = "pro",
    NONE = "none",
    KEEP = "keep"
}

export function isJokerPrivacyType (value: any): value is JokerPrivacyType {
    switch (value) {
        case JokerPrivacyType.BASIC:
        case JokerPrivacyType.PRO:
        case JokerPrivacyType.NONE:
        case JokerPrivacyType.KEEP:
            return true;
        default:
            return false;
    }
}

export function explainJokerPrivacyType (value: any): string {
    return explainEnum("JokerPrivacyType", JokerPrivacyType, isJokerPrivacyType, value);
}

export function stringifyJokerPrivacyType (value: JokerPrivacyType): string {
    switch (value) {
        case JokerPrivacyType.BASIC  : return 'basic';
        case JokerPrivacyType.PRO  : return 'pro';
        case JokerPrivacyType.NONE  : return 'none';
        case JokerPrivacyType.KEEP  : return 'keep';
    }
    throw new TypeError(`Unsupported JokerPrivacyType value: ${value}`);
}

export function parseJokerPrivacyType (value: any): JokerPrivacyType | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toLowerCase()) {
        case 'basic' : return JokerPrivacyType.BASIC;
        case 'pro'  : return JokerPrivacyType.PRO;
        case 'none' : return JokerPrivacyType.NONE;
        case 'keep' : return JokerPrivacyType.KEEP;
        default     : return undefined;
    }
}

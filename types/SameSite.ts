// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../types/Enum";

export enum SameSite {
    LAX = "LAX",
    NONE = "NONE",
    STRICT = "STRICT"
}

export function isSameSite (value: unknown) : value is SameSite {
    switch (value) {
        case SameSite.LAX:
        case SameSite.NONE:
        case SameSite.STRICT:
            return true;
        default:
            return false;
    }
}

export function explainSameSite (value : unknown) : string {
    return explainEnum("SameSite", SameSite, isSameSite, value);
}

export function stringifySameSite (value : SameSite) : string {
    switch (value) {
        case SameSite.LAX  : return 'LAX';
        case SameSite.NONE  : return 'NONE';
        case SameSite.STRICT  : return 'STRICT';
    }
    throw new TypeError(`Unsupported SameSite value: ${value}`)
}

export function parseSameSite (value: unknown) : SameSite | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'LAX' : return SameSite.LAX;
        case 'NONE' : return SameSite.NONE;
        case 'STRICT' : return SameSite.STRICT;
        default     : return undefined;
    }
}

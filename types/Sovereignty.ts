// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

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

export function isSovereignty (value: any): value is Sovereignty {
    switch (value) {
        case Sovereignty.UN_MEMBER_STATE:
            return true;

        default:
            return false;

    }
}

export function stringifySovereignty (value: Sovereignty): string {
    switch (value) {
        case Sovereignty.UN_MEMBER_STATE  : return "UN member state";
    }
    throw new TypeError(`Unsupported Sovereignty value: ${value}`);
}

export function parseSovereignty (value: any): Sovereignty | undefined {
    switch (`${value}`.toUpperCase().trim()) {

        case 'UN':
        case 'UN MEMBER':
        case 'UN MEMBER STATE':
        case 'UN STATE':
        case 'UN_MEMBER_STATE' : return Sovereignty.UN_MEMBER_STATE;

        default     : return undefined;
    }
}

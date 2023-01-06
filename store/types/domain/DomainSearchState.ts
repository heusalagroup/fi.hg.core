// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../types/Enum";

export enum DomainSearchState {
    SEARCHING    = "SEARCHING",
    TRANSFERABLE = "TRANSFERABLE",
    UNAVAILABLE  = "UNAVAILABLE",
    AVAILABLE    = "AVAILABLE"
}

export function isDomainSearchState (value: any) : value is DomainSearchState {
    switch (value) {
        case DomainSearchState.SEARCHING:
        case DomainSearchState.TRANSFERABLE:
        case DomainSearchState.UNAVAILABLE:
        case DomainSearchState.AVAILABLE:
            return true;
        default:
            return false;
    }
}

export function explainDomainSearchState (value : any) : string {
    return explainEnum("DomainSearchState", DomainSearchState, isDomainSearchState, value);
}

export function stringifyDomainSearchState (value : DomainSearchState) : string {
    switch (value) {
        case DomainSearchState.SEARCHING    : return 'SEARCHING';
        case DomainSearchState.TRANSFERABLE : return 'UNAVAILABLE';
        case DomainSearchState.UNAVAILABLE  : return 'UNAVAILABLE';
        case DomainSearchState.AVAILABLE    : return 'AVAILABLE';
    }
    throw new TypeError(`Unsupported DomainSearchState value: ${value}`)
}

export function parseDomainSearchState (value: any) : DomainSearchState | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'SEARCHING'    : return DomainSearchState.SEARCHING;
        case 'TRANSFERABLE' : return DomainSearchState.TRANSFERABLE;
        case 'UNAVAILABLE'  : return DomainSearchState.UNAVAILABLE;
        case 'AVAILABLE'    : return DomainSearchState.AVAILABLE;
        default             : return undefined;
    }
}

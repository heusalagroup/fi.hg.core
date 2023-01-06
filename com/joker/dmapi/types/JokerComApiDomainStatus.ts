// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiDomainStatus {
    UNAVAILABLE = "unavailable",
    PREMIUM = "premium",
    AVAILABLE = "available"
}

export function isJokerComApiDomainStatus (value: any): value is JokerComApiDomainStatus {
    switch (value) {
        case JokerComApiDomainStatus.UNAVAILABLE:
        case JokerComApiDomainStatus.PREMIUM:
        case JokerComApiDomainStatus.AVAILABLE:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiDomainStatus (value: any): string {
    return explainEnum("JokerComApiDomainStatus", JokerComApiDomainStatus, isJokerComApiDomainStatus, value);
}

export function stringifyJokerComApiDomainStatus (value: JokerComApiDomainStatus): string {
    switch (value) {
        case JokerComApiDomainStatus.UNAVAILABLE  : return 'unavailable';
        case JokerComApiDomainStatus.PREMIUM  : return 'premium';
        case JokerComApiDomainStatus.AVAILABLE  : return 'available';
    }
    throw new TypeError(`Unsupported JokerComApiDomainStatus value: ${value}`);
}

export function parseJokerComApiDomainStatus (value: any): JokerComApiDomainStatus | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toLowerCase()) {
        case 'unavailable' : return JokerComApiDomainStatus.UNAVAILABLE;
        case 'premium' : return JokerComApiDomainStatus.PREMIUM;
        case 'available' : return JokerComApiDomainStatus.AVAILABLE;
        default     : return undefined;
    }
}

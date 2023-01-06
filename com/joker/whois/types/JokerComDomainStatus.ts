// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { trim } from "../../../../functions/trim";
import { explainEnum } from "../../../../types/Enum";

/**
 * Joker.com whois domain status
 *
 * @see https://joker.com/faq/content/85/437/en/check-domain-availability.html
 */
export enum JokerComDomainStatus {

    /**
     * Domain is available
     */
    FREE = "FREE",

    /**
     * Domain is already registered or not available
     */
    REGISTERED = "REGISTERED",

    /**
     * Domain status is unknown (registry down, etc)
     */
    UNKNOWN = "UNKNOWN"

}

export function isJokerComDomainStatus (value: any): value is JokerComDomainStatus {
    switch (value) {
        case JokerComDomainStatus.FREE:
        case JokerComDomainStatus.REGISTERED:
        case JokerComDomainStatus.UNKNOWN:
            return true;
        default:
            return false;
    }
}

export function explainJokerComDomainStatus (value: any): string {
    return explainEnum("JokerDomainStatus", JokerComDomainStatus, isJokerComDomainStatus, value);
}

export function stringifyJokerDomainStatus (value: JokerComDomainStatus): string {
    switch (value) {
        case JokerComDomainStatus.FREE  : return 'FREE';
        case JokerComDomainStatus.REGISTERED  : return 'REGISTERED';
        case JokerComDomainStatus.UNKNOWN  : return 'UNKNOWN';
    }
    throw new TypeError(`Unsupported JokerDomainStatus value: ${value}`);
}

export function parseJokerComDomainStatus (value: any): JokerComDomainStatus | undefined {
    if ( value === undefined ) return undefined;
    switch (trim(`${value}`).toLowerCase()) {
        case 'free' : return JokerComDomainStatus.FREE;
        case 'registered' : return JokerComDomainStatus.REGISTERED;
        case 'unknown' : return JokerComDomainStatus.UNKNOWN;
        default     : return undefined;
    }
}

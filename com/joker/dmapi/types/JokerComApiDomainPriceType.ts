// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiDomainPriceType {
    CREATE   = "create",
    RENEW    = "renew",
    TRANSFER = "transfer",
    RESTORE  = "restore"
}

export function isJokerComApiDomainPriceType (value: any): value is JokerComApiDomainPriceType {
    switch (value) {
        case JokerComApiDomainPriceType.CREATE:
        case JokerComApiDomainPriceType.RENEW:
        case JokerComApiDomainPriceType.TRANSFER:
        case JokerComApiDomainPriceType.RESTORE:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiDomainPriceType (value: any): string {
    return explainEnum("JokerComApiDomainCheckPriceType", JokerComApiDomainPriceType, isJokerComApiDomainPriceType, value);
}

export function stringifyJokerComApiDomainPriceType (value: JokerComApiDomainPriceType): string {
    switch (value) {
        case JokerComApiDomainPriceType.CREATE   : return 'create';
        case JokerComApiDomainPriceType.RENEW    : return 'renew';
        case JokerComApiDomainPriceType.TRANSFER : return 'transfer';
        case JokerComApiDomainPriceType.RESTORE  : return 'restore';
    }
    throw new TypeError(`Unsupported JokerComApiDomainCheckPriceType value: ${value}`);
}

export function parseJokerComApiDomainPriceType (value: any): JokerComApiDomainPriceType | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toLowerCase()) {
        case 'create'   : return JokerComApiDomainPriceType.CREATE;
        case 'renew'    : return JokerComApiDomainPriceType.RENEW;
        case 'transfer' : return JokerComApiDomainPriceType.TRANSFER;
        case 'restore'  : return JokerComApiDomainPriceType.RESTORE;
        default         : return undefined;
    }
}

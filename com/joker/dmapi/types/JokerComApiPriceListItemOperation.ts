// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiPriceListItemOperation {
    CREATE        = "create",
    TRANSFER      = "transfer",
    RENEW         = "renew",
    RGP           = "rgp",
    TRUSTEE       = "trustee",
    PRIVACY_BASIC = "privacy-basic",
    PRIVACY_PRO   = "privacy-pro",
}

export function isJokerComApiPriceListItemOperation (value: any): value is JokerComApiPriceListItemOperation {
    switch (value) {
        case JokerComApiPriceListItemOperation.CREATE:
        case JokerComApiPriceListItemOperation.TRANSFER:
        case JokerComApiPriceListItemOperation.RENEW:
        case JokerComApiPriceListItemOperation.RGP:
        case JokerComApiPriceListItemOperation.TRUSTEE:
        case JokerComApiPriceListItemOperation.PRIVACY_BASIC:
        case JokerComApiPriceListItemOperation.PRIVACY_PRO:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiPriceListItemOperation (value: any): string {
    return explainEnum("JokerComApiPriceListItemOperation", JokerComApiPriceListItemOperation, isJokerComApiPriceListItemOperation, value);
}

export function stringifyJokerComApiPriceListItemOperation (value: JokerComApiPriceListItemOperation): string {
    switch (value) {
        case JokerComApiPriceListItemOperation.CREATE         : return 'create';
        case JokerComApiPriceListItemOperation.TRANSFER       : return 'transfer';
        case JokerComApiPriceListItemOperation.RENEW          : return 'renew';
        case JokerComApiPriceListItemOperation.RGP            : return 'rgp';
        case JokerComApiPriceListItemOperation.TRUSTEE        : return 'trustee';
        case JokerComApiPriceListItemOperation.PRIVACY_BASIC  : return 'privacy-basic';
        case JokerComApiPriceListItemOperation.PRIVACY_PRO    : return 'privacy-pro';
    }
    throw new TypeError(`Unsupported JokerComApiPriceListItemOperation value: ${value}`);
}

export function parseJokerComApiPriceListItemOperation (value: any): JokerComApiPriceListItemOperation | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toLowerCase()) {
        case 'create'        : return JokerComApiPriceListItemOperation.CREATE;
        case 'transfer'      : return JokerComApiPriceListItemOperation.TRANSFER;
        case 'renew'         : return JokerComApiPriceListItemOperation.RENEW;
        case 'rgp'           : return JokerComApiPriceListItemOperation.RGP;
        case 'trustee'       : return JokerComApiPriceListItemOperation.TRUSTEE;
        case 'privacy-basic' : return JokerComApiPriceListItemOperation.PRIVACY_BASIC;
        case 'privacy-pro'   : return JokerComApiPriceListItemOperation.PRIVACY_PRO;
        default              : return undefined;
    }
}

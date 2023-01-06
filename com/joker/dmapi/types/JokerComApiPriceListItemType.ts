// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiPriceListItemType {
    DOMAIN       = "domain",
    DOMAIN_PROMO = "domain_promo"
}

export function isJokerComApiPriceListItemType (value: any): value is JokerComApiPriceListItemType {
    switch (value) {
        case JokerComApiPriceListItemType.DOMAIN:
        case JokerComApiPriceListItemType.DOMAIN_PROMO:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiPriceListItemType (value: any): string {
    return explainEnum("JokerComApiPriceListItemType", JokerComApiPriceListItemType, isJokerComApiPriceListItemType, value);
}

export function stringifyJokerComApiPriceListItemType (value: JokerComApiPriceListItemType): string {
    switch (value) {
        case JokerComApiPriceListItemType.DOMAIN  : return 'domain';
        case JokerComApiPriceListItemType.DOMAIN_PROMO  : return 'domain_promo';
    }
    throw new TypeError(`Unsupported JokerComApiPriceListItemType value: ${value}`);
}

export function parseJokerComApiPriceListItemType (value: any): JokerComApiPriceListItemType | undefined {
    if ( value === undefined ) return undefined;
    switch (`${value}`.toLowerCase()) {
        case 'domain' : return JokerComApiPriceListItemType.DOMAIN;
        case 'domain_promo' : return JokerComApiPriceListItemType.DOMAIN_PROMO;
        default     : return undefined;
    }
}

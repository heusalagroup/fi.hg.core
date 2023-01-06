// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../../types/Enum";

export enum JokerComApiCurrency {
    USD = "USD",
    GBP = "GBP",
    EUR = "EUR"
}

export function isJokerComApiCurrency (value: any) : value is JokerComApiCurrency {
    switch (value) {
        case JokerComApiCurrency.USD:
        case JokerComApiCurrency.GBP:
        case JokerComApiCurrency.EUR:
            return true;
        default:
            return false;
    }
}

export function explainJokerComApiCurrency (value : any) : string {
    return explainEnum("JokerComApiCurrency", JokerComApiCurrency, isJokerComApiCurrency, value);
}

export function stringifyJokerComApiCurrency (value : JokerComApiCurrency) : string {
    switch (value) {
        case JokerComApiCurrency.USD  : return 'USD';
        case JokerComApiCurrency.GBP  : return 'GBP';
        case JokerComApiCurrency.EUR  : return 'EUR';
    }
    throw new TypeError(`Unsupported JokerComApiCurrency value: ${value}`)
}

export function parseJokerComApiCurrency (value: any) : JokerComApiCurrency | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'USD' : return JokerComApiCurrency.USD;
        case 'GBP' : return JokerComApiCurrency.GBP;
        case 'EUR' : return JokerComApiCurrency.EUR;
        default     : return undefined;
    }
}

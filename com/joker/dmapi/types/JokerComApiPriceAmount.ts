// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { trim } from "../../../../functions/trim";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../../../types/Number";

export type JokerComApiPriceAmount = number;

export function isJokerComApiPriceAmount (value : any) : value is JokerComApiPriceAmount {
    return isNumber(value);
}

export function explainJokerComApiPriceAmount (value : any) : string {
    return explainNumber(value);
}

export function isJokerComApiPriceAmountOrUndefined (value : any) : value is JokerComApiPriceAmount {
    return isNumberOrUndefined(value);
}

export function explainJokerComApiPriceAmountOrUndefined (value : any) : string {
    return explainNumberOrUndefined(value);
}

export function parseJokerComApiPriceAmount (value: string): JokerComApiPriceAmount | undefined {
    if ( trim(value) === '' ) return undefined;
    return parseFloat(value);
}

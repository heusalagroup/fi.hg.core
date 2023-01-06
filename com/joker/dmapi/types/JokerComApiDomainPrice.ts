// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainJokerComApiDomainPeriod, isJokerComApiDomainPeriod, JokerComApiDomainPeriod } from "./JokerComApiDomainPeriod";
import { explainJokerComApiCurrency, isJokerComApiCurrency, JokerComApiCurrency } from "./JokerComApiCurrency";
import { explainJokerComApiPriceAmount, isJokerComApiPriceAmount, JokerComApiPriceAmount } from "./JokerComApiPriceAmount";
import { explain, explainProperty } from "../../../../types/explain";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../../../types/Boolean";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface JokerComApiDomainPrice {
    readonly price    : JokerComApiPriceAmount;
    readonly currency : JokerComApiCurrency;
    readonly period   : JokerComApiDomainPeriod;
    readonly isPromo    ?: boolean;
    readonly promoStart ?: string;
    readonly promoEnd   ?: string;
}

export function createJokerComApiDomainPrice (
    price       : JokerComApiPriceAmount,
    currency    : JokerComApiCurrency,
    period      : JokerComApiDomainPeriod,
    isPromo     : boolean | undefined,
    promoStart  : string | undefined,
    promoEnd    : string | undefined
) : JokerComApiDomainPrice {
    return {
        price,
        currency,
        period,
        isPromo,
        promoStart,
        promoEnd
    };
}

export function isJokerComApiDomainPrice (value: any) : value is JokerComApiDomainPrice {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'price',
            'currency',
            'period',
            'isPromo',
            'promoStart',
            'promoEnd'
        ])
        && isJokerComApiPriceAmount(value?.price)
        && isJokerComApiCurrency(value?.currency)
        && isJokerComApiDomainPeriod(value?.period)
        && isBooleanOrUndefined(value?.isPromo)
        && isStringOrUndefined(value?.promoStart)
        && isStringOrUndefined(value?.promoEnd)
    );
}

export function explainJokerComApiDomainPrice (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'price',
                'currency',
                'period',
                'isPromo',
                'promoStart',
                'promoEnd'
            ]),
            explainProperty("price", explainJokerComApiPriceAmount(value?.price)),
            explainProperty("currency", explainJokerComApiCurrency(value?.currency)),
            explainProperty("period", explainJokerComApiDomainPeriod(value?.period)),
            explainProperty("isPromo", explainBooleanOrUndefined(value?.isPromo)),
            explainProperty("promoStart", explainStringOrUndefined(value?.promoStart)),
            explainProperty("promoEnd", explainStringOrUndefined(value?.promoEnd))
        ]
    );
}

export function stringifyJokerComApiDomainPrice (value : JokerComApiDomainPrice) : string {
    return `JokerComApiDomainPrice(${value})`;
}

export function parseJokerComApiDomainPrice (value: any) : JokerComApiDomainPrice | undefined {
    if (isJokerComApiDomainPrice(value)) return value;
    return undefined;
}

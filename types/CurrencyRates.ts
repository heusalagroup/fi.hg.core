// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "./Currency";
import {
    explain,
    explainNoOtherKeys,
    explainNumber,
    explainProperty,
    explainRegularObject,
    hasNoOtherKeys,
    isNumber,
    isRegularObject
} from "../modules/lodash";

export interface CurrencyRates {
    readonly [Currency.USD]: number,
    readonly [Currency.GBP]: number
}

export function createCurrencyRates (
    usd: number,
    gbp: number
): CurrencyRates {
    return {
        [Currency.USD]: usd,
        [Currency.GBP]: gbp
    };
}

export function isCurrencyRates (value: any): value is CurrencyRates {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            Currency.USD,
            Currency.GBP
        ])
        && isNumber(value[Currency.USD])
        && isNumber(value[Currency.GBP])
    );
}

export function explainCurrencyRates (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                Currency.USD,
                Currency.GBP
            ])
            && explainProperty(Currency.USD, explainNumber(value[Currency.USD]))
            && explainProperty(Currency.GBP, explainNumber(value[Currency.GBP]))
        ]
    );
}

export function stringifyCurrencyRates (value: CurrencyRates): string {
    if ( !isCurrencyRates(value) ) throw new TypeError(`Not CurrencyRates: ${value}`);
    return `CurrencyRates(${value})`;
}

export function parseCurrencyRates (value: any): CurrencyRates | undefined {
    if ( isCurrencyRates(value) ) return value;
    return undefined;
}

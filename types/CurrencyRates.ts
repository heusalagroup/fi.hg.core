// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Currency } from "./Currency";
import { explain, explainProperty } from "./explain";
import { explainNumber, isNumber } from "./Number";
import { explainRegularObject, isRegularObject } from "./RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "./OtherKeys";

export interface CurrencyRates {
    readonly [Currency.EUR]: number;
    readonly [Currency.USD]: number;
    readonly [Currency.GBP]: number;
}

export function createCurrencyRates (
    usd: number,
    gbp: number
): CurrencyRates {
    return {
        [Currency.EUR]: 1,
        [Currency.USD]: usd,
        [Currency.GBP]: gbp
    };
}

export function isCurrencyRates (value: any): value is CurrencyRates {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            Currency.EUR,
            Currency.USD,
            Currency.GBP
        ])
        && isNumber(value[Currency.EUR])
        && isNumber(value[Currency.USD])
        && isNumber(value[Currency.GBP])
    );
}

export function explainCurrencyRates (value: any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                Currency.EUR,
                Currency.USD,
                Currency.GBP
            ]),
            explainProperty(Currency.EUR, explainNumber(value[Currency.EUR])),
            explainProperty(Currency.USD, explainNumber(value[Currency.USD])),
            explainProperty(Currency.GBP, explainNumber(value[Currency.GBP]))
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

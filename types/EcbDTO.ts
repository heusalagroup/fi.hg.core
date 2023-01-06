// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CurrencyRates, explainCurrencyRates, isCurrencyRates } from "./CurrencyRates";
import { Currency } from "./Currency";
import { explain, explainProperty } from "./explain";
import { explainRegularObject, isRegularObject } from "./RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "./OtherKeys";

/**
 * ECB backend's DTO containing euro exchange rates
 * @see https://github.com/heusalagroup/ecb.hg.fi
 */
export interface EcbDTO {
    readonly [Currency.EUR] : CurrencyRates;
}

export function createEcbDTO (
    eurRates: CurrencyRates
) : EcbDTO {
    return {
        [Currency.EUR]: eurRates
    };
}

export function isEcbDTO (value: any) : value is EcbDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            Currency.EUR
        ])
        && isCurrencyRates(value[Currency.EUR])
    );
}

export function explainEcbDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                Currency.EUR
            ]),
            explainProperty(Currency.EUR, explainCurrencyRates(value[Currency.EUR]))
        ]
    );
}

export function stringifyEcbDTO (value : EcbDTO) : string {
    return `EcbDTO(${value})`;
}

export function parseEcbDTO (value: any) : EcbDTO | undefined {
    if (isEcbDTO(value)) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CurrencyRates, explainCurrencyRates, isCurrencyRates } from "./CurrencyRates";
import {
    explain,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    hasNoOtherKeys,
    isRegularObject
} from "../modules/lodash";

/**
 * ECB backend's DTO containing euro exchange rates
 * @see https://github.com/heusalagroup/ecb.hg.fi
 */
export interface EcbDTO {
    readonly euroRates : CurrencyRates;
}

export function createEcbDTO (
    euroRates: CurrencyRates
) : EcbDTO {
    return {
        euroRates
    };
}

export function isEcbDTO (value: any) : value is EcbDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'euroRates'
        ])
        && isCurrencyRates(value?.euroRates)
    );
}

export function explainEcbDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'euroRates'
            ]),
            explainProperty("euroRates", explainCurrencyRates(value?.euroRates))
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

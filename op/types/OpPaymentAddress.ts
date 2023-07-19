// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { CountryCode, explainCountryCode, isCountryCode } from "../../types/CountryCode";
import { explainStringArray, isStringArray } from "../../types/StringArray";

/**
 * @example
 *   {
 *       "addressLine":["a1","a2"],
 *       "country":"FI"
 *   }
 */
export interface OpAddress {
    readonly country     : CountryCode;
    readonly addressLine : readonly string[];
}

export function createOpAddress (
    country     : CountryCode,
    addressLine : readonly string[],
) : OpAddress {
    return {
        country,
        addressLine
    };
}

export function isOpAddress (value: unknown) : value is OpAddress {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'country',
            'addressLine',
        ])
        && isCountryCode(value?.country)
        && isStringArray(value?.addressLine)
    );
}

export function explainOpAddress (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'country',
                'addressLine',
            ])
            , explainProperty("country", explainCountryCode(value?.country))
            , explainProperty("addressLine", explainStringArray(value?.addressLine))
        ]
    );
}

export function parseOpAddress (value: unknown) : OpAddress | undefined {
    if (isOpAddress(value)) return value;
    return undefined;
}

export function isOpAddressOrUndefined (value: unknown): value is OpAddress | undefined {
    return isUndefined(value) || isOpAddress(value);
}

export function explainOpAddressOrUndefined (value: unknown): string {
    return isOpAddressOrUndefined(value) ? explainOk() : explainNot(explainOr(['OpAddress', 'undefined']));
}

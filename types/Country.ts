// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CountryCode } from "./CountryCode";
import { explainSovereignty, isSovereignty, Sovereignty } from "./Sovereignty";
import { explainString, isString } from "./String";
import { explainRegularObject, isRegularObject } from "./RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "./OtherKeys";
import { explainNumber, isNumber } from "./Number";
import { isUndefined } from "./undefined";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "./explain";
import { isStringArray } from "./StringArray";

export interface Country {
    readonly sovereignty  : Sovereignty;
    readonly iso2         : CountryCode | string;
    readonly iso3         : string;
    readonly num          : number;
    readonly subdivision  : string;
    readonly tld          : string | string[];
}

export function createCountry (
    iso2        : CountryCode,
    sovereignty : Sovereignty,
    iso3        : string,
    num         : number,
    subdivision : string,
    tld         : string | string[]
) : Country {
    return {
        sovereignty,
        iso2,
        iso3,
        num,
        subdivision,
        tld
    };
}

export function isCountry (value: any): value is Country {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'sovereignty',
            'iso2',
            'iso3',
            'num',
            'subdivision',
            'tld',
        ])
        && isSovereignty(value?.sovereignty)
        && isString(value?.iso2)
        && isString(value?.iso3)
        && isNumber(value?.num)
        && isString(value?.subdivision)
        && (isString(value?.tld) || isStringArray(value?.tld))
    );
}

export function parseCountry (value: any): Country | undefined {
    if ( isCountry(value) ) return value;
    return undefined;
}

export function explainCountry (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'sovereignty',
                'iso2',
                'iso3',
                'num',
                'subdivision',
                'tld',
            ])
            , explainProperty("sovereignty", explainSovereignty(value?.sovereignty))
            , explainProperty("iso2", explainString(value?.iso2))
            , explainProperty("iso3", explainString(value?.iso3))
            , explainProperty("num", explainNumber(value?.num))
            , explainProperty("subdivision", explainString(value?.subdivision))
            , explainProperty("tld", isString(value?.tld) || isStringArray(value?.tld) ? explainOk() : explainNot('string or string[]') )
        ]
    );
}
export function isCountryOrUndefined (value: unknown): value is Country | undefined {
    return isUndefined(value) || isCountry(value);
}

export function explainCountryOrUndefined (value: unknown): string {
    return isCountryOrUndefined(value) ? explainOk() : explainNot(explainOr(['Country', 'undefined']));
}

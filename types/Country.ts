// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CountryCode } from "./CountryCode";
import { Sovereignty } from "./Sovereignty";
import { isString } from "./String";
import { isRegularObject } from "./RegularObject";
import { hasNoOtherKeys } from "./OtherKeys";

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
        && hasNoOtherKeys(value, [

        ])
        && isString(value?.foo)
    );
}

export function stringifyCountry (value: Country): string {
    return `Country(${value})`;
}

export function parseCountry (value: any): Country | undefined {
    if ( isCountry(value) ) return value;
    return undefined;
}

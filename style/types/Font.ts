// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface Font {
    readonly name   : string;
    readonly family : string;
    readonly weight : string;
}

export function createFont (
    name   : string,
    family : string,
    weight : string
): Font {
    return {
        name,
        family,
        weight
    };
}

export function isFont (value: any): value is Font {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name',
            'family',
            'weight'
        ])
        && isString(value?.name)
        && isString(value?.family)
        && isString(value?.weight)
    );
}

export function stringifyFont (value: Font): string {
    return `Font(${value})`;
}

export function parseFont (value: any): Font | undefined {
    if ( isFont(value) ) return value;
    return undefined;
}

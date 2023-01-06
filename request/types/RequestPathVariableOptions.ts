// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../types/Boolean";
import { isStringOrUndefined } from "../../types/String";

export interface RequestPathVariableOptions {

    readonly required      ?: boolean;
    readonly defaultValue  ?: string | undefined;
    readonly decodeValue   ?: boolean;

}

export function isRequestPathVariableOptions(value: any): value is RequestPathVariableOptions {

    return (
        !!value
        && isBooleanOrUndefined(value?.required)
        && isStringOrUndefined(value?.defaultValue)
        && isBooleanOrUndefined(value?.decodeValue)
    );

}

export function isRequestPathVariableOptionsOrUndefined (value: any): value is RequestPathVariableOptions {
    return value === undefined || isRequestPathVariableOptions(value);
}



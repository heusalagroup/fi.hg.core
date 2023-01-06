// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {isBoolean} from "../../types/Boolean";
import { isString } from "../../types/String";

export interface RequestHeaderOptions {

    required?: boolean;
    defaultValue?: string | undefined;

}

export function isRequestHeaderOptions(value: any): value is RequestHeaderOptions {

    return (
        !!value
        && (value?.required === undefined || isBoolean(value?.required))
        && (value?.defaultValue === undefined || isString(value?.defaultValue))
    );

}

export function isRequestHeaderOptionsOrUndefined (value: any): value is (RequestHeaderOptions|undefined) {
    return value === undefined || isRequestHeaderOptions(value);
}



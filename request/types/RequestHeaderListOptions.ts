// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { DefaultHeaderMapValuesType, isDefaultHeaderMapValuesType} from "./DefaultHeaderMapValuesType";

export interface RequestHeaderListOptions {

    defaultValues?: DefaultHeaderMapValuesType;

}

export function isRequestHeaderListOptions (value : any) : value is RequestHeaderListOptions {

    return (
        !!value
        && (
            value?.defaultValues === undefined
            || isDefaultHeaderMapValuesType(value?.defaultValues)
        )
    );

}



// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod, isRequestMethod} from "./RequestMethod";
import { isString } from "../../types/String";
import { isArrayOf } from "../../types/Array";

export type RequestMappingValue = RequestMethod|string;

export function isRequestMappingValue (value : any) : value is RequestMappingValue {
    return isString(value) || isRequestMethod(value);
}

export function isRequestMappingValueArray (value : any) : value is RequestMappingValue[] {
    return isArrayOf<RequestMappingValue>(value, isRequestMappingValue);
}

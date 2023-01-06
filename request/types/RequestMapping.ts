// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod, isRequestMethod} from "./RequestMethod";
import { isString } from "../../types/String";
import { isArrayOf } from "../../types/Array";

export type RequestMapping = RequestMethod|string;

export function isRequestMapping (value : any) : value is RequestMapping {
    return isString(value) || isRequestMethod(value);
}

export function isRequestMappingArray (value : any) : value is RequestMapping[] {
    return isArrayOf<RequestMapping>(value, isRequestMapping);
}

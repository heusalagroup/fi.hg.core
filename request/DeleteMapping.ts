// Copyright (c) 2022-2023 Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestMappingValue } from "./types/RequestMappingValue";
import { RequestMapping } from "./RequestMapping";
import { RequestMethod } from "./types/RequestMethod";

export function DeleteMapping (...config: readonly RequestMappingValue[]) {
    return RequestMapping( RequestMethod.DELETE, ...config );
}
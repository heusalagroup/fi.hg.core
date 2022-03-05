// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { ServletRequest } from "./ServletRequest";
import { ServletResponse } from "./ServletResponse";
import { FilterChain } from "./FilterChain";

export interface Filter {

    doFilter (request : ServletRequest, response : ServletResponse, chain : FilterChain) : Promise<void>;

}



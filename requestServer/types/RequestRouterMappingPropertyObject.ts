// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "../../request/types/RequestMethod";
import { RequestParamObject } from "../../request/types/RequestParamObject";

export interface RequestRouterMappingPropertyObject {
    readonly requestBodyRequired  : boolean;
    readonly synchronized         : boolean;
    readonly methods              : readonly RequestMethod[];
    readonly controller           : any;
    readonly propertyName         : string;
    readonly propertyParams       : readonly (RequestParamObject | null)[];
}

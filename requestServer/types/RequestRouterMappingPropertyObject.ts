// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "../../request/types/RequestMethod";
import { RequestParamObject } from "../../request/types/RequestParamObject";

export interface RequestRouterMappingPropertyObject {

    readonly requestBodyRequired  : boolean;
    readonly methods              : Array<RequestMethod>;
    readonly controller           : any;
    readonly propertyName         : string;
    readonly propertyParams       : Array<RequestParamObject | null>;

}

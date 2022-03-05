// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod, isRequestMethod} from "./RequestMethod";
import {isArray, isString, every} from "../../modules/lodash";

export type RequestMappingArray = Array<RequestMethod|string>;

export function isRequestMappingArray (value : any) : value is RequestMappingArray {

    return isArray(value) && every(value, (item : any) : boolean => isString(item) || isRequestMethod(item) );

}



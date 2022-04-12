// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod, isRequestMethod} from "./RequestMethod";
import { RequestInterfaceUtils } from "../RequestInterfaceUtils";
import {every, isArray, isString} from "../../modules/lodash";

export interface RequestMappingObject {

    readonly methods  : RequestMethod[];
    readonly paths    : string[];

}

export function isRequestMappingObject (value: any) : value is RequestMappingObject {
    return (
        RequestInterfaceUtils.isObject(value)
        && RequestInterfaceUtils.hasPropertyMethods(value) && isArray(value.methods) && every(value.methods, isRequestMethod)
        && RequestInterfaceUtils.hasPropertyPaths(value)   && isArray(value.paths) && every(value.paths, isString)
    );
}



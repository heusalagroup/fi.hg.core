// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMappingObject, isRequestMappingObject } from "./RequestMappingObject";
import { isRequestParamObject, RequestParamObject } from "./RequestParamObject";
import { RequestInterfaceUtils } from "../utils/RequestInterfaceUtils";
import { filter } from "../../functions/filter";
import { isNull } from "../../types/Null";
import { map } from "../../functions/map";
import { OpenAPIV3 } from "../../types/openapi";
import { isArray, isArrayOf } from "../../types/Array";
import { every } from "../../functions/every";
import { isStringArray } from "../../types/StringArray";
import { isBoolean } from "../../types/Boolean";

export interface RequestControllerMethodObject {
    requestBodyRequired ?: boolean,
    mappings             : readonly RequestMappingObject[];
    params               : readonly (RequestParamObject | null)[];

    /** If any defined, this method is a model attribute builder for these model names */
    modelAttributes      : readonly string[];

    /**
     * If `true` this indicates the request server should synchronize every
     * asynchronous operation to happen only one at the time
     */
    synchronized         : boolean;

    /**
     * OpenAPI v3 operation annotations
     */
    operations          ?: readonly Partial<OpenAPIV3.OperationObject>[];

}

export function isRequestControllerMethodObject(value: any): value is RequestControllerMethodObject {
    return (
        RequestInterfaceUtils.isObject(value)
        && RequestInterfaceUtils.hasPropertyMappings(value) && isArrayOf<RequestMappingObject>(value.mappings, isRequestMappingObject)
        && RequestInterfaceUtils.hasPropertyParams(value) && isArrayOf(value.params, RequestInterfaceUtils.createOrFunction(isRequestParamObject, isNull))
        && RequestInterfaceUtils.hasPropertyModelAttributes(value) && isStringArray(value?.modelAttributes)
        && RequestInterfaceUtils.hasPropertySynchronized(value) && isBoolean(value?.synchronized)
    );
}

export function explainRequestControllerMethodObject(value: any): string {

    if (!RequestInterfaceUtils.isObject(value)) return "Value is not object";

    if (!RequestInterfaceUtils.hasPropertyMappings(value)) {
        return `Property "mappings" did not exist`;
    }

    if (!isArray(value.mappings)) {
        return `Property "mappings" was not an array`;
    }

    if (!every(value.mappings, isRequestMappingObject)) {
        return `Property "mappings" had some elements which were not RequestMappingObject`;
    }


    if (!RequestInterfaceUtils.hasPropertyParams(value)) {
        return `Property "params" did not exist`;
    }
    if (!isArray(value.params)) {
        return `Property "params" was not an array`;
    }
    const test = RequestInterfaceUtils.createOrFunction(isRequestParamObject, isNull);
    if (!every(value.params, test)) {
        return `Property "params" had some elements which were not RequestParamObject or null: ${
            filter(map(value.params, (item, index) => {
                if (!test(item)) {
                    return `Item #${index} was not null or RequestParamObject`;
                }
                return "";
            }), item => !!item).join(', ')
        }`;
    }

    if (!RequestInterfaceUtils.hasPropertyModelAttributes(value)) {
        return `Property "modelAttributes" did not exist`;
    }
    if (!isStringArray(value.modelAttributes)) {
        return `Property "modelAttributes" was not an string array`;
    }

    if (!RequestInterfaceUtils.hasPropertySynchronized(value)) {
        return `Property "synchronized" did not exist`;
    }
    if (!isBoolean(value.synchronized)) {
        return `Property "synchronized" was not a boolean`;
    }

    return "ok";

}

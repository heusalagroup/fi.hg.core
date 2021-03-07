// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMappingObject, {isRequestMappingObject} from "./RequestMappingObject";
import {isRequestParamObject, RequestParamObject} from "./RequestParamObject";
import InterfaceUtils from "../RequestInterfaceUtils";
import {every, filter, isArray, isNull, map} from "../../modules/lodash";

export interface RequestControllerMethodObject {

    requestBodyRequired ?: boolean,
    mappings             : Array<RequestMappingObject>;
    params               : Array<RequestParamObject | null>;

}

export function isRequestControllerMethodObject(value: any): value is RequestControllerMethodObject {
    return (
        InterfaceUtils.isObject(value)
        && InterfaceUtils.hasPropertyMappings(value) && isArray(value.mappings) && every(value.mappings, isRequestMappingObject)
        && InterfaceUtils.hasPropertyParams(value) && isArray(value.params) && every(value.params, InterfaceUtils.createOrFunction(isRequestParamObject, isNull))
    );
}

export function explainRequestControllerMethodObject(value: any): string {

    if (!InterfaceUtils.isObject(value)) return "Value is not object";

    if (!InterfaceUtils.hasPropertyMappings(value)) {
        return `Property "mappings" did not exist`;
    }

    if (!isArray(value.mappings)) {
        return `Property "mappings" was not an array`;
    }

    if (!every(value.mappings, isRequestMappingObject)) {
        return `Property "mappings" had some elements which were not RequestMappingObject`;
    }


    if (!InterfaceUtils.hasPropertyParams(value)) {
        return `Property "params" did not exist`;
    }

    if (!isArray(value.params)) {
        return `Property "params" was not an array`;
    }

    const test = InterfaceUtils.createOrFunction(isRequestParamObject, isNull);
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

    return "ok";

}
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMappingObject, {isRequestMappingObject} from "./RequestMappingObject";
import InterfaceUtils from "../RequestInterfaceUtils";
import {every, isArray, isObject} from "../../modules/lodash";
import {
    explainRequestControllerMethodObject,
    isRequestControllerMethodObject,
    RequestControllerMethodObject
} from "./RequestControllerMethodObject";

export interface RequestControllerMappingObject {

    mappings              : Array<RequestMappingObject>;
    controller           ?: any;
    controllerProperties  : { [key: string]: RequestControllerMethodObject };

}

export function isRequestControllerMappingObject (value: any) : value is RequestControllerMappingObject {
    return (
        InterfaceUtils.isObject(value)
        && InterfaceUtils.hasPropertyMappings(value) && isArray(value.mappings) && every(value.mappings, isRequestMappingObject)
        && InterfaceUtils.hasPropertyControllerProperties(value) && isObject(value.controllerProperties) && InterfaceUtils.everyPropertyIs<RequestControllerMethodObject>(value.controllerProperties, isRequestControllerMethodObject)
    );
}

export function explainRequestControllerMappingObject (value: any) : string {

    if (!InterfaceUtils.isObject(value)) return "not object";


    if (!InterfaceUtils.hasPropertyMappings(value)) {
        return `Property "mappings" was not valid: Did not exist`;
    }

    if (!isArray(value.mappings)) {
        return `Property "mappings" was not valid: Was not array`;
    }

    if (!every(value.mappings, isRequestMappingObject)) {
        return `Property "mappings" was not valid: Some items were not valid`;
    }


    if (!InterfaceUtils.hasPropertyControllerProperties(value)) {
        return `Property "controllerProperties" was not valid: Property did not exist`;
    }

    if (!isObject(value.controllerProperties)) {
        return `Property "controllerProperties" was not valid: Property was not object`;
    }

    if (!InterfaceUtils.everyPropertyIs<RequestControllerMethodObject>(value.controllerProperties, isRequestControllerMethodObject)) {
        return `Property "controllerProperties" was not valid: Some properties were not valid: ${ InterfaceUtils.explainEveryPropertyIs<RequestControllerMethodObject>(value.controllerProperties, isRequestControllerMethodObject, explainRequestControllerMethodObject) }`;
    }

    return "ok";

}

export default RequestControllerMappingObject;

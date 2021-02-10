import RequestMappingObject, {isRequestMappingObject} from "./RequestMappingObject";
import InterfaceUtils from "../RequestInterfaceUtils";
import {every, isArray, isObject, isString, isNull, keys, map, filter} from "../../modules/lodash";
import RequestParamType, {isRequestParamType} from "./RequestParamType";

export interface RequestParamObject {

    queryParam : string;
    type       : RequestParamType;

}

export function isRequestParamObject (value: any) : value is RequestParamObject {
    return (
        InterfaceUtils.isObject(value)
        && InterfaceUtils.hasPropertyQueryParam(value) && isString(value.queryParam)
        && InterfaceUtils.hasPropertyType(value)       && isRequestParamType(value.type)
    );
}

export interface RequestControllerMethodObject {

    mappings : Array<RequestMappingObject>;
    params   : Array<RequestParamObject|null>;

}

export function isRequestControllerMethodObject (value: any) : value is RequestControllerMethodObject {
    return (
        InterfaceUtils.isObject(value)
        && InterfaceUtils.hasPropertyMappings(value) && isArray(value.mappings) && every(value.mappings, isRequestMappingObject)
        && InterfaceUtils.hasPropertyParams(value)   && isArray(value.params) && every(value.params, InterfaceUtils.createOrFunction(isRequestParamObject, isNull))
    );
}

export function explainRequestControllerMethodObject (value: any) : string {

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

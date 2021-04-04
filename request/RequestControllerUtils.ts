// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestController, {
    getInternalRequestMappingObject, isRequestController,
    setInternalRequestMappingObject
} from "./types/RequestController";
import RequestMappingObject from "./types/RequestMappingObject";
import RequestMappingArray from "./types/RequestMappingArray";
import {isRequestMethod} from "./types/RequestMethod";
import {concat, filter, has, isFunction, isObject, isString} from "../modules/lodash";
import RequestControllerMappingObject from "./types/RequestControllerMappingObject";
import RequestParamValueType from "./types/RequestParamValueType";
import RequestParamObject from "./types/RequestParamObject";
import RequestBodyParamObject from "./types/RequestBodyParamObject";
import RequestHeaderParamObject from "./types/RequestHeaderParamObject";
import RequestQueryParamObject from "./types/RequestQueryParamObject";
import RequestHeaderMapParamObject from "./types/RequestHeaderMapParamObject";
import RequestParamObjectType from "./types/RequestParamObjectType";
import RequestPathVariableParamObject from "./types/RequestPathVariableParamObject";
import RequestPathVariableMapParamObject from "./types/RequestPathVariableMapParamObject";
import DefaultHeaderMapValuesType from "./types/DefaultHeaderMapValuesType";
import DefaultPathVariableMapValuesType from "./types/DefaultPathVariableMapValuesType";

export class RequestControllerUtils {

    static parseRequestMappings (value : RequestMappingArray) : RequestMappingObject {

        return {
            methods : filter(value, isRequestMethod),
            paths   : filter(value, isString)
        };

    }

    static attachControllerMapping (
        controller : RequestController,
        config     : RequestMappingArray
    ) {

        const parsedObject = RequestControllerUtils.parseRequestMappings(config);

        // LOG.debug('attachControllerMapping: controller = ', controller);
        // LOG.debug('attachControllerMapping: parsedObject = ', parsedObject);

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        // LOG.debug('attachControllerMapping: origMapping = ', origMapping);

        if (origMapping === undefined) {

            setInternalRequestMappingObject(controller, {
                mappings: [parsedObject],
                controllerProperties: {}
            });

        } else {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                mappings: concat([], origMapping.mappings, [parsedObject])
            });

        }

    }

    static attachControllerMethodMapping (
        controller  : RequestController,
        config      : RequestMappingArray,
        propertyKey : string
    ) {

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        const parsedObject : RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);

        if (origMapping === undefined) {

            setInternalRequestMappingObject(controller, {
                mappings: [],
                controllerProperties: {
                    [propertyKey] : {
                        mappings : [parsedObject],
                        params   : []
                    }
                }
            });

        } else if (!has(origMapping.controllerProperties, propertyKey)) {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        mappings : [parsedObject],
                        params   : []
                    }
                }
            });

        } else {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        ...origMapping.controllerProperties[propertyKey],
                        mappings: concat([parsedObject], origMapping.controllerProperties[propertyKey].mappings)
                    }
                }
            });

        }

    }

    private static _setControllerMethodParam (
        controller          : RequestController,
        propertyKey         : string,
        paramIndex          : number,
        newParam            : RequestParamObject,
        requestBodyRequired : boolean             = false
    ) {

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        if (origMapping === undefined) {

            const params : Array<RequestParamObject|null> = RequestControllerUtils._initializeParams(paramIndex, newParam);

            if (requestBodyRequired) {

                setInternalRequestMappingObject(controller, {
                    mappings: [],
                    controllerProperties: {
                        [propertyKey] : {
                            requestBodyRequired : true,
                            mappings            : [],
                            params              : params
                        }
                    }
                });

            } else {

                setInternalRequestMappingObject(controller, {
                    mappings: [],
                    controllerProperties: {
                        [propertyKey] : {
                            mappings : [],
                            params   : params
                        }
                    }
                });

            }

        } else if (!has(origMapping.controllerProperties, propertyKey)) {

            const params : Array<RequestParamObject|null> = RequestControllerUtils._initializeParams(paramIndex, newParam);

            if (requestBodyRequired) {

                setInternalRequestMappingObject(controller, {
                    ...origMapping,
                    controllerProperties: {
                        ...origMapping.controllerProperties,
                        [propertyKey] : {
                            requestBodyRequired: true,
                            mappings : [],
                            params   : params
                        }
                    }
                });

            } else {

                setInternalRequestMappingObject(controller, {
                    ...origMapping,
                    controllerProperties: {
                        ...origMapping.controllerProperties,
                        [propertyKey]: {
                            mappings: [],
                            params: params
                        }
                    }
                });

            }

        } else {

            const params : Array<RequestParamObject|null> = RequestControllerUtils._reinitializeParams(origMapping, propertyKey, paramIndex, newParam);

            if (requestBodyRequired) {

                setInternalRequestMappingObject(controller, {
                    ...origMapping,
                    controllerProperties: {
                        ...origMapping.controllerProperties,
                        [propertyKey]: {
                            ...origMapping.controllerProperties[propertyKey],
                            requestBodyRequired: true,
                            params: params
                        }
                    }
                });

            } else {

                setInternalRequestMappingObject(controller, {
                    ...origMapping,
                    controllerProperties: {
                        ...origMapping.controllerProperties,
                        [propertyKey] : {
                            ...origMapping.controllerProperties[propertyKey],
                            params: params
                        }
                    }
                });

            }

        }

    }

    static findController (target : any) : RequestController | undefined {

        if ( isFunction(target) && isRequestController(target) ) {
            return target;
        }

        if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) ) {
            return target.constructor;
        }

        return undefined;

    }

    static setControllerMethodQueryParam (
        controller  : RequestController,
        propertyKey : string,
        paramIndex  : number,
        queryParam  : string,
        paramType   : RequestParamValueType
    ) {

        // LOG.debug('setControllerMethodQueryParam: queryParam =', queryParam, paramType);

        const newParam : RequestQueryParamObject = {
            objectType : RequestParamObjectType.QUERY_PARAM,
            queryParam : queryParam,
            valueType  : paramType
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }

    static setControllerMethodHeader (
        controller   : RequestController,
        propertyKey  : string,
        paramIndex   : number,
        headerName   : string,
        paramType    : RequestParamValueType,
        isRequired   : boolean | undefined,
        defaultValue : string | undefined
    ) {

        const newParam : RequestHeaderParamObject = {
            objectType   : RequestParamObjectType.REQUEST_HEADER,
            headerName   : headerName,
            valueType    : paramType,
            isRequired   : isRequired ?? false,
            defaultValue : defaultValue
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }

    static setControllerMethodPathVariable (
        controller   : RequestController,
        propertyKey  : string,
        paramIndex   : number,
        variableName : string,
        paramType    : RequestParamValueType,
        isRequired   : boolean | undefined,
        defaultValue : string | undefined
    ) {

        const newParam : RequestPathVariableParamObject = {
            objectType   : RequestParamObjectType.PATH_VARIABLE,
            variableName : variableName,
            valueType    : paramType,
            isRequired   : isRequired ?? true,
            defaultValue : defaultValue
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }

    static setControllerMethodPathVariableMap (
        controller    : RequestController,
        propertyKey   : string,
        paramIndex    : number,
        defaultValues : DefaultPathVariableMapValuesType | undefined
    ) {

        const newParam : RequestPathVariableMapParamObject = {
            objectType    : RequestParamObjectType.PATH_VARIABLE_MAP,
            defaultValues : defaultValues
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }


    static setControllerMethodHeaderMap (
        controller    : RequestController,
        propertyKey   : string,
        paramIndex    : number,
        defaultValues : DefaultHeaderMapValuesType | undefined
    ) {

        const newParam : RequestHeaderMapParamObject = {
            objectType    : RequestParamObjectType.REQUEST_HEADER_MAP,
            defaultValues : defaultValues
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }

    static setControllerMethodBodyParam (
        controller  : RequestController,
        propertyKey : string,
        paramIndex  : number,
        paramType   : RequestParamValueType
    ) {

        const newParam : RequestBodyParamObject = {
            objectType : RequestParamObjectType.REQUEST_BODY,
            valueType  : paramType
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam, true);

    }

    private static _initializeParams (
        paramIndex  : number,
        newParam    : RequestParamObject
    ) : Array<RequestParamObject|null> {

        let params : Array<RequestParamObject|null> = [];

        while (paramIndex >= params.length) {
            params.push(null);
        }

        params[paramIndex] = newParam;

        return params;

    }

    private static _reinitializeParams (
        origMapping : RequestControllerMappingObject,
        propertyKey : string,
        paramIndex  : number,
        newParam    : RequestParamObject
    ) : Array<RequestParamObject|null> {

        let params : Array<RequestParamObject|null> = concat([], origMapping.controllerProperties[propertyKey].params);

        while (paramIndex >= params.length) {
            params.push(null);
        }

        params[paramIndex] = newParam;

        return params;

    }

}

export default RequestControllerUtils;

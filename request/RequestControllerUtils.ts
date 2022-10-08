// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
    RequestController,
    getInternalRequestMappingObject, isRequestController,
    setInternalRequestMappingObject
} from "./types/RequestController";
import { RequestMappingObject } from "./types/RequestMappingObject";
import { RequestMappingArray } from "./types/RequestMappingArray";
import { isRequestMethod} from "./types/RequestMethod";
import { concat, filter, has, isFunction, isObject, isString} from "../modules/lodash";
import { RequestControllerMappingObject } from "./types/RequestControllerMappingObject";
import { RequestParamValueType } from "./types/RequestParamValueType";
import { RequestParamObject } from "./types/RequestParamObject";
import { RequestBodyParamObject } from "./types/RequestBodyParamObject";
import { RequestHeaderParamObject } from "./types/RequestHeaderParamObject";
import { RequestQueryParamObject } from "./types/RequestQueryParamObject";
import { RequestHeaderMapParamObject } from "./types/RequestHeaderMapParamObject";
import { RequestParamObjectType } from "./types/RequestParamObjectType";
import { RequestPathVariableParamObject } from "./types/RequestPathVariableParamObject";
import { RequestPathVariableMapParamObject } from "./types/RequestPathVariableMapParamObject";
import { DefaultHeaderMapValuesType } from "./types/DefaultHeaderMapValuesType";
import { DefaultPathVariableMapValuesType } from "./types/DefaultPathVariableMapValuesType";
import { RequestModelAttributeParamObject } from "./types/RequestModelAttributeParamObject";
import { LogService } from "../LogService";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger('RequestControllerUtils');

export class RequestControllerUtils {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    /**
     * Filters items by type to separate properties in the return object
     *
     * @param value Array of paths (string) or methods (RequestMethod e.g. numbers)
     * @returns RequestMappingObject with methods and paths separated
     */
    static parseRequestMappings (value : RequestMappingArray) : RequestMappingObject {

        return {
            methods : filter(value, isRequestMethod),
            paths   : filter(value, isString)
        };

    }

    /**
     * Attach request mapping configuration into a controller directly.
     *
     * @param controller A controller. Usually an instance of class or the class itself (when static)
     * @param config The request mapping configuration
     */
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

    /**
     * Attach request mapping configuration for a method into a controller directly.
     *
     * @param controller A controller. Usually an instance of class or the class itself (when static)
     * @param config The request mapping configuration
     * @param propertyKey The name of the method
     */
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
                        mappings        : [parsedObject],
                        params          : [],
                        modelAttributes : []
                    }
                }
            });

        } else if (!has(origMapping.controllerProperties, propertyKey)) {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        mappings        : [parsedObject],
                        params          : [],
                        modelAttributes : []
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
                            modelAttributes     : [],
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
                            modelAttributes     : [],
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
                            modelAttributes     : [],
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
                            modelAttributes : [],
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

    /**
     * Find the controller from arbitrary variable.
     *
     * If provided with a class directly, will return the class itself.
     *
     * If provided with an instance of a class, will return the class instead.
     *
     * Otherwise, will return `undefined`.
     *
     * @param target
     */
    static findController (target : any) : RequestController | undefined {

        if ( isFunction(target) && isRequestController(target) ) {
            return target;
        }

        if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) ) {
            return target.constructor;
        }

        return undefined;

    }

    /**
     * This method is used to configure how ModelAttribute is mapped to the
     * method's parameter
     *
     * @param controller The controller to attach the configuration to
     * @param propertyKey The method name
     * @param paramIndex The index of the parameter
     * @param attributeName The parameter name
     * @param paramType The parameter type
     */
    static setControllerMethodModelAttributeParam (
        controller    : RequestController,
        propertyKey   : string,
        paramIndex    : number,
        attributeName : string,
        paramType     : RequestParamValueType
    ) {

        LOG.debug('setControllerMethodModelAttributeParam: attributeName =', attributeName, paramType);

        const newParam : RequestModelAttributeParamObject = {
            objectType    : RequestParamObjectType.MODEL_ATTRIBUTE,
            attributeName : attributeName,
            valueType     : paramType
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }

    /**
     * This function is used when the ModelAttribute decorator provides a PropertyDescriptor instead of a parameter
     * number. (FIXME: Add better explanation. What is the actual use case from annotations?)
     *
     * @param controller
     * @param propertyKey
     * @param propertyDescriptor
     * @param attributeName
     * @see https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators
     */
    static attachControllerMethodModelAttributeBuilder (
        controller         : RequestController,
        propertyKey        : string,
        propertyDescriptor : PropertyDescriptor,
        attributeName      : string
    ) {

        LOG.debug('attachControllerMethodModelAttributeBuilder: attributeName =', attributeName, propertyKey);

        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);

        if (origMapping === undefined) {

            setInternalRequestMappingObject(controller, {
                mappings: [],
                controllerProperties: {
                    [propertyKey] : {
                        mappings        : [],
                        params          : [],
                        modelAttributes : [attributeName]
                    }
                }
            });

        } else if (!has(origMapping.controllerProperties, propertyKey)) {

            setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        mappings : [],
                        params   : [],
                        modelAttributes : [attributeName]
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
                        modelAttributes: concat([attributeName], origMapping.controllerProperties[propertyKey].modelAttributes)
                    }
                }
            });

        }

    }

    /**
     * Set query param configuration into the controller
     *
     * @param controller
     * @param propertyKey
     * @param paramIndex
     * @param queryParam
     * @param paramType
     */
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

    /**
     * This method is used to set the configuration for the HTTP header ( Request.header() ) annotation in to the controller.
     *
     * @param controller
     * @param propertyKey
     * @param paramIndex
     * @param headerName
     * @param paramType
     * @param isRequired
     * @param defaultValue
     */
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

    /**
     * Set configuration for path variable into the controller.
     *
     * @param controller The controller
     * @param propertyKey The method name
     * @param paramIndex The index of the parameter
     * @param variableName The variable name in the path
     * @param paramType The variable type in the path
     * @param isRequired True if variable is required
     * @param decodeValue True if variable must be decoded
     * @param defaultValue The default value if missing
     */
    static setControllerMethodPathVariable (
        controller   : RequestController,
        propertyKey  : string,
        paramIndex   : number,
        variableName : string,
        paramType    : RequestParamValueType,
        isRequired   : boolean | undefined,
        decodeValue  : boolean | undefined,
        defaultValue : string | undefined
    ) {

        const newParam : RequestPathVariableParamObject = {
            objectType   : RequestParamObjectType.PATH_VARIABLE,
            variableName : variableName,
            valueType    : paramType,
            isRequired   : isRequired ?? true,
            decodeValue  : decodeValue ?? true,
            defaultValue : defaultValue
        };

        RequestControllerUtils._setControllerMethodParam(controller, propertyKey, paramIndex, newParam);

    }

    /**
     * Sets configuration to pass on a full map of parameters into the controller's
     * method argument at specified index.
     *
     * @param controller The controller
     * @param propertyKey The method name
     * @param paramIndex The index of the method's parameter
     * @param defaultValues The default values if some parameters missing
     */
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

    /**
     * Sets configuration to pass on a full map of headers into the controller's
     * method argument at specified index.
     *
     * Used at `Request.header()`
     *
     * @param controller The controller
     * @param propertyKey The method name
     * @param paramIndex The index of the method's parameter
     * @param defaultValues The default values if some parameters missing
     */
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

    /**
     * Sets configuration to pass on the request body into the controller's
     * method argument at specified index.
     *
     * Used at `Request.body()`
     *
     * @param controller The controller
     * @param propertyKey The method name
     * @param paramIndex The index of the method's parameter
     * @param paramType The type of the parameter
     */
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

// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
    RequestController,
    getInternalRequestMappingObject, isRequestController,
    setInternalRequestMappingObject
} from "./types/RequestController";
import { RequestMappingObject } from "./types/RequestMappingObject";
import { isRequestMethod} from "./types/RequestMethod";
import { filter, has, isFunction, isObject, isString} from "../modules/lodash";
import { InternalRequestControllerMappingObject, RequestControllerMappingObject } from "./types/RequestControllerMappingObject";
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
import { RequestMapping } from "./types/RequestMapping";
import { OpenAPIV3 } from "../types/openapi";

const LOG = LogService.createLogger('RequestControllerUtils');

export class RequestControllerUtils {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    static parseRequestMappings (value : readonly RequestMapping[]) : RequestMappingObject {
        return {
            methods : filter(value, isRequestMethod),
            paths   : filter(value, isString)
        };
    }

    static attachControllerMapping (
        controller : RequestController,
        config     : readonly RequestMapping[]
    ) : void {
        const parsedObject : RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
        this._getOrInitializeControllerMapping(controller, parsedObject);
    }

    static attachControllerOpenApiDocument (
        controller  : RequestController,
        config      : Partial<OpenAPIV3.Document>
    ) : void {
        let mappingObject : RequestControllerMappingObject = this._getOrInitializeControllerMapping(controller);
        LOG.debug('attachControllerOperation: mappingObject = ', mappingObject);
        LOG.debug('attachControllerOperation: config = ', config);
        const openApiPartials = mappingObject?.openApiPartials ?? [];
        setInternalRequestMappingObject(controller, {
            ...mappingObject,
            openApiPartials: [...openApiPartials, config]
        });
        return;
    }

    static attachControllerOperation (
        controller  : RequestController,
        propertyKey : string | undefined,
        config      : Partial<OpenAPIV3.OperationObject>
    ) : void {

        let mappingObject : RequestControllerMappingObject = this._getOrInitializeControllerMapping(controller);
        LOG.debug('attachControllerOperation: propertyKey = ', propertyKey);
        LOG.debug('attachControllerOperation: mappingObject = ', mappingObject);
        LOG.debug('attachControllerOperation: config = ', config);

        if (propertyKey === undefined) {
            // When property does not exist, append to root mapping
            const operations = mappingObject?.operations ?? [];
            setInternalRequestMappingObject(controller, {
                ...mappingObject,
                operations: [...operations, config]
            });
            return;
        }

        mappingObject = this._setControllerMappingProperty(controller, propertyKey);

        const operations : readonly Partial<OpenAPIV3.OperationObject>[] = mappingObject?.controllerProperties[propertyKey]?.operations ?? [];

        setInternalRequestMappingObject(controller, {
            ...mappingObject,
            controllerProperties: {
                ...mappingObject.controllerProperties,
                [propertyKey] : {
                    ...mappingObject.controllerProperties[propertyKey],
                    operations: [...operations, config]
                }
            }
        });

    }

    static attachControllerMethodMapping (
        controller  : RequestController,
        config      : readonly RequestMapping[],
        propertyKey : string
    ) {
        const parsedObject : RequestMappingObject = RequestControllerUtils.parseRequestMappings(config);
        this._setControllerMappingProperty(controller, propertyKey, parsedObject);
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
            const params : readonly (RequestParamObject|null)[] = RequestControllerUtils._initializeParams(paramIndex, newParam);
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
            const params : readonly (RequestParamObject|null)[] = RequestControllerUtils._initializeParams(paramIndex, newParam);
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
            const params : (RequestParamObject|null)[] = RequestControllerUtils._reinitializeParams(origMapping, propertyKey, paramIndex, newParam);
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
                        modelAttributes: [
                            attributeName,
                            ...origMapping.controllerProperties[propertyKey].modelAttributes
                        ]
                    }
                }
            });
        }
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
    ) : (RequestParamObject|null)[] {
        let params : (RequestParamObject|null)[] = [];
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
    ) : (RequestParamObject|null)[] {
        let params : (RequestParamObject|null)[] = [ ...origMapping.controllerProperties[propertyKey].params ];
        while (paramIndex >= params.length) {
            params.push(null);
        }
        params[paramIndex] = newParam;
        return params;
    }

    /**
     * Returns the controller mapping object or initializes it.
     *
     * @param controller   Controller where to add it
     * @param parsedObject New request mapping to be added, if defined
     * @private
     */
    private static _getOrInitializeControllerMapping (
        controller    : RequestController,
        parsedObject ?: RequestMappingObject
    ) : InternalRequestControllerMappingObject {
        // LOG.debug('attachControllerMapping: controller = ', controller);
        // LOG.debug('attachControllerMapping: parsedObject = ', parsedObject);
        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);
        // LOG.debug('attachControllerMapping: origMapping = ', origMapping);
        if (origMapping === undefined) {
            // ...when no previous mapping found at all, we'll create from stretch
            return setInternalRequestMappingObject(
                controller,
                {
                    mappings: parsedObject ? [parsedObject] : [],
                    controllerProperties: {}
                }
            );
        } else {
            // ...when previous mapping object was found, we'll append to it
            return setInternalRequestMappingObject(
                controller,
                {
                    ...origMapping,
                    mappings: parsedObject ? [ ...origMapping.mappings, parsedObject] : origMapping.mappings
                }
            );
        }
    }

    private static _setControllerMappingProperty (
        controller     : RequestController,
        propertyKey    : string,
        parsedObject  ?: RequestMappingObject
    ) : InternalRequestControllerMappingObject {

        const origMapping : InternalRequestControllerMappingObject = this._getOrInitializeControllerMapping(controller, parsedObject);

        if (!has(origMapping.controllerProperties, propertyKey)) {
            // When mapping exists, but property does not, we'll create new property from stretch
            return setInternalRequestMappingObject(controller, {
                ...origMapping,
                controllerProperties: {
                    ...origMapping.controllerProperties,
                    [propertyKey] : {
                        mappings        : parsedObject ? [parsedObject] : [],
                        params          : [],
                        modelAttributes : []
                    }
                }
            });
        }

        // When both mapping and property exists, we'll append to it
        return setInternalRequestMappingObject(controller, {
            ...origMapping,
            controllerProperties: {
                ...origMapping.controllerProperties,
                [propertyKey] : {
                    ...origMapping.controllerProperties[propertyKey],
                    mappings: parsedObject ? [
                        ...origMapping.controllerProperties[propertyKey].mappings,
                        parsedObject
                    ] : origMapping.controllerProperties[propertyKey].mappings
                }
            }
        });

    }

}

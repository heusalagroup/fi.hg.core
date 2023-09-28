// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {
    RequestController,
    getInternalRequestMappingObject,
    isRequestController,
    setInternalRequestMappingObject
} from "../types/RequestController";
import { concat } from "../../functions/concat";
import { filter } from "../../functions/filter";
import { has } from "../../functions/has";
import { find } from "../../functions/find";
import { merge } from "../../functions/merge";
import { uniq } from "../../functions/uniq";
import { reduce } from "../../functions/reduce";
import { map } from "../../functions/map";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { OpenAPIV3 } from "../../types/openapi";
import { isString } from "../../types/String";
import { isFunction } from "../../types/Function";
import { isObject } from "../../types/Object";
import { RequestMappingObject } from "../types/RequestMappingObject";
import { isRequestMethod} from "../types/RequestMethod";
import { RequestMappingValue } from "../types/RequestMappingValue";
import { RequestControllerMappingObject } from "../types/RequestControllerMappingObject";
import { RequestParamValueType } from "../types/RequestParamValueType";
import { RequestParamObject } from "../types/RequestParamObject";
import { RequestBodyParamObject } from "../types/RequestBodyParamObject";
import { RequestHeaderParamObject } from "../types/RequestHeaderParamObject";
import { RequestQueryParamObject } from "../types/RequestQueryParamObject";
import { RequestHeaderMapParamObject } from "../types/RequestHeaderMapParamObject";
import { RequestParamObjectType } from "../types/RequestParamObjectType";
import { RequestPathVariableParamObject } from "../types/RequestPathVariableParamObject";
import { RequestPathVariableMapParamObject } from "../types/RequestPathVariableMapParamObject";
import { DefaultHeaderMapValuesType } from "../types/DefaultHeaderMapValuesType";
import { DefaultPathVariableMapValuesType } from "../types/DefaultPathVariableMapValuesType";
import { RequestModelAttributeParamObject } from "../types/RequestModelAttributeParamObject";

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
    public static parseRequestMappings (value : readonly RequestMappingValue[]) : RequestMappingObject {
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
    public static attachControllerMapping (
        controller : RequestController,
        config     : readonly RequestMappingValue[]
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
    public static attachControllerMethodMapping (
        controller  : RequestController,
        config      : readonly RequestMappingValue[],
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
                        modelAttributes : [],
                        synchronized    : false
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
                        modelAttributes : [],
                        synchronized    : false
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
    public static findController (target : any) : RequestController | undefined {
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
    public static setControllerMethodModelAttributeParam (
        controller    : RequestController,
        propertyKey   : string,
        paramIndex    : number,
        attributeName : string,
        paramType     : RequestParamValueType
    ) {
        // LOG.debug('setControllerMethodModelAttributeParam: attributeName =', attributeName, paramType);
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
    public static attachControllerMethodModelAttributeBuilder (
        controller         : RequestController,
        propertyKey        : string,
        // @ts-ignore @TODO: Why not used?
        propertyDescriptor : PropertyDescriptor,
        attributeName      : string
    ) {
        // LOG.debug('attachControllerMethodModelAttributeBuilder: attributeName =', attributeName, propertyKey);
        const origMapping : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);
        if (origMapping === undefined) {
            setInternalRequestMappingObject(controller, {
                mappings: [],
                controllerProperties: {
                    [propertyKey] : {
                        mappings        : [],
                        params          : [],
                        modelAttributes : [attributeName],
                        synchronized    : false
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
                        modelAttributes : [attributeName],
                        synchronized    : false
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

    /**
     * Set query param configuration into the controller
     *
     * @param controller
     * @param propertyKey
     * @param paramIndex
     * @param queryParam
     * @param paramType
     */
    public static setControllerMethodQueryParam (
        controller  : RequestController,
        propertyKey : string,
        paramIndex  : number,
        queryParam  : string | undefined,
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
    public static setControllerMethodHeader (
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
    public static setControllerMethodPathVariable (
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
    public static setControllerMethodPathVariableMap (
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
    public static setControllerMethodHeaderMap (
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
    public static setControllerMethodBodyParam (
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

    /**
     * Set OpenAPI document configuration into the controller directly
     *
     * @param controller
     * @param config
     */
    public static attachControllerOpenApiDocument (
        controller  : RequestController,
        config      : Partial<OpenAPIV3.Document>
    ) : void {

        let mappingObject : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);
        if (mappingObject === undefined) {
            // ...when no previous mapping found at all, we'll create from stretch
            setInternalRequestMappingObject(
                controller,
                {
                    mappings: [],
                    controllerProperties: {},
                    openApiPartials: [config]
                }
            );
            return;
        }

        // LOG.debug('attachControllerOperation: mappingObject = ', mappingObject);
        // LOG.debug('attachControllerOperation: config = ', config);
        const openApiPartials = mappingObject?.openApiPartials ?? [];
        setInternalRequestMappingObject(
            controller,
            {
                ...mappingObject,
                openApiPartials: [...openApiPartials, config]
            }
        );
        return;
    }

    /**
     *
     * @param controller
     * @param propertyKey
     * @param config
     */
    public static attachControllerOperation (
        controller  : RequestController,
        propertyKey : string | undefined,
        config      : Partial<OpenAPIV3.OperationObject>
    ) : void {

        const operationId = config?.operationId ?? propertyKey;

        if ( !config?.operationId && operationId ) {
            config = {
                ...config,
                operationId
            };
        }

        let mappingObject : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);
        if (mappingObject === undefined) {
            // ...when no previous mapping found at all, we'll create from stretch
            if (propertyKey === undefined) {
                setInternalRequestMappingObject(
                    controller,
                    {
                        mappings: [],
                        controllerProperties: {},
                        operations: [config]
                    }
                );
            } else {
                setInternalRequestMappingObject(
                    controller,
                    {
                        mappings: [],
                        controllerProperties: {
                            [propertyKey]: {
                                modelAttributes: [],
                                mappings: [],
                                params: [],
                                operations: [config],
                                synchronized    : false
                            }
                        }
                    }
                );
            }
            return;
        }

        // LOG.debug('attachControllerOperation: propertyKey = ', propertyKey);
        // LOG.debug('attachControllerOperation: mappingObject = ', mappingObject);
        // LOG.debug('attachControllerOperation: config = ', config);

        if (propertyKey === undefined) {
            // When property does not exist, append to root mapping
            const operations = mappingObject?.operations ?? [];
            setInternalRequestMappingObject(
                controller,
                {
                    ...mappingObject,
                    operations: [...operations, config]
                }
            );
            return;
        }

        if (!has(mappingObject.controllerProperties, propertyKey)) {
            // When mapping exists, but property does not, we'll create new property from stretch
            setInternalRequestMappingObject(controller, {
                ...mappingObject,
                controllerProperties: {
                    ...mappingObject.controllerProperties,
                    [propertyKey] : {
                        mappings        : [],
                        params          : [],
                        modelAttributes : [],
                        operations      : [config],
                        synchronized    : false
                    }
                }
            });
            return;
        }

        let operations : readonly Partial<OpenAPIV3.OperationObject>[] = mappingObject?.controllerProperties[propertyKey]?.operations ?? [];

        if (operationId) {
            let operation : any = find(operations, (op: Partial<OpenAPIV3.OperationObject>) => op.operationId === operationId);
            if (operation) {

                operations = filter(
                    operations,
                    (op: Partial<OpenAPIV3.OperationObject>) : boolean => op.operationId !== operationId
                );

                // tags?: string[];
                // summary?: string;
                // description?: string;
                // externalDocs?: ExternalDocumentationObject;
                // operationId?: string;
                // parameters?: (ReferenceObject | ParameterObject)[];
                // requestBody?: ReferenceObject | RequestBodyObject;
                // responses: ResponsesObject;
                // callbacks?: { [callback: string]: ReferenceObject | CallbackObject };
                // deprecated?: boolean;
                // security?: SecurityRequirementObject[];
                // servers?: ServerObject[];

                operation = {
                    ...(operation?.tags          || config?.tags          ? { tags         : uniq(concat([], config?.tags ?? [], operation?.tags ?? []))            } : {}),
                    ...(config?.summary                                   ? { summary      : config?.summary                                                          } : {}),
                    ...(config?.description                               ? { description  : config?.description                                                      } : {}),
                    ...(operation?.externalDocs  || config?.externalDocs  ? { externalDocs : merge({}, config?.externalDocs ?? {}, operation?.externalDocs ?? {})     } : {}),
                    ...(config?.operationId                               ? { operationId  : config?.operationId                                                      } : {}),
                    ...(operation?.parameters    || config?.parameters    ? { parameters   : mergeConcatByProperty('name', config?.parameters ?? [], operation?.parameters ?? [])        } : {}),
                    ...(operation?.requestBody   || config?.requestBody   ? { requestBody  : merge({}, config?.requestBody, operation?.requestBody)                   } : {}),
                    ...(operation?.responses     || config?.responses     ? { responses    : merge({}, config?.responses ?? {}, operation?.responses ?? {} )          } : {}),
                    ...(operation?.callbacks     || config?.callbacks     ? { callbacks    : merge({}, config?.callbacks ?? {}, operation?.callbacks ?? {} )          } : {}),
                    ...(operation?.deprecated    || config?.deprecated    ? { deprecated   : config?.deprecated ?? operation?.deprecated                              } : {}),
                    ...(operation?.security      || config?.security      ? { security     : concat([], config?.security ?? [], operation?.security ?? [] )           } : {}),
                    ...(operation?.servers       || config?.servers       ? { servers      : mergeConcatByProperty("url", config?.servers ?? [], operation?.servers ?? [] )             } : {}),
                };

                setInternalRequestMappingObject(
                    controller,
                    {
                        ...mappingObject,
                        controllerProperties: {
                            ...mappingObject.controllerProperties,
                            [propertyKey] : {
                                ...mappingObject.controllerProperties[propertyKey],
                                operations: [
                                    operation,
                                    ...operations
                                ]
                            }
                        }
                    }
                );
                return;
            }
        }

        setInternalRequestMappingObject(
            controller,
            {
                ...mappingObject,
                controllerProperties: {
                    ...mappingObject.controllerProperties,
                    [propertyKey] : {
                        ...mappingObject.controllerProperties[propertyKey],
                        operations: [...operations, config]
                    }
                }
            }
        );

    }

    /**
     *
     * @param controller
     * @param propertyKey
     */
    public static attachControllerSynchronizedRequest (
        controller  : RequestController,
        propertyKey : string | undefined
    ) : void {

        if (propertyKey === undefined) {
            throw new TypeError(`Synchronizing all controller methods is not supported yet`);
        }

        let mappingObject : RequestControllerMappingObject | undefined = getInternalRequestMappingObject(controller, controller);
        if (mappingObject === undefined) {
            // ...when no previous mapping found at all, we'll create from stretch
            setInternalRequestMappingObject(
                controller,
                {
                    mappings: [],
                    controllerProperties: {
                        [propertyKey]: {
                            modelAttributes: [],
                            mappings: [],
                            params: [],
                            synchronized: true
                        }
                    }
                }
            );
            return;
        }

        // LOG.debug('attachControllerOperation: propertyKey = ', propertyKey);
        // LOG.debug('attachControllerOperation: mappingObject = ', mappingObject);

        if (!has(mappingObject.controllerProperties, propertyKey)) {
            // When mapping exists, but property does not, we'll create new property from stretch
            setInternalRequestMappingObject(controller, {
                ...mappingObject,
                controllerProperties: {
                    ...mappingObject.controllerProperties,
                    [propertyKey] : {
                        mappings        : [],
                        params          : [],
                        modelAttributes : [],
                        synchronized    : true
                    }
                }
            });
        } else {
            setInternalRequestMappingObject(
                controller,
                {
                    ...mappingObject,
                    controllerProperties: {
                        ...mappingObject.controllerProperties,
                        [propertyKey] : {
                            ...mappingObject.controllerProperties[propertyKey],
                            synchronized : true
                        }
                    }
                }
            );
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
            const params : readonly (RequestParamObject|null)[] = RequestControllerUtils._initializeParams(paramIndex, newParam);
            if (requestBodyRequired) {
                setInternalRequestMappingObject(
                    controller,
                    {
                        mappings: [],
                        controllerProperties: {
                            [propertyKey] : {
                                requestBodyRequired : true,
                                mappings            : [],
                                modelAttributes     : [],
                                params              : params,
                                synchronized    : false
                            }
                        }
                    }
                );
            } else {
                setInternalRequestMappingObject(
                    controller,
                    {
                        mappings: [],
                        controllerProperties: {
                            [propertyKey] : {
                                mappings : [],
                                modelAttributes     : [],
                                params   : params,
                                synchronized    : false
                            }
                        }
                    }
                );
            }
        } else if (!has(origMapping.controllerProperties, propertyKey)) {
            const params : readonly (RequestParamObject|null)[] = RequestControllerUtils._initializeParams(paramIndex, newParam);
            if (requestBodyRequired) {
                setInternalRequestMappingObject(
                    controller,
                    {
                        ...origMapping,
                        controllerProperties: {
                            ...origMapping.controllerProperties,
                            [propertyKey] : {
                                requestBodyRequired: true,
                                modelAttributes     : [],
                                mappings : [],
                                params   : params,
                                synchronized    : false
                            }
                        }
                    }
                );
            } else {
                setInternalRequestMappingObject(
                    controller,
                    {
                        ...origMapping,
                        controllerProperties: {
                            ...origMapping.controllerProperties,
                            [propertyKey]: {
                                mappings: [],
                                modelAttributes : [],
                                params: params,
                                synchronized    : false
                            }
                        }
                    }
                );
            }
        } else {
            const params : (RequestParamObject|null)[] = RequestControllerUtils._reinitializeParams(origMapping, propertyKey, paramIndex, newParam);
            if (requestBodyRequired) {
                setInternalRequestMappingObject(
                    controller,
                    {
                        ...origMapping,
                        controllerProperties: {
                            ...origMapping.controllerProperties,
                            [propertyKey]: {
                                ...origMapping.controllerProperties[propertyKey],
                                requestBodyRequired: true,
                                params: params
                            }
                        }
                    }
                );
            } else {
                setInternalRequestMappingObject(
                    controller,
                    {
                        ...origMapping,
                        controllerProperties: {
                            ...origMapping.controllerProperties,
                            [propertyKey] : {
                                ...origMapping.controllerProperties[propertyKey],
                                params: params
                            }
                        }
                    }
                );
            }
        }
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

}

function mergeConcatByProperty<T = any> (propertyName : string, newValues: T[], prevValues: T[]) : T[] {
    const allPropertyValues : string[] = uniq([
        ...map(newValues  , (item: T) => has(item, propertyName) ? (item as any)[propertyName] : undefined ),
        ...map(prevValues , (item: T) => has(item, propertyName) ? (item as any)[propertyName] : undefined ),
    ]);
    return reduce(
        allPropertyValues,
        (list: T[], propertyValue: string) : T[] => {
            const newValue  : T | undefined = find(newValues , (item: T) : boolean => has(item, propertyName) ? (item as any)[propertyName] === propertyValue : false);
            const prevValue : T | undefined = find(prevValues, (item: T) : boolean => has(item, propertyName) ? (item as any)[propertyName] === propertyValue : false);
            if (newValue === undefined) {
                if (prevValue === undefined) return list;
                list.push( prevValue );
            } else if (prevValue === undefined) {
                list.push( newValue );
            } else {
                list.push( merge(prevValue, newValue) );
            }
            return list;
        },
        []
    )
}
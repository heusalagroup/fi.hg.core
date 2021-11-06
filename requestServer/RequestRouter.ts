// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import URL, {URLSearchParams} from "url";
import RequestController, {
    getInternalRequestMappingObject,
    hasInternalRequestMappingObject
} from "../request/types/RequestController";
import RequestMethod, {parseRequestMethod} from "../request/types/RequestMethod";
import {filter, forEach, has, isNull, keys, map, some, trim, reduce, concat, find} from "../modules/lodash";
import RequestControllerMappingObject from "../request/types/RequestControllerMappingObject";
import RequestMappingObject from "../request/types/RequestMappingObject";
import {isRequestStatus} from "../request/types/RequestStatus";
import RequestParamValueType from "../request/types/RequestParamValueType";
import LogService from "../LogService";
import {RequestRouterMappingPropertyObject} from "./types/RequestRouterMappingPropertyObject";
import {RequestRouterMappingObject} from "./types/RequestRouterMappingObject";
import {RequestParamObject} from "../request/types/RequestParamObject";
import {RequestControllerMethodObject} from "../request/types/RequestControllerMethodObject";
import RequestQueryParamObject from "../request/types/RequestQueryParamObject";
import Json, {
    isReadonlyJsonAny,
    isReadonlyJsonArray,
    isReadonlyJsonObject,
    JsonObject,
    ReadonlyJsonObject
} from "../Json";
import ResponseEntity, {isResponseEntity} from "../request/ResponseEntity";
import RequestError, {isRequestError} from "../request/types/RequestError";
import RequestParamObjectType from "../request/types/RequestParamObjectType";
import RequestHeaderParamObject from "../request/types/RequestHeaderParamObject";
import Headers from "../request/Headers";
import DefaultHeaderMapValuesType from "../request/types/DefaultHeaderMapValuesType";
import RequestHeaderMapParamObject from "../request/types/RequestHeaderMapParamObject";
import RouteUtils from "./RouteUtils";
import BaseRoutes, {RouteParamValuesObject} from "./types/BaseRoutes";
import RequestPathVariableParamObject from "../request/types/RequestPathVariableParamObject";
import RequestModelAttributeParamObject, { isRequestModelAttributeParamObject } from "../request/types/RequestModelAttributeParamObject";
import LogLevel from "../types/LogLevel";

const LOG = LogService.createLogger('RequestRouter');

export interface ParseRequestBodyCallback {
    (headers: Headers) : Json | undefined | Promise<Json | undefined>;
}

export interface RequestContext {

    readonly method        ?: RequestMethod;
    readonly pathName      ?: string;
    readonly queryParams   ?: URLSearchParams;
    readonly routes        ?: Array<RequestRouterMappingPropertyObject> | undefined;
    readonly bodyRequired  ?: boolean;
    readonly pathVariables ?: RouteParamValuesObject;

}

/**
 * Three item array with following items:
 *
 * 1. Attribute name     : string
 * 2. Property name      : string
 * 3. Property arguments : (RequestParamObject | null)[]
 *
 */
type ModelAttributeProperty = [string, string, (RequestParamObject | null)[]];

export class RequestRouter {

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _controllers : Array<RequestController>;
    private _routes               : BaseRoutes | undefined;
    private _modelAttributeNames  : Map<RequestController, ModelAttributeProperty[]> | undefined;
    private _requestMappings      : Array<RequestControllerMappingObject> | undefined;
    private _initialized          : boolean;

    public constructor () {

        this._controllers             = [];
        this._routes                  = undefined;
        this._requestMappings         = undefined;
        this._modelAttributeNames     = undefined;
        this._initialized             = false;

    }

    public attachController (controller : RequestController) {

        this._controllers.push(controller);

        this._routes = undefined;

    }

    private _initializeRequestMappings () {

        LOG.debug('Initializing request mappings.');

        if (!this._requestMappings) {
            this._requestMappings = this._getRequestMappings();
        }

    }

    private _initializeRouter () {

        if (!this._initialized) {

            this._initialized = true;

            LOG.debug('Initializing...');

            this._initializeRequestMappings();
            this._initializeRoutes();
            this._initializeRequiredModelAttributeNames();

        }

    }

    private _initializeRoutes () {

        LOG.debug('Initializing routes.');

        if ( this._requestMappings?.length ) {
            this._routes = RouteUtils.createRoutes( RequestRouter._parseMappingObject(this._requestMappings) );
        } else {
            this._routes = RouteUtils.createRoutes( {} );
        }

    }

    private _initializeRequiredModelAttributeNames () {

        LOG.debug('Initializing model attributes.');

        let values : [RequestController, ModelAttributeProperty[]][] = [];

        if ( this._requestMappings?.length ) {
            values = reduce(
                this._requestMappings,
                (arr: [RequestController, ModelAttributeProperty[]][], item: RequestControllerMappingObject) => {

                    const controller = item.controller;

                    const controllerUniqueAttributeNames : ModelAttributeProperty[] = reduce(
                        keys(item.controllerProperties),
                        (arr2: ModelAttributeProperty[], propertyKey : string) => {

                            LOG.debug('_initializeRequiredModelAttributeNames: propertyKey: ', propertyKey);

                            const propertyValue : RequestControllerMethodObject = item.controllerProperties[propertyKey];

                            const propertyAttributeNames : string[] = propertyValue.modelAttributes;

                            LOG.debug('_initializeRequiredModelAttributeNames: propertyAttributeNames: ', propertyAttributeNames);

                            const params : (RequestParamObject|null)[] = propertyValue.params;

                            forEach(propertyAttributeNames, (attributeName : string) => {
                                LOG.debug('_initializeRequiredModelAttributeNames: attributeName: ', attributeName);
                                if ( find(arr2, (i : ModelAttributeProperty) => i[0] === attributeName) === undefined ) {
                                    arr2.push([attributeName, propertyKey, params]);
                                }
                            });

                            return arr2;

                    }, []);

                    LOG.debug('controllerUniqueAttributeNames: ', controllerUniqueAttributeNames);

                    values.push([controller, controllerUniqueAttributeNames]);

                    return arr;

                }, values
            );
        }

        this._modelAttributeNames = new Map<RequestController, ModelAttributeProperty[]>(values);

    }

    public async handleRequest (
        methodString      : RequestMethod,
        urlString         : string                   | undefined = undefined,
        parseRequestBody  : ParseRequestBodyCallback | undefined = undefined,
        requestHeaders    : Headers
    ) : Promise<ResponseEntity<any>> {

        try {

            const method : RequestMethod = parseRequestMethod(methodString);

            const {
                pathName,
                queryParams
            } : RequestContext = RequestRouter._parseRequestPath(urlString);

            const requestPathName : string | undefined = pathName;
            // LOG.debug('requestPathName: ', requestPathName);

            const requestQueryParams : URLSearchParams | undefined = queryParams;
            // LOG.debug('requestQueryParams: ', requestQueryParams);

            if (requestQueryParams === undefined) {
                LOG.error('handleRequest: requestQueryParams was not initialized');
                return ResponseEntity.internalServerError().body({
                    error: 'Internal Server Error'
                });
            }

            if (requestPathName === undefined) {
                LOG.error('handleRequest: requestPathName was not initialized');
                return ResponseEntity.internalServerError().body({
                    error: 'Internal Server Error'
                });
            }

            if ( !this._initialized ) {
                this._initializeRouter();
            }

            const {
                routes,
                bodyRequired,
                pathVariables
            } : RequestContext = this._getRequestRoutesContext(method, requestPathName);

            if ( !parseRequestBody && bodyRequired ) {

                LOG.error('handleRequest: parseRequestBody was not provided and body is required');

                return ResponseEntity.internalServerError().body({
                    error: 'Internal Server Error'
                });

            }

            // LOG.debug('routes: ', routes);

            if (routes === undefined) {
                return ResponseEntity.methodNotAllowed().body({
                    error: 'Method Not Allowed'
                });
            }

            if (routes.length === 0) {
                return ResponseEntity.notFound().body({
                    error: 'Not Found'
                });
            }

            let responseEntity : ResponseEntity<any> | undefined = undefined;

            // LOG.debug('handleRequest: requestBodyRequired: ', requestBodyRequired);

            const requestBody = parseRequestBody && bodyRequired ? await parseRequestBody(requestHeaders) : undefined;

            // LOG.debug('handleRequest: requestBody: ', requestBody);

            const requestModelAttributes = new Map<RequestController, Map<string, any>>();

            // Handle requests using controllers
            await reduce(routes, async (previousPromise, route: RequestRouterMappingPropertyObject) => {

                const routeController     = route.controller;
                const routePropertyName   = route.propertyName;
                const routePropertyParams = route.propertyParams;

                await previousPromise;

                if ( this._modelAttributeNames && this._modelAttributeNames.has(routeController) ) {

                    LOG.debug(`Populating attributes for property "${routePropertyName}"`);

                    const modelAttributeValues : Map<string, any> = RequestRouter._getOrCreateRequestModelAttributesForController(requestModelAttributes, routeController);

                    const routeAttributeNames : string[] = map(
                        filter(routePropertyParams, (item : any) : item is RequestModelAttributeParamObject => isRequestModelAttributeParamObject(item)),
                        (item : RequestModelAttributeParamObject) : string => item.attributeName
                    );

                    LOG.debug('route attributeNames: ', routeAttributeNames);

                    const allModelAttributeNamesForRouteController = this._modelAttributeNames.get(routeController);

                    LOG.debug('all attributeNamePairs: ', allModelAttributeNamesForRouteController);

                    const attributeNamePairs : ModelAttributeProperty[] = filter(
                        allModelAttributeNamesForRouteController ?? [],
                        (item : ModelAttributeProperty) : boolean => routeAttributeNames.includes(item[0])
                    );

                    LOG.debug('attributeNamePairs: ', attributeNamePairs);

                    await reduce(attributeNamePairs, async (p : Promise<void>, pair : ModelAttributeProperty) : Promise<void> => {

                        const [attributeName, propertyName, propertyParams] = pair;

                        await p;

                        LOG.debug('attributeName: ', attributeName);
                        LOG.debug('propertyName: ', propertyName);
                        LOG.debug('propertyParams: ', propertyParams);

                        const stepParams = RequestRouter._bindRequestActionParams(requestQueryParams, requestBody, propertyParams, requestHeaders, pathVariables, modelAttributeValues );

                        const stepResult : any = await routeController[propertyName](...stepParams);

                        modelAttributeValues.set(attributeName, stepResult);

                    }, Promise.resolve());

                }

                const stepParams = RequestRouter._bindRequestActionParams(requestQueryParams, requestBody, routePropertyParams, requestHeaders, pathVariables, requestModelAttributes.get(routeController) ?? new Map<string, any>() );

                // LOG.debug('handleRequest: stepParams 1: ', stepParams);

                // LOG.debug('handleRequest: stepParams 2: ', stepParams);

                if (!has(routeController, routePropertyName)) {
                    LOG.warn(`Warning! No property by name "${routePropertyName}" found in the controller`);
                    responseEntity = ResponseEntity.notFound<JsonObject>().body({error:"404 - Not Found", code: 404});
                    return;
                }

                LOG.debug(`Calling route property by name "${routePropertyName}"`);
                const stepResult = await routeController[routePropertyName](...stepParams);

                if (isRequestStatus(stepResult)) {

                    responseEntity = new ResponseEntity<any>(stepResult);

                } else if (isRequestError(stepResult)) {

                    responseEntity = new ResponseEntity<ReadonlyJsonObject>(stepResult.toJSON(), stepResult.getStatusCode());

                } else if (isResponseEntity(stepResult)) {

                    // FIXME: What if we already have stepResult??
                    if (responseEntity !== undefined) {
                        LOG.warn('Warning! ResponseEntity from previous call ignored.');
                    }

                    responseEntity = stepResult;

                } else if (isReadonlyJsonArray(stepResult)) {

                    if (responseEntity === undefined) {

                        responseEntity = ResponseEntity.ok(stepResult);

                    } else {

                        responseEntity = new ResponseEntity<any>(
                            concat(responseEntity.getBody(), stepResult),
                            responseEntity.getHeaders(),
                            responseEntity.getStatusCode()
                        );

                    }

                } else if (isReadonlyJsonObject(stepResult)) {

                    if (responseEntity === undefined) {

                        responseEntity = ResponseEntity.ok(stepResult);

                    } else {

                        responseEntity = new ResponseEntity<any>(
                            {
                                ...responseEntity.getBody(),
                                ...stepResult
                            },
                            responseEntity.getHeaders(),
                            responseEntity.getStatusCode()
                        );

                    }

                } else if (isReadonlyJsonAny(stepResult)) {

                    if (responseEntity === undefined) {

                        responseEntity = ResponseEntity.ok(stepResult);

                    } else {

                        LOG.warn('Warning! ResponseEntity from previous call ignored.');

                        responseEntity = new ResponseEntity<any>(
                            stepResult,
                            responseEntity.getHeaders(),
                            responseEntity.getStatusCode()
                        );

                    }

                } else {

                    if (responseEntity === undefined) {

                        responseEntity = ResponseEntity.ok(stepResult);

                    } else {

                        LOG.warn('Warning! ResponseEntity from previous call ignored.');

                        responseEntity = new ResponseEntity<any>(
                            stepResult,
                            responseEntity.getHeaders(),
                            responseEntity.getStatusCode()
                        );

                    }

                }

                // LOG.debug('handleRequest: result changed: ', responseEntity);

            }, Promise.resolve());

            LOG.debug('handleRequest: result finished: ' + responseEntity);

            // This never happens really, since 'routes' will always have more than one item at this point.
            if (responseEntity === undefined) {
                return ResponseEntity.noContent();
            }

            return responseEntity;

        } catch (err) {

            if (isRequestError(err)) {

                const status = err?.status ?? 0;

                if (status === 404) {
                    return ResponseEntity.notFound().body(err.toJSON());
                }

                if (status >= 400 && status < 500) {
                    return ResponseEntity.badRequest().status(status).body(err.toJSON());
                }

                return ResponseEntity.internalServerError().status(status).body(err.toJSON());

            }

            LOG.error('Exception: ', err);

            return ResponseEntity.internalServerError<Json>().body({
                error: 'Internal Server Error',
                code: 500
            });

        }

    }

    private static _parseRequestPath (urlString : string | undefined) : RequestContext {

        const urlForParser : string        = `http://localhost${urlString ?? ''}`;

        const parsedUrl = new URL.URL(urlForParser);

        // LOG.debug('parsedUrl: ', parsedUrl);

        const pathName    = parsedUrl.pathname;
        const queryParams = parsedUrl.searchParams;

        return {
            pathName,
            queryParams
        };

    }

    private _getRequestRoutesContext (
        method          : RequestMethod,
        requestPathName : string
    ) : RequestContext {

        if ( !this._routes || !this._routes.hasRoute(requestPathName) ) {
            return {
                routes: [],
                bodyRequired: false
            };
        }

        // LOG.debug('_getRequestRoutesContext: requestPathName: ', requestPathName);
        // LOG.debug('_getRequestRoutesContext: method: ', method);

        let [routes, pathVariables] = this._routes.getRoute(requestPathName);

        routes = filter(
            routes,
            (item : RequestRouterMappingPropertyObject) : boolean => {
                return item.methods.indexOf(method) >= 0;
            }
        );

        // LOG.debug('_getRequestRoutesContext: routes: ', routes);

        if (!routes.length) {

            // There were matching routes, but not for this method; Method not allowed.
            return {
                routes: undefined,
                bodyRequired: false
            };

        }

        const requestBodyRequired = some(routes, item => item?.requestBodyRequired === true);

        return {
            routes,
            pathVariables,
            bodyRequired: requestBodyRequired
        };

    }

    private _getRequestMappings () : Array<RequestControllerMappingObject> {

        if (this._controllers.length === 0) {
            return [];
        }

        return filter(map(this._controllers, (controller : RequestController) => {

            // @ts-ignore
            if ( hasInternalRequestMappingObject(controller.constructor) ) {

                // @ts-ignore
                return getInternalRequestMappingObject(controller.constructor, controller);

            }

            return getInternalRequestMappingObject(controller, controller);

        }), (item : RequestControllerMappingObject | undefined) : boolean => !!item) as Array<RequestControllerMappingObject>;

    }

    private static _parseMappingObject (
        requestMappings : Array<RequestControllerMappingObject>
    ) : RequestRouterMappingObject {

        const routeMappingResult : RequestRouterMappingObject = {};

        function setRouteMappingResult (
            path    : string,
            mapping : RequestRouterMappingPropertyObject
        ) {

            if (!has(routeMappingResult, path)) {
                routeMappingResult[path] = [mapping];
                return;
            }

            routeMappingResult[path].push(mapping);

        }

        forEach(requestMappings, (rootItem : RequestControllerMappingObject) => {

            const controller              = rootItem.controller;
            const controllerProperties    = rootItem.controllerProperties;
            const controllerPropertyNames = keys(controllerProperties);

            if (rootItem.mappings.length > 0) {

                // Controller has root mappings

                forEach(rootItem.mappings, (rootMappingItem : RequestMappingObject) => {

                    const rootMethods = rootMappingItem.methods;

                    forEach(rootMappingItem.paths, (rootPath: string) => {

                        forEach(controllerPropertyNames, (propertyKey: string) => {

                            const propertyValue  : RequestControllerMethodObject  = controllerProperties[propertyKey];
                            const propertyParams : Array<RequestParamObject|null> = propertyValue.params;

                            forEach(propertyValue.mappings, (propertyMappingItem : RequestMappingObject) => {

                                // Filters away any property routes which do not have common methods
                                const propertyMethods : RequestMethod[] = propertyMappingItem.methods;

                                if (!RequestRouter._matchMethods(rootMethods, propertyMethods)) {
                                    return;
                                }

                                const propertyMethodsCommonWithRoot : RequestMethod[] = RequestRouter._parseCommonMethods(rootMethods, propertyMethods);

                                const propertyPaths : string[] = propertyMappingItem.paths;

                                forEach(propertyPaths, (propertyPath : string) => {

                                    const fullPropertyPath = RequestRouter._joinRoutePaths(rootPath, propertyPath);

                                    setRouteMappingResult(
                                        fullPropertyPath,
                                        {
                                            requestBodyRequired : propertyValue?.requestBodyRequired ?? false,
                                            methods             : propertyMethodsCommonWithRoot,
                                            controller          : controller,
                                            propertyName        : propertyKey,
                                            propertyParams      : propertyParams
                                        }
                                    );

                                });

                            });

                        });

                    });

                });

            } else {

                // We don't have parent controller mappings, so expect method mappings to be global.

                forEach(controllerPropertyNames, (propertyKey: string) => {

                    const propertyValue  : RequestControllerMethodObject  = controllerProperties[propertyKey];
                    const propertyParams : Array<RequestParamObject|null> = propertyValue.params;

                    forEach(propertyValue.mappings, (propertyMappingItem : RequestMappingObject) => {

                        const propertyMethods : RequestMethod[] = propertyMappingItem.methods;
                        const propertyPaths   : string[]        = propertyMappingItem.paths;

                        forEach(propertyPaths, (propertyPath : string) => {

                            setRouteMappingResult(
                                propertyPath,
                                {
                                    requestBodyRequired : propertyValue?.requestBodyRequired ?? false,
                                    methods             : propertyMethods,
                                    controller          : controller,
                                    propertyName        : propertyKey,
                                    propertyParams      : propertyParams
                                }
                            );

                        });

                    });

                });

            }

        });

        return routeMappingResult;

    }

    private static _matchMethods (
        rootMethods     : RequestMethod[],
        propertyMethods : RequestMethod[]
    ) : boolean {

        if (rootMethods.length === 0) return true;

        if (propertyMethods.length == 0) return true;

        return some(rootMethods, (rootMethod : RequestMethod) : boolean => {
            return some(propertyMethods, (propertyMethod : RequestMethod) : boolean => {
                return rootMethod === propertyMethod;
            });
        });

    }

    private static _parseCommonMethods (
        rootMethods     : RequestMethod[],
        propertyMethods : RequestMethod[]
    ) : RequestMethod[] {
        return (
            rootMethods.length !== 0
                ? filter(
                    propertyMethods,
                    (propertyMethod: RequestMethod) : boolean => {
                        return some(rootMethods, (rootMethod : RequestMethod) : boolean => {
                            return rootMethod === propertyMethod;
                        });
                    }
                )
                : propertyMethods
        );
    }

    private static _joinRoutePaths (a : string, b : string) : string {

        a = trim(a);
        b = trim(trim(b), "/");

        if (b.length === 0) return a;
        if (a.length === 0) return b;

        if ( a[a.length - 1] === '/' || b[0] === '/' ) {
            return a + b;
        }

        return a + '/' + b;

    }

    private static _bindRequestActionParams (
        searchParams      : URLSearchParams,
        requestBody       : Json | undefined,
        params            : (RequestParamObject|null)[],
        requestHeaders    : Headers,
        pathVariables     : RouteParamValuesObject | undefined,
        modelAttributes   : Map<string, any>
    ) : Array<any> {

        return map(params, (item : RequestParamObject|null) : any => {

            if ( item === null ) {
                return undefined;
            }

            const objectType : RequestParamObjectType | undefined = item?.objectType;

            switch (objectType) {

                case RequestParamObjectType.REQUEST_BODY:
                    return requestBody;

                case RequestParamObjectType.QUERY_PARAM: {

                    const queryParamItem : RequestQueryParamObject = item as RequestQueryParamObject;

                    const key = queryParamItem.queryParam;

                    if (!searchParams.has(key)) return undefined;

                    const value : string | null = searchParams.get(key);

                    if (isNull(value)) return undefined;

                    return RequestRouter._castParam(value, queryParamItem.valueType);

                }

                case RequestParamObjectType.REQUEST_HEADER: {

                    const headerItem : RequestHeaderParamObject = item as RequestHeaderParamObject;

                    const headerName = headerItem.headerName;

                    if (!requestHeaders.containsKey(headerName)) {

                        if (headerItem.isRequired) {
                            throw new RequestError(400, `Bad Request: Header missing: ${headerName}`);
                        }

                        return headerItem?.defaultValue ?? undefined;

                    }

                    const headerValue : string | undefined = requestHeaders.getFirst(headerName);

                    if ( headerValue === undefined ) return undefined;

                    return RequestRouter._castParam(headerValue, headerItem.valueType);

                }

                case RequestParamObjectType.REQUEST_HEADER_MAP: {

                    const headerItem : RequestHeaderMapParamObject = item as RequestHeaderMapParamObject;

                    const defaultHeaders : DefaultHeaderMapValuesType | undefined = headerItem?.defaultValues;

                    if (requestHeaders.isEmpty()) {

                        if (defaultHeaders) {
                            return new Headers(defaultHeaders);
                        } else {
                            return new Headers();
                        }

                    } else {

                        if (defaultHeaders) {
                            return new Headers( {
                                ...defaultHeaders,
                                ...requestHeaders.valueOf()
                            } );
                        } else {
                            return requestHeaders.clone();
                        }

                    }

                }

                case RequestParamObjectType.PATH_VARIABLE: {

                    const pathParamItem : RequestPathVariableParamObject = item as RequestPathVariableParamObject;

                    const variableName = pathParamItem.variableName;

                    const variableValue = pathVariables && has(pathVariables, variableName) ? pathVariables[variableName] : undefined;

                    if ( variableValue !== undefined && variableValue !== '' ) {

                        if (pathParamItem.decodeValue) {
                            return decodeURIComponent(variableValue);
                        }

                        return variableValue;

                    } else {

                        if (pathParamItem.isRequired) {
                            throw new RequestError(404, `Not Found`);
                        }

                        return pathParamItem.defaultValue ?? undefined;
                    }

                }

                case RequestParamObjectType.MODEL_ATTRIBUTE: {

                    const modelAttributeItem : RequestModelAttributeParamObject = item as RequestModelAttributeParamObject;

                    const key = modelAttributeItem.attributeName;

                    return modelAttributes.has(key) ? modelAttributes.get(key) : undefined;

                }


            }

            throw new TypeError(`Unsupported item type: ${item}`);

        });

    }

    private static _castParam (
        value : string,
        type  : RequestParamValueType
    ) : any {

        switch (type) {

            case RequestParamValueType.JSON:
                return JSON.parse(value);

            case RequestParamValueType.STRING:
                return value;

            case RequestParamValueType.INTEGER:
                return parseInt(value, 10);

            case RequestParamValueType.NUMBER:
                return parseFloat(value);

        }

        throw new TypeError(`Unsupported type: ${type}`)
    }

    private static _getOrCreateRequestModelAttributesForController (
        requestModelAttributes : Map<RequestController, Map<string, any>>,
        routeController: any
    ) : Map<string, any> {

        let modelAttributeValues : Map<string, any> | undefined = requestModelAttributes.get(routeController);

        if ( modelAttributeValues != undefined ) {
            return modelAttributeValues;
        }

        modelAttributeValues = new Map<string, any>();
        requestModelAttributes.set(routeController, modelAttributeValues);
        return modelAttributeValues;

    }

}

export default RequestRouter;

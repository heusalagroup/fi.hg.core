// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import URL, {URLSearchParams} from "url";
import RequestController, {
    getInternalRequestMappingObject,
    hasInternalRequestMappingObject
} from "../request/types/RequestController";
import RequestMethod, {parseRequestMethod, stringifyRequestMethod} from "../request/types/RequestMethod";
import {filter, forEach, has, isNull, keys, map, some, trim, reduce, concat} from "../modules/lodash";
import RequestControllerMappingObject from "../request/types/RequestControllerMappingObject";
import RequestMappingObject from "../request/types/RequestMappingObject";
import {isRequestStatus} from "../request/types/RequestStatus";
import RequestParamType from "../request/types/RequestParamType";
import LogService from "../LogService";
import {RequestRouterMappingPropertyObject} from "./types/RequestRouterMappingPropertyObject";
import {RequestRouterMappingObject} from "./types/RequestRouterMappingObject";
import {RequestParamObject} from "../request/types/RequestParamObject";
import {RequestControllerMethodObject} from "../request/types/RequestControllerMethodObject";
import {isRequestQueryParamObject} from "../request/types/RequestQueryParamObject";
import Json, {isReadonlyJsonAny, isReadonlyJsonArray, isReadonlyJsonObject, ReadonlyJsonObject} from "../Json";
import ResponseEntity, {isResponseEntity} from "../request/ResponseEntity";
import {isRequestError} from "../request/types/RequestError";

const LOG = LogService.createLogger('RequestRouter');

export interface ParseRequestBodyCallback {
    () : Json | undefined | Promise<Json | undefined>;
}

export class RequestRouter {

    private readonly _controllers : Array<RequestController>;

    public constructor () {

        this._controllers = [];

    }

    public attachController (controller : RequestController) {

        this._controllers.push(controller);

    }

    public async handleRequest (
        methodString      : RequestMethod,
        urlString         : string                   | undefined = undefined,
        parseRequestBody  : ParseRequestBodyCallback | undefined = undefined
    ) : Promise<ResponseEntity<any>> {

        const requestMappings : Array<RequestControllerMappingObject> = this._getRequestMappings();

        if (requestMappings.length === 0) {
            LOG.error('No request mappers defined to handle the request!');
            return ResponseEntity.notFound();
        }

        // LOG.debug('raw url: ', urlString);

        const method       : RequestMethod = parseRequestMethod(methodString);
        const urlForParser : string        = `http://localhost${urlString ?? ''}`;

        const parsedUrl = new URL.URL(urlForParser);

        // LOG.debug('parsedUrl: ', parsedUrl);

        const requestPathName = parsedUrl.pathname;

        // LOG.debug('Request: ', stringifyRequestMethod(method), requestPathName, requestMappings);

        const allRoutes : RequestRouterMappingObject = RequestRouter._parseMappingArray(requestMappings);

        // LOG.debug('allRoutes: ', allRoutes);

        if (!has(allRoutes, requestPathName)) {
            return ResponseEntity.notFound();
        }

        const routes : Array<RequestRouterMappingPropertyObject> = filter(
            allRoutes[requestPathName],
            (item : RequestRouterMappingPropertyObject) : boolean => {
                return item.methods.indexOf(method) >= 0;
            }
        );

        // LOG.debug('routes: ', routes);

        if (routes.length === 0) {
            return ResponseEntity.methodNotAllowed();
        }

        let responseEntity : ResponseEntity<any> | undefined = undefined;

        const requestBodyRequired = parseRequestBody ? some(routes, item => item?.requestBodyRequired === true) : false;

        // LOG.debug('handleRequest: requestBodyRequired: ', requestBodyRequired);

        const requestBody = parseRequestBody && requestBodyRequired ? await parseRequestBody() : undefined;

        // LOG.debug('handleRequest: requestBody: ', requestBody);

        // Handle requests using controllers
        await reduce(routes, async (previousPromise, route: RequestRouterMappingPropertyObject) => {

            const stepParams = RequestRouter._bindRequestActionParams(parsedUrl.searchParams, requestBody, route.propertyParams);

            // LOG.debug('handleRequest: stepParams 1: ', stepParams);

            return previousPromise.then(async () => {

                // LOG.debug('handleRequest: stepParams 2: ', stepParams);

                const stepResult = await route.controller[route.propertyName](...stepParams);

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

            });

        }, Promise.resolve());

        LOG.debug('handleRequest: result finished: ', responseEntity);

        // This never happens really, since 'routes' will always have more than one item at this point.
        if (responseEntity === undefined) {
            return ResponseEntity.noContent();
        }

        return responseEntity;

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

    private static _parseMappingArray (
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
                                const propertyMethods : Array<RequestMethod> = propertyMappingItem.methods;
                                if (!RequestRouter._matchMethods(rootMethods, propertyMethods)) {
                                    return;
                                }

                                const propertyMethodsCommonWithRoot = RequestRouter._parseCommonMethods(rootMethods, propertyMethods);

                                const propertyPaths : Array<string> = propertyMappingItem.paths;

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

                    const propertyValue  : RequestControllerMethodObject       = controllerProperties[propertyKey];
                    const propertyParams : Array<RequestParamObject|null> = propertyValue.params;

                    forEach(propertyValue.mappings, (propertyMappingItem : RequestMappingObject) => {

                        const propertyMethods : Array<RequestMethod> = propertyMappingItem.methods;
                        const propertyPaths   : Array<string>        = propertyMappingItem.paths;

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
        rootMethods : Array<RequestMethod>,
        propertyMethods : Array<RequestMethod>
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
        rootMethods : Array<RequestMethod>,
        propertyMethods : Array<RequestMethod>
    ) : Array<RequestMethod> {
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
        searchParams : URLSearchParams,
        requestBody  : Json | undefined,
        params       : Array<RequestParamObject|null>
    ) : Array<any> {

        return map(params, (item : RequestParamObject|null) : any => {

            if ( item === null ) {
                return undefined;
            }

            if ( item.type === RequestParamType.BODY ) {
                return requestBody;
            }

            // FIXME: Handle types
            if (isRequestQueryParamObject(item)) {

                const key = item.queryParam;
                if (!searchParams.has(key)) return undefined;

                const value : string | null = searchParams.get(key);

                if (isNull(value)) return undefined;

                return RequestRouter._castParam(value, item.type);

            }

            throw new TypeError(`Unsupported item type: ${item}`);

        });

    }

    private static _castParam (
        value : string,
        type  : RequestParamType
    ) : any {

        switch (type) {

            case RequestParamType.STRING:
                return value;

            case RequestParamType.INTEGER:
                return parseInt(value, 10);

            case RequestParamType.NUMBER:
                return parseFloat(value);

        }

        throw new TypeError(`Unsupported type: ${type}`)
    }

}

export default RequestRouter;

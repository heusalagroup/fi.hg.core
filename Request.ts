// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMethod from "./request/types/RequestMethod";
import LogService from "./LogService";
import RequestController from "./request/types/RequestController";
import RequestControllerUtils from "./request/RequestControllerUtils";
import RequestMappingArray from "./request/types/RequestMappingArray";
import RequestParamValueType, {isRequestParamValueType} from "./request/types/RequestParamValueType";
import {isBoolean, isNumber, isObject, isString} from "./modules/lodash";
import RequestStatus from "./request/types/RequestStatus";
import RequestType from "./request/types/RequestType";
import RequestError, {createRequestError} from "./request/types/RequestError";
import ResponseEntity from "./request/ResponseEntity";
import Headers from "./request/Headers";
import DefaultHeaderMapValuesType from "./request/types/DefaultHeaderMapValuesType";
import DefaultPathVariableMapValuesType from "./request/types/DefaultPathVariableMapValuesType";
import MethodDecoratorFunction from "./request/types/MethodDecoratorFunction";
import ParameterDecoratorFunction from "./request/types/ParameterDecoratorFunction";
import RequestHeaderListOptions, {isRequestHeaderListOptions} from "./request/types/RequestHeaderListOptions";
import RequestHeaderOptions, {isRequestHeaderOptions} from "./request/types/RequestHeaderOptions";
import RequestPathVariableListOptions from "./request/types/RequestPathVariableListOptions";
import RequestPathVariableOptions, {isRequestPathVariableOptions} from "./request/types/RequestPathVariableOptions";
import ParameterOrMethodDecoratorFunction from "./request/types/ParameterOrMethodDecoratorFunction";

const LOG = LogService.createLogger('Request');

// noinspection JSUnusedGlobalSymbols
export class Request {

    public static Method         = RequestMethod;
    public static Status         = RequestStatus;
    public static ParamType      = RequestParamValueType;
    public static Type           = RequestType;
    public static Error          = RequestError;

    // @RequestMapping

    /**
     *
     * @param config
     */
    public static mapping (
        ...config : RequestMappingArray
    ) : MethodDecoratorFunction {

        // LOG.debug('mapping: init: ', config);

        return (
            target       : any | Function,
            propertyKey ?: string,
            descriptor  ?: PropertyDescriptor
        ) => {

            const requestController = RequestControllerUtils.findController(target);

            if (requestController !== undefined) {

                if (propertyKey === undefined) {
                    RequestControllerUtils.attachControllerMapping(requestController, config);
                } else {
                    RequestControllerUtils.attachControllerMethodMapping(requestController, config, propertyKey);
                }

            } else {

                LOG.debug(".mapping for other: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=',descriptor);

            }

        };

    }

    /**
     *
     * @param config
     * @deprecated Use @RequestMapping or @Request.mapping
     */
    public static Mapping (
        ...config : RequestMappingArray
    ) : MethodDecoratorFunction {
        return Request.mapping(...config);
    }

    // @RequestParam

    public static param (
        queryParam  : string,
        paramType  ?: RequestParamValueType
    ) : ParameterDecoratorFunction;

    public static param (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) : void;

    /**
     * The implementation
     *
     * @param arg1
     * @param arg2
     * @param arg3
     */
    public static param (
        arg1  : any | Function | string,
        arg2 ?: string | RequestParamValueType,
        arg3 ?: number
    ) : ParameterDecoratorFunction | void {

        if ( isString(arg1) && arg3 === undefined && ( arg2 === undefined || isRequestParamValueType(arg2) ) ) {

            const queryParam = arg1;
            const paramType  : RequestParamValueType = arg2 ?? RequestParamValueType.STRING;

            return (
                target       : any | Function,
                propertyKey ?: string,
                paramIndex  ?: number
            ) => {
                Request._param(target, propertyKey, paramIndex, queryParam, paramType);
            };

        } else {

            const target      = arg1;
            const propertyKey = arg2;
            const paramIndex  = arg3;
            const paramType   = RequestParamValueType.STRING;

            // FIXME: We cannot get the name of the query parameter yet, so this will break later!
            const queryParam = `${paramIndex}`;

            Request._param(target, propertyKey, paramIndex, queryParam, paramType);

        }

    }

    /**
     * The internal implementation
     *
     * @param target
     * @param propertyKey
     * @param paramIndex
     * @param queryParam
     * @param paramType
     * @private
     */
    private static _param (
        target      : any,
        propertyKey : any,
        paramIndex  : any,
        queryParam  : string,
        paramType   : RequestParamValueType
    ) {

        const requestController = Request._getRequestController(target, propertyKey, paramIndex);

        if ( requestController !== undefined ) {

            RequestControllerUtils.setControllerMethodQueryParam(requestController, propertyKey, paramIndex, queryParam, paramType);

        } else {

            LOG.warn(
                '.Param: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex
            );

        }


    }

    private static _getRequestController (
        target      : any,
        propertyKey : any,
        paramIndex  : any
    ) : RequestController | undefined {

        if ( isString(propertyKey) && isNumber(paramIndex) ) {
            return RequestControllerUtils.findController(target);
        } else {
            return undefined;
        }

    }

    /**
     *
     * @param arg1
     * @param arg2
     * @param arg3
     * @deprecated Use @RequestParam or @Request.param
     */
    public static Param (
        arg1  : any | Function | string,
        arg2 ?: string | RequestParamValueType,
        arg3 ?: number
    ) : ParameterDecoratorFunction | void {
        // @ts-ignore
        return Request.param(arg1, arg2, arg3);
    }

    // @RequestHeader

    public static header (
        opts ?: RequestHeaderListOptions
    ) : ParameterDecoratorFunction;

    public static header (
        headerName  : string,
        opts       ?: RequestHeaderOptions
    ) : ParameterDecoratorFunction;

    public static header (
        target       : any | Function,
        propertyKey  : string,
        paramIndex   : number
    ) : void;

    public static header (
        arg1 ?: string | RequestHeaderListOptions | any | Function,
        arg2 ?: string | RequestHeaderOptions | boolean | undefined,
        arg3 ?: number
    ) : void | ParameterDecoratorFunction {

        LOG.debug('Request.Header: ', arg1, arg2, arg3);

        if ( isString(arg2) && isNumber(arg3) ) {
            Request._setMethodHeaderMap(arg1, arg2, arg3, undefined);
            return;
        }

        if ( isString(arg1) ) {

            const headerName : string = arg1;

            if ( !( arg2 === undefined || isRequestHeaderOptions(arg2) ) ) {
                throw new TypeError(`RequestHeader: Argument 2 is not type of RequestHeaderOptions: ${arg2}`);
            }

            const headerNameOpts : RequestHeaderOptions | undefined = arg2;

            let isRequired   : boolean | undefined = undefined;
            let defaultValue : string  | undefined = undefined;

            if (headerNameOpts === undefined) {

            } else if (isBoolean(headerNameOpts)) {

                isRequired = headerNameOpts;

            } else if ( isObject(headerNameOpts)) {

                isRequired   = headerNameOpts?.required     ?? undefined;
                defaultValue = headerNameOpts?.defaultValue ?? undefined;

            } else {
                throw new TypeError('RequestHeader: Invalid type of options');
            }

            LOG.debug('.Header: init: ', headerName);

            return (
                target       : any | Function,
                propertyKey ?: string,
                paramIndex  ?: number
            ) => {

                if ( isString(propertyKey) && isNumber(paramIndex) ) {

                    const requestController : RequestController | undefined = RequestControllerUtils.findController(target);

                    if ( requestController !== undefined ) {
                        RequestControllerUtils.setControllerMethodHeader(requestController, propertyKey, paramIndex, headerName, RequestParamValueType.STRING, isRequired, defaultValue);
                        return;
                    }

                }

                LOG.warn('.Header: Unrecognized configuration: ',
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

            };

        }

        let opts : RequestHeaderListOptions | undefined = arg1;

        if (!(opts === undefined || isRequestHeaderListOptions(opts))) {
            throw new TypeError('RequestHeader: Invalid type of options');
        }

        const defaultValues: DefaultHeaderMapValuesType | undefined = opts?.defaultValues;

        return (
            target: any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {

            if (isString(propertyKey) && isNumber(paramIndex)) {

                Request._setMethodHeaderMap(target, propertyKey, paramIndex, defaultValues);

            } else {

                LOG.warn('.Header: Unrecognized configuration: ',
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

            }

        };

    }

    /**
     * Private helper
     *
     * @param target
     * @param propertyKey
     * @param paramIndex
     * @param defaultValues
     * @private
     */
    private static _setMethodHeaderMap (
        target        : any,
        propertyKey   : string,
        paramIndex    : number,
        defaultValues : DefaultHeaderMapValuesType | undefined
    ) {

        const requestController : RequestController | undefined = RequestControllerUtils.findController(target);

        if (requestController !== undefined) {

            RequestControllerUtils.setControllerMethodHeaderMap(requestController, propertyKey, paramIndex, defaultValues);

        } else {

            LOG.warn('.Header: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex);

        }

    }

    /**
     * The implementation
     *
     * @param arg1
     * @param arg2
     * @param arg3
     * @deprecated Use @RequestHeader or @Request.header
     */
    public static Header (
        arg1 ?: string | RequestHeaderListOptions | any | Function,
        arg2 ?: string | RequestHeaderOptions | boolean | undefined,
        arg3 ?: number
    ) : void | ParameterDecoratorFunction {
        // @ts-ignore
        return Request.header(arg1, arg2, arg3);
    }

    // @PathVariable

    public static pathVariable (
        opts ?: RequestPathVariableListOptions
    ) : ParameterDecoratorFunction;

    public static pathVariable (
        headerName  : string,
        opts       ?: RequestPathVariableOptions
    ) : ParameterDecoratorFunction;

    public static pathVariable (
        target       : any | Function,
        propertyKey  : string,
        paramIndex   : number
    ) : void;

    /**
     * The implementation
     *
     * @param arg1
     * @param arg2
     * @param arg3
     */
    public static pathVariable (
        arg1 ?: string | RequestPathVariableListOptions | any | Function,
        arg2 ?: string | RequestPathVariableOptions | boolean | undefined,
        arg3 ?: number
    ) : void | ParameterDecoratorFunction {

        LOG.debug('Request.PathVariable: ', arg1, arg2, arg3);

        if ( isString(arg2) && isNumber(arg3) ) {

            const target      : any | Function = arg1;
            const propertyKey : string         = arg2;
            const paramIndex  : number         = arg3;

            Request._setPathVariableMap(target, propertyKey, paramIndex, undefined);

            return;

        }

        const variableName     : string | RequestPathVariableListOptions | undefined = arg1;

        if (isString(variableName)) {

            if (!(arg2 === undefined || isRequestPathVariableOptions(arg2))) {
                throw new TypeError(`RequestPathVariable: Argument 2 is not type of RequestPathVariableOptions: ${arg2}`);
            }

            const headerNameOpts : RequestPathVariableOptions | undefined = arg2;

            let isRequired   : boolean | undefined = undefined;
            let defaultValue : string  | undefined = undefined;
            let decodeValue  : boolean             = true;

            if (headerNameOpts === undefined) {

            } else if (isBoolean(headerNameOpts)) {

                isRequired = headerNameOpts;

            } else if ( isObject(headerNameOpts)) {

                isRequired   = headerNameOpts?.required     ?? undefined;
                defaultValue = headerNameOpts?.defaultValue ?? undefined;
                decodeValue  = headerNameOpts?.decodeValue  ?? true;

            } else {
                throw new TypeError('RequestPathVariable: Invalid type of options');
            }

            LOG.debug('.PathVariable: init: ', variableName);

            return (
                target       : any | Function,
                propertyKey ?: string,
                paramIndex  ?: number
            ) => {

                if ( isString(propertyKey) && isNumber(paramIndex) ) {

                    const requestController : RequestController | undefined = RequestControllerUtils.findController(target);

                    if (requestController !== undefined) {
                        RequestControllerUtils.setControllerMethodPathVariable(requestController, propertyKey, paramIndex, variableName, RequestParamValueType.STRING, isRequired, decodeValue, defaultValue);
                        return;
                    }

                }

                LOG.warn('.PathVariable: Unrecognized configuration: ',
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

            };

        }

        let opts : RequestPathVariableListOptions | undefined = variableName;

        if ( opts === undefined || isObject(opts?.defaultValues) ) {

        } else {
            throw new TypeError('RequestPathVariable: Invalid type of options');
        }

        const defaultValues : DefaultPathVariableMapValuesType | undefined = opts ? opts?.defaultValues ?? undefined : undefined;

        return (
            target       : any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {

            if ( isString(propertyKey) && isNumber(paramIndex) ) {

                Request._setPathVariableMap(target, propertyKey, paramIndex, defaultValues);

            } else {

                LOG.warn('.PathVariable: Unrecognized configuration: ',
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

            }

        };

    }

    private static _setPathVariableMap (
        target        : any | Function,
        propertyKey   : string,
        paramIndex    : number,
        defaultValues : DefaultPathVariableMapValuesType | undefined
    ) {

        const requestController : RequestController | undefined = RequestControllerUtils.findController(target);

        if (requestController !== undefined) {
            RequestControllerUtils.setControllerMethodPathVariableMap(requestController, propertyKey, paramIndex, defaultValues);
            return;
        }

        LOG.warn('.PathVariable: Unrecognized configuration: ',
            "; target=", target,
            "; propertyKey=", propertyKey,
            "; paramIndex=", paramIndex);

    }

    /**
     *
     * @param arg1
     * @param arg2
     * @param arg3
     * @deprecated Use @PathVariable or @Request.pathVariable
     */
    public static PathVariable (
        arg1 ?: string | RequestPathVariableListOptions | any | Function,
        arg2 ?: string | RequestPathVariableOptions | boolean | undefined,
        arg3 ?: number
    ) : void | ParameterDecoratorFunction {
        // @ts-ignore
        return Request.pathVariable(arg1, arg2, arg3);
    }


    // @ModelAttribute

    /**
     * The implementation
     *
     * @param attributeName
     */
    public static modelAttribute (
        attributeName : string
    ) : ParameterOrMethodDecoratorFunction {

        LOG.debug('Request.modelAttribute: ', attributeName);

        if (!isString(attributeName)) {
            throw new TypeError(`Request.modelAttribute: Argument 1 is not string: ${attributeName}`);
        }

        // Return types:
        // - ParameterDecoratorFunction  = any | Function, string, PropertyDescriptor
        // - MethodDecoratorFunction     = any | Function, string, number
        return (
            target       : any | Function,
            propertyKey ?: string,
            paramIndex  ?: number | PropertyDescriptor
        ) => {

            if ( isString(propertyKey) ) {

                const requestController: RequestController | undefined = RequestControllerUtils.findController(target);

                if (requestController !== undefined) {

                    if (isNumber(paramIndex)) {

                        RequestControllerUtils.setControllerMethodModelAttributeParam(requestController, propertyKey, paramIndex, attributeName, RequestParamValueType.JSON);
                        return;

                    } else if (paramIndex !== undefined) {

                        RequestControllerUtils.attachControllerMethodModelAttributeBuilder(requestController, propertyKey, paramIndex, attributeName);
                        return;

                    }

                }
            }

            LOG.warn('.modelAttribute: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex);

        };

    }


    // @RequestBody

    public static body (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) : void {

        const requestController : RequestController | undefined = RequestControllerUtils.findController(target);

        if ( requestController !== undefined && isString(propertyKey) && isNumber(paramIndex) ) {

            RequestControllerUtils.setControllerMethodBodyParam(requestController, propertyKey, paramIndex, RequestParamValueType.JSON);

        } else {

            LOG.warn('.body: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex);

        }

    }

    /**
     * @param target
     * @param propertyKey
     * @param paramIndex
     * @deprecated Use @RequestBody or @Request.body
     */
    public static Body (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) {
        return Request.body(target, propertyKey, paramIndex);
    }

    // @OptionsMapping / @Request.Options

    public static optionsMapping (...config : RequestMappingArray) {
        return Request.mapping(Request.Method.OPTIONS, ...config);
    }

    // @GetMapping / @Request.Get

    public static getMapping (...config : RequestMappingArray) {
        return Request.mapping(Request.Method.GET, ...config);
    }

    /**
     *
     * @param config
     * @deprecated Use @GetMapping or @Request.getMapping
     */
    public static Get (...config : RequestMappingArray) {
        return Request.getMapping(...config);
    }


    // @PostMapping / @Request.Post

    public static postMapping (...config : RequestMappingArray) {
        return Request.mapping(Request.Method.POST, ...config);
    }

    /**
     *
     * @param config
     * @deprecated Use @PostMapping or @Request.postMapping
     */
    public static Post (...config : RequestMappingArray) {
        return Request.postMapping(...config);
    }


    // @DeleteMapping / @Request.Delete

    public static deleteMapping (...config : RequestMappingArray) {
        return Request.mapping(Request.Method.DELETE, ...config);
    }

    /**
     *
     * @param config
     * @deprecated Use @DeleteMapping or @Request.deleteMapping
     */
    public static Delete (...config : RequestMappingArray) {
        return Request.deleteMapping(...config);
    }


    // @PutMapping / @Request.Put

    public static putMapping (...config : RequestMappingArray) {
        return Request.mapping(Request.Method.PUT, ...config);
    }

    /**
     *
     * @param config
     * @deprecated Use @PutMapping or @Request.putMapping
     */
    public static Put (...config : RequestMappingArray) {
        return Request.putMapping(...config);
    }


    public static createBadRequestError (message : string) {
        return createRequestError(RequestStatus.BadRequest, message);
    }

    public static createNotFoundRequestError (message : string) {
        return createRequestError(RequestStatus.NotFound, message);
    }

    public static createMethodNotAllowedRequestError (message : string) {
        return createRequestError(RequestStatus.MethodNotAllowed, message);
    }

    public static createConflictRequestError (message : string) {
        return createRequestError(RequestStatus.Conflict, message);
    }

    public static createInternalErrorRequestError (message : string) {
        return createRequestError(RequestStatus.InternalServerError, message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwBadRequestError (message : string) {
        throw Request.createBadRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwNotFoundRequestError (message : string) {
        throw Request.createNotFoundRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwMethodNotAllowedRequestError (message : string) {
        throw Request.createMethodNotAllowedRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwConflictRequestError (message : string) {
        throw Request.createConflictRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwInternalErrorRequestError (message : string) {
        throw Request.createInternalErrorRequestError(message);
    }

}

// noinspection JSUnusedGlobalSymbols
export function RequestMapping (...config : RequestMappingArray) {
    return Request.mapping(...config);
}

// noinspection JSUnusedGlobalSymbols
export function RequestParam (
    queryParam  : string,
    paramType  ?: RequestParamValueType
) : ParameterDecoratorFunction;

// noinspection JSUnusedGlobalSymbols
export function RequestParam (
    target       : any | Function,
    propertyKey ?: string,
    paramIndex  ?: number
) : void;

// noinspection JSUnusedGlobalSymbols
export function RequestParam (
    arg1  : any | Function | string,
    arg2 ?: string | RequestParamValueType,
    arg3 ?: number
) : ParameterDecoratorFunction | void {
    // @ts-ignore
    return Request.param(arg1, arg2, arg3);
}

// RequestHeader overloads & implementation

// noinspection JSUnusedGlobalSymbols
export function RequestHeader (
    opts ?: RequestHeaderListOptions
) : ParameterDecoratorFunction;

// noinspection JSUnusedGlobalSymbols
export function RequestHeader (
    headerName  : string,
    opts       ?: RequestHeaderOptions
) : ParameterDecoratorFunction;

// noinspection JSUnusedGlobalSymbols
export function RequestHeader (
    target       : any | Function,
    propertyKey  : string,
    paramIndex   : number
) : void;

// noinspection JSUnusedGlobalSymbols
export function RequestHeader (
    arg1 ?: string | RequestHeaderListOptions | Function | any,
    arg2 ?: string | RequestHeaderOptions | boolean | undefined,
    arg3 ?: number
) : ParameterDecoratorFunction | void {

    LOG.debug('RequestHeader: ', arg1, arg2, arg3);

    // @ts-ignore
    return Request.header(arg1, arg2, arg3);

}


// noinspection JSUnusedGlobalSymbols
export function PathVariable (
    opts ?: RequestPathVariableListOptions
) : ParameterDecoratorFunction;

// noinspection JSUnusedGlobalSymbols
export function PathVariable (
    variableName  : string,
    opts         ?: RequestPathVariableOptions
) : ParameterDecoratorFunction;

// noinspection JSUnusedGlobalSymbols
export function PathVariable (
    target       : any | Function,
    propertyKey  : string,
    paramIndex   : number
) : void;

// noinspection JSUnusedGlobalSymbols
export function PathVariable (
    arg1 ?: string | RequestPathVariableListOptions | any | Function,
    arg2 ?: string | RequestPathVariableOptions | boolean | undefined,
    arg3 ?: number
) : void | ParameterDecoratorFunction {
    // @ts-ignore
    return Request.pathVariable(arg1, arg2, arg3);
}


// noinspection JSUnusedGlobalSymbols
export function ModelAttribute (
    attributeName : string
) : ParameterOrMethodDecoratorFunction {
    return Request.modelAttribute(attributeName);
}

// noinspection JSUnusedGlobalSymbols
export function OptionsMapping (...config : RequestMappingArray) {
    return Request.optionsMapping(...config);
}

// noinspection JSUnusedGlobalSymbols
export function GetMapping (...config : RequestMappingArray) {
    return Request.getMapping(...config);
}

// noinspection JSUnusedGlobalSymbols
export function PostMapping (...config : RequestMappingArray) {
    return Request.postMapping(...config);
}

// noinspection JSUnusedGlobalSymbols
export function PutMapping (...config : RequestMappingArray) {
    return Request.putMapping(...config);
}

// noinspection JSUnusedGlobalSymbols
export function DeleteMapping (...config : RequestMappingArray) {
    return Request.deleteMapping(...config);
}

// noinspection JSUnusedGlobalSymbols
export function RequestBody (
    target       : any | Function,
    propertyKey ?: string,
    paramIndex  ?: number
) : void {
    return Request.body(target, propertyKey, paramIndex);
}

export default Request;

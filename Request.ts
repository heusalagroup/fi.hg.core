// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMethod from "./request/types/RequestMethod";
import LogService from "./LogService";
import {isRequestController} from "./request/types/RequestController";
import RequestControllerUtils from "./request/RequestControllerUtils";
import RequestMappingArray from "./request/types/RequestMappingArray";
import RequestParamValueType, {isRequestParamValueType} from "./request/types/RequestParamValueType";
import {isBoolean, isFunction, isNumber, isObject, isString} from "./modules/lodash";
import RequestStatus from "./request/types/RequestStatus";
import RequestType from "./request/types/RequestType";
import RequestError, {createRequestError} from "./request/types/RequestError";
import ResponseEntity from "./request/ResponseEntity";
import Headers from "./request/Headers";
import {DefaultHeaderMapValuesType} from "./request/types/RequestHeaderMapParamObject";

const LOG = LogService.createLogger('Request');

export interface RequestMappingDecorator {

    (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ) : void;

}

export interface RequestMethodParamDecorator {

    (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) : void;

}

export interface RequestHeaderListOptions {

    defaultValues ?: DefaultHeaderMapValuesType;

}

export interface RequestHeaderOptions {

    required     ?: boolean;
    defaultValue ?: string | undefined;

}

export function isRequestHeaderOptions (value : any) : value is RequestHeaderOptions {

    return (
        !!value
        && (     value?.required === undefined || isBoolean(value?.required)    )
        && ( value?.defaultValue === undefined || isString(value?.defaultValue) )
    );

}

export class Request {

    public static Method         = RequestMethod;
    public static Status         = RequestStatus;
    public static ParamType      = RequestParamValueType;
    public static Type           = RequestType;
    public static Error          = RequestError;

    public static Mapping (
        ...config : RequestMappingArray
    ) : RequestMappingDecorator {

        // LOG.debug('mapping: init: ', config);

        return (
            target       : any | Function,
            propertyKey ?: string,
            descriptor  ?: PropertyDescriptor
        ) => {

            // LOG.debug('mapping: target: ', isFunction(target), isRequestController(target), target);

            if ( isFunction(target) && isRequestController(target) ) {

                if (propertyKey === undefined) {

                    // LOG.debug('.mapping for ContainerController: config=', config, 'target=', target);

                    RequestControllerUtils.attachControllerMapping(target, config);

                } else {

                    // LOG.debug(".mapping for ContainerController's method: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor);

                    RequestControllerUtils.attachControllerMethodMapping(target, config, propertyKey);

                }

            } else if (isRequestController(target?.constructor)) {

                if (propertyKey === undefined) {

                    // LOG.debug('.mapping for ContainerController through constructor: config=', config, 'target=', target);

                    RequestControllerUtils.attachControllerMapping(target.constructor, config);

                } else {

                    // LOG.debug(".mapping for ContainerController's method through constructor: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor);

                    RequestControllerUtils.attachControllerMethodMapping(target.constructor, config, propertyKey);

                }

            } else {

                LOG.debug(".mapping for other: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=',descriptor);

            }

        };

    }

    /**
     *
     * @param config
     * @deprecated Use @Request.Mapping or @RequestMapping
     */
    public static mapping (
        ...config : RequestMappingArray
    ) : RequestMappingDecorator {
        return this.Mapping(...config);
    }

    public static Param (
        queryParam  : string,
        paramType  ?: RequestParamValueType
    ) : RequestMethodParamDecorator;

    public static Param (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) : void;

    public static Param (
        arg1  : any | Function | string,
        arg2 ?: string | RequestParamValueType,
        arg3 ?: number
    ) : RequestMethodParamDecorator | void {

        if ( isString(arg1) && arg3 === undefined && ( arg2 === undefined || isRequestParamValueType(arg2) ) ) {

            const queryParam = arg1;
            const paramType  : RequestParamValueType = arg2 ?? RequestParamValueType.STRING;

            return (
                target       : any | Function,
                propertyKey ?: string,
                paramIndex  ?: number
            ) => {

                if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {
                    RequestControllerUtils.setControllerMethodQueryParam(target, propertyKey, paramIndex, queryParam, paramType);
                    return;
                }

                if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {
                    RequestControllerUtils.setControllerMethodQueryParam(target.constructor, propertyKey, paramIndex, queryParam, paramType);
                    return;
                }

                LOG.warn('.Param: Unrecognized configuration: ',
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

            };

        }

        const target      = arg1;
        const propertyKey = arg2;
        const paramIndex  = arg3;
        const paramType   = RequestParamValueType.STRING;

        // FIXME: We cannot get the name of the parameter yet, so this will break later!
        const queryParam = `${paramIndex}`;

        if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {
            RequestControllerUtils.setControllerMethodQueryParam(target, propertyKey, paramIndex, queryParam, paramType);
            return;
        }

        if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {
            RequestControllerUtils.setControllerMethodQueryParam(target.constructor, propertyKey, paramIndex, queryParam, paramType);
            return;
        }

        LOG.warn('.Param: Unrecognized configuration: ',
            "; target=", target,
            "; propertyKey=", propertyKey,
            "; paramIndex=", paramIndex);

    }

    public static Header (
        opts ?: RequestHeaderListOptions
    ) : RequestMethodParamDecorator;

    public static Header (
        headerName  : string,
        opts       ?: RequestHeaderOptions
    ) : RequestMethodParamDecorator;

    public static Header (
        target       : any | Function,
        propertyKey  : string,
        paramIndex   : number
    ) : void;

    public static Header (
        arg1 ?: string | RequestHeaderListOptions | any | Function,
        arg2 ?: string | RequestHeaderOptions | boolean | undefined,
        arg3 ?: number
    ) : void | RequestMethodParamDecorator {

        LOG.debug('Request.Header: ', arg1, arg2, arg3);

        if ( isString(arg2) && isNumber(arg3) ) {

            const target      : any | Function = arg1;
            const propertyKey : string         = arg2;
            const paramIndex  : number         = arg3;

            if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {
                RequestControllerUtils.setControllerMethodHeaderMap(target, propertyKey, paramIndex, undefined);
                return;
            }

            if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {
                RequestControllerUtils.setControllerMethodHeaderMap(target.constructor, propertyKey, paramIndex, undefined);
                return;
            }

            LOG.warn('.Header: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex);

            return;

        }

        const headerName     : string | RequestHeaderListOptions | undefined = arg1;

        if (isString(headerName)) {

            if (!(arg2 === undefined || isRequestHeaderOptions(arg2))) {
                throw new TypeError(`RequestHeader: Argument 2 is not type of RequestHeaderOptions: ${arg2}`);
            }

            const headerNameOpts : RequestHeaderOptions | undefined = arg2;

            let isRequired   : boolean            = false;
            let defaultValue : string | undefined = undefined;

            if (headerNameOpts === undefined) {

            } else if (isBoolean(headerNameOpts)) {

                isRequired = headerNameOpts;

            } else if ( isObject(headerNameOpts)) {

                isRequired   = headerNameOpts?.required     ?? false;
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

                if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {
                    RequestControllerUtils.setControllerMethodHeader(target, propertyKey, paramIndex, headerName, RequestParamValueType.STRING, isRequired, defaultValue);
                    return;
                }

                if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {
                    RequestControllerUtils.setControllerMethodHeader(target.constructor, propertyKey, paramIndex, headerName, RequestParamValueType.STRING, isRequired, defaultValue);
                    return;
                }

                LOG.warn('.Header: Unrecognized configuration: ',
                    "; target=", target,
                    "; propertyKey=", propertyKey,
                    "; paramIndex=", paramIndex);

            };

        }

        let opts : RequestHeaderListOptions | undefined = headerName;

        if ( opts === undefined || isObject(opts?.defaultValues) ) {

        } else {
            throw new TypeError('RequestHeader: Invalid type of options');
        }

        const defaultValues : DefaultHeaderMapValuesType | undefined = opts ? opts?.defaultValues ?? undefined : undefined;

        return (
            target       : any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {

            if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {
                RequestControllerUtils.setControllerMethodHeaderMap(target, propertyKey, paramIndex, defaultValues);
                return;
            }

            if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {
                RequestControllerUtils.setControllerMethodHeaderMap(target.constructor, propertyKey, paramIndex, defaultValues);
                return;
            }

            LOG.warn('.Header: Unrecognized configuration: ',
                "; target=", target,
                "; propertyKey=", propertyKey,
                "; paramIndex=", paramIndex);

        };

    }

    /**
     *
     * @param queryParam
     * @param paramType
     * @deprecated Use @RequestParam or @Request.Param instead
     */
    public static param (
        queryParam : string,
        paramType  : RequestParamValueType = Request.ParamType.STRING
    ) {
        return this.Param(queryParam, paramType);
    }

    public static Body (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) : void {

        if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {
            RequestControllerUtils.setControllerMethodBodyParam(target, propertyKey, paramIndex, RequestParamValueType.JSON);
            return;
        }

        if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {
            RequestControllerUtils.setControllerMethodBodyParam(target.constructor, propertyKey, paramIndex, RequestParamValueType.JSON);
            return;
        }

        LOG.warn('.body: Unrecognized configuration: ',
            "; target=", target,
            "; propertyKey=", propertyKey,
            "; paramIndex=", paramIndex);

    }

    /**
     * @param target
     * @param propertyKey
     * @param paramIndex
     * @deprecated Use @Request.Body or @RequestBody
     */
    public static body (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) {
        return this.Body(target, propertyKey, paramIndex);
    }

    public static Get (...config : RequestMappingArray) {
        return Request.Mapping(Request.Method.GET, ...config);
    }

    public static Post (...config : RequestMappingArray) {
        return Request.Mapping(Request.Method.POST, ...config);
    }

    public static Delete (...config : RequestMappingArray) {
        return Request.Mapping(Request.Method.DELETE, ...config);
    }

    public static Put (...config : RequestMappingArray) {
        return Request.Mapping(Request.Method.PUT, ...config);
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
        return createRequestError(RequestStatus.InternalError, message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwBadRequestError (message : string) {
        throw this.createBadRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwNotFoundRequestError (message : string) {
        throw this.createNotFoundRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwMethodNotAllowedRequestError (message : string) {
        throw this.createMethodNotAllowedRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwConflictRequestError (message : string) {
        throw this.createConflictRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwInternalErrorRequestError (message : string) {
        throw this.createInternalErrorRequestError(message);
    }

}

export function RequestMapping (...config : RequestMappingArray) {
    return Request.Mapping(...config);
}

export function RequestParam (
    queryParam  : string,
    paramType  ?: RequestParamValueType
) : RequestMethodParamDecorator;

export function RequestParam (
    target       : any | Function,
    propertyKey ?: string,
    paramIndex  ?: number
) : void;

export function RequestParam (
    arg1  : any | Function | string,
    arg2 ?: string | RequestParamValueType,
    arg3 ?: number
) : RequestMethodParamDecorator | void {
    // @ts-ignore
    return Request.Param(arg1, arg2, arg3);
}

// RequestHeader overloads & implementation

export function RequestHeader (
    opts ?: RequestHeaderListOptions
) : RequestMethodParamDecorator;

export function RequestHeader (
    headerName  : string,
    opts       ?: RequestHeaderOptions
) : RequestMethodParamDecorator;

export function RequestHeader (
    target       : any | Function,
    propertyKey  : string,
    paramIndex   : number
) : void;

export function RequestHeader (
    arg1 ?: string | RequestHeaderListOptions | Function | any,
    arg2 ?: string | RequestHeaderOptions | boolean | undefined,
    arg3 ?: number
) : RequestMethodParamDecorator | void {

    LOG.debug('RequestHeader: ', arg1, arg2, arg3);

    // @ts-ignore
    return Request.Header(arg1, arg2, arg3);

    // if (arg3 === undefined) {
    //
    //     if (arg2 === undefined) {
    //
    //         if (arg1 === undefined) {
    //             return Request.Header();
    //         }
    //
    //         return Request.Header(arg1);
    //
    //     }
    //
    //     // @ts-ignore
    //     return Request.Header(arg1, arg2);
    //
    // } else {
    //
    //     // @ts-ignore
    //     return Request.Header(arg1, arg2, arg3);
    //
    // }

}

export function GetMapping (...config : RequestMappingArray) {
    return Request.Get(...config);
}

export function PostMapping (...config : RequestMappingArray) {
    return Request.Post(...config);
}

export function PutMapping (...config : RequestMappingArray) {
    return Request.Put(...config);
}

export function DeleteMapping (...config : RequestMappingArray) {
    return Request.Delete(...config);
}

export function RequestBody (
    target       : any | Function,
    propertyKey ?: string,
    paramIndex  ?: number
) : void {
    return Request.Body(target, propertyKey, paramIndex);
}

export {
    ResponseEntity,
    Headers,
    RequestError
};

export default Request;

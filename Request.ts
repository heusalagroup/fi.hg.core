// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestMethod from "./request/types/RequestMethod";
import LogService from "./LogService";
import {isRequestController} from "./request/types/RequestController";
import RequestControllerUtils from "./request/RequestControllerUtils";
import RequestMappingArray from "./request/types/RequestMappingArray";
import RequestParamType, {stringifyRequestParamType} from "./request/types/RequestParamType";
import {isFunction, isNumber, isObject, isString} from "./modules/lodash";
import RequestStatus from "./request/types/RequestStatus";
import RequestType from "./request/types/RequestType";
import RequestError, {createRequestError} from "./request/types/RequestError";
import ResponseEntity from "./request/ResponseEntity";
import Headers from "./request/Headers";

const LOG = LogService.createLogger('Request');

interface RequestMappingDecorator {

    (
        target       : any | Function,
        propertyKey ?: string,
        descriptor  ?: PropertyDescriptor
    ) : void;

}

export class Request {

    public static Method         = RequestMethod;
    public static Status         = RequestStatus;
    public static ParamType      = RequestParamType;
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

                    // LOG.debug('.mapping for RequestController: config=', config, 'target=', target);

                    RequestControllerUtils.attachControllerMapping(target, config);

                } else {

                    // LOG.debug(".mapping for RequestController's method: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor);

                    RequestControllerUtils.attachControllerMethodMapping(target, config, propertyKey);

                }

            } else if (isRequestController(target?.constructor)) {

                if (propertyKey === undefined) {

                    // LOG.debug('.mapping for RequestController through constructor: config=', config, 'target=', target);

                    RequestControllerUtils.attachControllerMapping(target.constructor, config);

                } else {

                    // LOG.debug(".mapping for RequestController's method through constructor: config=", config, 'target=', target, 'propertyKey=', propertyKey, 'descriptor=', descriptor);

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
        queryParam : string,
        paramType  : RequestParamType = Request.ParamType.STRING
    ) {

        // LOG.debug('.param: init: ', queryParam, paramType);

        return (
            target       : any | Function,
            propertyKey ?: string,
            paramIndex  ?: number
        ) => {

            // LOG.debug('.param: typeof(target):                          ', typeof target );
            // LOG.debug('.param: typeof(target.constructor):              ', typeof target?.constructor );
            // LOG.debug('.param: isObject(target):                        ', isObject(target));
            // LOG.debug('.param: isFunction(target):                      ', isFunction(target));
            // LOG.debug('.param: isRequestController(target):             ', isRequestController(target));
            // LOG.debug('.param: isFunction(target.constructor):          ', isFunction(target?.constructor));
            // LOG.debug('.param: isRequestController(target.constructor): ', isRequestController(target?.constructor));
            // LOG.debug('.param: isString(propertyKey):                   ', isString(propertyKey));
            // LOG.debug('.param: isNumber(paramIndex):                    ', isNumber(paramIndex));

            if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {

                // LOG.debug('.param: configure 1: queryParam=', queryParam,
                //     "; paramType=", stringifyRequestParamType(paramType),
                //     "; target=", target,
                //     "; propertyKey=", propertyKey,
                //     "; paramIndex=", paramIndex);

                RequestControllerUtils.setControllerMethodQueryParam(target, propertyKey, paramIndex, queryParam, paramType);

                return;

            }

            if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {

                // LOG.debug('.param: configure 2: queryParam=', queryParam,
                //     "; paramType=", stringifyRequestParamType(paramType),
                //     "; target=", target,
                //     "; propertyKey=", propertyKey,
                //     "; paramIndex=", paramIndex);

                RequestControllerUtils.setControllerMethodQueryParam(target.constructor, propertyKey, paramIndex, queryParam, paramType);

                return;
            }

            // LOG.debug('.param: configure 3: queryParam=', queryParam,
            //     "; paramType=", stringifyRequestParamType(paramType),
            //     "; target=", target,
            //     "; propertyKey=", propertyKey,
            //     "; paramIndex=", paramIndex);

        }

    }

    /**
     *
     * @param queryParam
     * @param paramType
     * @deprecated Use @RequestParam or @Request.Param instead
     */
    public static param (
        queryParam : string,
        paramType  : RequestParamType = Request.ParamType.STRING
    ) {
        return this.Param(queryParam, paramType);
    }

    public static Body (
        target       : any | Function,
        propertyKey ?: string,
        paramIndex  ?: number
    ) {

        // LOG.debug('.body: typeof(target):                          ', typeof target );
        // LOG.debug('.body: typeof(target.constructor):              ', typeof target?.constructor );
        // LOG.debug('.body: isObject(target):                        ', isObject(target));
        // LOG.debug('.body: isFunction(target):                      ', isFunction(target));
        // LOG.debug('.body: isRequestController(target):             ', isRequestController(target));
        // LOG.debug('.body: isFunction(target.constructor):          ', isFunction(target?.constructor));
        // LOG.debug('.body: isRequestController(target.constructor): ', isRequestController(target?.constructor));
        // LOG.debug('.body: isString(propertyKey):                   ', isString(propertyKey));
        // LOG.debug('.body: isNumber(paramIndex):                    ', isNumber(paramIndex));

        if ( isFunction(target) && isRequestController(target) && isString(propertyKey) && isNumber(paramIndex) ) {

            // LOG.debug('.body: configure 1: ',
            //     "; target=", target,
            //     "; propertyKey=", propertyKey,
            //     "; paramIndex=", paramIndex);

            RequestControllerUtils.setControllerMethodBodyParam(target, propertyKey, paramIndex);

            return;

        }

        if ( isObject(target) && isFunction(target?.constructor) && isRequestController(target.constructor) && isString(propertyKey) && isNumber(paramIndex) ) {

            // LOG.debug('.body: configure 2: ',
            //     "; target=", target,
            //     "; propertyKey=", propertyKey,
            //     "; paramIndex=", paramIndex);

            RequestControllerUtils.setControllerMethodBodyParam(target.constructor, propertyKey, paramIndex);

            return;
        }

        LOG.debug('.body: configure 3: ',
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
) {
    return Request.Body(target, propertyKey, paramIndex);
}

export {
    ResponseEntity,
    Headers,
    RequestError
};

export default Request;

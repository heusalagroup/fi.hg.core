// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { OpenAPIV3 } from "../../types/openapi";
import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";
import { explainNot, explainOk } from "../../types/explain";

export enum RequestMethod {
    OPTIONS,
    GET,
    POST,
    PUT,
    DELETE,
    PATCH,
    TRACE,
    HEAD
}

export const FIRST_REQUEST_METHOD_NUMBER = 0;
export const LAST_REQUEST_METHOD_NUMBER = 7;

export function stringifyRequestMethod (value : RequestMethod) : string {
    if (isNumber(value)) {
        switch (value) {
            case RequestMethod.OPTIONS  : return 'options';
            case RequestMethod.GET      : return 'get';
            case RequestMethod.POST     : return 'post';
            case RequestMethod.PUT      : return 'put';
            case RequestMethod.DELETE   : return 'delete';
            case RequestMethod.PATCH    : return 'patch';
            case RequestMethod.TRACE    : return 'trace';
            case RequestMethod.HEAD     : return 'head';
        }
    }
    throw new TypeError(`Unsupported value for stringifyRequestMethod(): ${value}`)
}

export function isRequestMethod (value: unknown) : value is RequestMethod {
    return isNumber(value) && value >= FIRST_REQUEST_METHOD_NUMBER && value <= LAST_REQUEST_METHOD_NUMBER;
}

export function explainRequestMethod (value: any) : string {
    return isRequestMethod(value) ? explainOk() : explainNot('RequestMethod')
}

export function parseRequestMethod (value: any) : RequestMethod {
    if (isRequestMethod(value)) return value;
    if (isString(value)) {
        value = value.toLowerCase();
        switch(value) {
            case 'options' : return RequestMethod.OPTIONS;
            case 'get'     : return RequestMethod.GET;
            case 'post'    : return RequestMethod.POST;
            case 'put'     : return RequestMethod.PUT;
            case 'delete'  : return RequestMethod.DELETE;
            case 'patch'   : return RequestMethod.PATCH;
            case 'trace'   : return RequestMethod.TRACE;
            case 'head'   : return RequestMethod.HEAD;
            default: break;
        }
    }
    throw new TypeError(`Cannot parse value "${value}" as a valid RequestMethod`);
}

export function getOpenApiMethodFromRequestMethod (
    method: RequestMethod
) : OpenAPIV3.HttpMethods {
    switch (method) {
        case RequestMethod.OPTIONS : return OpenAPIV3.HttpMethods.OPTIONS;
        case RequestMethod.HEAD    : return OpenAPIV3.HttpMethods.HEAD;
        case RequestMethod.GET     : return OpenAPIV3.HttpMethods.GET;
        case RequestMethod.POST    : return OpenAPIV3.HttpMethods.POST;
        case RequestMethod.PUT     : return OpenAPIV3.HttpMethods.PUT;
        case RequestMethod.DELETE  : return OpenAPIV3.HttpMethods.DELETE;
        case RequestMethod.PATCH   : return OpenAPIV3.HttpMethods.PATCH;
        case RequestMethod.TRACE   : return OpenAPIV3.HttpMethods.TRACE;
        default: throw new TypeError('Unsupported method: '+method);
    }
}

export function getRequestMethodFromOpenApiMethod (
    method: OpenAPIV3.HttpMethods
) : RequestMethod {
    switch (method) {
        case OpenAPIV3.HttpMethods.OPTIONS : return RequestMethod.OPTIONS;
        case OpenAPIV3.HttpMethods.HEAD    : return RequestMethod.HEAD;
        case OpenAPIV3.HttpMethods.GET     : return RequestMethod.GET;
        case OpenAPIV3.HttpMethods.POST    : return RequestMethod.POST;
        case OpenAPIV3.HttpMethods.PUT     : return RequestMethod.PUT;
        case OpenAPIV3.HttpMethods.DELETE  : return RequestMethod.DELETE;
        case OpenAPIV3.HttpMethods.PATCH   : return RequestMethod.PATCH;
        case OpenAPIV3.HttpMethods.TRACE   : return RequestMethod.TRACE;
        default: throw new TypeError('Unsupported method: '+method);
    }
}

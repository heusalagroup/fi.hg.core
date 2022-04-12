// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {isNumber, isString} from "../../modules/lodash";

export enum RequestMethod {

    OPTIONS,
    GET,
    POST,
    PUT,
    DELETE,
    PATCH

}

export function stringifyRequestMethod (value : RequestMethod) : string {
    if (isNumber(value)) {
        switch (value) {
            case RequestMethod.OPTIONS  : return 'options';
            case RequestMethod.GET      : return 'get';
            case RequestMethod.POST     : return 'post';
            case RequestMethod.PUT      : return 'put';
            case RequestMethod.DELETE   : return 'delete';
            case RequestMethod.PATCH    : return 'patch';
        }
    }
    throw new TypeError(`Unsupported value for stringifyRequestMethod(): ${value}`)
}

export function isRequestMethod (value: any) : value is RequestMethod {
    return isNumber(value) && value >= 0 && value <= 5;
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

            default: break;

        }
    }

    throw new TypeError(`Cannot parse value "${value}" as a valid RequestMethod`);

}



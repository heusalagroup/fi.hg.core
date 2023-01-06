// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";

export enum RequestParamObjectType {

    REQUEST_BODY,
    QUERY_PARAM,
    REQUEST_HEADER,
    REQUEST_HEADER_MAP,
    PATH_VARIABLE,
    PATH_VARIABLE_MAP,
    MODEL_ATTRIBUTE

}

export function isRequestParamObjectType (value : any) : value is RequestParamObjectType {

    if (!isNumber(value)) return false;

    switch(value) {
        case RequestParamObjectType.REQUEST_BODY:
        case RequestParamObjectType.QUERY_PARAM:
        case RequestParamObjectType.REQUEST_HEADER:
        case RequestParamObjectType.REQUEST_HEADER_MAP:
        case RequestParamObjectType.PATH_VARIABLE:
        case RequestParamObjectType.PATH_VARIABLE_MAP:
        case RequestParamObjectType.MODEL_ATTRIBUTE:
            return true;
    }

    return false;

}

export function parseRequestParamObjectType (value: any) : RequestParamObjectType {

    if (isRequestParamObjectType(value)) return value;

    if (isString(value)) {
        const lowerCaseValue = value.toLowerCase();
        switch (lowerCaseValue) {
            case 'body'               : return RequestParamObjectType.REQUEST_BODY;
            case 'query_param'        : return RequestParamObjectType.QUERY_PARAM;
            case 'header'             : return RequestParamObjectType.REQUEST_HEADER;
            case 'header_map'         : return RequestParamObjectType.REQUEST_HEADER_MAP;
            case 'path_variable'      : return RequestParamObjectType.PATH_VARIABLE;
            case 'path_variable_map'  : return RequestParamObjectType.PATH_VARIABLE_MAP;
            case 'model_attribute'  : return RequestParamObjectType.MODEL_ATTRIBUTE;
        }
    }

    throw new TypeError(`Value was not parsable to RequestParamObjectType: "${value}"`);

}

export function stringifyRequestParamObjectType (value : RequestParamObjectType) : string {

    switch (value) {
        case RequestParamObjectType.REQUEST_BODY        : return 'body';
        case RequestParamObjectType.QUERY_PARAM         : return 'query_param';
        case RequestParamObjectType.REQUEST_HEADER      : return 'header';
        case RequestParamObjectType.REQUEST_HEADER_MAP  : return 'header_map';
        case RequestParamObjectType.PATH_VARIABLE       : return 'path_variable';
        case RequestParamObjectType.PATH_VARIABLE_MAP   : return 'path_variable_map';
        case RequestParamObjectType.MODEL_ATTRIBUTE     : return 'model_attribute';
    }

    throw new TypeError(`Unsupported value: "${value}"`);

}



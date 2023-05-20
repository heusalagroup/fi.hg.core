// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";

export enum RequestParamValueType {

    JSON,
    STRING,
    INTEGER,
    NUMBER,
    // BOOLEAN,

}

export function isRequestParamValueType (value : any) : value is RequestParamValueType {

    if (!isNumber(value)) return false;

    switch(value) {
        case RequestParamValueType.JSON:
        case RequestParamValueType.STRING:
        case RequestParamValueType.INTEGER:
        case RequestParamValueType.NUMBER:
        // case RequestParamValueType.BOOLEAN:
            return true;
    }

    return false;

}

export function isRequestParamValueTypeOrUndefined (value : any) : value is (undefined|RequestParamValueType) {
    return value === undefined || isRequestParamValueType(value);
}

export function parseRequestParamValueType (value: any) : RequestParamValueType {

    if (isRequestParamValueType(value)) return value;

    if (isString(value)) {
        const lowerCaseValue = value.toLowerCase();
        switch (lowerCaseValue) {
            case 'json'    : return RequestParamValueType.JSON;
            case 'string'  : return RequestParamValueType.STRING;
            case 'integer' : return RequestParamValueType.INTEGER;
            case 'number'  : return RequestParamValueType.NUMBER;
            // case 'boolean'  : return RequestParamValueType.BOOLEAN;
        }
    }

    throw new TypeError(`Value was not parsable to RequestParamType: "${value}"`);

}

export function stringifyRequestParamValueType (value : RequestParamValueType) : string {

    switch (value) {
        case RequestParamValueType.JSON     : return 'json';
        case RequestParamValueType.STRING   : return 'string';
        case RequestParamValueType.INTEGER  : return 'integer';
        case RequestParamValueType.NUMBER   : return 'number';
        // case RequestParamValueType.BOOLEAN  : return 'boolean';
    }

    throw new TypeError(`Unsupported value: "${value}"`);

}

export function getOpenApiTypeStringFromRequestParamValueType (value: RequestParamValueType) : "object" | "string" | "integer" | "number" {
    switch (value) {
        case RequestParamValueType.JSON    : return 'object';
        case RequestParamValueType.STRING  : return 'string';
        case RequestParamValueType.INTEGER : return 'integer';
        case RequestParamValueType.NUMBER  : return 'number';
        // case RequestParamValueType.BOOLEAN : return 'boolean';
    }
    throw new TypeError(`Unknown RequestParamValueType supplied to getOpenApiTypeString(): ${value}`);
}
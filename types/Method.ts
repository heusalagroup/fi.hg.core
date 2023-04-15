// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "./Enum";

export enum Method {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}

export function isMethod (value: unknown) : value is Method {
    switch (value) {
        case Method.GET:
        case Method.POST:
        case Method.DELETE:
            return true;
        default:
            return false;
    }
}

export function explainMethod (value : unknown) : string {
    return explainEnum("Method", Method, isMethod, value);
}

export function stringifyMethod (value : Method) : string {
    switch (value) {
        case Method.GET  : return 'GET';
        case Method.POST  : return 'POST';
        case Method.DELETE  : return 'DELETE';
    }
    throw new TypeError(`Unsupported Method value: ${value}`)
}

export function parseMethod (value: unknown) : Method | undefined {
    if (value === undefined) return undefined;
    switch(`${value}`.toUpperCase()) {
        case 'GET' : return Method.GET;
        case 'POST' : return Method.POST;
        case 'DELETE' : return Method.DELETE;
        default     : return undefined;
    }
}

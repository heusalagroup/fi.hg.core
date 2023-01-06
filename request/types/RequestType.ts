// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { isString } from "../../types/String";

export enum RequestType {

    ERROR = 'error',

}

export function isRequestType (value: any) : value is RequestType {

    switch (value) {

        case RequestType.ERROR:
            return true;

        default: break;

    }

    return false;

}

export function parseRequestType (value : any) : RequestType {

    if (isString(value)) {

        value = value.toLowerCase();

        switch (value) {

            case 'error':
                return RequestType.ERROR;

            default: break;

        }

    }

    throw new TypeError(`Unsupported value for RequestType: ${value}`)

}



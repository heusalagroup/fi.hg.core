// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {isNumber, isString, trim} from "../../modules/lodash";

export enum RequestStatus {
    OK             = 200,
    Created        = 201,
    BadRequest     = 400,
    NotFound       = 404,
    MethodNotAllowed = 405,
    Conflict       = 409,
    InternalError  = 500,
}

export function isRequestStatus (value: any) : value is RequestStatus {

    if (!isNumber(value)) return false;

    switch (value) {
        case RequestStatus.OK:
        case RequestStatus.Created:
        case RequestStatus.BadRequest:
        case RequestStatus.NotFound:
        case RequestStatus.Conflict:
        case RequestStatus.MethodNotAllowed:
        case RequestStatus.InternalError:
            return true;

    }

    return false;

}

export function stringifyRequestStatus (value : RequestStatus) : string {
    switch (value) {
        case RequestStatus.OK            : return 'OK';
        case RequestStatus.Created       : return 'Created';
        case RequestStatus.BadRequest    : return 'Bad Request';
        case RequestStatus.NotFound      : return 'Not Found';
        case RequestStatus.Conflict      : return 'Conflict';
        case RequestStatus.MethodNotAllowed : return 'Method Not Allowed';
        case RequestStatus.InternalError : return 'Internal Error';

    }
}

export function parseRequestStatus (value: any) : RequestStatus {

    if (isRequestStatus(value)) return value;

    if (isString(value)) {

        value = trim(value);

        const integerValue = parseInt(value, 10);
        if (isRequestStatus(integerValue)) return integerValue;

        value = value.toLowerCase().replace(/[ _-]+/g, "-");

        switch(value) {

            case 'ok'             : return RequestStatus.OK;
            case 'created'        : return RequestStatus.Created;
            case 'bad-request'    : return RequestStatus.BadRequest;
            case 'not-found'      : return RequestStatus.NotFound;
            case 'conflict'       : return RequestStatus.Conflict;
            case 'method-not-allowed' : return RequestStatus.MethodNotAllowed;
            case 'internal-error' : return RequestStatus.InternalError;

            default: break;

        }

    }

    throw new TypeError(`Cannot parse value "${value}" as a valid RequestStatus`);

}

export default RequestStatus;

// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import {isObject, isString} from "../../modules/lodash";
import InterfaceUtils from "../RequestInterfaceUtils";
import RequestStatus, {isRequestStatus, stringifyRequestStatus} from "./RequestStatus";
import RequestType from "./RequestType";

export interface RequestError {

    readonly type    : RequestType.ERROR;
    readonly status  : RequestStatus;
    readonly message : string;

}

export function createRequestError (
    status  : RequestStatus,
    message : string | undefined = undefined
) : RequestError {

    if (message === undefined) {
        message = stringifyRequestStatus(status);
    }

    return {
        type: RequestType.ERROR,
        status,
        message
    };

}

export function isRequestError (value : any) : value is RequestError {
    return (
        isObject(value)
        && InterfaceUtils.hasPropertyStatus(value)
        && InterfaceUtils.hasPropertyMessage(value)
        && isRequestStatus(value.status)
        && isString(value.message)
    );
}

export default RequestError;

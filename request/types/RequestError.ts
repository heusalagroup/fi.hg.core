// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import RequestStatus, {stringifyRequestStatus} from "./RequestStatus";
import JsonAny, {ReadonlyJsonObject} from "../../Json";
import RequestType from "./RequestType";
import RequestMethod from "./RequestMethod";

export class RequestError extends Error {

    public readonly status  : RequestStatus;
    public readonly method  : RequestMethod | undefined;
    public readonly url     : string | undefined;
    public readonly body    : JsonAny | undefined;

    private readonly __proto__: any;

    constructor(
        status  : number,
        message : string        | undefined = undefined,
        method  : RequestMethod | undefined = undefined,
        url     : string        | undefined = undefined,
        body    : JsonAny       | undefined = undefined
    ) {

        super( message ? message : stringifyRequestStatus(status) );

        const actualProto = new.target.prototype;

        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            this.__proto__ = actualProto;
        }

        this.status  = status;
        this.method  = method;
        this.url     = url;
        this.body     = body;

    }

    public valueOf () : number {
        return this.status;
    }

    public toString () : string {
        return `${this.status} ${this.message}`;
    }

    public toJSON () : ReadonlyJsonObject {
        return {
            type: RequestType.ERROR,
            status: this.status,
            message: this.message
        };
    }

    public getStatusCode () : number {
        return this.status;
    }

    public getMethod () : RequestMethod | undefined {
        return this.method;
    }

    public getUrl () : string | undefined {
        return this.url;
    }

    public getBody () : JsonAny | undefined {
        return this.body;
    }

}

export function createRequestError (
    status  : RequestStatus,
    message : string | undefined = undefined
) : RequestError {
    return new RequestError(status, message);
}

export function isRequestError (value : any) : value is RequestError {
    return (
        !!value
        && value instanceof RequestError
    );
}

export default RequestError;

// Copyright (c) 2023 Heusala Group Oy. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestStatus, stringifyRequestStatus} from "./RequestStatus";
import { JsonAny, ReadonlyJsonAny, ReadonlyJsonObject } from "../../Json";
import { RequestType } from "./RequestType";
import { RequestMethod } from "./RequestMethod";
import { Headers } from "./Headers";

export class RequestError extends Error {

    public readonly status  : RequestStatus;
    public readonly method  : RequestMethod | undefined;
    public readonly url     : string | undefined;
    public readonly body    : JsonAny | undefined;
    public readonly headers : Headers | undefined;

    // @ts-ignore
    private readonly __proto__: any;

    public constructor (
        status  : number,
        message : string        | undefined = undefined,
        method  : RequestMethod | undefined = undefined,
        url     : string        | undefined = undefined,
        body    : JsonAny       | undefined = undefined,
        headers : Headers       | undefined = undefined
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
        this.body    = body;
        this.headers = headers;
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
            message: this.message,
            method: this.method,
            url: this.url,
            body: (this.body as ReadonlyJsonAny | undefined),
            headers: this.headers ? this.headers.toJSON() : undefined,
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

    public getHeaders () : Headers | undefined {
        return this.headers;
    }

    public static create (
        status  : RequestStatus,
        message : string | undefined = undefined
    ) : RequestError {
        return new RequestError(status, message);
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
        return createRequestError(RequestStatus.InternalServerError, message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwBadRequestError (message : string) {
        throw RequestError.createBadRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwNotFoundRequestError (message : string) {
        throw RequestError.createNotFoundRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwMethodNotAllowedRequestError (message : string) {
        throw RequestError.createMethodNotAllowedRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwConflictRequestError (message : string) {
        throw RequestError.createConflictRequestError(message);
    }

    /**
     *
     * @param message
     * @throws
     */
    public static throwInternalErrorRequestError (message : string) {
        throw RequestError.createInternalErrorRequestError(message);
    }

}

export function createRequestError (
    status  : RequestStatus,
    message : string | undefined = undefined
) : RequestError {
    return RequestError.create(status, message);
}

export function isRequestError (value : any) : value is RequestError {
    return (
        !!value
        && value instanceof RequestError
    );
}



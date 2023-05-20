// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestStatus, stringifyRequestStatus} from "./RequestStatus";
import { map } from "../../functions/map";
import { Headers, isHeaders} from "./Headers";
import { HeadersObject } from "./HeadersObject";
import { isReadonlyJsonAny} from "../../Json";
import { StringUtils } from "../../StringUtils";
import { parseRequestMethod, RequestMethod, stringifyRequestMethod} from "./RequestMethod";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import { isNumber } from "../../types/Number";

export type EntityStatusTypes = RequestStatus | number;

export function isEntityStatusType (value : any) : value is EntityStatusTypes {
    return isNumber(value);
}

export class ResponseEntity<T> {

    private _status  : EntityStatusTypes;
    private _headers : Headers;
    private _body    : T                 | undefined;

    //            arg1                           arg2                           arg3
    constructor ( status  : EntityStatusTypes                                                              );
    constructor ( headers : Headers            , status  : EntityStatusTypes                               );
    constructor ( body    : T                  , status  : EntityStatusTypes                               );
    constructor ( body    : T                  , headers : Headers            , status : EntityStatusTypes );

    constructor (
        arg1  : T                 | Headers | EntityStatusTypes,
        arg2 ?: EntityStatusTypes | Headers,
        arg3 ?: RequestStatus
    ) {

        let status  : EntityStatusTypes | undefined;
        let headers : Headers           | undefined;
        let body    : T                 | undefined;

        if ( isEntityStatusType(arg1) && !isEntityStatusType(arg2) && !isEntityStatusType(arg3) ) {

            status = arg1;
            if (arg2 !== undefined) throw new TypeError('ResponseEntity signature is [body, ][headers, ]status');
            if (arg3 !== undefined) throw new TypeError('ResponseEntity signature is [body, ][headers, ]status');

        } else if ( isEntityStatusType(arg2) && !isEntityStatusType(arg3) ) {

            if (arg3 !== undefined) throw new TypeError('ResponseEntity signature is [body, ][headers, ]status');

            if (isHeaders(arg1)) {
                headers = arg1;
            } else {
                // @ts-ignore
                body = arg1;
            }

            status = arg2;

        } else if ( isEntityStatusType(arg3) ) {

            if (!isHeaders(arg2)) throw new TypeError('ResponseEntity signature is [body, ][headers, ]status');

            // @ts-ignore
            body = arg1;
            headers = arg2;
            status = arg3;

        } else {
            throw new TypeError('ResponseEntity signature is [body, ][headers, ]status');
        }

        this._status  = status;
        this._headers = headers ?? new Headers();
        this._body    = body;

    }

    public getStatusCode () : RequestStatus {
        return this._status;
    }

    /**
     * In JavaScript, this is essentially same as .getStatusCode()
     */
    public getStatusCodeValue () : number {
        return this._status;
    }

    public status (value : RequestStatus) : ResponseEntity<T>;
    public status (value : number) : ResponseEntity<T>;
    public status (value : RequestStatus | number) : ResponseEntity<T> {

        this._status = value;

        return this;

    }

    public headers (value: Headers) : ResponseEntity<T>;
    public headers (value: HeadersObject) : ResponseEntity<T>;
    public headers (value: Headers | HeadersObject) : ResponseEntity<T> {

        if (isHeaders(value)) {
            this._headers = value;
        } else {
            this._headers = new Headers(value);
        }

        return this;

    }

    public body (value: T) : ResponseEntity<T> {
        this._body = value;
        return this;
    }

    public getHeaders () : Headers {
        return this._headers;
    }

    public allow (...methods: string[]) : ResponseEntity<T>;
    public allow (...methods: RequestMethod[]) : ResponseEntity<T>;

    public allow (...methods: (RequestMethod|string)[]) : ResponseEntity<T> {

        const parsedMethods : RequestMethod[] = map(methods, parseRequestMethod);
        const stringMethods : string[]        = map(parsedMethods, (item : RequestMethod) => stringifyRequestMethod(item).toUpperCase());

        this._headers.set('Allow', stringMethods.join(', '));

        return this;

    }

    public hasBody () : boolean {
        return this._body !== undefined;
    }

    public getBody () : T {
        if (this._body === undefined) throw new TypeError('No body');
        return this._body;
    }

    public valueOf () : string {
        return this.toString();
    }

    public toString () : string {

        const status : string = stringifyRequestStatus(this._status);

        const headersObject : Headers = this._headers;
        const headers : string = headersObject.isEmpty() ? '' : StringUtils.toString(headersObject);

        const body : any = this._body;

        if (body === undefined) {

            if (headers) {
                return `ResponseEntity(${status}, ${headers})`;
            } else {
                return `ResponseEntity(${status})`;
            }

        }

        let bodyDisplayValue : string = '';

        if (isReadonlyJsonAny(body)) {
            bodyDisplayValue = JSON.stringify(body, null, 2);
        } else {
            bodyDisplayValue = StringUtils.toString(body);
        }

        if (headers) {
            return `ResponseEntity(${status}, ${headers}, Body(${bodyDisplayValue}))`;
        } else {
            return `ResponseEntity(${status}, Body(${bodyDisplayValue}))`;
        }
    }

    public static accepted<T>                   () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.Accepted); }
    public static badRequest<T>                 () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.BadRequest); }
    public static created<T>    (location: string) : ResponseEntity<T> { return new ResponseEntity<T>(new Headers({"Location": location}), RequestStatus.Created); }
    public static noContent                     () : ResponseEntity<void> { return new ResponseEntity<void>(RequestStatus.NoContent); }
    public static notFound<T>                   () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.NotFound); }
    public static notImplemented<T>             () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.NotImplemented); }
    public static internalServerError<T>        () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.InternalServerError); }
    public static methodNotAllowed<T>           () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.MethodNotAllowed); }
    public static unprocessableEntity<T>        () : ResponseEntity<T> { return new ResponseEntity<T>(RequestStatus.UnprocessableEntity); }

    public static ok<T> (body?: T) : ResponseEntity<T> {
        return body !== undefined ? new ResponseEntity<T>(body, RequestStatus.OK) : new ResponseEntity<T>(RequestStatus.OK);
    }

}

export function isResponseEntity (value : any) : value is ResponseEntity<any> {
    return !!value && value instanceof ResponseEntity;
}

export function isResponseEntityOf<T> (
    value  : any,
    isTest : TestCallbackNonStandard
) : value is ResponseEntity<T> {
    return !!value && value instanceof ResponseEntity && isTest( value.getBody() );
}

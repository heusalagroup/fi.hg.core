import RequestStatus from "./types/RequestStatus";
import {isNumber} from "../modules/lodash";
import Headers, {isHeaders} from "./Headers";
import HeadersObject, {isHeadersObject} from "./types/HeadersObject";

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

    public hasBody () : boolean {
        return this._body !== undefined;
    }

    public getBody () : T {
        if (this._body === undefined) throw new TypeError('No body');
        return this._body;
    }

    public static accepted<T> () { return new ResponseEntity<T>(RequestStatus.Accepted); }
    public static badRequest<T> () { return new ResponseEntity<T>(RequestStatus.BadRequest); }
    public static created<T> (location: string) { return new ResponseEntity<T>(new Headers({"Location": location}), RequestStatus.Created); }
    public static noContent<T> () { return new ResponseEntity<T>(RequestStatus.NoContent); }
    public static notFound<T> () { return new ResponseEntity<T>(RequestStatus.NotFound); }
    public static notImplemented<T> () { return new ResponseEntity<T>(RequestStatus.NotImplemented); }
    public static internalServerError<T> () { return new ResponseEntity<T>(RequestStatus.InternalServerError); }
    public static methodNotAllowed<T> () { return new ResponseEntity<T>(RequestStatus.MethodNotAllowed); }
    public static unprocessableEntity<T> () { return new ResponseEntity<T>(RequestStatus.UnprocessableEntity); }

    public static ok<T> (body?: T) { return body ? new ResponseEntity<T>(body, RequestStatus.OK) : new ResponseEntity<T>(RequestStatus.OK); }

}

export function isResponseEntity (value : any) : value is ResponseEntity<any> {
    return !!value && value instanceof ResponseEntity;
}

export default ResponseEntity;
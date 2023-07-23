// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { RequestMethod, stringifyRequestMethod } from "../../request/types/RequestMethod";
import { JsonAny } from "../../Json";
import { RequestClientAdapter } from "../RequestClientAdapter";
import { RequestError } from "../../request/types/RequestError";
import { ContentType } from "../../request/types/ContentType";
import { ResponseEntity } from "../../request/types/ResponseEntity";
import { Headers } from "../../request/types/Headers";

export interface FetchInterface {
    (input: string, init?: RequestInit): Promise<Response>;
}

export class FetchRequestClient implements RequestClientAdapter {

    private readonly _fetch : FetchInterface;

    constructor (fetch : FetchInterface) {
        this._fetch = fetch;
    }

    public async jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        switch (method) {
            case RequestMethod.GET:    return await this._jsonRequest(RequestMethod.GET,    url, headers, data).then((response : Response) => FetchRequestClient._successJsonResponse(response, RequestMethod.GET));
            case RequestMethod.POST:   return await this._jsonRequest(RequestMethod.POST,   url, headers, data).then((response : Response) => FetchRequestClient._successJsonResponse(response, RequestMethod.GET));
            case RequestMethod.PUT:    return await this._jsonRequest(RequestMethod.PUT,    url, headers, data).then((response : Response) => FetchRequestClient._successJsonResponse(response, RequestMethod.GET));
            case RequestMethod.DELETE: return await this._jsonRequest(RequestMethod.DELETE, url, headers, data).then((response : Response) => FetchRequestClient._successJsonResponse(response, RequestMethod.GET));
            default:                   throw new TypeError(`FetchRequestClient: Unsupported method: ${method}`);
        }
    }

    public async textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string|undefined> {
        switch (method) {
            case RequestMethod.GET:    return await this._textRequest(RequestMethod.GET,    url, headers, data).then((response : Response) => FetchRequestClient._successTextResponse(response, RequestMethod.GET));
            case RequestMethod.POST:   return await this._textRequest(RequestMethod.POST,   url, headers, data).then((response : Response) => FetchRequestClient._successTextResponse(response, RequestMethod.GET));
            case RequestMethod.PUT:    return await this._textRequest(RequestMethod.PUT,    url, headers, data).then((response : Response) => FetchRequestClient._successTextResponse(response, RequestMethod.GET));
            case RequestMethod.DELETE: return await this._textRequest(RequestMethod.DELETE, url, headers, data).then((response : Response) => FetchRequestClient._successTextResponse(response, RequestMethod.GET));
            default:                   throw new TypeError(`FetchRequestClient: Unsupported method: ${method}`);
        }
    }


    public async jsonEntityRequest (
        method: RequestMethod,
        url: string,
        headers?: {[p: string]: string},
        data?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        switch (method) {
            case RequestMethod.GET:    return await this._jsonRequest(RequestMethod.GET,    url, headers, data).then((response : Response) => FetchRequestClient._successJsonEntityResponse(response, RequestMethod.GET));
            case RequestMethod.POST:   return await this._jsonRequest(RequestMethod.POST,   url, headers, data).then((response : Response) => FetchRequestClient._successJsonEntityResponse(response, RequestMethod.POST));
            case RequestMethod.PUT:    return await this._jsonRequest(RequestMethod.PUT,    url, headers, data).then((response : Response) => FetchRequestClient._successJsonEntityResponse(response, RequestMethod.PUT));
            case RequestMethod.DELETE: return await this._jsonRequest(RequestMethod.DELETE, url, headers, data).then((response : Response) => FetchRequestClient._successJsonEntityResponse(response, RequestMethod.DELETE));
            default:                   throw new TypeError(`FetchRequestClient: Unsupported method: ${method}`);
        }
    }

    public async textEntityRequest (
        method: RequestMethod,
        url: string,
        headers?: {[p: string]: string},
        data?: string
    ): Promise<ResponseEntity<string | undefined>> {
        switch (method) {
            case RequestMethod.GET:    return await this._textRequest(RequestMethod.GET,    url, headers, data).then((response: Response) => FetchRequestClient._successTextEntityResponse(response, RequestMethod.GET));
            case RequestMethod.POST:   return await this._textRequest(RequestMethod.POST,   url, headers, data).then((response: Response) => FetchRequestClient._successTextEntityResponse(response, RequestMethod.POST));
            case RequestMethod.PUT:    return await this._textRequest(RequestMethod.PUT,    url, headers, data).then((response: Response) => FetchRequestClient._successTextEntityResponse(response, RequestMethod.PUT));
            case RequestMethod.DELETE: return await this._textRequest(RequestMethod.DELETE, url, headers, data).then((response: Response) => FetchRequestClient._successTextEntityResponse(response, RequestMethod.DELETE));
            default:                   throw new TypeError(`FetchRequestClient: Unsupported method: ${method}`);
        }
    }

    private async _jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<Response> {
        const options : RequestInit = {
            method: FetchRequestClient._getMethod(method),
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': ContentType.JSON,
            },
            credentials: 'same-origin'
        };
        if (headers) {
            options.headers = {
                ...options.headers,
                ...headers
            };
        }
        if (data) {
            options.body = JSON.stringify(data);
        }
        return await this._fetch(url, options);
    }

    private async _textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<Response> {
        const options : RequestInit = {
            method: FetchRequestClient._getMethod(method),
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': ContentType.TEXT,
            },
            credentials: 'same-origin'
        };
        if (headers) {
            options.headers = {
                ...options.headers,
                ...headers
            };
        }
        if (data) {
            options.body = data;
        }
        return await this._fetch(url, options);
    }

    private static async _successJsonResponse (
        response: Response,
        method: RequestMethod
    ) : Promise<JsonAny> {
        const statusCode = response.status;
        if ( !response.ok || (statusCode < 200 || statusCode >= 400) ) {
            const url     = response.url;
            const message = `${statusCode}${ response.statusText ? ` "${response.statusText}"` : '' } for ${stringifyRequestMethod(method)} ${url}`;
            //LOG.error(`Unsuccessful response with status ${statusCode}: `, response);
            return response.json().then(body => {
                throw new RequestError(
                    statusCode,
                    message,
                    method,
                    url,
                    body
                );
            });
        }
        return response.json();
    }

    private static async _successJsonEntityResponse (
        response: Response,
        method: RequestMethod
    ) : Promise<ResponseEntity<JsonAny>> {
        const statusCode = response.status;
        if ( !response.ok || (statusCode < 200 || statusCode >= 400) ) {
            const url     = response.url;
            const message = `${statusCode}${ response.statusText ? ` "${response.statusText}"` : '' } for ${stringifyRequestMethod(method)} ${url}`;
            //LOG.error(`Unsuccessful response with status ${statusCode}: `, response);
            const body = await response.json();
            throw new RequestError(
                statusCode,
                message,
                method,
                url,
                body
            );
        }
        const body = await response.json();
        return ResponseEntity.ok(body).status(statusCode).headers(FetchRequestClient._parseResponseHeaders(response));
    }

    private static async _successTextResponse (
        response: Response,
        method: RequestMethod
    ) : Promise<string> {
        const statusCode = response.status;
        if ( !response.ok || (statusCode < 200 || statusCode >= 400) ) {
            const url     = response.url;
            const message = `${statusCode}${ response.statusText ? ` "${response.statusText}"` : '' } for ${stringifyRequestMethod(method)} ${url}`;
            return response.text().then(body => {
                throw new RequestError(
                    statusCode,
                    message,
                    method,
                    url,
                    body
                );
            });
        }
        return await response.text();
    }

    private static async _successTextEntityResponse (
        response: Response,
        method: RequestMethod
    ) : Promise<ResponseEntity<string>> {
        const statusCode = response.status;
        if ( !response.ok || (statusCode < 200 || statusCode >= 400) ) {
            const url     = response.url;
            const message = `${statusCode}${ response.statusText ? ` "${response.statusText}"` : '' } for ${stringifyRequestMethod(method)} ${url}`;
            const body : string = await response.text();
            throw new RequestError(
                statusCode,
                message,
                method,
                url,
                body
            );
        }
        const body : string = await response.text();
        return ResponseEntity.ok(body).status(statusCode).headers(FetchRequestClient._parseResponseHeaders(response));
    }

    private static _parseResponseHeaders (response : Response) : Headers {
        const responseHeaders = response?.headers;
        const headers : Headers = new Headers();
        if (responseHeaders) {
            responseHeaders.forEach(
                (value: string, key: string) => {
                    headers.set(key, value);
                }
            );
        }
        return headers;
    }

    private static _getMethod (method: RequestMethod) : string {
        switch (method) {
            case RequestMethod.OPTIONS : return 'OPTIONS';
            case RequestMethod.GET     : return 'GET';
            case RequestMethod.POST    : return 'POST';
            case RequestMethod.PUT     : return 'PUT';
            case RequestMethod.DELETE  : return 'DELETE';
            case RequestMethod.PATCH   : return 'PATCH';
            case RequestMethod.TRACE   : return 'TRACE';
            case RequestMethod.HEAD    : return 'HEAD';
        }
        throw new TypeError(`Unknown method: ${method}`);
    }

}

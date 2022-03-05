// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RequestMethod, stringifyRequestMethod } from "../../request/types/RequestMethod";
import { JsonAny } from "../../Json";
import { RequestClientInterface } from "../RequestClientInterface";
import { RequestError } from "../../request/types/RequestError";

export interface FetchInterface {
    (input: string, init?: RequestInit): Promise<Response>;
}

export class FetchRequestClient implements RequestClientInterface {


    private _fetch : FetchInterface;

    constructor (fetch : FetchInterface) {
        this._fetch = fetch;
    }

    public jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        switch (method) {
            case RequestMethod.GET:    return this._getJson(url, headers, data);
            case RequestMethod.POST:   return this._postJson(url, headers, data);
            case RequestMethod.PUT:    return this._putJson(url, headers, data);
            case RequestMethod.DELETE: return this._deleteJson(url, headers, data);
            default:                   throw new TypeError(`[Fetch]RequestClient: Unsupported method: ${method}`);
        }
    }

    private _getJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {

        const options : RequestInit = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
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

        return this._fetch(url, options).then(response => FetchRequestClient._successResponse(response, RequestMethod.GET));

    }

    private _putJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {

        const options : RequestInit = {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
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

        return this._fetch(url, options).then(response => FetchRequestClient._successResponse(response, RequestMethod.PUT));

    }

    private _postJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {

        const options : RequestInit = {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
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

        return this._fetch(url, options).then(response => FetchRequestClient._successResponse(response, RequestMethod.POST));

    }

    private _deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {

        const options : RequestInit = {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
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

        return this._fetch(url, options).then(response => FetchRequestClient._successResponse(response, RequestMethod.DELETE));

    }

    private static _successResponse (response: Response, method: RequestMethod) : Promise<JsonAny> {

        const statusCode = response.status;

        if ( !response.ok || (statusCode < 200 || statusCode >= 400) ) {
            const url     = response.url;
            const message = `${statusCode} ${response.statusText} for ${stringifyRequestMethod(method)} ${url}`;
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

}

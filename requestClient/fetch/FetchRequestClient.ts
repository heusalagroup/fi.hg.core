import RequestMethod from "../../request/types/RequestMethod";
import Json from "../../Json";
import RequestClientInterface from "../RequestClientInterface";

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
        data    ?: Json
    ) : Promise<Json| undefined> {
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
        data    ?: Json
    ) : Promise<Json| undefined> {

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

        return this._fetch(url, options).then(FetchRequestClient._successResponse);

    }

    private _putJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {

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

        return this._fetch(url, options).then(FetchRequestClient._successResponse);

    }

    private _postJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {

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

        return this._fetch(url, options).then(FetchRequestClient._successResponse);

    }

    private _deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {

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

        return this._fetch(url, options).then(FetchRequestClient._successResponse);

    }

    private static _successResponse (response: Response) : Promise<Json> {

        if (!response.ok) {
            throw new Error('Response was not OK');
        }

        return response.json();

    }

}

export default FetchRequestClient;

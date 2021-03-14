import RequestMethod from "../request/types/RequestMethod";
import Json from "../Json";
import RequestClientInterface from "./RequestClientInterface";
import {ClientRequest, IncomingHttpHeaders, IncomingMessage} from "http";
import NodeHttpUtils from "./NodeHttpUtils";
import LogService from "../LogService";

const LOG = LogService.createLogger('NodeRequestClient');

export interface HttpClientOptions {

    hostname ?: string;
    port     ?: number;
    path     ?: string;
    method   ?: string;
    headers  ?: IncomingHttpHeaders;

}

export interface HttpClientCallback {
    (response: IncomingMessage) : void;
}

export interface HttpModule {

    request (url: string, options : HttpClientOptions, callback : HttpClientCallback) : ClientRequest;

}

export interface JsonHttpResponse {

    readonly statusCode  : number;
    readonly headers    ?: IncomingHttpHeaders;
    readonly body       ?: Json;

}

export class NodeRequestClient implements RequestClientInterface {

    private _http : HttpModule;

    constructor (
        http : HttpModule
    ) {
        this._http = http;
    }

    public jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise<Json| undefined> {
        switch (method) {
            case RequestMethod.GET:    return this._getJson(url, headers, data);
            case RequestMethod.POST:   return this._postJson(url, headers, data);
            case RequestMethod.PUT:    return this._putJson(url, headers, data);
            case RequestMethod.DELETE: return this._deleteJson(url, headers, data);
            default:                   throw new TypeError(`[Node]RequestClient: Unsupported method: ${method}`);
        }
    }

    private _request (
        url      : string,
        options  : HttpClientOptions,
        body    ?: Json
    ) : Promise<JsonHttpResponse> {
        LOG.debug('_request: url, options, body = ', url, options, body);
        return new Promise( (resolve, reject) => {
            try {

                const bodyString : string | undefined = body ? JSON.stringify(body) + '\n' : undefined;

                const req = this._http.request(url, options, (response : IncomingMessage) => {
                    try {
                        resolve( NodeHttpUtils.getRequestDataAsJson(response).then((result : Json | undefined ) => {

                            const statusCode = response?.statusCode ?? 0;

                            LOG.debug('_request: statusCode = ', statusCode);

                            const myResponse : JsonHttpResponse = {
                                statusCode,
                                headers: response.headers,
                                body: result
                            };

                            LOG.debug('_request: myResponse = ', myResponse);

                            return myResponse;

                        }) );
                    } catch(err) {
                        reject(err);
                    }
                });

                req.on('error', reject);

                if (bodyString) {
                    LOG.debug('_request: bodyString = ', bodyString);
                    req.write(bodyString);
                }

                req.end();

            } catch(err) {
                reject(err);
            }
        });
    }

    private _getJson (
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise< Json | undefined > {

        const options : HttpClientOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (headers) {
            options.headers = {
                ...options.headers,
                ...headers
            };
        }

        return this._request(url, options, data).then(NodeRequestClient._successResponse);

    }

    private _putJson (
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise<Json | undefined > {

        const options : HttpClientOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (headers) {
            options.headers = {
                ...options.headers,
                ...headers
            };
        }

        return this._request(url, options, data).then(NodeRequestClient._successResponse);

    }

    private _postJson (
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise<Json| undefined> {

        const options : HttpClientOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (headers) {
            options.headers = {
                ...options.headers,
                ...headers
            };
        }

        return this._request(url, options, data).then(NodeRequestClient._successResponse);

    }

    private _deleteJson (
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise<Json| undefined> {

        const options : HttpClientOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (headers) {
            options.headers = {
                ...options.headers,
                ...headers
            };
        }

        return this._request(url, options, data).then(NodeRequestClient._successResponse);

    }

    private static _successResponse (response: JsonHttpResponse) : Json | undefined {

        const statusCode = response?.statusCode;

        if ( statusCode < 200 || statusCode >= 400 ) {
            throw new Error('Response was not OK');
        }

        return response.body;

    }

}

export default NodeRequestClient;

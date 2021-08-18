import RequestMethod from "../../request/types/RequestMethod";
import Json from "../../Json";
import RequestClientInterface from "../RequestClientInterface";
import {ClientRequest, IncomingHttpHeaders, IncomingMessage} from "http";
import NodeHttpUtils from "./NodeHttpUtils";
import LogService from "../../LogService";
import URL from "url";
import PATH from "path";
import {Stats} from "fs";
import {REQUEST_CLIENT_NODE_ENABLED} from "../request-client-constants";

export const FsPromises = REQUEST_CLIENT_NODE_ENABLED ? require("fs").promises : undefined;

const LOG = LogService.createLogger('NodeRequestClient');

export interface HttpClientOptions {

    hostname   ?: string;
    port       ?: number;
    path       ?: string;
    method     ?: string;
    headers    ?: IncomingHttpHeaders;
    socketPath ?: string;

}

export interface HttpClientCallback {
    (response: IncomingMessage) : void;
}

export interface HttpModule {

    request (options : HttpClientOptions, callback : HttpClientCallback) : ClientRequest;
    request (url: string, options : HttpClientOptions, callback : HttpClientCallback) : ClientRequest;

}

export interface JsonHttpResponse {

    readonly statusCode  : number;
    readonly headers    ?: IncomingHttpHeaders;
    readonly body       ?: Json;

}

export class NodeRequestClient implements RequestClientInterface {

    private readonly _http : HttpModule;
    private readonly _https : HttpModule;

    constructor (
        http : HttpModule,
        https : HttpModule
    ) {
        this._http = http;
        this._https = https;
    }

    public async jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise<Json| undefined> {
        switch (method) {
            case RequestMethod.GET:    return await this._getJson(url, headers, data);
            case RequestMethod.POST:   return await this._postJson(url, headers, data);
            case RequestMethod.PATCH:  return await this._patchJson(url, headers, data);
            case RequestMethod.PUT:    return await this._putJson(url, headers, data);
            case RequestMethod.DELETE: return await this._deleteJson(url, headers, data);
            default:                   throw new TypeError(`[Node]RequestClient: Unsupported method: ${method}`);
        }
    }

    /**
     * If the result is true, this is a socket file.
     * If the result is false, you cannot find socket from the parent file.
     * If the result is undefined, you may search parent paths.
     *
     * @param path
     * @private
     */
    private async _checkSocketFile (path : string) : Promise<boolean|undefined> {

        try {

            // LOG.debug('_checkSocketFile: path =', path);

            const stat : Stats = await FsPromises.stat(path);

            // LOG.debug('_checkSocketFile: stat =', stat);

            if ( stat.isSocket()    ) return true;

            // if ( stat.isFile()      ) return false;
            // if ( stat.isDirectory() ) return false;

            return false;

        } catch (err) {

            const code = err?.code;

            if (code === 'ENOTDIR') {
                LOG.debug('_checkSocketFile: ENOTDIR: ', err);
                return undefined;
            }

            if (code === 'ENOENT') {
                LOG.debug('_checkSocketFile: ENOENT: ', err);
                return undefined;
            }

            LOG.error(`_checkSocketFile: Error "${code}" passed on: `, err);

            throw err;

        }

    }

    private async _findSocketFile (fullPath : string) : Promise<string | undefined> {

        // LOG.debug('_findSocketFile: fullPath: ', fullPath);

        let socketExists : boolean | undefined = await this._checkSocketFile(fullPath);

        // LOG.debug('_findSocketFile: socketExists: ', socketExists);

        if (socketExists === true) return fullPath;
        if (socketExists === false) return undefined;

        const parentPath = PATH.dirname(fullPath);
        // LOG.debug('_findSocketFile: parentPath: ', parentPath);

        if ( parentPath === "/" || parentPath === fullPath ) {
            return undefined;
        }

        return this._findSocketFile(parentPath);

    }

    private async _httpRequest (
        url      : string,
        options  : HttpClientOptions,
        body    ?: Json
    ) : Promise<IncomingMessage> {

        // LOG.debug('_httpRequest: url, options, body = ', url, options, body);

        const bodyString : string | undefined = body ? JSON.stringify(body) + '\n' : undefined;

        const urlParsed = new URL.URL(url);
        // LOG.debug('urlParsed = ', urlParsed);

        let httpModule : HttpModule | undefined;

        const protocol : string = urlParsed?.protocol ?? '';

        if ( protocol === 'unix:' || protocol === 'socket:' ) {

            const fullSocketPath = urlParsed?.pathname ? urlParsed?.pathname : '/';

            if (fullSocketPath === '/') {
                throw new TypeError(`No socket path found for unix protocol URL: ${url}`);
            }

            // LOG.debug('_httpRequest: fullSocketPath: ', fullSocketPath);

            const realSocketPath : string | undefined = await this._findSocketFile(fullSocketPath);

            if (!realSocketPath) {
                throw new TypeError(`No socket path found for unix protocol URL: ${url}`);
            }

            const socketSuffix = realSocketPath.length < fullSocketPath.length ? fullSocketPath.substr(realSocketPath.length) : '';

            const path : string = `${socketSuffix}${urlParsed.search !== '?' ? urlParsed.search : ''}`;

            // LOG.debug('Using unix socket: ', realSocketPath, path, urlParsed);

            options = {
                ...options,
                socketPath: realSocketPath,
                path
            };

            url = '';

            httpModule = this._http;

        } else if (protocol === 'https:') {
            httpModule = this._https;
        } else {
            httpModule = this._http;
        }

        // LOG.debug('Calling inside a promise...');

        return await new Promise( (resolve, reject) => {
            let resolved = false;
            try {

                if (!httpModule) {
                    throw new Error('HTTP module not defined. This error should not happen.');
                }

                const callback = (res: IncomingMessage) => {
                    if (resolved) {
                        LOG.warn('Warning! Request had already ended when the response was received.');
                    } else {
                        resolved = true;
                        resolve(res);
                    }
                };

                let req : ClientRequest | undefined;

                if ( url ) {

                    options = {
                        ...options,
                        hostname: urlParsed.hostname,
                        port: (urlParsed?.port ? parseInt(urlParsed.port, 10) : undefined) ?? (protocol === "https:" ? 443 : 80),
                        path: urlParsed.pathname + urlParsed.search
                    };

                    // LOG.debug(`Requesting "${url}" with options:`, options);

                } else {
                    // LOG.debug('Requesting with options ', options);
                }

                req = httpModule.request(options, callback);

                req.on('error', err => {
                    if (resolved) {

                        LOG.warn('Warning! Request had already ended when the response was received.');

                        LOG.debug('Error from event: ', err);

                    } else {
                        LOG.debug('Passing on error from event: ', err);
                        resolved = true;
                        reject(err);
                    }
                });

                if (bodyString) {

                    // LOG.debug('_request: writing bodyString = ', bodyString);

                    req.write(bodyString);

                } else {
                    // LOG.debug('_request: no body');
                }

                req.end();

            } catch(err) {

                if (resolved) {

                    LOG.warn('Warning! Request had already ended when the response was received.');

                    LOG.debug('Exception: ', err);

                } else {
                    LOG.debug('Passing on error: ', err);
                    resolved = true;
                    reject(err);
                }

            }
        });
    }

    private async _request (
        url      : string,
        options  : HttpClientOptions,
        body    ?: Json
    ) : Promise<JsonHttpResponse> {

        // LOG.debug('_request: url, options, body = ', url, options, body);

        const response : IncomingMessage = await this._httpRequest(url, options, body);

        // LOG.debug('Reading response for request...');

        const result : Json | undefined = await NodeHttpUtils.getRequestDataAsJson(response);

        // LOG.debug('Received: ', result);

        const statusCode = response?.statusCode ?? 0;
        // LOG.debug('_request: statusCode = ', statusCode);

        const myResponse : JsonHttpResponse = {
            statusCode,
            headers: response.headers,
            body: result
        };

        // LOG.debug('_request: myResponse = ', myResponse);

        return myResponse;

    }

    private async _getJson (
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

    private async _putJson (
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

    private async _postJson (
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

    private async _patchJson (
        url      : string,
        headers ?: IncomingHttpHeaders,
        data    ?: Json
    ) : Promise<Json| undefined> {

        const options : HttpClientOptions = {
            method: 'PATCH',
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

    private async _deleteJson (
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
            //LOG.error(`Unsuccessful response with status ${statusCode}: `, response);
            throw new Error(`Response was not OK: Status code ${statusCode}`);
        }

        //LOG.debug(`Successful response with status ${statusCode}: `, response);

        return response.body;

    }

}

export default NodeRequestClient;

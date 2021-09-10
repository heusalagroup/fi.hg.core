import RequestMethod from "./request/types/RequestMethod";
import Json from "./Json";
import RequestClientInterface from "./requestClient/RequestClientInterface";
import LogService from "./LogService";
import {REQUEST_CLIENT_FETCH_ENABLED, REQUEST_CLIENT_NODE_ENABLED} from "./requestClient/request-client-constants";
import NodeRequestClient from "./requestClient/node/NodeRequestClient";
import FetchRequestClient from "./requestClient/fetch/FetchRequestClient";

export const HTTP = REQUEST_CLIENT_NODE_ENABLED ? require('http') : undefined;
export const HTTPS = REQUEST_CLIENT_NODE_ENABLED ? require('https') : undefined;

const LOG = LogService.createLogger('RequestClient');

export class RequestClient {

    private static _client : RequestClientInterface = RequestClient._initClient();

    public static async jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {
        return await this._client.jsonRequest(method, url, headers, data);
    }

    public static async getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        // LOG.debug('.getJson: ', url, headers);
        return await this._client.jsonRequest(RequestMethod.GET, url, headers);
    }

    public static async postJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.POST, url, headers, data);
    }

    public static async patchJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.PATCH, url, headers, data);
    }

    public static async putJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.putJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.PUT, url, headers, data);
    }

    public static async deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {
        LOG.debug('.deleteJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.DELETE, url, headers, data);
    }

    private static _initClient () : RequestClientInterface {

        if ( REQUEST_CLIENT_FETCH_ENABLED ) {
            LOG.debug('Detected browser environment');
            return new FetchRequestClient( window.fetch.bind(window) );
        }

        if ( REQUEST_CLIENT_NODE_ENABLED ) {
            // Could not control this with LOG_LEVEL on rolluped content
            // LOG.debug('Detected NodeJS environment');
            return new NodeRequestClient(HTTP, HTTPS);
        }

        throw new TypeError(`Could not detect request client implementation`);

    }

}

export default RequestClient;

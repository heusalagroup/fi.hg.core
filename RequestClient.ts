import RequestMethod from "./request/types/RequestMethod";
import Json from "./Json";
import {FetchRequestClient} from "./requestClient/FetchRequestClient";
import RequestClientInterface from "./requestClient/RequestClientInterface";
import NodeRequestClient from "./requestClient/NodeRequestClient";
import LogService from "./LogService";

const LOG = LogService.createLogger('RequestClient');

export class RequestClient {

    private static _client : RequestClientInterface = RequestClient._initClient();

    public static jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {
        return this._client.jsonRequest(method, url, headers, data);
    }

    public static getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.getJson: ', url, headers);
        return this._client.jsonRequest(RequestMethod.GET, url, headers);
    }

    public static postJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.postJson: ', url, data, headers);
        return this._client.jsonRequest(RequestMethod.POST, url, headers, data);
    }

    public static putJson (
        url      : string,
        data    ?: Json,
        headers ?: {[key: string]: string}
    ) : Promise<Json| undefined> {
        LOG.debug('.putJson: ', url, data, headers);
        return this._client.jsonRequest(RequestMethod.PUT, url, headers, data);
    }

    public static deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: Json
    ) : Promise<Json| undefined> {
        LOG.debug('.deleteJson: ', url, data, headers);
        return this._client.jsonRequest(RequestMethod.DELETE, url, headers, data);
    }

    private static _initClient () : RequestClientInterface {

        if ( typeof window !== 'undefined' && window.fetch ) {
            LOG.debug('Detected browser environment');
            return new FetchRequestClient( window.fetch.bind(window) );
        }

        if ( typeof process !== 'undefined' ) {
            LOG.debug('Detected NodeJS environment');
            const http = require('http');
            return new NodeRequestClient(http);
        }

        throw new TypeError(`Could not detect request client implementation`);

    }

}

export default RequestClient;

import RequestMethod from "./request/types/RequestMethod";
import Json from "./Json";
import RequestClientInterface from "./requestClient/RequestClientInterface";
import LogService from "./LogService";
import {
    OptionalFetchRequestClient,
    OptionalHTTP,
    OptionalNodeRequestClient
} from "./requestClient/optional-modules";

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

        if ( OptionalFetchRequestClient ) {
            LOG.debug('Detected browser environment');
            return new OptionalFetchRequestClient( window.fetch.bind(window) );
        }

        if ( OptionalNodeRequestClient ) {
            LOG.debug('Detected NodeJS environment');
            return new OptionalNodeRequestClient(OptionalHTTP);
        }

        throw new TypeError(`Could not detect request client implementation`);

    }

}

export default RequestClient;

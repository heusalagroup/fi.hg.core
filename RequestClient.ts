// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "./request/types/RequestMethod";
import { JsonAny } from "./Json";
import { RequestClientInterface } from "./requestClient/RequestClientInterface";
import { LogService } from "./LogService";
import { REQUEST_CLIENT_FETCH_ENABLED } from "./requestClient/request-client-constants";
import { LogLevel } from "./types/LogLevel";
import { WindowObjectService } from "./WindowObjectService";
import { FetchRequestClient } from "./requestClient/fetch/FetchRequestClient";

const LOG = LogService.createLogger('RequestClient');

/**
 * Note! You need to call `RequestClient.useClient()` to enable specific implementation.
 *
 * @see `HgNode.initialize()` which calls `useClient()` for NodeJS
 */
export class RequestClient {

    private static _client : RequestClientInterface | undefined = undefined;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static useClient (
        client: RequestClientInterface
    ) {
        this._client = client;
    }

    public static async textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        return await this._client.textRequest(method, url, headers, data);
    }

    public static async getText (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        // LOG.debug('.getJson: ', url, headers);
        return await this._client.textRequest(RequestMethod.GET, url, headers);
    }

    public static async postText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.POST, url, headers, data);
    }

    public static async patchText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.PATCH, url, headers, data);
    }

    public static async putText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.putJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.PUT, url, headers, data);
    }

    public static async deleteText (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.deleteJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.DELETE, url, headers, data);
    }

    public static async jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        return await this._client.jsonRequest(method, url, headers, data);
    }

    public static async getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        // LOG.debug('.getJson: ', url, headers);
        return await this._client.jsonRequest(RequestMethod.GET, url, headers);
    }

    public static async postJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.POST, url, headers, data);
    }

    public static async patchJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.PATCH, url, headers, data);
    }

    public static async putJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.putJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.PUT, url, headers, data);
    }

    public static async deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw new TypeError(`RequestClient: You must call HgNode.initialize() or RequestClient.useClient() first`);
        LOG.debug('.deleteJson: ', url, data, headers);
        return await this._client.jsonRequest(RequestMethod.DELETE, url, headers, data);
    }

    public static autoInitClient () : RequestClientInterface {
        if (REQUEST_CLIENT_FETCH_ENABLED) {
            const w = WindowObjectService.getWindow();
            if ( w ) {
                LOG.debug('Detected browser environment');
                return new FetchRequestClient( w.fetch.bind(w) );
            } else {
                throw new TypeError(`RequestClient: Could not detect request client implementation: No window object`);
            }
        } else if ( this._client !== undefined ) {
            return this._client;
        } else {
            throw new TypeError(`RequestClient: Could not detect request client implementation`);
        }
    }
}

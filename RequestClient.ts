// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "./request/types/RequestMethod";
import { JsonAny } from "./Json";
import { RequestClientInterface } from "./requestClient/RequestClientInterface";
import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";

const LOG = LogService.createLogger('RequestClient');

/**
 * Before using static methods of this library the implementation must be defined
 * and selected using `RequestClient.useClient()`.
 *
 * - See `HgNode.initialize()` which calls `useClient()` for NodeJS projects
 * - See `HgFrontend.initialize()` which calls `useClient()` for frontend projects
 *
 * You may also use it as a standard class:
 *
 * `const client = new RequestClient( clientImplementation );
 *
 */
export class RequestClient {

    /** Internal state for static methods.
     *
     * You must call `.useClient()` to initialize it
     *
     * @private
     */
    private static _client : RequestClient | undefined = undefined;

    /**
     * Internal state for normal methods
     * @private
     */
    private readonly _client : RequestClientInterface;

    /**
     * Creates client instance
     * @param client
     */
    public constructor (client : RequestClientInterface) {
        this._client = client;
    }

    public async textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined> {
        return await this._client.textRequest(method, url, headers, data);
    }

    public async getText (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        return await this._client.textRequest(RequestMethod.GET, url, headers);
    }

    public async postText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.POST, url, headers, data);
    }

    public async patchText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.PATCH, url, headers, data);
    }

    public async putText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        LOG.debug('.putJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.PUT, url, headers, data);
    }

    public async deleteText (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined> {
        LOG.debug('.deleteJson: ', url, data, headers);
        return await this._client.textRequest(RequestMethod.DELETE, url, headers, data);
    }

    public async jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        return await this._client.jsonRequest(method, url, headers, data);
    }

    public async getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        return await this._client.jsonRequest(RequestMethod.GET, url, headers);
    }

    public async postJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        return await this._client.jsonRequest(RequestMethod.POST, url, headers, data);
    }

    public async patchJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        return await this._client.jsonRequest(RequestMethod.PATCH, url, headers, data);
    }

    public async putJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        return await this._client.jsonRequest(RequestMethod.PUT, url, headers, data);
    }

    public async deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        return await this._client.jsonRequest(RequestMethod.DELETE, url, headers, data);
    }







    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static useClient (
        client: RequestClientInterface
    ) {
        this._client = new RequestClient( client );
    }

    public static async textRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.textRequest(method, url, headers, data);
    }

    public static async getText (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.getText(url, headers);
    }

    public static async postText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw this._createClientError();
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.postText(url, data, headers);
    }

    public static async patchText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw this._createClientError();
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.patchText(url, data, headers);
    }

    public static async putText (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<string| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.putText(url, data, headers);
    }

    public static async deleteText (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<string| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.deleteText(url, headers, data);
    }

    public static async jsonRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.jsonRequest(method, url, headers, data);
    }

    public static async getJson (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.getJson(url, headers);
    }

    public static async postJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw this._createClientError();
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.postJson(url, data, headers);
    }

    public static async patchJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.patchJson(url, data, headers);
    }

    public static async putJson (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.putJson(url, data, headers);
    }

    public static async deleteJson (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<JsonAny| undefined> {
        if (!this._client) throw this._createClientError();
        return await this._client.deleteJson(url, headers, data);
    }

    /**
     * @throw TypeError
     * @private
     */
    private static _createClientError () {
        return new TypeError(`RequestClient: You must initialize implementation first using HgFrontend.initialize() or HgNode.initialize()`);
    }

}

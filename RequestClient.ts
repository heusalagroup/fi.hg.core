// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "./request/types/RequestMethod";
import { JsonAny } from "./Json";
import { RequestClientInterface } from "./requestClient/RequestClientInterface";
import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";
import { ResponseEntity } from "./request/ResponseEntity";

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


    public async textEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<ResponseEntity<string| undefined>> {
        return await this._client.textEntityRequest(method, url, headers, data);
    }

    public async getTextEntity (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        return await this._client.textEntityRequest(RequestMethod.GET, url, headers);
    }

    public async postTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.textEntityRequest(RequestMethod.POST, url, headers, data);
    }

    public async patchTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.textEntityRequest(RequestMethod.PATCH, url, headers, data);
    }

    public async putTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        LOG.debug('.putJson: ', url, data, headers);
        return await this._client.textEntityRequest(RequestMethod.PUT, url, headers, data);
    }

    public async deleteTextEntity (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<ResponseEntity<string| undefined>> {
        LOG.debug('.deleteJson: ', url, data, headers);
        return await this._client.textEntityRequest(RequestMethod.DELETE, url, headers, data);
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



    public async jsonEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        return await this._client.jsonEntityRequest(method, url, headers, data);
    }

    public async getJsonEntity (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny|undefined>> {
        return await this._client.jsonEntityRequest(RequestMethod.GET, url, headers);
    }

    public async postJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        return await this._client.jsonEntityRequest(RequestMethod.POST, url, headers, data);
    }

    public async patchJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        return await this._client.jsonEntityRequest(RequestMethod.PATCH, url, headers, data);
    }

    public async putJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        return await this._client.jsonEntityRequest(RequestMethod.PUT, url, headers, data);
    }

    public async deleteJsonEntity (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        return await this._client.jsonEntityRequest(RequestMethod.DELETE, url, headers, data);
    }







    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static setClient (
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

    public static async textEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<ResponseEntity<string| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.textEntityRequest(method, url, headers, data);
    }

    public static async getTextEntity (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.getTextEntity(url, headers);
    }

    public static async postTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        if (!this._client) throw this._createClientError();
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.postTextEntity(url, data, headers);
    }

    public static async patchTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        if (!this._client) throw this._createClientError();
        LOG.debug('.patchJson: ', url, data, headers);
        return await this._client.patchTextEntity(url, data, headers);
    }

    public static async putTextEntity (
        url      : string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<string| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.putTextEntity(url, data, headers);
    }

    public static async deleteTextEntity (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: string
    ) : Promise<ResponseEntity<string| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.deleteTextEntity(url, headers, data);
    }

    public static async jsonEntityRequest (
        method   : RequestMethod,
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.jsonEntityRequest(method, url, headers, data);
    }

    public static async getJsonEntity (
        url      : string,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.getJsonEntity(url, headers);
    }

    public static async postJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        if (!this._client) throw this._createClientError();
        LOG.debug('.postJson: ', url, data, headers);
        return await this._client.postJsonEntity(url, data, headers);
    }

    public static async patchJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.patchJsonEntity(url, data, headers);
    }

    public static async putJsonEntity (
        url      : string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.putJsonEntity(url, data, headers);
    }

    public static async deleteJsonEntity (
        url      : string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ) : Promise<ResponseEntity<JsonAny| undefined>> {
        if (!this._client) throw this._createClientError();
        return await this._client.deleteJsonEntity(url, headers, data);
    }

    /**
     * @throw TypeError
     * @private
     */
    private static _createClientError () {
        return new TypeError(`RequestClient: You must initialize implementation first using HgFrontend.initialize() or HgNode.initialize()`);
    }

}

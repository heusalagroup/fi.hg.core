// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor. All rights reserved.

import { RequestMethod } from "./request/types/RequestMethod";
import { JsonAny } from "./Json";
import { RequestClientAdapter } from "./requestClient/RequestClientAdapter";
import { LogService } from "./LogService";
import { LogLevel } from "./types/LogLevel";
import { ResponseEntity } from "./request/types/ResponseEntity";
import { RequestClient } from "./RequestClient";

const LOG = LogService.createLogger( 'RequestClientImpl' );

/**
 * @inheritDoc
 */
export class RequestClientImpl implements RequestClient {

    /** Internal state for static methods.
     *
     * You must call `.useClient()` to initialize it
     *
     * @private
     */
    private static _client: RequestClient | undefined = undefined;

    /**
     * Internal state for normal methods
     * @private
     */
    private readonly _adapter: RequestClientAdapter;

    /**
     * Creates client instance
     *
     * @param client
     * @deprecated Use RequestClientImpl.create(), the direct constructor will be changed to protected later.
     */
    protected constructor (client: RequestClientAdapter) {
        this._adapter = client;
    }

    /**
     * @inheritDoc
     */
    public getClient (): RequestClientAdapter {
        return this._adapter;
    }

    /**
     * @inheritDoc
     */
    public async textEntityRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<ResponseEntity<string | undefined>> {
        return await this._adapter.textEntityRequest( method, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async getTextEntity (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        return await this._adapter.textEntityRequest( RequestMethod.GET, url, headers );
    }

    /**
     * @inheritDoc
     */
    public async postTextEntity (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        LOG.debug( '.postJson: ', url, data, headers );
        return await this._adapter.textEntityRequest( RequestMethod.POST, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async patchTextEntity (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        LOG.debug( '.patchJson: ', url, data, headers );
        return await this._adapter.textEntityRequest( RequestMethod.PATCH, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async putTextEntity (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        LOG.debug( '.putJson: ', url, data, headers );
        return await this._adapter.textEntityRequest( RequestMethod.PUT, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async deleteTextEntity (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<ResponseEntity<string | undefined>> {
        LOG.debug( '.deleteJson: ', url, data, headers );
        return await this._adapter.textEntityRequest( RequestMethod.DELETE, url, headers, data );
    }


    /**
     * @inheritDoc
     */
    public async textRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<string | undefined> {
        return await this._adapter.textRequest( method, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async getText (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        return await this._adapter.textRequest( RequestMethod.GET, url, headers );
    }

    /**
     * @inheritDoc
     */
    public async postText (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        LOG.debug( '.postJson: ', url, data, headers );
        return await this._adapter.textRequest( RequestMethod.POST, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async patchText (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        LOG.debug( '.patchJson: ', url, data, headers );
        return await this._adapter.textRequest( RequestMethod.PATCH, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async putText (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        LOG.debug( '.putJson: ', url, data, headers );
        return await this._adapter.textRequest( RequestMethod.PUT, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async deleteText (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<string | undefined> {
        LOG.debug( '.deleteJson: ', url, data, headers );
        return await this._adapter.textRequest( RequestMethod.DELETE, url, headers, data );
    }


    /**
     * @inheritDoc
     */
    public async jsonRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<JsonAny | undefined> {
        return await this._adapter.jsonRequest( method, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async getJson (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        return await this._adapter.jsonRequest( RequestMethod.GET, url, headers );
    }

    /**
     * @inheritDoc
     */
    public async postJson (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        return await this._adapter.jsonRequest( RequestMethod.POST, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async patchJson (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        return await this._adapter.jsonRequest( RequestMethod.PATCH, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async putJson (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        return await this._adapter.jsonRequest( RequestMethod.PUT, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async deleteJson (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<JsonAny | undefined> {
        return await this._adapter.jsonRequest( RequestMethod.DELETE, url, headers, data );
    }


    /**
     * @inheritDoc
     */
    public async jsonEntityRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return await this._adapter.jsonEntityRequest( method, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async getJsonEntity (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return await this._adapter.jsonEntityRequest( RequestMethod.GET, url, headers );
    }

    /**
     * @inheritDoc
     */
    public async postJsonEntity (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return await this._adapter.jsonEntityRequest( RequestMethod.POST, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async patchJsonEntity (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return await this._adapter.jsonEntityRequest( RequestMethod.PATCH, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async putJsonEntity (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return await this._adapter.jsonEntityRequest( RequestMethod.PUT, url, headers, data );
    }

    /**
     * @inheritDoc
     */
    public async deleteJsonEntity (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        return await this._adapter.jsonEntityRequest( RequestMethod.DELETE, url, headers, data );
    }


    public static create (client: RequestClientAdapter): RequestClientImpl {
        return new RequestClientImpl( client );
    }

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel( level );
    }

    public static setClient (
        client: RequestClientAdapter
    ) {
        this._client = new RequestClientImpl( client );
    }

    public static hasClient (): boolean {
        return !!this._client;
    }

    public static getClient (): RequestClientAdapter {
        if ( !this._client ) {
            throw new TypeError( 'Client has not been initialized yet' );
        }
        return this._client.getClient();
    }

    public static async textRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<string | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.textRequest( method, url, headers, data );
    }

    public static async getText (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.getText( url, headers );
    }

    public static async postText (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        if ( !this._client ) throw this._createClientError();
        LOG.debug( '.postJson: ', url, data, headers );
        return await this._client.postText( url, data, headers );
    }

    public static async patchText (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        if ( !this._client ) throw this._createClientError();
        LOG.debug( '.patchJson: ', url, data, headers );
        return await this._client.patchText( url, data, headers );
    }

    public static async putText (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<string | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.putText( url, data, headers );
    }

    public static async deleteText (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<string | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.deleteText( url, headers, data );
    }

    public static async jsonRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<JsonAny | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.jsonRequest( method, url, headers, data );
    }

    public static async getJson (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.getJson( url, headers );
    }

    public static async postJson (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        if ( !this._client ) throw this._createClientError();
        LOG.debug( '.postJson: ', url, data, headers );
        return await this._client.postJson( url, data, headers );
    }

    public static async patchJson (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.patchJson( url, data, headers );
    }

    public static async putJson (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<JsonAny | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.putJson( url, data, headers );
    }

    public static async deleteJson (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<JsonAny | undefined> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.deleteJson( url, headers, data );
    }

    public static async textEntityRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<ResponseEntity<string | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.textEntityRequest( method, url, headers, data );
    }

    public static async getTextEntity (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.getTextEntity( url, headers );
    }

    public static async postTextEntity (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        if ( !this._client ) throw this._createClientError();
        LOG.debug( '.postJson: ', url, data, headers );
        return await this._client.postTextEntity( url, data, headers );
    }

    public static async patchTextEntity (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        if ( !this._client ) throw this._createClientError();
        LOG.debug( '.patchJson: ', url, data, headers );
        return await this._client.patchTextEntity( url, data, headers );
    }

    public static async putTextEntity (
        url: string,
        data    ?: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<string | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.putTextEntity( url, data, headers );
    }

    public static async deleteTextEntity (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: string
    ): Promise<ResponseEntity<string | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.deleteTextEntity( url, headers, data );
    }

    public static async jsonEntityRequest (
        method: RequestMethod,
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.jsonEntityRequest( method, url, headers, data );
    }

    public static async getJsonEntity (
        url: string,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.getJsonEntity( url, headers );
    }

    public static async postJsonEntity (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        if ( !this._client ) throw this._createClientError();
        LOG.debug( '.postJson: ', url, data, headers );
        return await this._client.postJsonEntity( url, data, headers );
    }

    public static async patchJsonEntity (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.patchJsonEntity( url, data, headers );
    }

    public static async putJsonEntity (
        url: string,
        data    ?: JsonAny,
        headers ?: {[key: string]: string}
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.putJsonEntity( url, data, headers );
    }

    public static async deleteJsonEntity (
        url: string,
        headers ?: {[key: string]: string},
        data    ?: JsonAny
    ): Promise<ResponseEntity<JsonAny | undefined>> {
        if ( !this._client ) throw this._createClientError();
        return await this._client.deleteJsonEntity( url, headers, data );
    }


    /**
     * @throw TypeError
     * @private
     */
    private static _createClientError () {
        return new TypeError( `RequestClient: You must initialize implementation first using HgFrontend.initialize() or HgNode.initialize()` );
    }

}

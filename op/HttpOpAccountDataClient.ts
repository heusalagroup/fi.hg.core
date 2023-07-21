// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountDataClient } from "./OpAccountDataClient";
import { RequestClient } from "../RequestClient";
import { LogService } from "../LogService";
import {
    OP_ACCOUNT_DATA_GET_ACCOUNT_DETAILS_PATH,
    OP_ACCOUNT_DATA_GET_ACCOUNT_LIST_PATH,
    OP_ACCOUNT_DATA_GET_TRANSACTION_LIST_PATH,
    OP_PRODUCTION_URL
} from "./op-constants";
import { OpAuthClient } from "./OpAuthClient";
import { LogLevel } from "../types/LogLevel";
import { explainOpAccountListDTO, isOpAccountListDTO, OpAccountListDTO } from "./dto/OpAccountListDTO";
import { explainOpAccountDetailsDTO, isOpAccountDetailsDTO, OpAccountDetailsDTO } from "./dto/OpAccountDetailsDTO";
import { JsonAny } from "../Json";
import { TestCallbackNonStandardOf } from "../types/TestCallback";
import { ExplainCallback } from "../types/ExplainCallback";
import { forEach } from "../functions/forEach";
import { keys } from "../functions/keys";
import { explainOpTransactionListDTO, isOpTransactionListDTO, OpTransactionListDTO } from "./dto/OpTransactionListDTO";

const LOG = LogService.createLogger( 'HttpOpAccountDataClient' );

/**
 * OP Corporate Payment API implementation
 */
export class HttpOpAccountDataClient implements OpAccountDataClient, OpAuthClient {

    private readonly _client: RequestClient;
    private readonly _auth: OpAuthClient;
    private readonly _url: string;
    private _token: string | undefined;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static create (
        client: RequestClient,
        auth: OpAuthClient,
        url : string = OP_PRODUCTION_URL
    ) : HttpOpAccountDataClient {
        return new HttpOpAccountDataClient(
            client,
            auth,
            url,
        );
    }

    private constructor (
        client: RequestClient,
        auth: OpAuthClient,
        url: string,
        token ?: string | undefined,
    ) {
        this._client = client;
        this._auth = auth;
        this._url = url;
        this._token = token;
    }

    /**
     * @inheritDoc
     */
    public isAuthenticated () : boolean {
        return this._auth.isAuthenticated();
    }

    /**
     * @inheritDoc
     */
    public async authenticate () : Promise<void> {
        await this._auth.authenticate();
    }

    /**
     * @inheritDoc
     */
    public getAccessKey() : string {
        return this._auth.getAccessKey();
    }

    /**
     * @inheritDoc
     */
    public async getAccountList (): Promise<OpAccountListDTO> {
        return await this._getJsonRequest<OpAccountListDTO>(
            OP_ACCOUNT_DATA_GET_ACCOUNT_LIST_PATH,
            isOpAccountListDTO,
            explainOpAccountListDTO,
            "OpAccountListDTO",
        );
    }

    /**
     * @inheritDoc
     */
    public async getAccountDetails (
        surrogateId: string
    ): Promise<OpAccountDetailsDTO> {
        return await this._getJsonRequest<OpAccountDetailsDTO>(
            OP_ACCOUNT_DATA_GET_ACCOUNT_DETAILS_PATH(surrogateId),
            isOpAccountDetailsDTO,
            explainOpAccountDetailsDTO,
            "OpAccountDetailsDTO",
        );
    }

    /**
     * @inheritDoc
     */
    public async getTransactionListFromTimestamp (
        surrogateId: string,
        fromTimestamp : number,
        maxPast ?: number,
        maxFuture ?: number,
    ): Promise<OpTransactionListDTO> {
        const queryParams : string = this._createQueryParams(
            {
                fromTimestamp: `${fromTimestamp.toFixed(0)}`,
                ...(maxPast !== undefined ? {maxPast: `${maxPast.toFixed(0)}`} : {}),
                ...(maxFuture !== undefined ? {maxFuture: `${maxFuture.toFixed(0)}`} : {}),
            }
        );
        return await this._getJsonRequest<OpTransactionListDTO>(
            `${OP_ACCOUNT_DATA_GET_TRANSACTION_LIST_PATH(surrogateId)}${queryParams}`,
            isOpTransactionListDTO,
            explainOpTransactionListDTO,
            "OpTransactionListDTO",
        );
    }

    /**
     * @inheritDoc
     */
    public async getTransactionListFromObjectId (
        surrogateId: string,
        objectId : string,
        maxPast ?: number,
        maxFuture ?: number,
    ): Promise<OpTransactionListDTO> {
        const queryParams : string = this._createQueryParams(
            {
                objectId,
                ...(maxPast !== undefined ? {maxPast: `${maxPast.toFixed(0)}`} : {}),
                ...(maxFuture !== undefined ? {maxFuture: `${maxFuture.toFixed(0)}`} : {}),
            }
        );
        return await this._getJsonRequest<OpTransactionListDTO>(
            `${OP_ACCOUNT_DATA_GET_TRANSACTION_LIST_PATH(surrogateId)}${queryParams}`,
            isOpTransactionListDTO,
            explainOpTransactionListDTO,
            "OpTransactionListDTO",
        );
    }

    private _createQueryParams (
        params : {readonly [key:string] : string}
    ) : string {
        const a = new URLSearchParams();
        forEach(
            keys(params),
            (key: string) : void => {
                const value : string = params[key];
                a.append(key, value);
            }
        );
        let str = a.toString();
        return str === '' ? '' : `?${str}`;
    }

    private async _getJsonRequest<T> (
        path: string,
        isDTO: TestCallbackNonStandardOf<T>,
        explainDTO: ExplainCallback,
        dtoName : string,
    ) : Promise<T> {
        if (!this._auth.isAuthenticated()) {
            await this._auth.authenticate();
        }
        const dto : JsonAny | undefined = await this._client.getJson(
            `${this._url}${path}`,
            this._createRequestHeaders()
        );
        if (!isDTO(dto)) {
            LOG.debug(`invalid response = `, dto);
            throw new TypeError(`Response was not ${dtoName}: ${explainDTO(dto)}`);
        }
        return dto;
    }

    private _createRequestHeaders () : {[key: string]: string} {
        const token : string = this._auth.getAccessKey();
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Request-ID': this._createRequestId()
        };
    }

    private _createRequestId () : string {
        return `${Date.now()}`;
    }

}

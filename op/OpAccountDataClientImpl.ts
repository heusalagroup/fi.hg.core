// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountDataClient } from "./OpAccountDataClient";
import { RequestClientImpl } from "../RequestClientImpl";
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
import { explainOpTransactionListDTO, isOpTransactionListDTO, OpTransactionListDTO } from "./dto/OpTransactionListDTO";
import { QueryParamUtils } from "../QueryParamUtils";
import { OpRequestUtils } from "./OpRequestUtils";

const LOG = LogService.createLogger( 'OpAccountDataClientImpl' );

/**
 * OP Corporate Payment API implementation
 */
export class OpAccountDataClientImpl implements OpAccountDataClient, OpAuthClient {

    private readonly _client: RequestClientImpl;
    private readonly _auth: OpAuthClient;
    private readonly _url: string;
    private _token: string | undefined;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static create (
        client: RequestClientImpl,
        auth: OpAuthClient,
        url : string = OP_PRODUCTION_URL
    ) : OpAccountDataClientImpl {
        return new OpAccountDataClientImpl(
            client,
            auth,
            url,
        );
    }

    private constructor (
        client: RequestClientImpl,
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
        return await OpRequestUtils.getJsonRequest<OpAccountListDTO>(
            this._client,
            this._auth,
            this._url,
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
        return await OpRequestUtils.getJsonRequest<OpAccountDetailsDTO>(
            this._client,
            this._auth,
            this._url,
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
        const queryParams : string = QueryParamUtils.stringifyQueryParams(
            {
                fromTimestamp: `${fromTimestamp.toFixed(0)}`,
                ...(maxPast !== undefined ? {maxPast: `${maxPast.toFixed(0)}`} : {}),
                ...(maxFuture !== undefined ? {maxFuture: `${maxFuture.toFixed(0)}`} : {}),
            }
        );
        return await OpRequestUtils.getJsonRequest<OpTransactionListDTO>(
            this._client,
            this._auth,
            this._url,
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
        const queryParams : string = QueryParamUtils.stringifyQueryParams(
            {
                objectId,
                ...(maxPast !== undefined ? {maxPast: `${maxPast.toFixed(0)}`} : {}),
                ...(maxFuture !== undefined ? {maxFuture: `${maxFuture.toFixed(0)}`} : {}),
            }
        );
        return await OpRequestUtils.getJsonRequest<OpTransactionListDTO>(
            this._client,
            this._auth,
            this._url,
            `${OP_ACCOUNT_DATA_GET_TRANSACTION_LIST_PATH(surrogateId)}${queryParams}`,
            isOpTransactionListDTO,
            explainOpTransactionListDTO,
            "OpTransactionListDTO",
        );
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpAccountDataClient } from "./OpAccountDataClient";
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
import { RequestClient } from "../RequestClient";
import { forEach } from "../functions/forEach";
import { OpTransactionDTO } from "./dto/OpTransactionDTO";

const LOG = LogService.createLogger( 'OpAccountDataClientImpl' );

/**
 * OP Corporate Payment API implementation
 */
export class OpAccountDataClientImpl implements OpAccountDataClient, OpAuthClient {

    private readonly _client: RequestClient;
    private readonly _auth: OpAuthClient;
    private readonly _url: string;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static create (
        client: RequestClient,
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
        client: RequestClient,
        auth: OpAuthClient,
        url: string,
    ) {
        this._client = client;
        this._auth = auth;
        this._url = url;
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
    public async authenticate (
        clientId     : string,
        clientSecret : string,
    ) : Promise<void> {
        await this._auth.authenticate(
            clientId,
            clientSecret,
        );
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
        surrogateId    : string,
        fromTimestamp  : number,
        maxPast       ?: number,
        maxFuture     ?: number,
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

    /**
     * @inheritDoc
     */
    public async getTransactionListFromTimestampRange (
        surrogateId    : string,
        fromTimestamp  : number,
        toTimestamp    : number,
        bufferSize     : number = 150,
    ) : Promise<OpTransactionListDTO> {
        let list : OpTransactionListDTO;
        let fullList : OpTransactionDTO[] = [];
        let prevStartTime = fromTimestamp;
        do {

            LOG.debug(`Fetching from ${fromTimestamp} to ${toTimestamp} for ${bufferSize} items`);
            list = await this.getTransactionListFromTimestamp(
                surrogateId,
                fromTimestamp,
                0,
                bufferSize
            );
            prevStartTime = fromTimestamp;

            if ( list.length > 0 ) {
                let breakLoop : boolean = false;
                forEach(
                    list,
                    (item: OpTransactionDTO) : void => {
                        const time : number = item.timestamp;
                        if (time > toTimestamp) {
                            breakLoop = true;
                        } else {
                            if (time >= prevStartTime) {
                                fullList.push(item);
                                if (time + 1 > fromTimestamp) {
                                    fromTimestamp = time + 1;
                                }
                            } else {
                                LOG.warn(`Warning! Got older items with time ${time}: `, item);
                            }
                        }
                    }
                );
                if (breakLoop) break;
            }

            if (prevStartTime === fromTimestamp) {
                break;
            }

        } while ( list.length > 0 );

        // Sort by timestamp
        fullList.sort((
            a: OpTransactionDTO,
            b: OpTransactionDTO,
        ) : number => {
            const aa : number = a.timestamp;
            const bb : number = b.timestamp;
            if (aa === bb) return 0;
            return aa < bb ? -1 : 1;
        });

        return fullList;
    }

}

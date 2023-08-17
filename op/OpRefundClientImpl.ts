// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../LogService";
import { RequestClient } from "../RequestClient";
import { LogLevel } from "../types/LogLevel";
import { RequestSigner } from "../types/RequestSigner";
import { OpRefundRequestDTO } from "./dto/OpRefundRequestDTO";
import { explainOpRefundResponseDTO, isOpRefundResponseDTO, OpRefundResponseDTO } from "./dto/OpRefundResponseDTO";
import { OP_CREATE_SEPA_REFUND_PATH, OP_PRODUCTION_URL } from "./op-constants";
import { OpAuthClient } from "./OpAuthClient";
import { OpRefundClient } from "./OpRefundClient";
import { OpRequestUtils } from "./OpRequestUtils";

const LOG = LogService.createLogger( 'OpRefundClientImpl' );

/**
 * @inheritDoc
 */
export class OpRefundClientImpl implements OpRefundClient, OpAuthClient {

    private readonly _client: RequestClient;
    private readonly _auth: OpAuthClient;
    private readonly _signer: RequestSigner;
    private readonly _url: string;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static create (
        client: RequestClient,
        auth: OpAuthClient,
        signer: RequestSigner,
        url : string = OP_PRODUCTION_URL
    ) : OpRefundClientImpl {
        return new OpRefundClientImpl(
            client,
            auth,
            signer,
            url,
        );
    }

    protected constructor (
        client: RequestClient,
        auth: OpAuthClient,
        signer: RequestSigner,
        url: string,
    ) {
        this._client = client;
        this._auth = auth;
        this._signer = signer;
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
        await this._auth.authenticate(clientId, clientSecret);
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
    public async refundPayment (
        refundRequest: OpRefundRequestDTO,
    ): Promise<OpRefundResponseDTO> {
        return await OpRequestUtils.postSignedRequest<OpRefundRequestDTO, OpRefundResponseDTO>(
            this._client,
            this._auth,
            this._signer,
            this._url,
            OP_CREATE_SEPA_REFUND_PATH,
            refundRequest,
            isOpRefundResponseDTO,
            explainOpRefundResponseDTO,
            "OpRefundResponseDTO",
        );
    }

}

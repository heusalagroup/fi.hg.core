// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpPaymentClient } from "./OpPaymentClient";
import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { explainOpPaymentResponseDTO, isOpPaymentResponseDTO, OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";
import { LogService } from "../LogService";
import { OP_CREATE_SEPA_INSTANT_PAYMENT_PATH, OP_CREATE_SEPA_PAYMENT_PATH, OP_PRODUCTION_URL, OP_SEPA_INSTANT_PAYMENT_STATUS_PATH } from "./op-constants";
import { OpAuthClient } from "./OpAuthClient";
import { LogLevel } from "../types/LogLevel";
import { OpRequestUtils } from "./OpRequestUtils";
import { explainOpPaymentListDTO, isOpPaymentListDTO, OpPaymentListDTO } from "./dto/OpPaymentListDTO";
import { RequestSigner } from "../types/RequestSigner";
import { RequestClient } from "../RequestClient";

const LOG = LogService.createLogger( 'OpPaymentClientImpl' );

/**
 * OP Corporate Payment API implementation
 */
export class OpPaymentClientImpl implements OpPaymentClient, OpAuthClient {

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
    ) : OpPaymentClientImpl {
        return new OpPaymentClientImpl(
            client,
            auth,
            signer,
            url,
        );
    }

    private constructor (
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

    public isAuthenticated () : boolean {
        return this._auth.isAuthenticated();
    }

    public async authenticate (
        clientId     : string,
        clientSecret : string,
    ) : Promise<void> {
        await this._auth.authenticate(clientId, clientSecret);
    }

    public getAccessKey() : string {
        return this._auth.getAccessKey();
    }

    /**
     * @inheritDoc
     */
    public async createPayment (paymentRequestDto: OpPaymentRequestDTO): Promise<OpPaymentResponseDTO> {
        return await OpRequestUtils.postSignedRequest<OpPaymentRequestDTO, OpPaymentResponseDTO>(
            this._client,
            this._auth,
            this._signer,
            this._url,
            OP_CREATE_SEPA_PAYMENT_PATH,
            paymentRequestDto,
            isOpPaymentResponseDTO,
            explainOpPaymentResponseDTO,
            "OpPaymentResponseDTO",
        );
    }

    /**
     * @inheritDoc
     */
    public async createInstantPayment (paymentRequestDto: OpPaymentRequestDTO): Promise<OpPaymentResponseDTO> {
        return await OpRequestUtils.postSignedRequest<OpPaymentRequestDTO, OpPaymentResponseDTO>(
            this._client,
            this._auth,
            this._signer,
            this._url,
            OP_CREATE_SEPA_INSTANT_PAYMENT_PATH,
            paymentRequestDto,
            isOpPaymentResponseDTO,
            explainOpPaymentResponseDTO,
            "OpPaymentResponseDTO",
        );
    }

    /**
     * @inheritDoc
     */
    public async getInstantPaymentStatus (
        instructionId: string
    ): Promise<OpPaymentListDTO> {
        return await OpRequestUtils.getJsonRequest<OpPaymentListDTO>(
            this._client,
            this._auth,
            this._url,
            OP_SEPA_INSTANT_PAYMENT_STATUS_PATH(instructionId),
            isOpPaymentListDTO,
            explainOpPaymentListDTO,
            "OpPaymentListDTO",
        );
    }

}

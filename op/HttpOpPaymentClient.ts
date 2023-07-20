// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createSign } from 'crypto';
import { OpPaymentClient } from "./OpPaymentClient";
import { OpPaymentRequestDTO } from "./dto/OpPaymentRequestDTO";
import { RequestClient } from "../RequestClient";
import { explainOpPaymentResponseDTO, isOpPaymentResponseDTO, OpPaymentResponseDTO } from "./dto/OpPaymentResponseDTO";
import { LogService } from "../LogService";
import { OP_PRODUCTION_URL } from "./op-constants";
import { OpAuthClient } from "./OpAuthClient";
import { LogLevel } from "../types/LogLevel";

const LOG = LogService.createLogger( 'HttpOpPaymentClient' );

/**
 * OP Corporate Payment API implementation
 */
export class HttpOpPaymentClient implements OpPaymentClient, OpAuthClient {

    private readonly _client: RequestClient;
    private readonly _auth: OpAuthClient;
    private readonly _signingKey: string;
    private readonly _signingKid: string;
    private readonly _url: string;
    private _token: string | undefined;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static create (
        client: RequestClient,
        auth: OpAuthClient,
        signingKey: string,
        signingKid: string,
        url : string = OP_PRODUCTION_URL
    ) : HttpOpPaymentClient {
        return new HttpOpPaymentClient(
            client,
            auth,
            url,
            signingKey,
            signingKid,
        );
    }

    private constructor (
        client: RequestClient,
        auth: OpAuthClient,
        url: string,
        signingKey: string,
        signingKid: string,
        token ?: string | undefined,
    ) {
        this._client = client;
        this._auth = auth;
        this._signingKey = signingKey;
        this._signingKid = signingKid;
        this._url = url;
        this._token = token;
    }

    public isAuthenticated () : boolean {
        return this._auth.isAuthenticated();
    }

    public async authenticate () : Promise<void> {
        await this._auth.authenticate();
    }

    public getAccessKey() : string {
        return this._auth.getAccessKey();
    }

    /**
     * @inheritDoc
     */
    public async createPayment (paymentRequestDto: OpPaymentRequestDTO): Promise<OpPaymentResponseDTO> {
        if (!this._auth.isAuthenticated()) {
            await this._auth.authenticate();
        }
        const token = this._auth.getAccessKey();
        const paymentRequest : string = JSON.stringify(paymentRequestDto);
        const IAT = Math.floor(Date.now() / 1000);
        const HEADER = JSON.stringify({
            "b64": false,
            "crit": ["b64", "urn:op.api.iat"],
            "alg": "RS256",
            "urn:op.api.iat": IAT,
            "kid": this._signingKid
        });
        const HEADER_ENC = Buffer.from(HEADER, 'utf8').toString('base64url');
        LOG.debug(`HEADER_ENC = "${HEADER_ENC}"`);
        const sign = createSign('SHA256');
        sign.write(`${HEADER_ENC}.${paymentRequest}`);
        sign.end();
        const SIGNATURE = sign.sign(this._signingKey, 'base64url');
        LOG.debug(`SIGNATURE = "${SIGNATURE}"`);
        const REQ_SIGNATURE = `${HEADER_ENC}..${SIGNATURE}`;
        LOG.debug(`REQ_SIGNATURE = "${REQ_SIGNATURE}"`);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Req-Signature': REQ_SIGNATURE
        };

        const resultString = await this._client.postText(
            `${this._url}/corporate-payment/v1/sepa-payment`,
            paymentRequest,
            headers
        );

        const dto = JSON.parse(resultString!);
        if (!isOpPaymentResponseDTO(dto)) {
            throw new TypeError(`Response was not OpPaymentResponseDTO: ${explainOpPaymentResponseDTO(dto)}`);
        }
        return dto;
    }

}

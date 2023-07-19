// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createHmac, createSign } from 'crypto';
import { OpPaymentClient } from "./OpPaymentClient";
import { OpPaymentRequestDTO } from "./types/OpPaymentRequestDTO";
import { RequestClient } from "../RequestClient";
import { explainOpPaymentResponseDTO, isOpPaymentResponseDTO, OpPaymentResponseDTO } from "./types/OpPaymentResponseDTO";
import { isNonEmptyString } from "../types/String";
import { LogService } from "../LogService";

export const OP_PRODUCTION_URL = 'https://corporate-api.apiauth.services.op.fi';
export const OP_SANDBOX_URL = 'https://sandbox-api.apiauth.aws.op-palvelut.net';

const LOG = LogService.createLogger( 'HttpOpPaymentClient' );

/**
 * OP Corporate Payment API implementation
 */
export class HttpOpPaymentClient implements OpPaymentClient {

    private readonly _client: RequestClient;
    private readonly _clientId: string;
    private readonly _clientSecret: string;
    private readonly _signingKey: string;
    private readonly _signingKid: string;
    private readonly _url: string;
    private _token: string | undefined;

    private constructor (
        client: RequestClient,
        url: string,
        clientId: string,
        clientSecret: string,
        signingKey: string,
        signingKid: string,
        token ?: string | undefined,
    ) {
        this._client = client;
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._signingKey = signingKey;
        this._signingKid = signingKid;
        this._url = url;
        this._token = token;
    }

    public static create (
        client: RequestClient,
        clientId: string,
        clientSecret: string,
        signingKey: string,
        signingKid: string,
        url : string = OP_PRODUCTION_URL
    ) : HttpOpPaymentClient {
        return new HttpOpPaymentClient(
            client,
            url,
            clientId,
            clientSecret,
            signingKey,
            signingKid,
        );
    }

    public isAuthenticated () : boolean {
        return !!this._token;
    }

    public async authenticate () : Promise<void> {
        this._token = await this._getAccessToken(this._clientId, this._clientSecret);
    }

    /**
     * @inheritDoc
     */
    public async createPayment (paymentRequestDto: OpPaymentRequestDTO): Promise<OpPaymentResponseDTO> {

        if (!this.isAuthenticated()) {
            await this.authenticate();
        }
        const token = this._token as string;

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
        LOG.debug(`HEADER_ENC.PaymentRequest = "${HEADER_ENC}.${paymentRequest}"`);

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

    private async _getAccessToken (
        clientId: string,
        clientSecret: string,
    ): Promise<string> {
        const a = new URLSearchParams();
        a.append('grant_type', 'client_credentials');
        a.append('client_id', clientId);
        a.append('client_secret', clientSecret);
        const credentialsData = a.toString();
        LOG.debug(`credentialsData = "${credentialsData}"`)
        const response = await this._client.postText(
            `${this._url}/corporate-oidc/v1/token`,
            credentialsData,
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        );
        const data = JSON.parse(response!);
        const accessToken = data?.access_token;
        if (!isNonEmptyString(accessToken)) {
            throw new TypeError('HttpOpPaymentClient._getAccessToken: No access token found in the response');
        }
        return accessToken;
    }

}

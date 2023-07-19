// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createHmac } from 'crypto';
import { OpPaymentClient } from "./OpPaymentClient";
import { OpPaymentRequestDTO } from "./types/OpPaymentRequestDTO";
import { RequestClient } from "../RequestClient";
import { explainOpPaymentResponseDTO, isOpPaymentResponseDTO, OpPaymentResponseDTO } from "./types/OpPaymentResponseDTO";

export class HttpOpCorporatePaymentClient implements OpPaymentClient {

    private readonly _clientId: string;
    private readonly _clientSecret: string;
    private readonly _signingKey: string;
    private readonly _signingKid: string;
    private readonly _mtlsKey: string;
    private readonly _mtlsCertificate: string;
    private readonly _url: string;

    constructor (
        clientId: string,
        clientSecret: string,
        signingKey: string,
        signingKid: string,
        mtlsKey: string,
        mtlsCertificate: string,
        url: string
    ) {
        this._clientId = clientId;
        this._clientSecret = clientSecret;
        this._signingKey = signingKey;
        this._signingKid = signingKid;
        this._mtlsKey = mtlsKey;
        this._mtlsCertificate = mtlsCertificate;
        this._url = url;
    }

    /**
     * Initiates payment processing with payload signature
     * @inheritDoc
     */
    public async initiatePayment (paymentRequestDto: OpPaymentRequestDTO): Promise<OpPaymentResponseDTO> {
        const token = await this._getAccessToken();

        const paymentRequest : string = JSON.stringify(paymentRequestDto);

        const IAT = Math.floor(Date.now() / 1000);
        const HEADER = JSON.stringify({
            "b64": false,
            "crit": ["b64", "urn:op.api.iat"],
            "alg": "RS256",
            "urn:op.api.iat": IAT,
            "kid": this._signingKid
        });
        const HEADER_ENC = this._urlSafeBase64Encode(HEADER);
        const SIGNATURE = this._urlSafeBase64Encode(
            createHmac('sha256', this._signingKey)
            .update(`${HEADER_ENC}.${paymentRequest}`)
            .digest('binary')
        );

        const REQ_SIGNATURE = `${HEADER_ENC}.${SIGNATURE}`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Req-Signature': REQ_SIGNATURE
        };

        const resultString = await RequestClient.postText(
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

    private async _getAccessToken(): Promise<string> {
        const response = await RequestClient.postText(
            `${this._url}/corporate-oidc/v1/token`,
            `grant_type=client_credentials&client_id=${this._clientId}&client_secret=${this._clientSecret}`,
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        );
        const data = JSON.parse(response!);
        return data.access_token;
    }

    private _urlSafeBase64Encode(str: string): string {
        return Buffer.from(str).toString('base64')
                     .replace(/\+/g, '-')
                     .replace(/\//g, '_')
                     .replace(/=+$/, '');
    }

}

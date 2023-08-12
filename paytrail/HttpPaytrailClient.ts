// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PaytrailClient } from "./PaytrailClient";
import { createHash, createHmac } from "crypto";
import { RequestClientImpl } from "../RequestClientImpl";
import { startsWith } from "../functions/startsWith";
import { map } from "../functions/map";
import { PaytrailItem } from "./types/PaytrailItem";
import { CreatePaymentRequestDTO, explainCreatePaymentRequestDTO, isCreatePaymentRequestDTO } from "./dtos/CreatePaymentRequestDTO";
import { PaytrailCurrency } from "./types/PaytrailCurrency";
import { PaytrailLanguage } from "./types/PaytrailLanguage";
import { PaytrailCustomer } from "./types/PaytrailCustomer";
import { PaytrailCallbackUrl } from "./types/PaytrailCallbackUrl";
import { parseJson } from "../Json";
import { PaytrailCreatePaymentDTO, explainPaytrailCreatePaymentDTO, isPaytrailCreatePaymentDTO } from "./dtos/PaytrailCreatePaymentDTO";
import { LogService } from "../LogService";
import { explainPaytrailPaymentDTO, isPaytrailPaymentDTO, PaytrailPaymentDTO } from "./dtos/PaytrailPaymentDTO";
import { DEFAULT_PAYTRAIL_API_URL } from "./paytrail-constants";
import { PaytrailAddress } from "./types/PaytrailAddress";
import { LogLevel } from "../types/LogLevel";
import { PaytrailPaymentMethodGroup } from "./types/PaytrailPaymentMethodGroup";
import { explainPaytrailPaymentProviderListDTO, isPaytrailPaymentProviderListDTO, PaytrailPaymentProviderListDTO } from "./dtos/PaytrailPaymentProviderListDTO";
import { explainPaytrailProvider, isPaytrailProvider } from "./types/PaytrailProvider";
import { explainArrayOf, isArrayOf } from "../types/Array";
import { isPaytrailLimitedProvider, PaytrailLimitedProvider } from "./types/PaytrailLimitedProvider";

const LOG = LogService.createLogger( 'HttpPaytrailClient' );

export class HttpPaytrailClient implements PaytrailClient {

    public static setLogLevel(level: LogLevel) {
        LOG.setLogLevel(level);
    }

    private readonly _account: string;
    private readonly _secret : string;
    private readonly _url    : string;

    private constructor (
        account : string,
        secret  : string,
        url     : string
    ) {
        this._account = account;
        this._secret = secret;
        this._url = url;
    }

    public static create (
        account     : string,
        secret      : string,
        url         : string = DEFAULT_PAYTRAIL_API_URL
    ) {
        return new HttpPaytrailClient(account, secret, url);
    }

    /**
     *
     * @inheritDoc
     */
    public async createPayment (
        stamp             : string,
        reference         : string,
        amount            : number,
        customer          : PaytrailCustomer,
        items             : readonly PaytrailItem[] | undefined,
        redirectUrls      : PaytrailCallbackUrl,
        callbackUrls     ?: PaytrailCallbackUrl,
        currency          : PaytrailCurrency = PaytrailCurrency.EUR,
        language          : PaytrailLanguage = PaytrailLanguage.FI,
        deliveryAddress  ?: PaytrailAddress,
        invoicingAddress ?: PaytrailAddress,
        groups           ?: readonly PaytrailPaymentMethodGroup[],
    ): Promise<PaytrailCreatePaymentDTO> {
        const body : CreatePaymentRequestDTO = this._getCreatePaymentRequestBody(
            stamp,
            reference,
            amount,
            customer,
            items,
            redirectUrls,
            callbackUrls,
            currency,
            language,
            deliveryAddress,
            invoicingAddress,
            groups
        );
        return this._createPayment( body );
    }

    /**
     * @inheritDoc
     */
    public isPaid (params: { [key: string]: any }): boolean {
        return params['checkout-status'] === 'ok';
    }

    /**
     * @inheritDoc
     */
    public async getPayment (transactionId: string): Promise<PaytrailPaymentDTO> {
        if (!transactionId) throw new Error('No transaction ID defined!');
        const headers = this._createHeaders('GET', transactionId);
        headers['signature'] = this._calculateHmac(this._secret, headers);
        const resultString = await RequestClientImpl.getText(
            `${this._url}/payments/${transactionId}`,
            headers
        );
        const result = parseJson(resultString);
        if (!isPaytrailPaymentDTO(result)) {
            throw new Error(`Response was not PaytrailPaymentDTO: ${explainPaytrailPaymentDTO(result)}`);
        }
        LOG.debug(`getTransaction: ${transactionId}: result = `, result);
        return result;
    }

    /**
     * @inheritDoc
     */
    public validateRequestParams (
        params  : {[key: string]: string},
        body   ?: string
    ): boolean {
        const signature = params?.signature;
        return signature === this._calculateHmac(this._secret, params, body);
    }

    /**
     * @inheritDoc
     */
    public async getMerchantsPaymentProviders (
        amount ?: number,
        groups ?: readonly PaytrailPaymentMethodGroup[]
    ) : Promise<readonly PaytrailLimitedProvider[]> {
        const queryParams = [
            ...(amount !== undefined? [`amount=${amount}`] : []),
            ...(groups !== undefined? [`groups=${groups.join(',')}`] : [])
        ];
        const headers = this._createHeaders('GET');
        headers['signature'] = this._calculateHmac(this._secret, headers);
        const resultString = await RequestClientImpl.getText(
            `${this._url}/merchants/payment-providers${queryParams?.length ? `?${queryParams.join('&')}`: ''}`,
            headers
        );
        const result = parseJson(resultString);
        if (!isArrayOf<PaytrailLimitedProvider>(result, isPaytrailLimitedProvider)) {
            throw new Error(`Response was not array of PaytrailLimitedProvider: ${explainArrayOf<PaytrailLimitedProvider>("PaytrailProvider", explainPaytrailProvider, result, isPaytrailProvider)}: ${JSON.stringify(result, null , 2)}`);
        }
        LOG.debug(`getMerchantsPaymentProviders: result = `, result);
        return result;
    }

    /**
     * @inheritDoc
     */
    public async getMerchantsGroupedPaymentProviders (
        language ?: PaytrailLanguage,
        amount   ?: number,
        groups   ?: readonly PaytrailPaymentMethodGroup[]
    ) : Promise<PaytrailPaymentProviderListDTO> {
        const queryParams = [
            ...(amount !== undefined? [`amount=${amount}`] : []),
            ...(groups !== undefined? [`groups=${groups.join(',')}`] : []),
            ...(language !== undefined? [`language=${language}`] : []),
        ];
        const headers = this._createHeaders('GET');
        headers['signature'] = this._calculateHmac(this._secret, headers);
        const resultString = await RequestClientImpl.getText(
            `${this._url}/merchants/grouped-payment-providers${queryParams?.length ? `?${queryParams.join('&')}`: ''}`,
            headers
        );
        const result = parseJson(resultString);
        if (!isPaytrailPaymentProviderListDTO(result)) {
            throw new Error(`Response was not PaytrailPaymentProviderListDTO: ${explainPaytrailPaymentProviderListDTO(result)}: ${JSON.stringify(result, null , 2)}`);
        }
        LOG.debug(`getMerchantsGroupedPaymentProviders: result = `, result);
        return result;
    }

    //////////////////////////// PRIVATE METHODS ///////////////////////////////

    private _createHeaders (
        method         : string,
        transactionId ?: string
    ) : {[key: string]: string} {
        return {
            ...(transactionId ? { 'checkout-transaction-id': transactionId } : {}),
            'checkout-account': this._account,
            'checkout-algorithm': 'sha256',
            'checkout-method': method,
            'checkout-nonce': HttpPaytrailClient._hash('sha256', Date.now().toString()),
            'checkout-timestamp': new Date().toISOString(),
            'content-type': 'application/json; charset=utf-8'
        };
    }

    /**
     * HTTP POST /payments creates a new open payment and returns a JSON object
     * that includes the available payment methods. The merchant web shop
     * renders HTML forms from the response objects (see example). The client
     * browser will submit the form to the payment method provider.
     *
     * Once the payment has been completed the client browser will return to the
     * merchant provided redirect URL.
     *
     * List providers endpoint can be used to receive available payment methods
     * without opening a new payment.
     *
     * @param body
     * @private
     */
    private async _createPayment (
        body: CreatePaymentRequestDTO
    ) : Promise<PaytrailCreatePaymentDTO> {
        const headers = this._createHeaders('POST');
        const bodyString = JSON.stringify(body, null, 2);
        headers['signature'] = this._calculateHmac(this._secret, headers, bodyString);
        const resultString = await RequestClientImpl.postText(
            `${this._url}/payments`,
            bodyString,
            headers
        );
        const result = parseJson(resultString);
        if (!isPaytrailCreatePaymentDTO(result)) {
            throw new Error(`Response was not PaytrailCreatePaymentDTO: ${explainPaytrailCreatePaymentDTO(result)}`);
        }
        LOG.debug(`_createPayment: result = `, result);
        return result;
    }

    private _getCreatePaymentRequestBody (
        stamp             : string,
        reference         : string,
        amount            : number,
        customer          : PaytrailCustomer,
        items             : readonly PaytrailItem[] | undefined,
        redirectUrls      : PaytrailCallbackUrl,
        callbackUrls     ?: PaytrailCallbackUrl,
        currency          : PaytrailCurrency = PaytrailCurrency.EUR,
        language          : PaytrailLanguage = PaytrailLanguage.FI,
        deliveryAddress  ?: PaytrailAddress,
        invoicingAddress ?: PaytrailAddress,
        groups           ?: readonly PaytrailPaymentMethodGroup[],
    ): CreatePaymentRequestDTO {
        const dto : CreatePaymentRequestDTO = {
            stamp,
            reference,
            amount,
            currency,
            language,
            customer,
            items: items && items.length ? map( items, (item: PaytrailItem) => item ) : undefined,
            redirectUrls,
            ...(callbackUrls ? {callbackUrls} : {}),
            ...(deliveryAddress ? {deliveryAddress} : {}),
            ...(invoicingAddress ? {invoicingAddress} : {}),
            ...(groups ? {groups} : {}),
        };
        if (!isCreatePaymentRequestDTO(dto)) {
            throw new TypeError(`Invalid input CreatePaymentRequestDTO: ${explainCreatePaymentRequestDTO(dto)}`);
        }
        return dto;
    }

    private _calculateHmac (
        secret  : string,
        params  : {[key: string]: string},
        body   ?: string
    ): string {

        // Keep only checkout- params, more relevant for response validation. Filter query
        // string parameters the same way - the signature includes only checkout- values.
        let includedKeys = Object.keys(params).filter((key) => startsWith(key, 'checkout-'));

        // Keys must be sorted alphabetically
        includedKeys.sort();

        let hmacPayload = includedKeys.map((key) => `${key}:${params[key]}`);
        hmacPayload.push(body ?? '');
        const hmac = createHmac('sha256', secret);
        const data = hmacPayload.join('\n');
        hmac.update(data);
        return hmac.digest('hex');
    }

    private static _hash (algorithm: string, data: string): string {
        const hash = createHash(algorithm);
        hash.update(data);
        return hash.digest('hex');
    }

}

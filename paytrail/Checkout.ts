// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { iCheckoutData } from "./iCheckoutData";
import { iCheckoutTransaction } from "./iCheckoutTransaction";
import { iCheckout } from "./iCheckout";
import { createHash, createHmac } from "crypto";
import { RequestClient } from "../RequestClient";
import { iCheckoutProvider } from "./iCheckoutProvider";
import { CheckoutTransaction } from "./CheckoutTransaction";
import { iCheckoutItem } from "./iCheckoutItem";
import { startsWith } from "../functions/startsWith";
import { isPaytrailPaymentDTO, PaytrailPaymentDTO } from "./dtos/PaytrailPaymentDTO";

export class Checkout implements iCheckout {

    private readonly _account: string;
    private readonly _secret: string;
    private readonly _webUrl: string;
    private readonly _checkoutUrl: string;

    constructor (
        checkoutUrl: string,
        webUrl: string,
        account: string,
        secret: string
    ) {
        this._checkoutUrl = checkoutUrl;
        this._webUrl = webUrl;
        this._account = account;
        this._secret = secret;
    }

    async createTransaction (webSecret: string, coData: iCheckoutData): Promise<iCheckoutTransaction> {

        const headers : {[key: string]: string} = {
            'checkout-account': this._account,
            'checkout-algorithm': 'sha256',
            'checkout-method': 'POST',
            'checkout-nonce': this._hash('sha256', Date.now().toString()),
            'checkout-timestamp': new Date().toISOString(),
            'content-type': 'application/json; charset=utf-8'
        };

        const body = this._getRequestBody(coData, webSecret);

        headers['signature'] = this._calculateHmac(this._secret, headers, body);

        const result = await RequestClient.postJson(
            `${this._checkoutUrl}/payments`,
            body,
            headers
        );

        console.log("RESULT: ", result );

        return Checkout.parseResponseObject(result);
    }

    private _getRequestBody (data: iCheckoutData, webSecret: string): string {
        let items = data.getItems().map((item: iCheckoutItem) => Checkout.getCheckoutItemAsArray(item));

        let customer : {
            email: string,
            firstName: string,
            lastName: string,
            phone ?: string,
            vatId ?: string
        } = {
            email: data.getEmail(),
            firstName: data.getFirstName(),
            lastName: data.getFamilyName(),
        };

        if (data.getPhone() !== '') {
            customer['phone'] = data.getPhone().replace('+', '');
        }

        if (data.getVatId() !== '') {
            customer['vatId'] = data.getVatId();
        }

        return JSON.stringify(
            {
                stamp: data.getStamp(),
                reference: data.getReference(),
                amount: data.getAmount(),
                currency: 'EUR',
                language: 'FI',
                items: items,
                customer: customer,
                callbackUrls: {
                    success: `${this._webUrl}${webSecret}`,
                    cancel: `${this._webUrl}${webSecret}`,
                },
                redirectUrls: {
                    success: `${this._webUrl}${webSecret}`,
                    cancel: `${this._webUrl}${webSecret}`,
                },
            }
        );
    }

    private _calculateHmac (
        secret: string,
        params: {[key: string]: string},
        body: string = ''
    ): string {
        // Keep only checkout- params, more relevant for response validation. Filter query
        // string parameters the same way - the signature includes only checkout- values.
        let includedKeys = Object.keys(params).filter((key) => startsWith(key, 'checkout-'));

        // Keys must be sorted alphabetically
        includedKeys.sort();

        let hmacPayload = includedKeys.map((key) => `${key}:${params[key]}`);

        hmacPayload.push(body);

        const hmac = createHmac('sha256', secret);
        const data = hmacPayload.join('\n');

        hmac.update(data);

        return hmac.digest('hex');
    }

    private _hash (algorithm: string, data: string): string {
        const hash = createHash(algorithm);
        hash.update(data);
        return hash.digest('hex');
    }

    public static parseResponseObject(result: any): iCheckoutTransaction {

        if (!isPaytrailPaymentDTO(result)) {
            throw new Error('ERROR: ' + result['message']);
        }

        // if (!result) {
        //     throw new Error('JSON decoding failed for request response payload');
        // }
        // if (result['status'] === 'error') {
        //     throw new Error('ERROR: ' + result['message']);
        // }
        // if (!result['transactionId']) {
        //     throw new Error('No transactionId in the reply');
        // }
        return Checkout.parseResponseArray(result);
    }

    public static parseResponseArray (data: PaytrailPaymentDTO): iCheckoutTransaction {
        let providers: iCheckoutProvider[] = [];

        // if (data['providers']) {
        //     for(let provider of data['providers']) {
        //
        //         let params = provider['parameters'].map((item: any) => {
        //             return new CheckoutParam(item['name'], item['value']);
        //         });
        //
        //         providers.push(new CheckoutProvider(
        //             provider['url'],
        //             provider['name'],
        //             provider['svg'],
        //             params
        //         ));
        //     }
        // }

        return new CheckoutTransaction(
            data['transactionId'],
            '',
            '',
            // data['href'],
            // data['terms'],
            data['reference'],
            providers,
            []
            // data
        );
    }

    public static getCheckoutItemAsArray(item: iCheckoutItem): any {
        let obj: any = {
            "unitPrice": item.getUnitPrice(),
            "units": item.getUnits(),
            "vatPercentage": item.getVatPercentage(),
            "productCode": item.getProductCode(),
            "deliveryDate": item.getDeliveryDate()
        };

        const description = item.getDescription();
        if (description !== '') {
            obj['description'] = description;
        }

        const category = item.getCategory();
        if (category !== '') {
            obj['category'] = category;
        }

        const stamp = item.getStamp();
        if (stamp !== '') {
            obj['stamp'] = stamp;
        }

        return obj;
    }

    public isPaid (data: { [key: string]: any }): boolean {
        return data['checkout-status'] === 'ok';
    }

    public async getTransaction (transactionId: string): Promise<iCheckoutTransaction> {
        if (!transactionId) throw new Error('No transaction ID defined!');

        const headers : {[key: string]: string} = {
            'checkout-transaction-id': transactionId,
            'checkout-account': this._account,
            'checkout-algorithm': 'sha256',
            'checkout-method': 'GET',
            'checkout-nonce': '' + new Date().getTime(),
            'checkout-timestamp': new Date().toISOString(),
            'content-type': 'application/json; charset=utf-8'
        };

        headers['signature'] = this._calculateHmac(this._secret, headers);

        const result = await RequestClient.getJson(
            `${this._checkoutUrl}/payments/${transactionId}`,
            headers
        );

        console.log("RESULT: ", result);

        return Checkout.parseResponseObject(result);
    }

    public validateRequest (data: any): boolean {
        return data['signature'] === this._calculateHmac(this._secret, data);
    }

}

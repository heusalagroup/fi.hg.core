// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { PaytrailCreatePaymentDTO } from "./dtos/PaytrailCreatePaymentDTO";
import { PaytrailCustomer } from "./types/PaytrailCustomer";
import { PaytrailItem } from "./types/PaytrailItem";
import { PaytrailCallbackUrl } from "./types/PaytrailCallbackUrl";
import { PaytrailCurrency } from "./types/PaytrailCurrency";
import { PaytrailLanguage } from "./types/PaytrailLanguage";
import { PaytrailPaymentDTO } from "./dtos/PaytrailPaymentDTO";
import { PaytrailAddress } from "./types/PaytrailAddress";
import { PaytrailPaymentMethodGroup } from "./types/PaytrailPaymentMethodGroup";
import { PaytrailPaymentProviderListDTO } from "./dtos/PaytrailPaymentProviderListDTO";
import { PaytrailLimitedProvider } from "./types/PaytrailLimitedProvider";

/**
 * Paytrail payment API client
 */
export interface PaytrailClient {

    /**
     * Creates a new open payment and returns a DTO object
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
     * @param stamp
     * @param reference
     * @param amount
     * @param customer
     * @param items
     * @param redirectUrls
     * @param callbackUrls
     * @param currency
     * @param language
     * @param deliveryAddress
     * @param invoicingAddress
     * @param groups
     */
    createPayment (
        stamp         : string,
        reference     : string,
        amount        : number,
        customer      : PaytrailCustomer,
        items         : readonly PaytrailItem[] | undefined,
        redirectUrls  : PaytrailCallbackUrl,
        callbackUrls ?: PaytrailCallbackUrl,
        currency     ?: PaytrailCurrency,
        language     ?: PaytrailLanguage,
        deliveryAddress  ?: PaytrailAddress,
        invoicingAddress ?: PaytrailAddress,
        groups           ?: readonly PaytrailPaymentMethodGroup[],
    ): Promise<PaytrailCreatePaymentDTO>;

    /**
     * Returns the payment
     *
     * @param transactionId
     */
    getPayment (transactionId: string): Promise<PaytrailPaymentDTO>;

    /**
     * Validate request parameters.
     *
     * @param params
     * @param body
     */
    validateRequestParams (
        params  : {[key: string]: string},
        body   ?: string
    ): boolean;

    /**
     * Check if the request was paid
     *
     * @param data The request params
     */
    isPaid (data: { [key: string]: any }): boolean;

    /**
     * Returns a list of available providers for the merchant. This endpoint can
     * be used for example to show
     * available payment methods in checkout without initializing a new payment
     * before the user actually proceeds to pay their order.
     *
     * @see https://docs.paytrail.com/#/?id=payments
     * @see https://docs.paytrail.com/#/?id=list-providers
     * @param amount Purchase amount in currency's minor unit. Some payment
     *               methods have minimum or maximum purchase limits. When the
     *               amount is provided, only the methods suitable for the
     *               amount are returned. Otherwise, all merchant's payment
     *               methods are returned.
     * @param groups List of payment method groups to include. Otherwise all
     *               enabled methods are returned.
     */
    getMerchantsPaymentProviders (
        amount ?: number,
        groups ?: readonly PaytrailPaymentMethodGroup[]
    ) : Promise<readonly PaytrailLimitedProvider[]>;

    /**
     * HTTP GET /merchants/grouped-payment-providers is similar to the List
     * providers-endpoint, but in addition of returning a flat list of
     * providers, it returns payment group data containing localized group
     * names, icons for the groups and grouped providers. Returns also a
     * localized text with a link to the terms of payment.
     *
     * @see https://docs.paytrail.com/#/?id=list-grouped-providers
     * @param amount Purchase amount in currency's minor unit. Some payment
     *               methods have minimum or maximum purchase limits. When the
     *               amount is provided, only the methods suitable for the
     *               amount are returned. Otherwise, all merchant's payment
     *               methods are returned.
     * @param groups Comma separated list of payment method groups to include.
     *               Otherwise all enabled methods are returned.
     * @param language Code of the language the terms of payment and the payment
     *                 group names will be displayed in. Supports only FI, EN
     *                 and SV. FI is the default if left undefined.
     */
    getMerchantsGroupedPaymentProviders (
        language ?: PaytrailLanguage,
        amount   ?: number,
        groups   ?: readonly PaytrailPaymentMethodGroup[]
    ) : Promise<PaytrailPaymentProviderListDTO>;

}

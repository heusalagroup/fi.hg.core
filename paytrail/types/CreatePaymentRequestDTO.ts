// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainString, isString, isStringOrUndefined } from "../../types/String";
import { explain, explainProperty } from "../../types/explain";
import { isPaytrailCurrency, PaytrailCurrency } from "./PaytrailCurrency";
import { isPaytrailLanguage, PaytrailLanguage } from "./PaytrailLanguage";
import { isPaytrailItem, PaytrailItem } from "./PaytrailItem";
import { isPaytrailCustomer, PaytrailCustomer } from "./PaytrailCustomer";
import { isPaytrailAddress, PaytrailAddress } from "./PaytrailAddress";
import { PaytrailCallbackUrl } from "./PaytrailCallbackUrl";
import { PaytrailPaymentMethodGroup } from "./PaytrailPaymentMethodGroup";
import { isNumber } from "../../types/Number";
import { isArrayOf, isArrayOfOrUndefined } from "../../types/Array";

/**
 * @see https://docs.paytrail.com/#/?id=payloads
 */
export interface CreatePaymentRequestDTO {

    /**
     * Merchant unique identifier for the order. Maximum of 200 characters.
     */
    readonly stamp: string;

    /**
     * Order reference. Maximum of 200 characters.
     */
    readonly reference: string;

    /**
     * Total amount of the payment in currency's minor units, e.g. for Euros use
     * cents. Must match the total sum of items and must be more than zero. By
     * default amount should include VAT, unless usePricesWithoutVat is set to
     * true. Maximum value of 99999999.
     */
    readonly amount: number;

    /**
     * Currency, only EUR supported at the moment
     */
    readonly currency: PaytrailCurrency;

    /**
     * Payment's language, currently supported are FI, SV, and EN
     */
    readonly language: PaytrailLanguage;

    /**
     * Order ID. Used for e.g. Walley/Collector payments order ID. If not given,
     * merchant reference is used instead.
     */
    readonly orderId ?: string;

    /**
     * Array of items. Always required for Shop-in-Shop payments. Required if
     * VAT calculations are wanted in settlement reports.
     */
    readonly items ?: readonly PaytrailItem[];

    /**
     * Customer information
     */
    readonly customer : PaytrailCustomer;

    /**
     * Delivery address
     */
    readonly deliveryAddress ?: PaytrailAddress;

    /**
     * Invoicing address
     */
    readonly invoicingAddress ?: PaytrailAddress;

    /**
     * If paid with invoice payment method, the invoice will not be activated
     * automatically immediately. Currently only supported with Walley/Collector.
     */
    readonly manualInvoiceActivation ?: boolean;

    /**
     * Where to redirect browser after a payment is paid or cancelled.
     */
    readonly redirectUrls : PaytrailCallbackUrl;

    /**
     * Which url to ping after this payment is paid or cancelled
     */
    readonly callbackUrls ?: PaytrailCallbackUrl;

    /**
     * Callback URL polling delay in seconds. If callback URLs are given, the
     * call can be delayed up to 900 seconds. Default: 0
     */
    readonly callbackDelay ?: number;

    /**
     * Instead of all enabled payment methods, return only those of given groups.
     * It is highly recommended to use list providers before initiating the
     * payment if filtering by group. If the payment methods are rendered in the
     * webshop the grouping functionality can be implemented based on the group
     * attribute of each returned payment instead of filtering when creating a
     * payment.
     */
    readonly groups ?: readonly PaytrailPaymentMethodGroup[];

    /**
     * If true, amount and items.unitPrice should be sent to API not including
     * VAT, and final amount is calculated by Paytrail's system using the items'
     * unitPrice and vatPercentage (with amounts rounded to closest cent). Also,
     * when true, items must be included.
     */
    readonly usePricesWithoutVat ?: boolean;

}

export function createCreatePaymentRequestDTO (
    stamp : string,
    reference : string,
    amount : number,
    currency : PaytrailCurrency,
    language : PaytrailLanguage,
    customer : PaytrailCustomer,
    redirectUrls : PaytrailCallbackUrl,
    callbackUrls ?: PaytrailCallbackUrl,
    orderId ?: string,
    items ?: readonly PaytrailItem[],
    deliveryAddress ?: PaytrailAddress,
    invoicingAddress ?: PaytrailAddress,
    manualInvoiceActivation ?: boolean,
    callbackDelay ?: number,
    groups ?: readonly PaytrailPaymentMethodGroup[],
    usePricesWithoutVat ?: boolean,
) : CreatePaymentRequestDTO {
    return {
        stamp,
        reference,
        amount,
        currency,
        language,
        orderId,
        items,
        customer,
        deliveryAddress,
        invoicingAddress,
        manualInvoiceActivation,
        redirectUrls,
        callbackUrls,
        callbackDelay,
        groups,
        usePricesWithoutVat,
    };
}

export function isCreatePaymentRequestDTO (value: unknown) : value is CreatePaymentRequestDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'stamp',
            'reference',
            'amount',
            'currency',
            'language',
            'orderId',
            'items',
            'customer',
            'deliveryAddress',
            'invoicingAddress',
            'manualInvoiceActivation',
            'redirectUrls',
            'callbackUrls',
            'callbackDelay',
            'groups',
            'usePricesWithoutVat',
        ])
        && isString(value?.stamp)
        && isString(value?.reference)
        && isNumber(value?.amount)
        && isPaytrailCurrency(value?.currency)
        && isPaytrailLanguage(value?.language)
        && isStringOrUndefined(value?.orderId)
        && isArrayOfOrUndefined<PaytrailItem>(value?.items, isPaytrailItem)
        && isPaytrailCustomer(value?.customer)
        && isPaytrailAddress(value?.deliveryAddress)
        && isString(value?.invoicingAddress)
        && isString(value?.manualInvoiceActivation)
        && isString(value?.redirectUrls)
        && isString(value?.callbackUrls)
        && isString(value?.callbackDelay)
        && isString(value?.groups)
        && isString(value?.usePricesWithoutVat)
    );
}

export function explainCreatePaymentRequestDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'stamp',
                'reference',
                'amount',
                'currency',
                'language',
                'orderId',
                'items',
                'customer',
                'deliveryAddress',
                'invoicingAddress',
                'manualInvoiceActivation',
                'redirectUrls',
                'callbackUrls',
                'callbackDelay',
                'groups',
                'usePricesWithoutVat',
            ])
            , explainProperty("stamp", explainString(value?.stamp))
            , explainProperty("reference", explainString(value?.reference))
            , explainProperty("amount", explainString(value?.amount))
            , explainProperty("currency", explainString(value?.currency))
            , explainProperty("language", explainString(value?.language))
            , explainProperty("orderId", explainString(value?.orderId))
            , explainProperty("items", explainString(value?.items))
            , explainProperty("customer", explainString(value?.customer))
            , explainProperty("deliveryAddress", explainString(value?.deliveryAddress))
            , explainProperty("invoicingAddress", explainString(value?.invoicingAddress))
            , explainProperty("manualInvoiceActivation", explainString(value?.manualInvoiceActivation))
            , explainProperty("redirectUrls", explainString(value?.redirectUrls))
            , explainProperty("callbackUrls", explainString(value?.callbackUrls))
            , explainProperty("callbackDelay", explainString(value?.callbackDelay))
            , explainProperty("groups", explainString(value?.groups))
            , explainProperty("usePricesWithoutVat", explainString(value?.usePricesWithoutVat))
        ]
    );
}

export function stringifyCreatePaymentRequestDTO (value : CreatePaymentRequestDTO) : string {
    return `CreatePaymentRequestDTO(${value})`;
}

export function parseCreatePaymentRequestDTO (value: unknown) : CreatePaymentRequestDTO | undefined {
    if (isCreatePaymentRequestDTO(value)) return value;
    return undefined;
}

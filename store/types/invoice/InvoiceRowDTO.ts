// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainProperty } from "../../../types/explain";

export interface InvoiceRowDTO {
    readonly invoiceRowId       : string;
    readonly invoiceId          : string;
    readonly paymentId          : string;
    readonly campaignId         : string;
    readonly campaignPaymentId  : string;
    readonly productId          : string;
    readonly inventoryItemId    : string;
    readonly updated            : string;
    readonly created            : string;
    readonly startDate          : string;
    readonly endDate            : string;
    readonly description        : string;
    readonly internalNote       : string;
    readonly amount             : number;
    readonly price              : number;
    readonly vatPercent         : number;
    readonly discountPercent    : number;
}

export function createInvoiceRowDTO (
    invoiceRowId       : string,
    invoiceId          : string,
    paymentId          : string,
    campaignId         : string,
    campaignPaymentId  : string,
    productId          : string,
    inventoryItemId    : string,
    updated            : string,
    created            : string,
    startDate          : string,
    endDate            : string,
    description        : string,
    internalNote       : string,
    amount             : number,
    price              : number,
    vatPercent         : number,
    discountPercent    : number
): InvoiceRowDTO {
    return {
        invoiceRowId,
        invoiceId,
        paymentId,
        campaignId,
        campaignPaymentId,
        productId,
        inventoryItemId,
        updated,
        created,
        startDate,
        endDate,
        description,
        internalNote,
        amount,
        price,
        vatPercent,
        discountPercent
    };
}

export function isInvoiceRowDTO (value: any): value is InvoiceRowDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceRowId',
            'invoiceId',
            'paymentId',
            'campaignId',
            'campaignPaymentId',
            'productId',
            'inventoryItemId',
            'updated',
            'created',
            'startDate',
            'endDate',
            'description',
            'internalNote',
            'amount',
            'price',
            'vatPercent',
            'discountPercent'
        ])
        && isString(value?.invoiceRowId)
        && isString(value?.invoiceId)
        && isString(value?.paymentId)
        && isString(value?.campaignId)
        && isString(value?.campaignPaymentId)
        && isString(value?.productId)
        && isString(value?.inventoryItemId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.startDate)
        && isString(value?.endDate)
        && isString(value?.description)
        && isString(value?.internalNote)
        && isNumber(value?.amount)
        && isNumber(value?.price)
        && isNumber(value?.vatPercent)
        && isNumber(value?.discountPercent)
    );
}

export function explainInvoiceRowDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'invoiceRowId',
                'invoiceId',
                'paymentId',
                'campaignId',
                'campaignPaymentId',
                'productId',
                'inventoryItemId',
                'updated',
                'created',
                'startDate',
                'endDate',
                'description',
                'internalNote',
                'amount',
                'price',
                'vatPercent',
                'discountPercent'
            ])
            , explainProperty("invoiceRowId", explainString(value?.invoiceRowId))
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("paymentId", explainString(value?.paymentId))
            , explainProperty("campaignId", explainString(value?.campaignId))
            , explainProperty("campaignPaymentId", explainString(value?.campaignPaymentId))
            , explainProperty("productId", explainString(value?.productId))
            , explainProperty("inventoryItemId", explainString(value?.inventoryItemId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("startDate", explainString(value?.startDate))
            , explainProperty("endDate", explainString(value?.endDate))
            , explainProperty("description", explainString(value?.description))
            , explainProperty("internalNote", explainString(value?.internalNote))
            , explainProperty("amount", explainNumber(value?.amount))
            , explainProperty("price", explainNumber(value?.price))
            , explainProperty("vatPercent", explainNumber(value?.vatPercent))
            , explainProperty("discountPercent", explainNumber(value?.discountPercent))
        ]
    );
}

export function parseInvoiceRowDTO (value: any): InvoiceRowDTO | undefined {
    if ( isInvoiceRowDTO(value) ) return value;
    return undefined;
}

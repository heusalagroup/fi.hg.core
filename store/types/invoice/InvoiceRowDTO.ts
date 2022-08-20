// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isNumber,
    isRegularObject,
    isString
} from "../../../modules/lodash";

export interface InvoiceRowDTO {
    readonly invoiceRowId       : string;
    readonly invoiceId          : string;
    readonly paymentId          : string;
    readonly campaignId         : string;
    readonly campaignPaymentId  : string;
    readonly productId          : string;
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
        && hasNoOtherKeys(value, [
            'invoiceRowId',
            'invoiceId',
            'paymentId',
            'campaignId',
            'campaignPaymentId',
            'productId',
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

export function stringifyInvoiceRowDTO (value: InvoiceRowDTO): string {
    return `InvoiceRowDTO(${value})`;
}

export function parseInvoiceRowDTO (value: any): InvoiceRowDTO | undefined {
    if ( isInvoiceRowDTO(value) ) return value;
    return undefined;
}

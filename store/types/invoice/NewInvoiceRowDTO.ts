// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString, isStringOrUndefined } from "../../../types/String";
import { isNumberOrUndefined } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface NewInvoiceRowDTO {
    readonly invoiceId           : string;
    readonly paymentId          ?: string;
    readonly campaignId         ?: string;
    readonly campaignPaymentId  ?: string;
    readonly productId          ?: string;
    readonly inventoryItemId    ?: string;
    readonly startDate          ?: string;
    readonly endDate            ?: string;
    readonly description        ?: string;
    readonly internalNote       ?: string;
    readonly amount             ?: number;
    readonly price              ?: number;
    readonly vatPercent         ?: number;
    readonly discountPercent    ?: number;
}

export function createNewInvoiceRowDTO (
    invoiceId: string,
    paymentId: string | undefined,
    campaignId: string | undefined,
    campaignPaymentId: string | undefined,
    productId: string | undefined,
    inventoryItemId: string | undefined,
    startDate: string | undefined,
    endDate: string | undefined,
    description: string | undefined,
    internalNote: string | undefined,
    amount: number | undefined,
    price: number | undefined,
    vatPercent: number | undefined,
    discountPercent: number | undefined
): NewInvoiceRowDTO {
    return {
        invoiceId,
        paymentId,
        campaignId,
        campaignPaymentId,
        productId,
        inventoryItemId,
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

export function isNewInvoiceRowDTO (value: any): value is NewInvoiceRowDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'invoiceId',
            'paymentId',
            'campaignId',
            'campaignPaymentId',
            'productId',
            'inventoryItemId',
            'startDate',
            'endDate',
            'description',
            'internalNote',
            'amount',
            'price',
            'vatPercent',
            'discountPercent'
        ])
        && isString(value?.invoiceId)
        && isStringOrUndefined(value?.paymentId)
        && isStringOrUndefined(value?.campaignId)
        && isStringOrUndefined(value?.campaignPaymentId)
        && isStringOrUndefined(value?.productId)
        && isStringOrUndefined(value?.inventoryItemId)
        && isStringOrUndefined(value?.startDate)
        && isStringOrUndefined(value?.endDate)
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.internalNote)
        && isNumberOrUndefined(value?.amount)
        && isNumberOrUndefined(value?.price)
        && isNumberOrUndefined(value?.vatPercent)
        && isNumberOrUndefined(value?.discountPercent)
    );
}

export function stringifyNewInvoiceRowDTO (value: NewInvoiceRowDTO): string {
    return `NewInvoiceRowDTO(${value})`;
}

export function parseNewInvoiceRowDTO (value: any): NewInvoiceRowDTO | undefined {
    if ( isNewInvoiceRowDTO(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface PaymentDTO {
    readonly paymentId          : string;
    readonly clientId           : string;
    readonly refClientId        : string;
    readonly billingClientId    : string;
    readonly invoiceId          : string;
    readonly campaignId         : string;
    readonly productId          : string;
    readonly groupId            : string;
    readonly bankAccountId      : string;
    readonly inventoryItemId    : string;
    readonly updated            : string;
    readonly created            : string;
    readonly startDate          : string;
    readonly endDate            : string;
    readonly dueDate            : string;
    readonly description        : string;
    readonly extraNotice        : string;
    readonly amount             : number;
    readonly price              : number;
    readonly vatPercent         : number;
    readonly discountPercent    : number;
    readonly billingPeriod      : number;
    readonly internalNote       : string;
    readonly isRecurring        : boolean;
    readonly onHold             : boolean;
    readonly isTerminated       : boolean;
}

export function createPaymentDTO (
    paymentId        : string,
    clientId         : string,
    refClientId      : string,
    billingClientId  : string,
    invoiceId        : string,
    campaignId       : string,
    productId        : string,
    groupId          : string,
    bankAccountId    : string,
    inventoryItemId  : string,
    updated          : string,
    created          : string,
    startDate        : string,
    endDate          : string,
    dueDate          : string,
    description      : string,
    extraNotice      : string,
    amount           : number,
    price            : number,
    vatPercent       : number,
    discountPercent  : number,
    billingPeriod    : number,
    internalNote     : string,
    isRecurring      : boolean,
    onHold           : boolean,
    isTerminated     : boolean,
): PaymentDTO {
    return {
        paymentId,
        clientId,
        refClientId,
        billingClientId,
        invoiceId,
        campaignId,
        productId,
        groupId,
        bankAccountId,
        inventoryItemId,
        updated,
        created,
        startDate,
        endDate,
        dueDate,
        description,
        extraNotice,
        amount,
        price,
        vatPercent,
        discountPercent,
        billingPeriod,
        internalNote,
        isRecurring,
        onHold,
        isTerminated
    };
}

export function isPaymentDTO (value: any): value is PaymentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'paymentId',
            'clientId',
            'refClientId',
            'billingClientId',
            'invoiceId',
            'campaignId',
            'productId',
            'groupId',
            'bankAccountId',
            'inventoryItemId',
            'updated',
            'created',
            'startDate',
            'endDate',
            'dueDate',
            'description',
            'extraNotice',
            'amount',
            'price',
            'vatPercent',
            'discountPercent',
            'billingPeriod',
            'internalNote',
            'isRecurring',
            'onHold',
            'isTerminated'
        ])
        && isString(value?.paymentId)
        && isString(value?.clientId)
        && isString(value?.refClientId)
        && isString(value?.billingClientId)
        && isString(value?.invoiceId)
        && isString(value?.campaignId)
        && isString(value?.productId)
        && isString(value?.groupId)
        && isString(value?.bankAccountId)
        && isString(value?.inventoryItemId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.startDate)
        && isString(value?.endDate)
        && isString(value?.dueDate)
        && isString(value?.description)
        && isString(value?.extraNotice)
        && isNumber(value?.amount)
        && isNumber(value?.price)
        && isNumber(value?.vatPercent)
        && isNumber(value?.discountPercent)
        && isNumber(value?.billingPeriod)
        && isString(value?.internalNote)
        && isBoolean(value?.isRecurring)
        && isBoolean(value?.onHold)
        && isBoolean(value?.isTerminated)
    );
}

export function stringifyPaymentDTO (value: PaymentDTO): string {
    return `PaymentDTO(${value})`;
}

export function parsePaymentDTO (value: any): PaymentDTO | undefined {
    if ( isPaymentDTO(value) ) return value;
    return undefined;
}

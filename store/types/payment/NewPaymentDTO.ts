// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString, isStringOrUndefined } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface NewPaymentDTO {
    readonly clientId         : string;
    readonly price            ?: number;
    readonly vatPercent       ?: number;
    readonly startDate        ?: string;
    readonly description      ?: string;
    readonly endDate          ?: string;
    readonly billingPeriod    ?: number;
    readonly amount           ?: number;
    readonly bankAccountId    ?: string;
    readonly inventoryItemId  ?: string;
    readonly refClientId      ?: string;
    readonly billingClientId  ?: string;
    readonly invoiceId        ?: string;
    readonly campaignId       ?: string;
    readonly productId        ?: string;
    readonly groupId          ?: string;
    readonly dueDate          ?: string;
    readonly extraNotice      ?: string;
    readonly discountPercent  ?: number;
    readonly internalNote     ?: string;
    readonly isRecurring      ?: boolean;
    readonly onHold           ?: boolean;
    readonly isTerminated     ?: boolean;
}

export function createNewPaymentDTO (
    clientId          : string,
    refClientId       : string | undefined,
    billingClientId   : string | undefined,
    invoiceId         : string | undefined,
    campaignId        : string | undefined,
    productId         : string | undefined,
    groupId           : string | undefined,
    bankAccountId     : string | undefined,
    inventoryItemId   : string | undefined,
    startDate         : string | undefined,
    endDate           : string | undefined,
    dueDate           : string | undefined,
    description       : string | undefined,
    extraNotice       : string | undefined,
    amount            : number | undefined,
    price             : number | undefined,
    vatPercent        : number | undefined,
    discountPercent   : number | undefined,
    billingPeriod     : number | undefined,
    internalNote      : string | undefined,
    isRecurring       : boolean | undefined,
    onHold            : boolean | undefined,
    isTerminated      : boolean | undefined,
): NewPaymentDTO {
    return {
        clientId,
        refClientId,
        billingClientId,
        invoiceId,
        campaignId,
        productId,
        groupId,
        bankAccountId,
        inventoryItemId,
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

export function isNewPaymentDTO (value: any): value is NewPaymentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'clientId',
            'refClientId',
            'billingClientId',
            'invoiceId',
            'campaignId',
            'productId',
            'groupId',
            'bankAccountId',
            'inventoryItemId',
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
        && isString(value?.clientId)
        && isStringOrUndefined(value?.refClientId)
        && isStringOrUndefined(value?.billingClientId)
        && isStringOrUndefined(value?.invoiceId)
        && isStringOrUndefined(value?.campaignId)
        && isStringOrUndefined(value?.productId)
        && isStringOrUndefined(value?.groupId)
        && isStringOrUndefined(value?.bankAccountId)
        && isStringOrUndefined(value?.inventoryItemId)
        && isStringOrUndefined(value?.startDate)
        && isStringOrUndefined(value?.endDate)
        && isStringOrUndefined(value?.dueDate)
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.extraNotice)
        && isStringOrUndefined(value?.amount)
        && isStringOrUndefined(value?.price)
        && isStringOrUndefined(value?.vatPercent)
        && isStringOrUndefined(value?.discountPercent)
        && isStringOrUndefined(value?.billingPeriod)
        && isStringOrUndefined(value?.internalNote)
        && isStringOrUndefined(value?.isRecurring)
        && isStringOrUndefined(value?.onHold)
        && isStringOrUndefined(value?.isTerminated)
    );
}

export function stringifyNewPaymentDTO (value: NewPaymentDTO): string {
    return `NewPaymentDTO(${value})`;
}

export function parseNewPaymentDTO (value: any): NewPaymentDTO | undefined {
    if ( isNewPaymentDTO(value) ) return value;
    return undefined;
}

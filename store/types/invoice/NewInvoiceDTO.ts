// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString, isStringOrUndefined } from "../../../types/String";
import { isNumberOrUndefined } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface NewInvoiceDTO {
    readonly clientId           : string;
    readonly campaignId        ?: string;
    readonly groupId           ?: string;
    readonly bankAccountId     ?: string;
    readonly wcOrderId         ?: string;
    readonly date              ?: string;
    readonly dueDate           ?: string;
    readonly remindDate        ?: string;
    readonly checkoutDate      ?: string;
    readonly referenceNumber   ?: string;
    readonly internalNote      ?: string;
    readonly extraNotice       ?: string;
    readonly webSecret         ?: string;
    readonly checkoutStamp     ?: string;
    readonly onHold            ?: boolean;
    readonly isReminded        ?: boolean;
    readonly onCollection      ?: boolean;
    readonly isTerminated      ?: boolean;
    readonly buildDocuments    ?: boolean;
    readonly sendDocuments     ?: boolean;
    readonly dueDays           ?: number;
}

export function createNewInvoiceDTO (
    clientId         : string,
    campaignId       : string | undefined,
    groupId          : string | undefined,
    bankAccountId    : string | undefined,
    wcOrderId        : string | undefined,
    date             : string | undefined,
    dueDate          : string | undefined,
    remindDate       : string | undefined,
    checkoutDate     : string | undefined,
    referenceNumber  : string | undefined,
    internalNote     : string | undefined,
    extraNotice      : string | undefined,
    webSecret        : string | undefined,
    checkoutStamp    : string | undefined,
    onHold           : boolean | undefined,
    isReminded       : boolean | undefined,
    onCollection     : boolean | undefined,
    isTerminated     : boolean | undefined,
    buildDocuments   : boolean | undefined,
    sendDocuments    : boolean | undefined,
    dueDays          : number | undefined
): NewInvoiceDTO {
    return {
        clientId,
        campaignId,
        groupId,
        bankAccountId,
        wcOrderId,
        date,
        dueDate,
        remindDate,
        checkoutDate,
        referenceNumber,
        internalNote,
        extraNotice,
        webSecret,
        checkoutStamp,
        onHold,
        isReminded,
        onCollection,
        isTerminated,
        buildDocuments,
        sendDocuments,
        dueDays
    };
}

export function isNewInvoiceDTO (value: any): value is NewInvoiceDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'clientId',
            'campaignId',
            'groupId',
            'bankAccountId',
            'wcOrderId',
            'date',
            'dueDate',
            'remindDate',
            'checkoutDate',
            'referenceNumber',
            'internalNote',
            'extraNotice',
            'webSecret',
            'checkoutStamp',
            'onHold',
            'isReminded',
            'onCollection',
            'isTerminated',
            'buildDocuments',
            'sendDocuments',
            'dueDays'
        ])
        && isString(value?.clientId)
        && isStringOrUndefined(value?.campaignId)
        && isStringOrUndefined(value?.groupId)
        && isStringOrUndefined(value?.bankAccountId)
        && isStringOrUndefined(value?.wcOrderId)
        && isStringOrUndefined(value?.date)
        && isStringOrUndefined(value?.dueDate)
        && isStringOrUndefined(value?.remindDate)
        && isStringOrUndefined(value?.checkoutDate)
        && isStringOrUndefined(value?.referenceNumber)
        && isStringOrUndefined(value?.internalNote)
        && isStringOrUndefined(value?.extraNotice)
        && isStringOrUndefined(value?.webSecret)
        && isStringOrUndefined(value?.checkoutStamp)
        && isBooleanOrUndefined(value?.onHold)
        && isBooleanOrUndefined(value?.isReminded)
        && isBooleanOrUndefined(value?.onCollection)
        && isBooleanOrUndefined(value?.isTerminated)
        && isBooleanOrUndefined(value?.buildDocuments)
        && isBooleanOrUndefined(value?.sendDocuments)
        && isNumberOrUndefined(value?.dueDays)
    );
}

export function stringifyNewInvoiceDTO (value: NewInvoiceDTO): string {
    return `NewInvoiceDTO(${value})`;
}

export function parseNewInvoiceDTO (value: any): NewInvoiceDTO | undefined {
    if ( isNewInvoiceDTO(value) ) return value;
    return undefined;
}

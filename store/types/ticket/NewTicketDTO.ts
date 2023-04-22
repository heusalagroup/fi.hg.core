// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isStringOrUndefined } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isStringArrayOrUndefined } from "../../../types/StringArray";

export interface NewTicketDTO {
    readonly clientId          ?: string;
    readonly contactId         ?: string;
    readonly orderId           ?: string;
    readonly invoiceId         ?: string;
    readonly purchaseCompanyId ?: string;
    readonly purchaseInvoiceId ?: string;
    readonly inventoryItemId   ?: string;
    readonly date              ?: string;
    readonly dueDate           ?: string;
    readonly state             ?: string;
    readonly subject           ?: string;
    readonly description       ?: string;
    readonly internalNote      ?: string;
    readonly tags              ?: readonly string[];
    readonly dataJson          ?: string;
    readonly onHold            ?: boolean;
    readonly isTerminated      ?: boolean;
}

export function createNewTicketDTO (
    clientId          : string | undefined,
    contactId         : string | undefined,
    orderId           : string | undefined,
    invoiceId         : string | undefined,
    purchaseCompanyId : string | undefined,
    purchaseInvoiceId : string | undefined,
    inventoryItemId   : string | undefined,
    date              : string | undefined,
    dueDate           : string | undefined,
    state             : string | undefined,
    subject           : string | undefined,
    description       : string | undefined,
    internalNote      : string | undefined,
    tags              : readonly string[] | undefined,
    dataJson          : string | undefined,
    onHold            : boolean | undefined,
    isTerminated      : boolean | undefined,
): NewTicketDTO {
    return {
        clientId,
        contactId,
        orderId,
        invoiceId,
        purchaseCompanyId,
        purchaseInvoiceId,
        inventoryItemId,
        date,
        dueDate,
        state,
        subject,
        description,
        internalNote,
        tags,
        dataJson,
        onHold,
        isTerminated
    };
}

export function isNewTicketDTO (value: any): value is NewTicketDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'clientId',
            'contactId',
            'orderId',
            'invoiceId',
            'purchaseCompanyId',
            'purchaseInvoiceId',
            'inventoryItemId',
            'date',
            'dueDate',
            'state',
            'subject',
            'description',
            'internalNote',
            'tags',
            'dataJson',
            'onHold',
            'isTerminated'
        ])
        && isStringOrUndefined(value?.clientId)
        && isStringOrUndefined(value?.contactId)
        && isStringOrUndefined(value?.orderId)
        && isStringOrUndefined(value?.invoiceId)
        && isStringOrUndefined(value?.purchaseCompanyId)
        && isStringOrUndefined(value?.purchaseInvoiceId)
        && isStringOrUndefined(value?.inventoryItemId)
        && isStringOrUndefined(value?.date)
        && isStringOrUndefined(value?.dueDate)
        && isStringOrUndefined(value?.state)
        && isStringOrUndefined(value?.subject)
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.internalNote)
        && isStringArrayOrUndefined(value?.tags)
        && isStringOrUndefined(value?.dataJson)
        && isBooleanOrUndefined(value?.onHold)
        && isBooleanOrUndefined(value?.isTerminated)
    );
}

export function stringifyNewTicketDTO (value: NewTicketDTO): string {
    return `NewTicketDTO(${value})`;
}

export function parseNewTicketDTO (value: any): NewTicketDTO | undefined {
    if ( isNewTicketDTO(value) ) return value;
    return undefined;
}

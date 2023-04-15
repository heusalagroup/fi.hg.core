// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isTicketCommentDTO, TicketCommentDTO } from "./TicketCommentDTO";
import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString, isStringOrUndefined } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isArrayOfOrUndefined } from "../../../types/Array";
import { isStringArrayOrUndefined } from "../../../types/StringArray";
import { isTicketUserDTO, TicketUserDTO } from "./TicketUserDTO";

export interface TicketDTO {
    readonly ticketId           : string;
    readonly clientId          ?: string;
    readonly contactId         ?: string;
    readonly orderId           ?: string;
    readonly invoiceId         ?: string;
    readonly purchaseCompanyId ?: string;
    readonly purchaseInvoiceId ?: string;
    readonly inventoryItemId   ?: string;
    readonly updated           ?: string;
    readonly created           ?: string;
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
    readonly comments          ?: readonly TicketCommentDTO[];
    readonly members           ?: readonly TicketUserDTO[];
}

export function createTicketDTO (
    ticketId          : string,
    clientId          : string | undefined,
    contactId         : string | undefined,
    orderId           : string | undefined,
    invoiceId         : string | undefined,
    purchaseCompanyId : string | undefined,
    purchaseInvoiceId : string | undefined,
    inventoryItemId   : string | undefined,
    updated           : string | undefined,
    created           : string | undefined,
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
    comments         ?: readonly TicketCommentDTO[],
    members          ?: readonly TicketUserDTO[]
): TicketDTO {
    return {
        ticketId,
        clientId,
        contactId,
        orderId,
        invoiceId,
        purchaseCompanyId,
        purchaseInvoiceId,
        inventoryItemId,
        updated,
        created,
        date,
        dueDate,
        state,
        subject,
        description,
        internalNote,
        tags,
        dataJson,
        onHold,
        isTerminated,
        comments,
        members
    };
}

export function isTicketDTO (value: any): value is TicketDTO {
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
            'updated',
            'created',
            'date',
            'dueDate',
            'state',
            'subject',
            'description',
            'internalNote',
            'tags',
            'dataJson',
            'onHold',
            'isTerminated',
            'comments',
            'members',
        ])
        && isString(value?.ticketId)
        && isStringOrUndefined(value?.clientId)
        && isStringOrUndefined(value?.contactId)
        && isStringOrUndefined(value?.orderId)
        && isStringOrUndefined(value?.invoiceId)
        && isStringOrUndefined(value?.purchaseCompanyId)
        && isStringOrUndefined(value?.purchaseInvoiceId)
        && isStringOrUndefined(value?.inventoryItemId)
        && isStringOrUndefined(value?.updated)
        && isStringOrUndefined(value?.created)
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
        && isArrayOfOrUndefined<TicketCommentDTO>(value?.comments, isTicketCommentDTO)
        && isArrayOfOrUndefined<TicketUserDTO>(value?.members, isTicketUserDTO)
    );
}

export function stringifyTicketDTO (value: TicketDTO): string {
    return `TicketDTO(${value})`;
}

export function parseTicketDTO (value: any): TicketDTO | undefined {
    if ( isTicketDTO(value) ) return value;
    return undefined;
}

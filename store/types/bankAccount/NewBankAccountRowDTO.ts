// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface NewBankAccountRowDTO {
    readonly bankAccountId           ?: string;
    readonly invoiceId               ?: string;
    readonly documentId              ?: string;
    readonly banksonInboundPaymentId ?: string;
    readonly archiveId               ?: string;
    readonly purchaseInvoiceId       ?: string;
    readonly date                    ?: string;
    readonly referenceNumber         ?: string;
    readonly name                    ?: string;
    readonly description             ?: string;
    readonly message                 ?: string;
    readonly internalNote            ?: string;
    readonly bankAccountNumber       ?: string;
    readonly sum                     ?: number;
}

export function createNewBankAccountRowDTO (
    bankAccountId           ?: string,
    invoiceId               ?: string,
    documentId              ?: string,
    banksonInboundPaymentId ?: string,
    archiveId               ?: string,
    purchaseInvoiceId       ?: string,
    date                    ?: string,
    referenceNumber         ?: string,
    name                    ?: string,
    description             ?: string,
    message                 ?: string,
    internalNote            ?: string,
    bankAccountNumber       ?: string,
    sum                     ?: number,
): NewBankAccountRowDTO {
    return {
        bankAccountId,
        invoiceId,
        documentId,
        banksonInboundPaymentId,
        archiveId,
        purchaseInvoiceId,
        date,
        referenceNumber,
        name,
        description,
        message,
        internalNote,
        bankAccountNumber,
        sum,
    };
}

export function isNewBankAccountRowDTO (value: any): value is NewBankAccountRowDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'bankAccountId',
            'invoiceId',
            'documentId',
            'banksonInboundPaymentId',
            'archiveId',
            'purchaseInvoiceId',
            'date',
            'referenceNumber',
            'name',
            'description',
            'message',
            'internalNote',
            'bankAccountNumber',
            'sum',
        ])
        && isString(value?.bankAccountId)
        && isString(value?.invoiceId)
        && isString(value?.documentId)
        && isString(value?.banksonInboundPaymentId)
        && isString(value?.archiveId)
        && isString(value?.purchaseInvoiceId)
        && isString(value?.date)
        && isString(value?.referenceNumber)
        && isString(value?.name)
        && isString(value?.description)
        && isString(value?.message)
        && isString(value?.internalNote)
        && isString(value?.bankAccountNumber)
        && isNumber(value?.sum)
    );
}

export function parseNewBankAccountRowDTO (value: any): NewBankAccountRowDTO | undefined {
    if ( isNewBankAccountRowDTO(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface BankAccountRowDTO {
    readonly bankAccountRowId         : string;
    readonly updated                  : string;
    readonly created                  : string;
    readonly bankAccountId            : string;
    readonly invoiceId                : string;
    readonly documentId               : string;
    readonly banksonInboundPaymentId  : string;
    readonly archiveId                : string;
    readonly purchaseInvoiceId        : string;
    readonly date                     : string;
    readonly referenceNumber          : string;
    readonly name                     : string;
    readonly description              : string;
    readonly message                  : string;
    readonly internalNote             : string;
    readonly bankAccountNumber        : string;
    readonly sum                      : number;
}

export function createBankAccountRowDTO (
    bankAccountRowId : string,
    updated : string,
    created : string,
    sum : number,
    bankAccountId : string,
    invoiceId : string,
    documentId : string,
    archiveId : string,
    purchaseInvoiceId : string,
    date : string,
    referenceNumber : string,
    name : string,
    description : string,
    message : string,
    internalNote : string,
    bankAccountNumber : string,
    banksonInboundPaymentId : string,
): BankAccountRowDTO {
    return {
        bankAccountRowId,
        updated,
        created,
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

export function isBankAccountRowDTO (value: any): value is BankAccountRowDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'bankAccountRowId',
            'updated',
            'created',
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
        && isString(value?.bankAccountRowId)
        && isString(value?.updated)
        && isString(value?.created)
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

export function parseBankAccountRowDTO (value: any): BankAccountRowDTO | undefined {
    if ( isBankAccountRowDTO(value) ) return value;
    return undefined;
}

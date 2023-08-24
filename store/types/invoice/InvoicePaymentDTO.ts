// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface InvoicePaymentDTO {
    readonly invoicePaymentId    : string;
    readonly updated             : string;
    readonly created             : string;
    readonly invoiceId           : string;
    readonly date                : string;
    readonly name                : string;
    readonly description         : string;
    readonly sum                 : number;
    readonly documentId          : string;
    readonly opTransactionId     : string;
}

export function createInvoicePaymentDTO (
    invoicePaymentId: string,
    created: string,
    updated: string,
    invoiceId: string,
    date: string,
    name: string,
    description: string,
    sum: number,
    documentId : string,
    opTransactionId : string,
): InvoicePaymentDTO {
    return {
        invoicePaymentId,
        created,
        updated,
        invoiceId,
        date,
        name,
        description,
        sum,
        documentId,
        opTransactionId,
    };
}

export function isInvoicePaymentDTO (value: any): value is InvoicePaymentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoicePaymentId',
            'created',
            'updated',
            'invoiceId',
            'date',
            'name',
            'description',
            'sum',
            'documentId',
            'opTransactionId',
        ])
        && isString(value?.invoicePaymentId)
        && isString(value?.created)
        && isString(value?.updated)
        && isString(value?.invoiceId)
        && isString(value?.date)
        && isString(value?.name)
        && isString(value?.description)
        && isNumber(value?.sum)
        && isString(value?.documentId)
        && isString(value?.opTransactionId)
    );
}

export function parseInvoicePaymentDTO (value: any): InvoicePaymentDTO | undefined {
    if ( isInvoicePaymentDTO(value) ) return value;
    return undefined;
}

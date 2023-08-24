// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString, isStringOrUndefined } from "../../../types/String";
import { isNumber } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface NewInvoicePaymentDTO {
    readonly invoiceId          : string;
    readonly date               : string;
    readonly name               : string;
    readonly description        : string;
    readonly sum                : number;
    readonly documentId         ?: string;
    readonly opTransactionId    ?: string;
}

export function createNewInvoicePaymentDTO (
    invoiceId: string,
    date: string,
    name: string,
    description: string,
    sum: number,
    documentId : string | undefined,
    opTransactionId : string | undefined,
): NewInvoicePaymentDTO {
    return {
        invoiceId,
        date,
        name,
        description,
        sum,
        documentId,
        opTransactionId,
    };
}

export function isNewInvoicePaymentDTO (value: any): value is NewInvoicePaymentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceId',
            'date',
            'name',
            'description',
            'sum',
            'documentId',
            'opTransactionId',
        ])
        && isString(value?.invoiceId)
        && isString(value?.date)
        && isString(value?.name)
        && isString(value?.description)
        && isNumber(value?.sum)
        && isStringOrUndefined(value?.documentId)
        && isStringOrUndefined(value?.opTransactionId)
    );
}

export function parseNewInvoicePaymentDTO (value: any): NewInvoicePaymentDTO | undefined {
    if ( isNewInvoicePaymentDTO(value) ) return value;
    return undefined;
}

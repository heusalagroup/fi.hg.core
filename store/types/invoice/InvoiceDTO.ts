// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainBoolean, explainBooleanOrUndefined, isBoolean } from "../../../types/Boolean";
import { isInvoiceRowDTO, InvoiceRowDTO, explainInvoiceRowDTO } from "./InvoiceRowDTO";
import { isBooleanOrUndefined } from "../../../types/Boolean";
import { explainString, isString } from "../../../types/String";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../../types/Array";
import { explain, explainNot, explainOk, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";
import { explainPaytrailPaymentProviderListDTOOrUndefined, isPaytrailPaymentProviderListDTOOrUndefined, PaytrailPaymentProviderListDTO } from "../../../paytrail/dtos/PaytrailPaymentProviderListDTO";
import { explainPaytrailPaymentDTOOrUndefined, isPaytrailPaymentDTOOrUndefined, PaytrailPaymentDTO } from "../../../paytrail/dtos/PaytrailPaymentDTO";
import { explainPaytrailCreatePaymentDTOOrUndefined, isPaytrailCreatePaymentDTOOrUndefined, PaytrailCreatePaymentDTO } from "../../../paytrail/dtos/PaytrailCreatePaymentDTO";
import { CurrencyUtils } from "../../../CurrencyUtils";

export interface InvoiceDTO {
    readonly invoiceId         : string;
    readonly clientId          : string;
    readonly campaignId        : string;
    readonly groupId           : string;
    readonly bankAccountId     : string;
    readonly wcOrderId         : string;
    readonly updated           : string;
    readonly created           : string;
    readonly date              : string;
    readonly dueDate           : string;
    readonly remindDate        : string;
    readonly checkoutDate      : string;
    readonly referenceNumber   : string;
    readonly internalNote      : string;
    readonly extraNotice       : string;
    readonly webSecret         : string;
    readonly checkoutStamp     : string;
    readonly onHold            : boolean;
    readonly isReminded        : boolean;
    readonly onCollection      : boolean;
    readonly isTerminated      : boolean;
    readonly buildDocuments    : boolean;
    readonly sendDocuments     : boolean;
    readonly dueDays           : number;
    readonly rows             ?: readonly InvoiceRowDTO[];
    readonly isPaid           ?: boolean | undefined;
    readonly payment          ?: PaytrailPaymentProviderListDTO;
    readonly newTransaction   ?: PaytrailCreatePaymentDTO;
    readonly transaction      ?: PaytrailPaymentDTO;
    readonly totalSum             ?: number;
    readonly totalVat             ?: number;
    readonly totalSumIncludingVat ?: number;
    readonly totalPaid            ?: number;
    readonly totalOpen            ?: number;
}

export function createInvoiceDTO (
    invoiceId        : string,
    clientId         : string,
    campaignId       : string,
    groupId          : string,
    bankAccountId    : string,
    wcOrderId        : string,
    updated          : string,
    created          : string,
    date             : string,
    dueDate          : string,
    remindDate       : string,
    checkoutDate     : string,
    referenceNumber  : string,
    internalNote     : string,
    extraNotice      : string,
    webSecret        : string,
    checkoutStamp    : string,
    onHold           : boolean,
    isReminded       : boolean,
    onCollection     : boolean,
    isTerminated     : boolean,
    buildDocuments   : boolean,
    sendDocuments    : boolean,
    dueDays          : number,
    rows            ?: readonly InvoiceRowDTO[],
    isPaid          ?: boolean,
    payment         ?: PaytrailPaymentProviderListDTO,
    newTransaction  ?: PaytrailCreatePaymentDTO,
    transaction     ?: PaytrailPaymentDTO,
    totalSum             ?: number,
    totalVat             ?: number,
    totalSumIncludingVat ?: number,
    totalPaid            ?: number,
    totalOpen            ?: number,
): InvoiceDTO {

    if ( (totalVat === undefined) && (totalSum !== undefined) && (totalSumIncludingVat !== undefined) ) {
        totalVat = totalSumIncludingVat - totalSum;
    }

    if ( (totalSumIncludingVat === undefined) && (totalSum !== undefined) && (totalVat !== undefined) ) {
        totalSumIncludingVat = Math.round(totalSum*100 + totalVat*100 ) / 100;
    }

    if ( (totalSum === undefined) && (totalSumIncludingVat !== undefined) && (totalVat !== undefined) ) {
        totalSum = totalSumIncludingVat - totalVat;
    }

    if ( (totalOpen === undefined) && (totalSumIncludingVat !== undefined) && (totalPaid !== undefined) ) {
        totalOpen = Math.round(totalSumIncludingVat*100 - totalPaid*100) / 100;
    }

    if ( (totalPaid === undefined) && (totalSumIncludingVat !== undefined) && (totalOpen !== undefined) ) {
        totalPaid = totalSumIncludingVat - totalOpen;
    }

    if ( (isPaid === undefined) && (totalOpen !== undefined) ) {
        isPaid = CurrencyUtils.getCents(totalOpen) <= 0;
    }

    return {
        invoiceId,
        clientId,
        campaignId,
        groupId,
        bankAccountId,
        wcOrderId,
        updated,
        created,
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
        dueDays,
        rows,
        ...(isPaid !== undefined ? {isPaid} : {} ),
        ...(payment ? {payment}: {}),
        ...(newTransaction ? {newTransaction}: {}),
        ...(transaction ? {transaction}: {}),
        ...(totalSum !== undefined ? { totalSum }: {}),
        ...(totalVat !== undefined ? { totalVat }: {}),
        ...(totalSumIncludingVat !== undefined ? { totalSumIncludingVat }: {}),
        ...(totalPaid !== undefined ? { totalPaid }: {}),
        ...(totalOpen !== undefined ? { totalOpen }: {}),
    };
}

export function isInvoiceDTO (value: any): value is InvoiceDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'invoiceId',
            'clientId',
            'campaignId',
            'groupId',
            'bankAccountId',
            'wcOrderId',
            'updated',
            'created',
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
            'isPaid',
            'buildDocuments',
            'sendDocuments',
            'dueDays',
            'rows',
            'payment',
            'newTransaction',
            'transaction',
            'totalSum',
            'totalVat',
            'totalSumIncludingVat',
            'totalPaid',
            'totalOpen',
        ])
        && isString(value?.invoiceId)
        && isString(value?.clientId)
        && isString(value?.campaignId)
        && isString(value?.groupId)
        && isString(value?.bankAccountId)
        && isString(value?.wcOrderId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.date)
        && isString(value?.dueDate)
        && isString(value?.remindDate)
        && isString(value?.checkoutDate)
        && isString(value?.referenceNumber)
        && isString(value?.internalNote)
        && isString(value?.extraNotice)
        && isString(value?.webSecret)
        && isString(value?.checkoutStamp)
        && isBoolean(value?.onHold)
        && isBoolean(value?.isReminded)
        && isBoolean(value?.onCollection)
        && isBoolean(value?.isTerminated)
        && isBooleanOrUndefined(value?.isPaid)
        && isBoolean(value?.buildDocuments)
        && isBoolean(value?.sendDocuments)
        && isNumber(value?.dueDays)
        && isArrayOfOrUndefined<InvoiceRowDTO>(value?.rows, isInvoiceRowDTO)
        && isPaytrailPaymentProviderListDTOOrUndefined(value?.payment)
        && isPaytrailCreatePaymentDTOOrUndefined(value?.newTransaction)
        && isPaytrailPaymentDTOOrUndefined(value?.transaction)
        && isNumberOrUndefined(value?.totalSum)
        && isNumberOrUndefined(value?.totalVat)
        && isNumberOrUndefined(value?.totalSumIncludingVat)
        && isNumberOrUndefined(value?.totalPaid)
        && isNumberOrUndefined(value?.totalOpen)
    );
}

export function explainInvoiceDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'invoiceId',
                'clientId',
                'campaignId',
                'groupId',
                'bankAccountId',
                'wcOrderId',
                'updated',
                'created',
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
                'isPaid',
                'buildDocuments',
                'sendDocuments',
                'dueDays',
                'rows',
                'payment',
                'newTransaction',
                'transaction',
                'totalSum',
                'totalVat',
                'totalSumIncludingVat',
                'totalPaid',
                'totalOpen',
            ])
            , explainProperty("invoiceId", explainString(value?.invoiceId))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("campaignId", explainString(value?.campaignId))
            , explainProperty("groupId", explainString(value?.groupId))
            , explainProperty("bankAccountId", explainString(value?.bankAccountId))
            , explainProperty("wcOrderId", explainString(value?.wcOrderId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("dueDate", explainString(value?.dueDate))
            , explainProperty("remindDate", explainString(value?.remindDate))
            , explainProperty("checkoutDate", explainString(value?.checkoutDate))
            , explainProperty("referenceNumber", explainString(value?.referenceNumber))
            , explainProperty("internalNote", explainString(value?.internalNote))
            , explainProperty("extraNotice", explainString(value?.extraNotice))
            , explainProperty("webSecret", explainString(value?.webSecret))
            , explainProperty("checkoutStamp", explainString(value?.checkoutStamp))
            , explainProperty("onHold", explainBoolean(value?.onHold))
            , explainProperty("isReminded", explainBoolean(value?.isReminded))
            , explainProperty("onCollection", explainBoolean(value?.onCollection))
            , explainProperty("isTerminated", explainBoolean(value?.isTerminated))
            , explainProperty("isPaid", explainBooleanOrUndefined(value?.isPaid))
            , explainProperty("buildDocuments", explainBoolean(value?.buildDocuments))
            , explainProperty("sendDocuments", explainBoolean(value?.sendDocuments))
            , explainProperty("dueDays", explainNumber(value?.dueDays))
            , explainProperty("rows", explainArrayOfOrUndefined<InvoiceRowDTO>("InvoiceRowDTO", explainInvoiceRowDTO, value?.rows, isInvoiceRowDTO))
            , explainProperty("payment", explainPaytrailPaymentProviderListDTOOrUndefined(value?.payment))
            , explainProperty("newTransaction", explainPaytrailCreatePaymentDTOOrUndefined(value?.newTransaction))
            , explainProperty("transaction", explainPaytrailPaymentDTOOrUndefined(value?.transaction))
            , explainProperty("totalSum", explainNumberOrUndefined(value?.totalSum))
            , explainProperty("totalVat", explainNumberOrUndefined(value?.totalVat))
            , explainProperty("totalSumIncludingVat", explainNumberOrUndefined(value?.totalSumIncludingVat))
            , explainProperty("totalPaid", explainNumberOrUndefined(value?.totalPaid))
            , explainProperty("totalOpen", explainNumberOrUndefined(value?.totalOpen))
        ]
    );
}

export function isInvoiceDTOOrUndefined (value: unknown) : value is InvoiceDTO | undefined {
    return isUndefined(value) || isInvoiceDTO(value);
}

export function explainInvoiceDTOOrUndefined (value: any) : string {
    return isInvoiceDTOOrUndefined(value) ? explainOk() : explainNot('InvoiceDTO | undefined');
}

export function parseInvoiceDTO (value: any): InvoiceDTO | undefined {
    if ( isInvoiceDTO(value) ) return value;
    return undefined;
}

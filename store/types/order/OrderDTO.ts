// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainBoolean, isBoolean } from "../../../types/Boolean";
import { explainShoppingCart, isShoppingCart, ShoppingCart } from "../cart/ShoppingCart";
import { explainReadonlyJsonAny, isReadonlyJsonAny, parseJson, ReadonlyJsonAny } from "../../../Json";
import { isInvoiceDTOOrUndefined, InvoiceDTO, explainInvoiceDTOOrUndefined } from "../invoice/InvoiceDTO";
import { isInventoryItemDTO, InventoryItemDTO, explainInventoryItemDTO } from "../inventory/InventoryItemDTO";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainArrayOf, isArrayOfOrUndefined } from "../../../types/Array";
import { explain, explainProperty } from "../../../types/explain";

export interface OrderDTO {
    readonly orderId        : string;
    readonly clientId       : string;
    readonly wcOrderId     ?: string | undefined;
    readonly updated        : string;
    readonly created        : string;
    readonly date           : string;
    readonly status         : string;
    readonly description    : string;
    readonly internalNote   : string;
    readonly viewUrl        : string;
    readonly adminUrl       : string;
    readonly onHold         : boolean;
    readonly isCompleted    : boolean;
    readonly isPaid         : boolean;
    readonly isTerminated   : boolean;
    readonly meta           : ReadonlyJsonAny;
    readonly cart           : ShoppingCart;
    readonly invoice       ?: InvoiceDTO;
    readonly inventoryItems ?: readonly InventoryItemDTO[];
}

export function createOrderDTO (
    orderId       : string,
    clientId      : string,
    cart          : ShoppingCart,
    wcOrderId     : string,
    updated       : string,
    created       : string,
    date          : string,
    status        : string,
    description   : string,
    internalNote  : string,
    viewUrl       : string,
    adminUrl      : string,
    onHold        : boolean,
    isCompleted   : boolean,
    isPaid        : boolean,
    isTerminated  : boolean,
    meta          : ReadonlyJsonAny | string,
    invoice        ?: InvoiceDTO,
    inventoryItems ?: readonly InventoryItemDTO[]
): OrderDTO {
    return {
        orderId,
        clientId,
        wcOrderId,
        updated,
        created,
        date,
        status,
        description,
        internalNote,
        viewUrl,
        adminUrl,
        onHold,
        isCompleted,
        isPaid,
        isTerminated,
        meta : (isString(meta) ? parseJson(meta) : meta) as ReadonlyJsonAny,
        cart,
        invoice,
        inventoryItems
    };
}

export function isOrderDTO (value: unknown): value is OrderDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'orderId',
            'clientId',
            'wcOrderId',
            'updated',
            'created',
            'date',
            'status',
            'description',
            'internalNote',
            'viewUrl',
            'adminUrl',
            'onHold',
            'isCompleted',
            'isPaid',
            'isTerminated',
            'meta',
            'invoice',
            'inventoryItems',
            'cart'
        ])
        && isString(value?.orderId)
        && isString(value?.clientId)
        && isStringOrUndefined(value?.wcOrderId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.date)
        && isString(value?.status)
        && isString(value?.description)
        && isString(value?.internalNote)
        && isString(value?.viewUrl)
        && isString(value?.adminUrl)
        && isBoolean(value?.onHold)
        && isBoolean(value?.isCompleted)
        && isBoolean(value?.isPaid)
        && isBoolean(value?.isTerminated)
        && isReadonlyJsonAny(value?.meta)
        && isShoppingCart(value?.cart)
        && isInvoiceDTOOrUndefined(value?.invoice)
        && isArrayOfOrUndefined(value?.inventoryItems, isInventoryItemDTO)
    );
}

export function explainOrderDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'orderId',
                'clientId',
                'wcOrderId',
                'updated',
                'created',
                'date',
                'status',
                'description',
                'internalNote',
                'viewUrl',
                'adminUrl',
                'onHold',
                'isCompleted',
                'isPaid',
                'isTerminated',
                'meta',
                'invoice',
                'inventoryItems',
                'cart'
            ])
            , explainProperty("orderId", explainString(value?.orderId))
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("wcOrderId", explainStringOrUndefined(value?.wcOrderId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("date", explainString(value?.date))
            , explainProperty("status", explainString(value?.status))
            , explainProperty("description", explainString(value?.description))
            , explainProperty("internalNote", explainString(value?.internalNote))
            , explainProperty("viewUrl", explainString(value?.viewUrl))
            , explainProperty("adminUrl", explainString(value?.adminUrl))
            , explainProperty("onHold", explainBoolean(value?.onHold))
            , explainProperty("isCompleted", explainBoolean(value?.isCompleted))
            , explainProperty("isPaid", explainBoolean(value?.isPaid))
            , explainProperty("isTerminated", explainBoolean(value?.isTerminated))
            , explainProperty("meta", explainReadonlyJsonAny(value?.meta))
            , explainProperty("invoice", explainInvoiceDTOOrUndefined(value?.invoice))
            , explainProperty("inventoryItems", explainArrayOf<InventoryItemDTO>("InventoryItemDTO", explainInventoryItemDTO, value?.inventoryItems, isInventoryItemDTO))
            , explainProperty("cart", explainShoppingCart(value?.cart))
        ]
    );
}

export function stringifyOrderDTO (value: OrderDTO): string {
    return `OrderDTO(${value})`;
}

export function parseOrderDTO (value: any): OrderDTO | undefined {
    if ( isOrderDTO(value) ) return value;
    return undefined;
}

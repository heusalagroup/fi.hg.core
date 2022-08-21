// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isArrayOfOrUndefined, isBoolean, isRegularObject, isString, isStringOrUndefined, isUndefined } from "../../../modules/lodash";
import { isShoppingCart, ShoppingCart } from "../cart/ShoppingCart";
import { isReadonlyJsonAny, parseJson, ReadonlyJsonAny } from "../../../Json";
import { isInvoiceDTO, InvoiceDTO } from "../invoice/InvoiceDTO";
import { isInventoryItemDTO, InventoryItemDTO } from "../inventory/InventoryItemDTO";

export interface OrderDTO {
    readonly orderId        : string;
    readonly clientId       : string;
    readonly wcOrderId     ?: string;
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

export function isOrderDTO (value: any): value is OrderDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
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
        && ( isUndefined(value?.invoice) || isInvoiceDTO(value?.invoice) )
        && isArrayOfOrUndefined(value?.inventoryItems, isInventoryItemDTO)
    );
}

export function stringifyOrderDTO (value: OrderDTO): string {
    return `OrderDTO(${value})`;
}

export function parseOrderDTO (value: any): OrderDTO | undefined {
    if ( isOrderDTO(value) ) return value;
    return undefined;
}

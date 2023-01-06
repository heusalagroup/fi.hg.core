// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isShoppingCart, ShoppingCart } from "../cart/ShoppingCart";
import { isReadonlyJsonAny, parseJson, ReadonlyJsonAny } from "../../../Json";
import { isOrderStatus, OrderStatus } from "./OrderStatus";
import { isUndefined } from "../../../types/undefined";
import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString, isStringOrUndefined } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface NewOrderDTO {
    readonly clientId       : string;
    readonly cart           : ShoppingCart;
    readonly wcOrderId     ?: string;
    readonly date          ?: string;
    readonly status        ?: OrderStatus;
    readonly description   ?: string;
    readonly internalNote  ?: string;
    readonly viewUrl       ?: string;
    readonly adminUrl      ?: string;
    readonly onHold        ?: boolean;
    readonly isCompleted   ?: boolean;
    readonly isPaid        ?: boolean;
    readonly isTerminated  ?: boolean;
    readonly meta          ?: ReadonlyJsonAny;
}

export function createNewOrderDTO (
    clientId       : string,
    cart           : ShoppingCart,
    wcOrderId     ?: string,
    date          ?: string,
    status        ?: OrderStatus,
    description   ?: string,
    internalNote  ?: string,
    viewUrl       ?: string,
    adminUrl      ?: string,
    onHold        ?: boolean,
    isCompleted   ?: boolean,
    isPaid        ?: boolean,
    isTerminated  ?: boolean,
    meta          ?: ReadonlyJsonAny | string,
): NewOrderDTO {
    return {
        clientId,
        wcOrderId,
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
        cart
    };
}

export function isNewOrderDTO (value: any): value is NewOrderDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'clientId',
            'wcOrderId',
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
            'cart'
        ])
        && isString(value?.clientId)
        && isShoppingCart(value?.cart)
        && isStringOrUndefined(value?.wcOrderId)
        && isStringOrUndefined(value?.date)
        && ( isUndefined(value?.status) || isOrderStatus(value?.status))
        && isStringOrUndefined(value?.description)
        && isStringOrUndefined(value?.internalNote)
        && isStringOrUndefined(value?.viewUrl)
        && isStringOrUndefined(value?.adminUrl)
        && isBooleanOrUndefined(value?.onHold)
        && isBooleanOrUndefined(value?.isCompleted)
        && isBooleanOrUndefined(value?.isPaid)
        && isBooleanOrUndefined(value?.isTerminated)
        && ( isUndefined(value?.meta) || isReadonlyJsonAny(value?.meta) )
    );
}

export function stringifyNewOrderDTO (value: NewOrderDTO): string {
    return `NewOrderDTO(${value})`;
}

export function parseNewOrderDTO (value: any): NewOrderDTO | undefined {
    if ( isNewOrderDTO(value) ) return value;
    return undefined;
}

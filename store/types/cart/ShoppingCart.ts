// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isShoppingCartItem, ShoppingCartItem } from "./ShoppingCartItem";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";
import { isArrayOf } from "../../../types/Array";

export interface ShoppingCart {
    readonly items : readonly ShoppingCartItem[];
}

export function createShoppingCart (items ?: ShoppingCartItem[]) {
    return {
        items: items ?? []
    };
}

export function isShoppingCart (value: any): value is ShoppingCart {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'items'
        ])
        && isArrayOf<ShoppingCartItem>(value?.items, isShoppingCartItem)
    );
}

export function stringifyShoppingCart (value: ShoppingCart): string {
    return `ShoppingCart(${value})`;
}

export function parseShoppingCart (value: any): ShoppingCart | undefined {
    if ( isShoppingCart(value) ) return value;
    return undefined;
}

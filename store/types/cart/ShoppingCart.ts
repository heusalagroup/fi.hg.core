// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainShoppingCartItem, isShoppingCartItem, ShoppingCartItem } from "./ShoppingCartItem";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../../../types/Array";
import { explain, explainProperty } from "../../../types/explain";

export interface ShoppingCart {
    readonly items : readonly ShoppingCartItem[];
}

export function createShoppingCart (items ?: ShoppingCartItem[]) {
    return {
        items: items ?? []
    };
}

export function isShoppingCart (value: unknown): value is ShoppingCart {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'items'
        ])
        && isArrayOf<ShoppingCartItem>(value?.items, isShoppingCartItem)
    );
}

export function explainShoppingCart (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'items'
            ])
            , explainProperty("items", explainArrayOf<ShoppingCartItem>("ShoppingCartItem", explainShoppingCartItem, value?.items, isShoppingCartItem))
        ]
    );
}

export function stringifyShoppingCart (value: ShoppingCart): string {
    return `ShoppingCart(${value})`;
}

export function parseShoppingCart (value: any): ShoppingCart | undefined {
    if ( isShoppingCart(value) ) return value;
    return undefined;
}

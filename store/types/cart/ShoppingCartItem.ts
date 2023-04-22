// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ProductPrice, isProductPrice, explainProductPrice } from "../product/ProductPrice";
import { Product, isProduct, explainProduct } from "../product/Product";
import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explain, explainProperty } from "../../../types/explain";

export interface ShoppingCartItem {
    readonly id      : string;
    readonly amount  : number;
    readonly price   : ProductPrice;
    readonly product : Product;
}

export function createShoppingCartItem (
    id     : string,
    amount : number,
    price  : ProductPrice,
    product: Product
) : ShoppingCartItem {
    return {
        id,
        amount,
        price,
        product
    };
}

export function isShoppingCartItem (value: unknown): value is ShoppingCartItem {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'amount',
            'price',
            'product'
        ])
        && isString(value?.id)
        && isNumber(value?.amount)
        && isProductPrice(value?.price)
        && isProduct(value?.product)
    );
}

export function explainShoppingCartItem (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'amount',
                'price',
                'product'
            ])
            , explainProperty("id", explainString(value?.id))
            , explainProperty("amount", explainNumber(value?.amount))
            , explainProperty("price", explainProductPrice(value?.price))
            , explainProperty("product", explainProduct(value?.product))
        ]
    );
}



export function stringifyShoppingCartItem (value: ShoppingCartItem): string {
    return `CartItem(${value})`;
}

export function parseShoppingCartItem (value: any): ShoppingCartItem | undefined {
    if ( isShoppingCartItem(value) ) return value;
    return undefined;
}

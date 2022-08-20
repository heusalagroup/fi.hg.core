// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isNumber, isRegularObject, isString } from "../../../modules/lodash";
import { ProductPrice, isProductPrice } from "../product/ProductPrice";
import { Product, isProduct } from "../product/Product";

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

export function isShoppingCartItem (value: any): value is ShoppingCartItem {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
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

export function stringifyShoppingCartItem (value: ShoppingCartItem): string {
    return `CartItem(${value})`;
}

export function parseShoppingCartItem (value: any): ShoppingCartItem | undefined {
    if ( isShoppingCartItem(value) ) return value;
    return undefined;
}

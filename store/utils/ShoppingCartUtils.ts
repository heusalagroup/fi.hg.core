// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Product } from "../types/product/Product";
import { createShoppingCartItem, ShoppingCartItem } from "../types/cart/ShoppingCartItem";
import { filter, find, map, reduce } from "../../modules/lodash";
import { ProductPrice } from "../types/product/ProductPrice";
import { createShoppingCart, ShoppingCart } from "../types/cart/ShoppingCart";
import { CurrencyUtils } from "../../CurrencyUtils";

export class ShoppingCartUtils {

    public static createCartItemId (
        product: Product,
        price: ProductPrice
    ): string {
        return `${product.id}-${price.type}`;
    }

    public static findCartItemById (
        items: readonly ShoppingCartItem[],
        itemId: string
    ): ShoppingCartItem | undefined {
        return find(
            items,
            (item: ShoppingCartItem): boolean => item.id === itemId
        );
    }

    public static findCartItemByProductId (
        items: readonly ShoppingCartItem[],
        productId: string
    ): ShoppingCartItem | undefined {
        return find(
            items,
            (item: ShoppingCartItem): boolean => item.product.id === productId
        );
    }

    public static findCartItemByProduct (
        items: readonly ShoppingCartItem[],
        product: Product
    ): ShoppingCartItem | undefined {
        return ShoppingCartUtils.findCartItemByProductId(items, product.id);
    }

    public static addItemToCart (
        cart: ShoppingCart,
        product: Product,
        price: ProductPrice,
        amount: number = 1
    ): ShoppingCart {

        const itemId = ShoppingCartUtils.createCartItemId(product, price);
        const cartItem: ShoppingCartItem | undefined = ShoppingCartUtils.findCartItemById(cart.items, itemId);

        if ( cartItem === undefined ) {
            return createShoppingCart(
                [ ...cart.items, createShoppingCartItem(itemId, 1, price, product) ]
            );
        }

        return createShoppingCart(
            map(
                cart.items,
                (i: ShoppingCartItem): ShoppingCartItem => {
                    if ( i.id === cartItem.id ) {
                        return createShoppingCartItem(i.id, i.amount + amount, price, product);
                    } else {
                        return i;
                    }
                }
            )
        );

    }

    public static removeItemFromCart (
        cart: ShoppingCart,
        product: Product,
        price: ProductPrice,
        amount: number = 1
    ): ShoppingCart {
        const itemId = ShoppingCartUtils.createCartItemId(product, price);
        const cartItem: ShoppingCartItem | undefined = ShoppingCartUtils.findCartItemById(cart.items, itemId);
        if ( cartItem === undefined ) return cart;
        return createShoppingCart(
            filter(
                map(
                    cart.items,
                    (i: ShoppingCartItem): ShoppingCartItem => {
                        if ( i.id === cartItem.id ) {
                            const newAmount = i.amount - amount;
                            return createShoppingCartItem(i.id, newAmount > 0 ? newAmount : 0, price, product);
                        } else {
                            return i;
                        }
                    }
                ),
                (i: ShoppingCartItem): boolean => i.amount > 0
            )
        );
    }

    public static getItemSum (
        item: ShoppingCartItem
    ): number {
        return CurrencyUtils.getSum(item.price.sum, item.amount);
    }

    public static getItemVat (
        item: ShoppingCartItem
    ): number {
        return ShoppingCartUtils.getItemSum(item) - ShoppingCartUtils.getItemSumWithoutVat(item);
    }

    public static getItemSumWithoutVat (
        item: ShoppingCartItem
    ): number {
        return CurrencyUtils.getVatlessSum(ShoppingCartUtils.getItemSum(item), item.price.vatPercent);
    }

    public static getTotalSum (
        items: readonly ShoppingCartItem[]
    ): number {
        return reduce(
            items,
            (prev: number, item: ShoppingCartItem) : number => {
                return prev + ShoppingCartUtils.getItemSum(item);
            },
            0
        );
    }

    public static getTotalSumWithoutVat (
        items: readonly ShoppingCartItem[]
    ): number {
        return reduce(
            items,
            (prev: number, item: ShoppingCartItem) : number => {
                return prev + ShoppingCartUtils.getItemSumWithoutVat(item);
            },
            0
        );
    }

    public static getTotalVat (
        items: readonly ShoppingCartItem[]
    ): number {
        return reduce(
            items,
            (prev: number, item: ShoppingCartItem) : number => {
                return prev + ShoppingCartUtils.getItemVat(item);
            },
            0
        );
    }

    public static getVatlessSumFromPrice (
        price: ProductPrice
    ) : number {
        return CurrencyUtils.getVatlessSum(price.sum, price.vatPercent);
    }

}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Observer, ObserverCallback, ObserverDestructor } from "./Observer";
import { createShoppingCart, ShoppingCart } from "./store/types/cart/ShoppingCart";
import { Product } from "./store/types/product/Product";
import { ShoppingCartUtils } from "./store/utils/ShoppingCartUtils";
import { ProductPrice } from "./store/types/product/ProductPrice";

export enum StoreCartServiceEvent {
    CART_UPDATED = "StoreCartService:cartUpdated",
    CART_MENU_UPDATED = "StoreCartService:menuUpdated"
}

export type StoreCartServiceDestructor = ObserverDestructor;

/**
 * @FIXME: Convert as non-static
 */
export class StoreCartService {

    private static _observer: Observer<StoreCartServiceEvent> = new Observer<StoreCartServiceEvent>("StoreCartService");
    private static _cart : ShoppingCart = createShoppingCart();
    private static _cartMenuOpen : boolean = false;

    public static Event = StoreCartServiceEvent;

    public static on (
        name: StoreCartServiceEvent,
        callback: ObserverCallback<StoreCartServiceEvent>
    ): StoreCartServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public static destroy (): void {
        this._observer.destroy();
    }

    public static getCart () : ShoppingCart {
        return this._cart;
    }

    public static addProduct (
        product : Product,
        price   : ProductPrice,
        amount  : number = 1
    ) {
        this._cart = ShoppingCartUtils.addItemToCart(this._cart, product, price, amount);
        this._observer.triggerEvent(StoreCartServiceEvent.CART_UPDATED);
    }

    public static removeProduct (
        product : Product,
        price   : ProductPrice,
        amount  : number = 1
    ) {
        const oldCart = this._cart;
        this._cart = ShoppingCartUtils.removeItemFromCart(this._cart, product, price, amount);
        if (this._cart !== oldCart) {
            this._observer.triggerEvent(StoreCartServiceEvent.CART_UPDATED);
        }
    }

    public static isCartMenuOpen () : boolean {
        return this._cartMenuOpen;
    }

    public static setCartMenuOpen (value : boolean) {
        if (this._cartMenuOpen !== value) {
            this._cartMenuOpen = value;
            this._observer.triggerEvent(StoreCartServiceEvent.CART_MENU_UPDATED);
        }
    }

    public static openCartMenu () {
        StoreCartService.setCartMenuOpen(true);
    }

    public static closeCartMenu () {
        StoreCartService.setCartMenuOpen(false);
    }

    public static toggleCartMenu () {
        StoreCartService.setCartMenuOpen(
            !StoreCartService.isCartMenuOpen()
        );
    }

    public static resetCart () {
        this._cart = createShoppingCart();
        this._observer.triggerEvent(StoreCartServiceEvent.CART_UPDATED);
    }

}

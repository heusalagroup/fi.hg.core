// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { get } from "./functions/get";
import { Currency } from "./types/Currency";
import { CurrencyRates } from "./types/CurrencyRates";

export class CurrencyUtils {

    public static stringifySum (
        sum : number
    ) : string {
        return (Math.round(sum*100)/100).toFixed(2);
    }

    public static getSum (
        price  : number,
        amount : number,
        discountPercent ?: number | undefined
    ): number {
        return this.getSumWithDiscount(amount * price, discountPercent);
    }

    /**
     * Returns the total sum including VAT
     * @param price The price without VAT
     * @param amount The amount of items
     * @param vatPercent The VAT percentage
     * @param discountPercent The discount percentage
     */
    public static getSumWithVat (
        price      : number,
        amount     : number,
        vatPercent : number,
        discountPercent ?: number | undefined
    ): number {
        const sum = this.getSumWithDiscount(amount * price, discountPercent);
        return Math.round( (sum*100) + (sum*100) * vatPercent ) / 100;
    }

    public static getSumWithDiscount (
        price           : number,
        discountPercent : number | undefined
    ): number {
        return discountPercent !== undefined && discountPercent > 0 && discountPercent <= 1 ? price - price * discountPercent : price;
    }

    public static getVatlessSum (
        sum: number,
        vatPercent: number,
        discountPercent ?: number | undefined
    ) : number {
        const realSum = this.getSumWithDiscount(sum, discountPercent);
        return (realSum * 100 / (1+vatPercent)) / 100;
    }

    public static roundByAccuracy (
        value: number,
        accuracy: number
    ) {
        const m = Math.pow(10, accuracy);
        return Math.round(value * m) / m;
    }

    public static convertCurrencyAmount (
        rates     : CurrencyRates,
        amount    : number,
        from      : Currency,
        to        : Currency,
        accuracy  : number = 10
    ) : number {
        const toRate = get(rates, to);
        if (toRate === undefined) throw new TypeError(`CurrencyService: To: No exchange rate found: ${to}`);
        const fromRate = get(rates, from);
        if (fromRate === undefined) throw new TypeError(`CurrencyService: From: No exchange rate found: ${from}`);
        return CurrencyUtils.roundByAccuracy( (amount / fromRate) * toRate, accuracy);
    }

    public static getCents (value: number) : number {
        return Math.round(value*100);
    }

    public static fromCents (value: number) : number {
        return Math.round(value) / 100;
    }

}

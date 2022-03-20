// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export class CurrencyUtils {

    public static stringifySum (
        sum : number
    ) : string {
        return (Math.round(sum*100)/100).toFixed(2);
    }

    public static getSum (
        price  : number,
        amount : number
    ): number {
        return amount * price;
    }

    public static getVatlessSum (
        sum: number,
        vatPercent: number
    ) : number {
        return sum / (1+vatPercent);
    }

}

export function isCurrencyUtils (value: any): value is CurrencyUtils {
    return value instanceof CurrencyUtils;
}

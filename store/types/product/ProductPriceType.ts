// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../types/Enum";
import { explainNot, explainOk, explainOr } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";

export enum ProductPriceType {
    ONCE     = "ONCE",
    HOURLY   = "HOURLY",
    DAILY    = "DAILY",
    WEEKLY   = "WEEKLY",
    BIWEEKLY   = "BIWEEKLY",
    MONTHLY  = "MONTHLY",
    BIMONTHLY  = "BIMONTHLY",
    QUARTERLY  = "QUARTERLY",
    SEASONAL  = "SEASONAL",
    BIANNUAL  = "BIANNUAL",
    YEARLY   = "YEARLY",
    YEARS_2   = "YEARS_2",
    YEARS_3  = "YEARS_3",
    YEARS_4  = "YEARS_4",
    YEARS_5  = "YEARS_5",
    YEARS_10 = "YEARS_10"
}

export function isProductPriceType (value: any): value is ProductPriceType {
    switch (value) {
        case ProductPriceType.ONCE      :
        case ProductPriceType.HOURLY    :
        case ProductPriceType.DAILY     :
        case ProductPriceType.WEEKLY    :
        case ProductPriceType.BIWEEKLY  :
        case ProductPriceType.MONTHLY   :
        case ProductPriceType.BIMONTHLY :
        case ProductPriceType.QUARTERLY :
        case ProductPriceType.SEASONAL  :
        case ProductPriceType.BIANNUAL  :
        case ProductPriceType.YEARLY    :
        case ProductPriceType.YEARS_2   :
        case ProductPriceType.YEARS_3   :
        case ProductPriceType.YEARS_4   :
        case ProductPriceType.YEARS_5   :
        case ProductPriceType.YEARS_10  :
            return true;

        default:
            return false;
    }
}

export function explainProductPriceType (value : any) : string {
    return explainEnum("ProductPriceType", ProductPriceType, isProductPriceType, value);
}

export function stringifyProductPriceType (value: ProductPriceType): string {
    switch (value) {
        case ProductPriceType.ONCE      : return 'ONCE';
        case ProductPriceType.HOURLY    : return 'HOURLY';
        case ProductPriceType.DAILY     : return 'DAILY';
        case ProductPriceType.WEEKLY    : return 'WEEKLY';
        case ProductPriceType.BIWEEKLY  : return 'BIWEEKLY';
        case ProductPriceType.MONTHLY   : return 'MONTHLY';
        case ProductPriceType.BIMONTHLY : return 'BIMONTHLY';
        case ProductPriceType.QUARTERLY : return 'QUARTERLY';
        case ProductPriceType.SEASONAL  : return 'SEASONAL';
        case ProductPriceType.BIANNUAL  : return 'BIANNUAL';
        case ProductPriceType.YEARLY    : return 'YEARLY';
        case ProductPriceType.YEARS_2   : return 'YEARS_2';
        case ProductPriceType.YEARS_3   : return 'YEARS_3';
        case ProductPriceType.YEARS_4   : return 'YEARS_4';
        case ProductPriceType.YEARS_5   : return 'YEARS_5';
        case ProductPriceType.YEARS_10  : return 'YEARS_10';
    }
    throw new TypeError(`Unsupported ProductPriceType value: ${value}`);
}

export function parseProductPriceType (value: any): ProductPriceType | undefined {
    switch (`${value}`.toUpperCase()) {
        case 'ONCE'      : return ProductPriceType.ONCE;
        case 'HOURLY'    : return ProductPriceType.HOURLY;
        case 'DAILY'     : return ProductPriceType.DAILY;
        case 'WEEKLY'    : return ProductPriceType.WEEKLY;
        case 'BIWEEKLY'  : return ProductPriceType.BIWEEKLY;
        case 'MONTHLY'   : return ProductPriceType.MONTHLY;
        case 'BIMONTHLY' : return ProductPriceType.BIMONTHLY;
        case 'QUARTERLY' : return ProductPriceType.QUARTERLY;
        case 'SEASONAL'  : return ProductPriceType.SEASONAL;
        case 'BIANNUAL'  : return ProductPriceType.BIANNUAL;
        case 'YEARLY'    : return ProductPriceType.YEARLY;
        case 'YEARS_2'   : return ProductPriceType.YEARS_2;
        case 'YEARS_3'   : return ProductPriceType.YEARS_3;
        case 'YEARS_4'   : return ProductPriceType.YEARS_4;
        case 'YEARS_5'   : return ProductPriceType.YEARS_5;
        case 'YEARS_10'  : return ProductPriceType.YEARS_10;
        default : return undefined;
    }
}

/**
 * This function returns how many months this product price covers.
 *
 * Please note, that if the price type cannot be expressed as full months, this
 * function will return `0`.
 *
 * @throws {TypeError} if the price type is not recognized as a valid price type
 * @param priceType
 */
export function getBillingMonthsForProductPriceType (priceType: ProductPriceType) : number {
    switch (priceType) {

        case ProductPriceType.ONCE:
        case ProductPriceType.HOURLY:
        case ProductPriceType.DAILY:
        case ProductPriceType.WEEKLY:
        case ProductPriceType.BIWEEKLY:
            return 0;

        case ProductPriceType.MONTHLY     : return 1;
        case ProductPriceType.BIMONTHLY   : return 2;
        case ProductPriceType.QUARTERLY   : return 3;
        case ProductPriceType.SEASONAL    : return 4;
        case ProductPriceType.BIANNUAL    : return 6;
        case ProductPriceType.YEARLY      : return 12;
        case ProductPriceType.YEARS_2     : return 24;
        case ProductPriceType.YEARS_3     : return 36;
        case ProductPriceType.YEARS_4     : return 48;
        case ProductPriceType.YEARS_5     : return 60;
        case ProductPriceType.YEARS_10    : return 120;

    }
    throw new TypeError(`Unsupported type: ${priceType}`);
}

export function isProductPriceTypeOrUndefined (value: unknown): value is ProductPriceType | undefined {
    return isUndefined(value) || isProductPriceType(value);
}

export function explainProductPriceTypeOrUndefined (value: unknown): string {
    return isProductPriceTypeOrUndefined(value) ? explainOk() : explainNot(explainOr(['ProductPriceType', 'undefined']));
}


// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainEnum } from "../../../types/Enum";

export enum ProductPriceType {
    HOURLY   = "HOURLY",
    DAILY    = "DAILY",
    MONTHLY  = "MONTHLY",
    YEARLY   = "YEARLY",
    YEARS_3  = "YEARS_3",
    YEARS_5  = "YEARS_5",
    YEARS_10 = "YEARS_10"
}

export function isProductPriceType (value: any): value is ProductPriceType {
    switch (value) {
        case ProductPriceType.HOURLY : return true;
        case ProductPriceType.DAILY : return true;
        case ProductPriceType.MONTHLY : return true;
        case ProductPriceType.YEARLY : return true;
        case ProductPriceType.YEARS_3 : return true;
        case ProductPriceType.YEARS_5 : return true;
        case ProductPriceType.YEARS_10 : return true;
        default: return false;
    }
}

export function explainProductPriceType (value : any) : string {
    return explainEnum("ProductPriceType", ProductPriceType, isProductPriceType, value);
}

export function stringifyProductPriceType (value: ProductPriceType): string {
    switch (value) {
        case ProductPriceType.HOURLY : return 'HOURLY';
        case ProductPriceType.DAILY : return 'DAILY';
        case ProductPriceType.MONTHLY : return 'MONTHLY';
        case ProductPriceType.YEARLY : return 'YEARLY';
        case ProductPriceType.YEARS_3 : return 'YEARS_3';
        case ProductPriceType.YEARS_5 : return 'YEARS_5';
        case ProductPriceType.YEARS_10 : return 'YEARS_10';
    }
    throw new TypeError(`Unsupported ProductPriceType value: ${value}`);
}

export function parseProductPriceType (value: any): ProductPriceType | undefined {
    switch (`${value}`.toUpperCase()) {
        case 'HOURLY' : return ProductPriceType.HOURLY;
        case 'DAILY' : return ProductPriceType.DAILY;
        case 'MONTHLY' : return ProductPriceType.MONTHLY;
        case 'YEARLY' : return ProductPriceType.YEARLY;
        case 'YEARS_3' : return ProductPriceType.YEARS_3;
        case 'YEARS_5' : return ProductPriceType.YEARS_5;
        case 'YEARS_10' : return ProductPriceType.YEARS_10;
        default : return undefined;
    }
}


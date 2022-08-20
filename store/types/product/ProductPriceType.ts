// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

export enum ProductPriceType {
    YEARLY   = "YEARLY",
    YEARS_3  = "YEARS_3",
    YEARS_5  = "YEARS_5",
    YEARS_10 = "YEARS_10"
}

export function isProductPriceType (value: any): value is ProductPriceType {
    switch (value) {
        case ProductPriceType.YEARLY : return true;
        case ProductPriceType.YEARS_3 : return true;
        case ProductPriceType.YEARS_5 : return true;
        case ProductPriceType.YEARS_10 : return true;
        default: return false;
    }
}

export function stringifyProductPriceType (value: ProductPriceType): string {
    switch (value) {
        case ProductPriceType.YEARLY : return 'YEARLY';
        case ProductPriceType.YEARS_3 : return 'YEARS_3';
        case ProductPriceType.YEARS_5 : return 'YEARS_5';
        case ProductPriceType.YEARS_10 : return 'YEARS_10';
    }
    throw new TypeError(`Unsupported ProductPriceType value: ${value}`);
}

export function parseProductPriceType (value: any): ProductPriceType | undefined {
    switch (`${value}`.toUpperCase()) {
        case 'YEARLY' : return ProductPriceType.YEARLY;
        case 'YEARS_3' : return ProductPriceType.YEARS_3;
        case 'YEARS_5' : return ProductPriceType.YEARS_5;
        case 'YEARS_10' : return ProductPriceType.YEARS_10;
        default : return undefined;
    }
}

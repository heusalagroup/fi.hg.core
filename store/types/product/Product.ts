// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isProductType, ProductType } from "./ProductType";
import { isProductFeature, ProductFeature } from "./features/ProductFeature";
import { isArrayOf, isString } from "../../../modules/lodash";
import { ProductPrice, isProductPrice } from "./ProductPrice";

export interface Product {
    readonly id        : string;
    readonly type      : ProductType;
    readonly title     : string;
    readonly summary   : string;
    readonly features  : ProductFeature[];
    readonly prices    : ProductPrice[];
}

export function isProduct (value: any): value is Product {
    return (
        !!value
        && isString(value?.id)
        && isProductType(value?.type)
        && isString(value?.title)
        && isString(value?.summary)
        && isArrayOf<ProductFeature>(value?.features, isProductFeature)
        && isArrayOf<ProductPrice>(value?.prices, isProductPrice)
    );
}

export function stringifyProduct (value: Product): string {
    if ( !isProduct(value) ) throw new TypeError(`Not Product: ${value}`);
    return `Product(${value?.id})`;
}

export function parseProduct (value: any): Product | undefined {
    if ( isProduct(value) ) return value;
    return undefined;
}

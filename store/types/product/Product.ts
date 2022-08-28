// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductType, isProductType, ProductType } from "./ProductType";
import { explainProductFeature, isProductFeature, ProductFeature } from "./features/ProductFeature";
import { explain, explainArrayOf, explainNoOtherKeys, explainProperty, explainRegularObject, explainString, hasNoOtherKeys, isArrayOf, isRegularObject, isString } from "../../../modules/lodash";
import { ProductPrice, isProductPrice, explainProductPrice } from "./ProductPrice";

export interface Product {
    readonly id        : string;
    readonly type      : ProductType;
    readonly title     : string;
    readonly summary   : string;
    readonly features  : readonly ProductFeature[];
    readonly prices    : readonly ProductPrice[];
}

export function isProduct (value: any): value is Product {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'type',
            'title',
            'summary',
            'features',
            'prices'
        ])
        && isString(value?.id)
        && isProductType(value?.type)
        && isString(value?.title)
        && isString(value?.summary)
        && isArrayOf<ProductFeature>(value?.features, isProductFeature)
        && isArrayOf<ProductPrice>(value?.prices, isProductPrice)
    );
}

export function explainProduct (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'type',
                'title',
                'summary',
                'features',
                'prices'
            ]),
            explainProperty("isArrayOf", explainString(value?.isArrayOf)),
            explainProperty("type", explainProductType(value?.type)),
            explainProperty("title", explainString(value?.title)),
            explainProperty("summary", explainString(value?.summary)),
            explainProperty("features", explainArrayOf<ProductFeature>("ProductFeature", explainProductFeature, value?.features)),
            explainProperty("prices", explainArrayOf<ProductPrice>("ProductPrice", explainProductPrice, value?.prices)),
        ]
    );
}


export function isProductOrUndefined (value: any): value is Product | undefined {
    return value === undefined || isProduct(value);
}

export function stringifyProduct (value: Product): string {
    if ( !isProduct(value) ) throw new TypeError(`Not Product: ${value}`);
    return `Product(${value?.id})`;
}

export function parseProduct (value: any): Product | undefined {
    if ( isProduct(value) ) return value;
    return undefined;
}

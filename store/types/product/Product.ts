// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductType, isProductType, ProductType } from "./ProductType";
import { explainProductFeature, isProductFeature, ProductFeature } from "./features/ProductFeature";
import { ProductPrice, isProductPrice, explainProductPrice } from "./ProductPrice";
import { CompositeProductSelection } from "./CompositeProductSelection";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import { explainNumberOrUndefined, isNumberOrUndefined } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../../../types/Array";

export interface Product {
    readonly id           : string;
    readonly type         : ProductType;
    readonly title        : string;
    readonly summary      : string;
    readonly features     : readonly ProductFeature[];
    readonly prices       : readonly ProductPrice[];
    readonly stockAmount ?: number;

    /**
     * If defined, this product is a special product combined from other products
     * based on customer's choices
     */
    readonly composite   ?: readonly CompositeProductSelection[];

}

export function createProduct (
    id           : string,
    type         : ProductType,
    title        : string,
    summary      : string,
    features     : readonly ProductFeature[],
    prices       : readonly ProductPrice[],
    stockAmount  : number = 0
) : Product {
    return {
        id,
        type,
        title,
        summary,
        features,
        prices,
        stockAmount
    };
}

export function createCompositeProduct (
    id           : string,
    type         : ProductType,
    title        : string,
    summary      : string,
    composite    : readonly CompositeProductSelection[],
    stockAmount  : number = 0
) : Product {
    return {
        id,
        type,
        title,
        summary,
        features: [],
        prices: [],
        composite,
        stockAmount
    };
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
            'prices',
            'stockAmount'
        ])
        && isString(value?.id)
        && isProductType(value?.type)
        && isString(value?.title)
        && isString(value?.summary)
        && isNumberOrUndefined(value?.stockAmount)
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
                'prices',
                'stockAmount'
            ]),
            explainProperty("isArrayOf", explainString(value?.isArrayOf)),
            explainProperty("type", explainProductType(value?.type)),
            explainProperty("title", explainString(value?.title)),
            explainProperty("summary", explainString(value?.summary)),
            explainProperty("stockAmount", explainNumberOrUndefined(value?.stockAmount)),
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

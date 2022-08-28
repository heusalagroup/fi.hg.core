// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductPriceType, isProductPriceType, ProductPriceType } from "./ProductPriceType";
import {
    explain, explainNoOtherKeys, explainNumber, explainProperty, explainRegularObject, explainString,
    hasNoOtherKeys,
    isNumber,
    isRegularObject,
    isString
} from "../../../modules/lodash";

export interface ProductPrice {
    readonly sum        : number;
    readonly vatPercent : number;
    readonly type       : ProductPriceType;
    readonly buyUrl     : string;
}

export function isProductPrice (value: any): value is ProductPrice {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'sum',
            'vatPercent',
            'type',
            'buyUrl'
        ])
        && isNumber(value?.sum)
        && isNumber(value?.vatPercent)
        && isProductPriceType(value?.type)
        && isString(value?.buyUrl)
    );
}

export function explainProductPrice (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'sum',
                'vatPercent',
                'type',
                'buyUrl'
            ]),
            explainProperty("sum", explainNumber(value?.sum)),
            explainProperty("vatPercent", explainNumber(value?.vatPercent)),
            explainProperty("type", explainProductPriceType(value?.type)),
            explainProperty("buyUrl", explainString(value?.buyUrl))
        ]
    );
}

export function isProductPriceOrUndefined (value: any): value is ProductPrice | undefined {
    return value === undefined || isProductPrice(value);
}

export function stringifyProductPrice (value: ProductPrice): string {
    return `ProductPrice(${value})`;
}

export function parseProductPrice (value: any): ProductPrice | undefined {
    if ( isProductPrice(value) ) return value;
    return undefined;
}

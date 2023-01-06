// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductPriceType, isProductPriceType, ProductPriceType } from "./ProductPriceType";
import { explain, explainProperty } from "../../../types/explain";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../types/String";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";

export interface ProductPrice {
    readonly sum              : number;
    readonly vatPercent       : number;
    readonly type             : ProductPriceType;
    readonly buyUrl          ?: string;
    readonly discountPercent ?: number;
    readonly discountFrom    ?: string;
    readonly discountTo      ?: string;
}

export function createProductPrice (
    sum              : number,
    vatPercent       : number,
    type             : ProductPriceType,
    buyUrl          ?: string,
    discountPercent ?: number,
    discountFrom    ?: string,
    discountTo      ?: string
): ProductPrice {
    return {
        sum,
        vatPercent,
        type,
        buyUrl,
        discountPercent,
        discountFrom,
        discountTo
    };
}


export function isProductPrice (value: any): value is ProductPrice {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'sum',
            'vatPercent',
            'type',
            'discountPercent',
            'discountFrom',
            'discountTo',
            'buyUrl'
        ])
        && isNumber(value?.sum)
        && isNumber(value?.vatPercent)
        && isNumberOrUndefined(value?.discountPercent)
        && isStringOrUndefined(value?.discountFrom)
        && isStringOrUndefined(value?.discountTo)
        && isProductPriceType(value?.type)
        && isStringOrUndefined(value?.buyUrl)
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
                'discountPercent',
                'discountFrom',
                'discountTo',
                'buyUrl'
            ]),
            explainProperty("sum", explainNumber(value?.sum)),
            explainProperty("vatPercent", explainNumber(value?.vatPercent)),
            explainProperty("type", explainProductPriceType(value?.type)),
            explainProperty("buyUrl", explainStringOrUndefined(value?.buyUrl)),
            explainProperty("discountPercent", explainNumberOrUndefined(value?.discountPercent)),
            explainProperty("discountFrom", explainStringOrUndefined(value?.discountFrom)),
            explainProperty("discountTo", explainStringOrUndefined(value?.discountTo))
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

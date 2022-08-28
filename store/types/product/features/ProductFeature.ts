// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductFeatureCategory, isProductFeatureCategory, ProductFeatureCategory } from "./ProductFeatureCategory";
import { explainProductFeatureId, isProductFeatureId, ProductFeatureId } from "./ProductFeatureId";
import { explain, explainBoolean, explainNoOtherKeys, explainNumber, explainOr, explainProperty, explainRegularObject, explainString, hasNoOtherKeys, isBoolean, isNumber, isRegularObject, isString } from "../../../../modules/lodash";

export interface ProductFeature {
    readonly id       : ProductFeatureId;
    readonly category : ProductFeatureCategory;
    readonly value    : string | number | boolean;
}

export function isProductFeature (value: any): value is ProductFeature {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'category',
            'value'
        ])
        && isProductFeatureId(value?.id)
        && isProductFeatureCategory(value?.category)
        && ( isString(value?.value) || isNumber(value?.value) || isBoolean(value?.value) )
    );
}

export function explainProductFeature (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'id',
                'category',
                'value'
            ]),
            explainProperty("id", explainProductFeatureId(value?.id)),
            explainProperty("category", explainProductFeatureCategory(value?.category)),
            explainProperty(
                "value",
                explainOr(
                    [
                        explainString(value?.value),
                        explainNumber(value?.value),
                        explainBoolean(value?.value)
                    ]
                )
            )
        ]
    );
}


export function stringifyProductFeature (value: ProductFeature): string {
    if ( !isProductFeature(value) ) throw new TypeError(
        `Not ProductFeature: ${value}`);
    return `ProductFeature(${value})`;
}

export function parseProductFeature (value: any): ProductFeature | undefined {
    if ( isProductFeature(value) ) return value;
    return undefined;
}

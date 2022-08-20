// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isProductFeatureCategory, ProductFeatureCategory } from "./ProductFeatureCategory";
import { isProductFeatureId, ProductFeatureId } from "./ProductFeatureId";
import { isBoolean, isNumber, isString } from "../../../../modules/lodash";

export interface ProductFeature {
    readonly id       : ProductFeatureId;
    readonly category : ProductFeatureCategory;
    readonly value    : string | number | boolean;
}

export function isProductFeature (value: any): value is ProductFeature {
    return (
        !!value
        && isProductFeatureId(value?.id)
        && isProductFeatureCategory(value?.category)
        && ( isString(value?.value) || isNumber(value?.value) || isBoolean(value?.value) )
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

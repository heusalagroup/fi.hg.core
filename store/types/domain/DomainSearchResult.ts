// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProduct, isProduct, Product } from "../product/Product";
import { DomainSearchState, explainDomainSearchState, isDomainSearchState } from "./DomainSearchState";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../../../types/Array";

export interface DomainSearchResult {

    /**
     * Domain name
     */
    readonly name        : string;

    readonly state       : DomainSearchState;

    /**
     * Available products to buy if any found
     */
    readonly productList : readonly Product[];

}

export function createDomainSearchResult (
    name        : string,
    state       : DomainSearchState,
    productList : readonly Product[]
) : DomainSearchResult {
    return {
        name,
        state,
        productList
    };
}

export function isDomainSearchResult (value: any) : value is DomainSearchResult {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name',
            'state',
            'productList'
        ])
        && isString(value?.name)
        && isDomainSearchState(value?.state)
        && isArrayOf<Product>(value?.productList, isProduct)
    );
}

export function explainDomainSearchResult (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'name',
                'state',
                'product'
            ]),
            explainProperty("name", explainString(value?.name)),
            explainProperty("state", explainDomainSearchState(value?.state)),
            explainProperty("product", explainArrayOf<Product>(
                "Product",
                explainProduct,
                value?.productList,
                isProduct
            ))
        ]
    );
}

export function stringifyDomainSearchResult (value : DomainSearchResult) : string {
    return `DomainSearchResult(${value})`;
}

export function parseDomainSearchResult (value: any) : DomainSearchResult | undefined {
    if (isDomainSearchResult(value)) return value;
    return undefined;
}

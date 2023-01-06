// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isProduct, Product } from "./Product";
import { isArrayOf } from "../../../types/Array";

export interface ProductListDTO {
    readonly items : readonly Product[];
}

export function isProductListDTO (value: any): value is ProductListDTO {
    return (
        !!value
        && isArrayOf<Product>(value?.items, isProduct)
    );
}

export function stringifyProductListDTO (value: ProductListDTO): string {
    if ( !isProductListDTO(value) ) throw new TypeError(
        `Not ProductListDTO: ${value}`);
    return `ProductListDTO(${value})`;
}

export function parseProductListDTO (value: any): ProductListDTO | undefined {
    if ( isProductListDTO(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isProductListDTO, ProductListDTO } from "../product/ProductListDTO";
import { isUndefined } from "../../../types/undefined";

export interface StoreIndexDTO {
    readonly products ?: ProductListDTO;
}

export function isStoreIndexDTO (value: any): value is StoreIndexDTO {
    return (
        !!value
        && ( isUndefined(value?.products) || isProductListDTO(value?.products) )
    );
}

export function stringifyStoreIndexDTO (value: StoreIndexDTO): string {
    if ( !isStoreIndexDTO(value) ) throw new TypeError(`Not StoreIndexDTO: ${value}`);
    return `StoreIndexDTO(${value})`;
}

export function parseStoreIndexDTO (value: any): StoreIndexDTO | undefined {
    if ( isStoreIndexDTO(value) ) return value;
    return undefined;
}

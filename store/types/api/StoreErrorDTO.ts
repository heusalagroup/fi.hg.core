// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";

export interface StoreErrorDTO {
    readonly error: string;
}

export function isStoreErrorDTO (value: any): value is StoreErrorDTO {
    return (
        !!value
        && isString(value?.error)
    );
}

export function stringifyStoreErrorDTO (value: StoreErrorDTO): string {
    if ( !isStoreErrorDTO(value) ) throw new TypeError(`Not StoreErrorDTO: ${value}`);
    return `StoreErrorDTO(${value})`;
}

export function parseStoreErrorDTO (value: any): StoreErrorDTO | undefined {
    if ( isStoreErrorDTO(value) ) return value;
    return undefined;
}

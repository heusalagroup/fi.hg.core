// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArrayOf, map } from "../../../modules/lodash";
import { InventoryItemDTO, isInventoryItemDTO } from "./InventoryItemDTO";

/**
 * The client object used in the REST API communication
 */
export interface InventoryItemListDTO {
    readonly payload: readonly InventoryItemDTO[];
}

export function createInventoryItemListDTO (items: InventoryItemDTO[]): InventoryItemListDTO {
    return {
        payload: map(items, (item: InventoryItemDTO): InventoryItemDTO => item)
    } as InventoryItemListDTO;
}

export function isInventoryItemListDTO (value: any): value is InventoryItemListDTO {
    return (
        !!value
        && isArrayOf<InventoryItemDTO>(value?.payload, isInventoryItemDTO)
    );
}

export function stringifyInventoryItemListDTO (value: InventoryItemListDTO): string {
    if ( !isInventoryItemListDTO(value) ) throw new TypeError(`Not InventoryItemListDTO: ${value}`);
    return `InventoryItemListDTO(${value})`;
}

export function parseInventoryItemListDTO (value: any): InventoryItemListDTO | undefined {
    if ( isInventoryItemListDTO(value) ) return value;
    return undefined;
}

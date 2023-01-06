// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { OrderDTO, isOrderDTO } from "./OrderDTO";
import { isArrayOf } from "../../../types/Array";

/**
 * The client object used in the REST API communication
 */
export interface OrderListDTO {
    readonly payload: readonly OrderDTO[];
}

export function createOrderListDTO (items: OrderDTO[]): OrderListDTO {
    return {
        payload: map(items, (item: OrderDTO): OrderDTO => item)
    } as OrderListDTO;
}

export function isOrderListDTO (value: any): value is OrderListDTO {
    return (
        !!value
        && isArrayOf<OrderDTO>(value?.payload, isOrderDTO)
    );
}

export function stringifyOrderListDTO (value: OrderListDTO): string {
    if ( !isOrderListDTO(value) ) throw new TypeError(`Not OrderListDTO: ${value}`);
    return `OrderListDTO(${value})`;
}

export function parseOrderListDTO (value: any): OrderListDTO | undefined {
    if ( isOrderListDTO(value) ) return value;
    return undefined;
}

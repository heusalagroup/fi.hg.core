// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { TicketDTO, isTicketDTO } from "./TicketDTO";
import { isArrayOf } from "../../../types/Array";

/**
 * The client object used in the REST API communication
 */
export interface TicketListDTO {
    readonly payload: readonly TicketDTO[];
}

export function createTicketListDTO (items: TicketDTO[] | readonly TicketDTO[]): TicketListDTO {
    return {
        payload: map(items, (item: TicketDTO): TicketDTO => item)
    };
}

export function isTicketListDTO (value: any): value is TicketListDTO {
    return (
        !!value
        && isArrayOf<TicketDTO>(value?.payload, isTicketDTO)
    );
}

export function stringifyTicketListDTO (value: TicketListDTO): string {
    if ( !isTicketListDTO(value) ) throw new TypeError(`Not TicketListDTO: ${value}`);
    return `TicketListDTO(${value})`;
}

export function parseTicketListDTO (value: any): TicketListDTO | undefined {
    if ( isTicketListDTO(value) ) return value;
    return undefined;
}

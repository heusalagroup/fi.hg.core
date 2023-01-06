// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { ClientDTO, isClientDTO } from "./ClientDTO";
import { isArrayOf } from "../../../types/Array";

/**
 * The client object used in the REST API communication
 */
export interface ClientListDTO {
    readonly payload: readonly ClientDTO[];
}

export function createClientListDTO (items: ClientDTO[]): ClientListDTO {
    return {
        payload: map(items, (item: ClientDTO): ClientDTO => item)
    };
}

export function isClientListDTO (value: any): value is ClientListDTO {
    return (
        !!value
        && isArrayOf<ClientDTO>(value?.payload, isClientDTO)
    );
}

export function stringifyClientListDTO (value: ClientListDTO): string {
    if ( !isClientListDTO(value) ) throw new TypeError(`Not ClientListDTO: ${value}`);
    return `ClientListDTO(${value})`;
}

export function parseClientListDTO (value: any): ClientListDTO | undefined {
    if ( isClientListDTO(value) ) return value;
    return undefined;
}

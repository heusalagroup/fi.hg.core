// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArrayOf, map } from "../../../modules/lodash";
import { InvoiceDTO, isInvoiceDTO } from "./InvoiceDTO";

/**
 * The client object used in the REST API communication
 */
export interface InvoiceListDTO {
    readonly payload: readonly InvoiceDTO[];
}

export function createInvoiceListDTO (
    items: InvoiceDTO[]
): InvoiceListDTO {
    return {
        payload: map(items, (item: InvoiceDTO): InvoiceDTO => item)
    } as InvoiceListDTO;
}

export function isInvoiceListDTO (value: any): value is InvoiceListDTO {
    return (
        !!value
        && isArrayOf<InvoiceDTO>(value?.payload, isInvoiceDTO)
    );
}

export function stringifyInvoiceListDTO (value: InvoiceListDTO): string {
    if ( !isInvoiceListDTO(value) ) throw new TypeError(`Not InvoiceListDTO: ${value}`);
    return `InvoiceListDTO(${value})`;
}

export function parseInvoiceListDTO (value: any): InvoiceListDTO | undefined {
    if ( isInvoiceListDTO(value) ) return value;
    return undefined;
}

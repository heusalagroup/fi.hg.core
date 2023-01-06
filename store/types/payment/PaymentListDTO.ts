// Copyright (c) 2020-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "../../../functions/map";
import { PaymentDTO, isPaymentDTO } from "./PaymentDTO";
import { isArrayOf } from "../../../types/Array";

/**
 * The client object used in the REST API communication
 */
export interface PaymentListDTO {
    readonly payload: readonly PaymentDTO[];
}

export function createPaymentListDTO (items: PaymentDTO[]): PaymentListDTO {
    return {
        payload: map(items, (item: PaymentDTO): PaymentDTO => item)
    } as PaymentListDTO;
}

export function isPaymentListDTO (value: any): value is PaymentListDTO {
    return (
        !!value
        && isArrayOf<PaymentDTO>(value?.payload, isPaymentDTO)
    );
}

export function stringifyPaymentListDTO (value: PaymentListDTO): string {
    if ( !isPaymentListDTO(value) ) throw new TypeError(`Not PaymentListDTO: ${value}`);
    return `PaymentListDTO(${value})`;
}

export function parsePaymentListDTO (value: any): PaymentListDTO | undefined {
    if ( isPaymentListDTO(value) ) return value;
    return undefined;
}

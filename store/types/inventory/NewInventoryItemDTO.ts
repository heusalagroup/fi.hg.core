// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isBoolean,
    isNumber,
    isRegularObject,
    isString
} from "../../../modules/lodash";
import { isProductType, ProductType } from "../product/ProductType";
import { isProductPriceType, ProductPriceType } from "../product/ProductPriceType";
import { isInventoryState, InventoryState } from "./InventoryState";
import { isReadonlyJsonObject, ReadonlyJsonObject } from "../../../Json";

export interface NewInventoryItemDTO {
    readonly clientId            : string;
    readonly date               ?: string;
    readonly endDate            ?: string;
    readonly state              ?: InventoryState;
    readonly title              ?: string;
    readonly summary            ?: string;
    readonly productId          ?: string;
    readonly productType        ?: ProductType;
    readonly priceSum           ?: number;
    readonly priceVatPercent    ?: number;
    readonly priceType          ?: ProductPriceType;
    readonly internalNote       ?: string;
    readonly onHold             ?: boolean;
    readonly isTerminated       ?: boolean;
    readonly data               ?: ReadonlyJsonObject;
}

export function createNewInventoryItemDTO (
    clientId         : string,
    date             : string | undefined,
    endDate          : string | undefined,
    title            : string | undefined,
    state            : InventoryState | undefined,
    summary          : string | undefined,
    productId        : string | undefined,
    productType      : ProductType | undefined,
    priceSum         : number | undefined,
    priceVatPercent  : number | undefined,
    priceType        : ProductPriceType | undefined,
    internalNote     : string | undefined,
    onHold           : boolean | undefined,
    isTerminated     : boolean | undefined,
    data             : ReadonlyJsonObject = {}
): NewInventoryItemDTO {
    return {
        clientId,
        date,
        endDate,
        state,
        title,
        summary,
        productId,
        productType,
        priceSum,
        priceVatPercent,
        priceType,
        internalNote,
        onHold,
        isTerminated,
        data
    };
}

export function isNewInventoryItemDTO (value: any): value is NewInventoryItemDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'clientId',
            'date',
            'endDate',
            'state',
            'title',
            'summary',
            'productId',
            'productType',
            'priceSum',
            'priceVatPercent',
            'priceType',
            'internalNote',
            'isTerminated',
            'onHold',
            'data'
        ])
        && isString(value?.clientId)
        && isString(value?.date)
        && isString(value?.endDate)
        && isInventoryState(value?.state)
        && isString(value?.title)
        && isString(value?.summary)
        && isString(value?.productId)
        && isProductType(value?.productType)
        && isNumber(value?.priceSum)
        && isNumber(value?.priceVatPercent)
        && isProductPriceType(value?.priceType)
        && isString(value?.internalNote)
        && isBoolean(value?.isTerminated)
        && isBoolean(value?.onHold)
        && isReadonlyJsonObject(value?.data)
    );
}

export function stringifyNewInventoryItemDTO (value: NewInventoryItemDTO): string {
    return `NewInventoryItemDTO(${value})`;
}

export function parseNewInventoryItemDTO (value: any): NewInventoryItemDTO | undefined {
    if ( isNewInventoryItemDTO(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isProductTypeOrUndefined, ProductType } from "../product/ProductType";
import { isProductPriceTypeOrUndefined, ProductPriceType } from "../product/ProductPriceType";
import { InventoryState, isInventoryStateOrUndefined } from "./InventoryState";
import { isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../../Json";
import { isString, isStringOrUndefined } from "../../../types/String";
import { isNumberOrUndefined } from "../../../types/Number";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

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
        && hasNoOtherKeysInDevelopment(value, [
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
        && isStringOrUndefined(value?.date)
        && isStringOrUndefined(value?.endDate)
        && isInventoryStateOrUndefined(value?.state)
        && isStringOrUndefined(value?.title)
        && isStringOrUndefined(value?.summary)
        && isStringOrUndefined(value?.productId)
        && isProductTypeOrUndefined(value?.productType)
        && isNumberOrUndefined(value?.priceSum)
        && isNumberOrUndefined(value?.priceVatPercent)
        && isProductPriceTypeOrUndefined(value?.priceType)
        && isStringOrUndefined(value?.internalNote)
        && isBooleanOrUndefined(value?.isTerminated)
        && isBooleanOrUndefined(value?.onHold)
        && isReadonlyJsonObjectOrUndefined(value?.data)
    );
}

export function stringifyNewInventoryItemDTO (value: NewInventoryItemDTO): string {
    return `NewInventoryItemDTO(${value})`;
}

export function parseNewInventoryItemDTO (value: any): NewInventoryItemDTO | undefined {
    if ( isNewInventoryItemDTO(value) ) return value;
    return undefined;
}

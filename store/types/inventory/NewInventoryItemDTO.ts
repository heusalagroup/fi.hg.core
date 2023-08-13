// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../../types/Boolean";
import { explain, explainNot, explainOk, explainOr, explainProperty } from "../../../types/explain";
import { isUndefined } from "../../../types/undefined";
import { explainProductTypeOrUndefined, isProductTypeOrUndefined, ProductType } from "../product/ProductType";
import { explainProductPriceTypeOrUndefined, isProductPriceTypeOrUndefined, ProductPriceType } from "../product/ProductPriceType";
import { explainInventoryStateOrUndefined, InventoryState, isInventoryStateOrUndefined } from "./InventoryState";
import { explainReadonlyJsonObjectOrUndefined, isReadonlyJsonObjectOrUndefined, ReadonlyJsonObject } from "../../../Json";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../types/String";
import { explainNumberOrUndefined, isNumberOrUndefined } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

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

export function explainNewInventoryItemDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
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
            , explainProperty("clientId", explainString(value?.clientId))
            , explainProperty("date", explainStringOrUndefined(value?.date))
            , explainProperty("endDate", explainStringOrUndefined(value?.endDate))
            , explainProperty("state", explainInventoryStateOrUndefined(value?.state))
            , explainProperty("title", explainStringOrUndefined(value?.title))
            , explainProperty("summary", explainStringOrUndefined(value?.summary))
            , explainProperty("productId", explainStringOrUndefined(value?.productId))
            , explainProperty("productType", explainProductTypeOrUndefined(value?.productType))
            , explainProperty("priceSum", explainNumberOrUndefined(value?.priceSum))
            , explainProperty("priceVatPercent", explainNumberOrUndefined(value?.priceVatPercent))
            , explainProperty("priceType", explainProductPriceTypeOrUndefined(value?.priceType))
            , explainProperty("internalNote", explainStringOrUndefined(value?.internalNote))
            , explainProperty("isTerminated", explainBooleanOrUndefined(value?.isTerminated))
            , explainProperty("onHold", explainBooleanOrUndefined(value?.onHold))
            , explainProperty("data", explainReadonlyJsonObjectOrUndefined(value?.data))
        ]
    );
}

export function isNewInventoryItemDTOOrUndefined (value: unknown): value is NewInventoryItemDTO | undefined {
    return isUndefined(value) || isNewInventoryItemDTO(value);
}

export function explainNewInventoryItemDTOOrUndefined (value: unknown): string {
    return isNewInventoryItemDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['NewInventoryItemDTO', 'undefined']));
}

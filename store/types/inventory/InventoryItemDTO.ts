// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isBoolean } from "../../../types/Boolean";
import { explainProductType, isProductType, ProductType } from "../product/ProductType";
import { explainProductPriceType, isProductPriceType, ProductPriceType } from "../product/ProductPriceType";
import { isInventoryState, InventoryState, explainInventoryState } from "./InventoryState";
import { explainInventoryData, InventoryData, isInventoryData } from "./data/InventoryData";
import { ReadonlyJsonObject } from "../../../Json";
import { explain, explainProperty } from "../../../types/explain";
import { explainBoolean } from "../../../types/Boolean";
import { explainString, isString } from "../../../types/String";
import { explainNumber, isNumber } from "../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";

export interface InventoryItemDTO extends ReadonlyJsonObject {
    readonly inventoryItemId    : string;
    readonly clientId           : string;
    readonly updated            : string;
    readonly created            : string;
    readonly date               : string;
    readonly endDate            : string;
    readonly state              : InventoryState;
    readonly title              : string;
    readonly summary            : string;
    readonly productId          : string;
    readonly productType        : ProductType;
    readonly priceSum           : number;
    readonly priceVatPercent    : number;
    readonly priceType          : ProductPriceType;
    readonly internalNote       : string;
    readonly onHold             : boolean;
    readonly isTerminated       : boolean;
    readonly data               : InventoryData;
}

export function createInventoryItemDTO (
    inventoryItemId  : string,
    clientId         : string,
    updated          : string,
    created          : string,
    date             : string,
    endDate          : string,
    state            : InventoryState | undefined,
    title            : string,
    summary          : string,
    productId        : string,
    productType      : ProductType,
    priceSum         : number,
    priceVatPercent  : number,
    priceType        : ProductPriceType,
    internalNote     : string,
    onHold           : boolean,
    isTerminated     : boolean,
    data             : InventoryData = {}
): InventoryItemDTO {
    return {
        inventoryItemId,
        clientId,
        updated,
        created,
        date,
        endDate,
        state: state ?? InventoryState.UNINITIALIZED,
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

export function isInventoryItemDTO (value: any): value is InventoryItemDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'inventoryItemId',
            'clientId',
            'updated',
            'created',
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
        && isString(value?.inventoryItemId)
        && isString(value?.clientId)
        && isString(value?.updated)
        && isString(value?.created)
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
        && isInventoryData(value?.data)
    );
}

export function explainInventoryItemDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'inventoryItemId',
                'clientId',
                'updated',
                'created',
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
            ]),
            explainProperty("inventoryItemId", explainString(value?.inventoryItemId)),
            explainProperty("clientId", explainString(value?.clientId)),
            explainProperty("updated", explainString(value?.updated)),
            explainProperty("created", explainString(value?.created)),
            explainProperty("date", explainString(value?.date)),
            explainProperty("endDate", explainString(value?.endDate)),
            explainProperty("state", explainInventoryState(value?.state)),
            explainProperty("title", explainString(value?.title)),
            explainProperty("summary", explainString(value?.summary)),
            explainProperty("productId", explainString(value?.productId)),
            explainProperty("productType", explainProductType(value?.productType)),
            explainProperty("priceSum", explainNumber(value?.priceSum)),
            explainProperty("priceVatPercent", explainNumber(value?.priceVatPercent)),
            explainProperty("priceType", explainProductPriceType(value?.priceType)),
            explainProperty("internalNote", explainString(value?.internalNote)),
            explainProperty("isTerminated", explainBoolean(value?.isTerminated)),
            explainProperty("onHold", explainBoolean(value?.onHold)),
            explainProperty("data", explainInventoryData(value?.data))
        ]
    );
}

export function stringifyInventoryItemDTO (value: InventoryItemDTO): string {
    return `InventoryItemDTO(${value})`;
}

export function parseInventoryItemDTO (value: any): InventoryItemDTO | undefined {
    if ( isInventoryItemDTO(value) ) return value;
    return undefined;
}

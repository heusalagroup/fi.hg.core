// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isProductId, ProductId } from "./ProductId";
import { isArray } from "../../../types/Array";
import { explainNot, explainOk } from "../../../types/explain";
import { isNumber } from "../../../types/Number";

export type ProductIdWithAmount = readonly [number, ProductId];

export function isProductIdWithAmount (value: any) : value is ProductIdWithAmount {
    return (
        isArray(value)
        && value?.length === 2
        && isNumber(value[0])
        && isProductId(value[1])
    );
}

export function explainProductIdWithAmount (value: any) : string {
    return isProductIdWithAmount(value) ? explainOk() : explainNot('ProductIdWithAmount [number, ProductId]');
}

export function isProductIdOrProductIdWithAmount ( value : any ) : value is ProductId | ProductIdWithAmount {
    return isProductId(value) || isProductIdWithAmount(value);
}

export function explainProductIdOrProductIdWithAmount (value: any) : string {
    return isProductIdWithAmount(value) ? explainOk() : explainNot('ProductIdWithAmount {[number, ProductId]} or ProductId {string}');
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainProductIdListWithAmount, isProductIdListWithAmount, ProductIdListWithAmount } from "./ProductIdList";
import { explain, explainProperty } from "../../../types/explain";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../types/String";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../../types/Number";
import { explainNumberOrStringOrBooleanOrUndefined, isNumberOrStringOrBooleanOrUndefined } from "../../../types/NumberOrStringOrBooleanOrUndefined";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";

export interface CompositeProductOption {

    readonly value         : number | string | boolean;
    readonly minAmount     : number;
    readonly maxAmount    ?: number;

    /**
     * If defined, make this option part of a group.
     *
     * E.g. only one in a group can be selected at one time.
     */
    readonly groupBy ?: string;

    /**
     * These products will be selected if user selects this option
     */
    readonly products : ProductIdListWithAmount;

}

export function createCompositeProductOption (
    value          : number | string | boolean,
    products       : ProductIdListWithAmount,
    groupBy       ?: string,
    minAmount     ?: number,
    maxAmount     ?: number
) : CompositeProductOption {
    return {
        value,
        groupBy,
        products: products ?? [],
        minAmount: minAmount ?? 0,
        maxAmount
    };
}

export function isCompositeProductOption (value: any) : value is CompositeProductOption {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'value',
            'products',
            'groupBy',
            'minAmount',
            'maxAmount'
        ])
        && isNumberOrStringOrBooleanOrUndefined(value?.value)
        && isStringOrUndefined(value?.groupBy)
        && isProductIdListWithAmount(value?.products)
        && isNumber(value?.minAmount)
        && isNumberOrUndefined(value?.maxAmount)
    );
}

export function explainCompositeProductOption (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'value',
                'products',
                'groupBy',
                'minAmount',
                'maxAmount'
            ])
            , explainProperty("value", explainNumberOrStringOrBooleanOrUndefined(value?.value))
            , explainProperty("products", explainProductIdListWithAmount(value?.products))
            , explainProperty("groupBy", explainStringOrUndefined(value?.groupBy))
            , explainProperty("minAmount", explainNumber(value?.minAmount))
            , explainProperty("maxAmount", explainNumberOrUndefined(value?.maxAmount))
        ]
    );
}

export function stringifyCompositeProductOption (value : CompositeProductOption) : string {
    return `CompositeProductOption(${value})`;
}

export function parseCompositeProductOption (value: any) : CompositeProductOption | undefined {
    if (isCompositeProductOption(value)) return value;
    return undefined;
}

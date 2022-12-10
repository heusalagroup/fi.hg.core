// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNoOtherKeys, explainRegularObject, hasNoOtherKeys, isRegularObject } from "../../../modules/lodash";

export interface CompositeProductOption {

    readonly value         : number | string;
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
    readonly products : readonly string[];

}

export function createCompositeProductOption (
    value          : number | string,
    products       : readonly string[],
    groupBy ?: string,
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
            ''
        ])
        //&& isString(value?.foo)
    );
}

export function explainCompositeProductOption (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                ''
            ])
            //, explainProperty("foo", explainString(value?.foo))
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

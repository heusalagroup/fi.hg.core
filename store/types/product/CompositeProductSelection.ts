// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainArrayOfOrUndefined,
    explainNoOtherKeys, explainNumberOrUndefined,
    explainProperty,
    explainRegularObject, explainString,
    explainStringOrUndefined,
    hasNoOtherKeys,
    isArrayOfOrUndefined, isNumberOrUndefined,
    isRegularObject, isString,
    isStringOrUndefined
} from "../../../modules/lodash";
import { CompositeProductOption, explainCompositeProductOption, isCompositeProductOption } from "./CompositeProductOption";
import { ProductFeatureId } from "./features/ProductFeatureId";

export interface CompositeProductSelection {
    readonly title          : string;
    readonly options        : readonly CompositeProductOption[];
    readonly description   ?: string;
    readonly defaultValue  ?: number;
    readonly minValue      ?: number;
    readonly maxValue      ?: number;
}

export function createCompositeProductSelection (
    title          : string,
    description   ?: string,
    featureId     ?: ProductFeatureId,
    options       ?: readonly CompositeProductOption[],
    defaultValue  ?: number,
    minValue      ?: number,
    maxValue      ?: number
) : CompositeProductSelection {
    return {
        title,
        description,
        options: options ?? [],
        defaultValue,
        minValue,
        maxValue
    };
}

export function isCompositeProductSelection (value: any) : value is CompositeProductSelection {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'title',
            'description',
            'options',
            'defaultValue',
            'minValue',
            'maxValue'
        ])
        && isString(value?.title)
        && isStringOrUndefined(value?.description)
        && isArrayOfOrUndefined<CompositeProductOption>(value?.options, isCompositeProductOption)
        && isNumberOrUndefined(value?.defaultValue)
        && isNumberOrUndefined(value?.minValue)
        && isNumberOrUndefined(value?.maxValue)
    );
}

export function explainCompositeProductSelection (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'title',
                'description',
                'options',
                'defaultValue',
                'minValue',
                'maxValue'
            ])
            , explainProperty("title", explainString(value?.title))
            , explainProperty("description", explainStringOrUndefined(value?.description))
            , explainProperty(
                "options",
                explainArrayOfOrUndefined<CompositeProductOption>(
                    'CompositeProductOption',
                    explainCompositeProductOption,
                    value?.options,
                    isCompositeProductOption
                )
        )
            , explainProperty("defaultValue", explainNumberOrUndefined(value?.defaultValue))
            , explainProperty("minValue", explainNumberOrUndefined(value?.minValue))
            , explainProperty("maxValue", explainNumberOrUndefined(value?.maxValue))
        ]
    );
}

export function stringifyCompositeProductSelection (value : CompositeProductSelection) : string {
    return `ProductCompositeOption(${value})`;
}

export function parseCompositeProductSelection (value: any) : CompositeProductSelection | undefined {
    if (isCompositeProductSelection(value)) return value;
    return undefined;
}

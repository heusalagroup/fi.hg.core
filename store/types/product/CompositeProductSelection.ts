// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CompositeProductOption, explainCompositeProductOption, isCompositeProductOption } from "./CompositeProductOption";
import { explainProductFeatureId, isProductFeatureId, ProductFeatureId } from "./features/ProductFeatureId";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../types/String";
import { explainNumberOrUndefined, isNumberOrUndefined } from "../../../types/Number";
import { explainNumberOrStringOrBooleanOrUndefined, isNumberOrStringOrBooleanOrUndefined } from "../../../types/NumberOrStringOrBooleanOrUndefined";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../types/OtherKeys";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../../types/Array";

export interface CompositeProductSelection {
    readonly featureId      : ProductFeatureId;
    readonly title          : string;
    readonly options        : readonly CompositeProductOption[];
    readonly description   ?: string;
    readonly defaultValue  ?: number | string | boolean;
    readonly minValue      ?: number;
    readonly maxValue      ?: number;
}

export function createCompositeProductSelection (
    featureId      : ProductFeatureId,
    title          : string,
    description   ?: string,
    options       ?: readonly CompositeProductOption[],
    defaultValue  ?: number | string | boolean,
    minValue      ?: number,
    maxValue      ?: number
) : CompositeProductSelection {
    return {
        featureId,
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
            'featureId',
            'title',
            'description',
            'options',
            'defaultValue',
            'minValue',
            'maxValue'
        ])
        && isProductFeatureId(value?.featureId)
        && isString(value?.title)
        && isStringOrUndefined(value?.description)
        && isArrayOfOrUndefined<CompositeProductOption>(value?.options, isCompositeProductOption)
        && isNumberOrStringOrBooleanOrUndefined(value?.defaultValue)
        && isNumberOrUndefined(value?.minValue)
        && isNumberOrUndefined(value?.maxValue)
    );
}

export function explainCompositeProductSelection (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'featureId',
                'title',
                'description',
                'options',
                'defaultValue',
                'minValue',
                'maxValue'
            ])
            , explainProperty("featureId", explainProductFeatureId(value?.featureId))
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
            , explainProperty("defaultValue", explainNumberOrStringOrBooleanOrUndefined(value?.defaultValue))
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

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainNumber, isNumber } from "../../types/Number";
import { explainString, isString } from "../../types/String";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { isUndefined } from "../../types/undefined";

export interface ZendeskCustomField {
    readonly id: number;
    readonly value: string;
}

export function createZendeskCustomField (
    id: number,
    value: string
) : ZendeskCustomField {
    return {
        id,
        value
    };
}

export function isZendeskCustomField (value: unknown) : value is ZendeskCustomField {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'id',
            'value'
        ])
        && isNumber(value?.id)
        && isString(value?.value)
    );
}

export function explainZendeskCustomField (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'id',
                'value'
            ])
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("value", explainString(value?.value))
        ]
    );
}

export function stringifyZendeskCustomField (value : ZendeskCustomField) : string {
    return `ZendeskCustomField(${value})`;
}

export function parseZendeskCustomField (value: unknown) : ZendeskCustomField | undefined {
    if (isZendeskCustomField(value)) return value;
    return undefined;
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskCustomFieldOrUndefined (value: unknown): value is ZendeskCustomField | undefined {
    return isZendeskCustomField(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskCustomFieldOrUndefined (value: any): string {
    return isZendeskCustomFieldOrUndefined(value) ? explainOk() : explainNot('ZendeskCustomField or undefined');
}

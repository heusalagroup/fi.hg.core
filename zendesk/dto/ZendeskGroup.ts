// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainString, explainStringOrNullOrUndefined, isString, isStringOrNullOrUndefined } from "../../types/String";
import { explainBooleanOrNullOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainNumber, isNumber } from "../../types/Number";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskGroup {
    readonly created_at ?: string | null | undefined;
    readonly default ?: boolean | null | undefined;
    readonly deleted ?: boolean | null | undefined;
    readonly description ?: string | null | undefined;
    readonly id  : number;
    readonly is_public ?: boolean | null | undefined;
    readonly name  : string;
    readonly updated_at ?: string | null | undefined;
    readonly url ?: string | null | undefined;
}

export function isZendeskGroup (value: unknown) : value is ZendeskGroup {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'created_at',
            'default',
            'deleted',
            'description',
            'id',
            'is_public',
            'name',
            'updated_at',
            'url'
        ])
        && isStringOrNullOrUndefined(value?.created_at)
        && isBooleanOrNullOrUndefined(value?.default)
        && isBooleanOrNullOrUndefined(value?.deleted)
        && isStringOrNullOrUndefined(value?.description)
        && isNumber(value?.id)
        && isBooleanOrNullOrUndefined(value?.is_public)
        && isString(value?.name)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
    );
}

export function explainZendeskGroup (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'created_at',
                'default',
                'deleted',
                'description',
                'id',
                'is_public',
                'name',
                'updated_at',
                'url'
            ])
            , explainProperty("created_at", explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("default", explainBooleanOrNullOrUndefined(value?.default))
            , explainProperty("deleted", explainBooleanOrNullOrUndefined(value?.deleted))
            , explainProperty("description", explainStringOrNullOrUndefined(value?.description))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("is_public", explainBooleanOrNullOrUndefined(value?.is_public))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("updated_at", explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
        ]
    );
}

export function stringifyZendeskGroup (value : ZendeskGroup) : string {
    return `ZendeskGroup(${value})`;
}

export function parseZendeskGroup (value: unknown) : ZendeskGroup | undefined {
    if (isZendeskGroup(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupOrUndefined (value: unknown): value is ZendeskGroup | undefined {
    return isZendeskGroup(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupOrUndefined (value: any): string {
    return isZendeskGroupOrUndefined(value) ? explainOk() : explainNot('ZendeskGroup or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupOrNullOrUndefined (value: unknown): value is ZendeskGroup | undefined | null {
    return isZendeskGroup(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupOrNullOrUndefined (value: any): string {
    return isZendeskGroupOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskGroup or undefined or null');
}

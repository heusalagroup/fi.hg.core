// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainBooleanOrNullOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainNumber, isNumber } from "../../types/Number";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskGroupMembership {
    readonly created_at ?: string | null | undefined;
    readonly default ?: boolean | null | undefined;
    readonly group_id  : number;
    readonly id  : number;
    readonly updated_at ?: string | null | undefined;
    readonly url ?: string | null | undefined;
    readonly user_id  : number;
}

export function isZendeskGroupMembership (value: unknown) : value is ZendeskGroupMembership {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'created_at',
            'default',
            'group_id',
            'id',
            'updated_at',
            'url',
            'user_id'
        ])
        && isStringOrNullOrUndefined(value?.created_at)
        && isBooleanOrNullOrUndefined(value?.default)
        && isNumber(value?.group_id)
        && isNumber(value?.id)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
        && isNumber(value?.user_id)
    );
}

export function explainZendeskGroupMembership (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'created_at',
                'default',
                'group_id',
                'id',
                'updated_at',
                'url',
                'user_id'
            ])
            , explainProperty("created_at", explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("default", explainBooleanOrNullOrUndefined(value?.default))
            , explainProperty("group_id", explainNumber(value?.group_id))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("updated_at", explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
            , explainProperty("user_id", explainNumber(value?.user_id))
        ]
    );
}

export function stringifyZendeskGroupMembership (value : ZendeskGroupMembership) : string {
    return `ZendeskGroupMembership(${value})`;
}

export function parseZendeskGroupMembership (value: unknown) : ZendeskGroupMembership | undefined {
    if (isZendeskGroupMembership(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupMembershipOrUndefined (value: unknown): value is ZendeskGroupMembership | undefined {
    return isZendeskGroupMembership(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupMembershipOrUndefined (value: any): string {
    return isZendeskGroupMembershipOrUndefined(value) ? explainOk() : explainNot('ZendeskGroupMembership or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskGroupMembershipOrNullOrUndefined (value: unknown): value is ZendeskGroupMembership | undefined | null {
    return isZendeskGroupMembership(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskGroupMembershipOrNullOrUndefined (value: any): string {
    return isZendeskGroupMembershipOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskGroupMembership or undefined or null');
}

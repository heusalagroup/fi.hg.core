// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainBooleanOrNullOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainNumber, isNumber } from "../../types/Number";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskOrganizationMembership {
    readonly created_at ?: string | null | undefined;
    readonly default  : boolean | null | undefined;
    readonly id  : number;
    readonly organization_id  : number;
    readonly organization_name ?: string | null | undefined;
    readonly updated_at ?: string | null | undefined;
    readonly url ?: string | null | undefined;
    readonly user_id  : number;
    readonly view_tickets ?: boolean | null | undefined;
}

export function isZendeskOrganizationMembership (value: unknown) : value is ZendeskOrganizationMembership {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'created_at',
            'default',
            'id',
            'organization_id',
            'organization_name',
            'updated_at',
            'url',
            'user_id',
            'view_tickets'
        ])
        && isStringOrNullOrUndefined(value?.created_at)
        && isBooleanOrNullOrUndefined(value?.default)
        && isNumber(value?.id)
        && isNumber(value?.organization_id)
        && isStringOrNullOrUndefined(value?.organization_name)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
        && isNumber(value?.user_id)
        && isBooleanOrNullOrUndefined(value?.view_tickets)
    );
}

export function explainZendeskOrganizationMembership (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'created_at',
                'default',
                'id',
                'organization_id',
                'organization_name',
                'updated_at',
                'url',
                'user_id',
                'view_tickets'
            ])
            , explainProperty("created_at", explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("default", explainBooleanOrNullOrUndefined(value?.default))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("organization_id", explainNumber(value?.organization_id))
            , explainProperty("organization_name", explainStringOrNullOrUndefined(value?.organization_name))
            , explainProperty("updated_at", explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
            , explainProperty("user_id", explainNumber(value?.user_id))
            , explainProperty("view_tickets", explainBooleanOrNullOrUndefined(value?.view_tickets))
        ]
    );
}

export function stringifyZendeskOrganizationMembership (value : ZendeskOrganizationMembership) : string {
    return `ZendeskOrganizationMembership(${value})`;
}

export function parseZendeskOrganizationMembership (value: unknown) : ZendeskOrganizationMembership | undefined {
    if (isZendeskOrganizationMembership(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationMembershipOrUndefined (value: unknown): value is ZendeskOrganizationMembership | undefined {
    return isZendeskOrganizationMembership(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationMembershipOrUndefined (value: any): string {
    return isZendeskOrganizationMembershipOrUndefined(value) ? explainOk() : explainNot('ZendeskOrganizationMembership or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationMembershipOrNullOrUndefined (value: unknown): value is ZendeskOrganizationMembership | undefined | null {
    return isZendeskOrganizationMembership(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationMembershipOrNullOrUndefined (value: any): string {
    return isZendeskOrganizationMembershipOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskOrganizationMembership or undefined or null');
}

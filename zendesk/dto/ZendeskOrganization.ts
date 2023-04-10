// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isUndefined } from "../../types/undefined";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { isNull } from "../../types/Null";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainReadonlyJsonObjectOrNullOrUndefined, isReadonlyJsonObjectOrNullOrUndefined, ReadonlyJsonObject } from "../../Json";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainStringArray, isStringArray } from "../../types/StringArray";
import { explainBooleanOrNullOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainNumber, explainNumberOrNullOrUndefined, isNumber, isNumberOrNullOrUndefined } from "../../types/Number";

export interface ZendeskOrganization {
    readonly created_at ?: string | null | undefined;
    readonly details ?: string | null | undefined;
    readonly domain_names ?: readonly string[];
    readonly external_id ?: string | null | undefined;
    readonly group_id ?: number | null | undefined;
    readonly id  : number;
    readonly name ?: string | null | undefined;
    readonly notes ?: string | null | undefined;
    readonly organization_fields ?: ReadonlyJsonObject | null | undefined;
    readonly shared_comments ?: boolean | null | undefined;
    readonly shared_tickets ?: boolean | null | undefined;
    readonly tags ?: readonly string[];
    readonly updated_at ?: string | null | undefined;
    readonly url ?: string | null | undefined;
}

export function isZendeskOrganization (value: unknown) : value is ZendeskOrganization {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'created_at',
            'details',
            'domain_names',
            'external_id',
            'group_id',
            'id',
            'name',
            'notes',
            'organization_fields',
            'shared_comments',
            'shared_tickets',
            'tags',
            'updated_at',
            'url'
        ])
        && isStringOrNullOrUndefined(value?.created_at)
        && isStringOrNullOrUndefined(value?.details)
        && isStringArray(value?.domain_names)
        && isStringOrNullOrUndefined(value?.external_id)
        && isNumberOrNullOrUndefined(value?.group_id)
        && isNumber(value?.id)
        && isStringOrNullOrUndefined(value?.name)
        && isStringOrNullOrUndefined(value?.notes)
        && isReadonlyJsonObjectOrNullOrUndefined(value?.organization_fields)
        && isBooleanOrNullOrUndefined(value?.shared_comments)
        && isBooleanOrNullOrUndefined(value?.shared_tickets)
        && isStringArray(value?.tags)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
    );
}

export function explainZendeskOrganization (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'created_at',
                'details',
                'domain_names',
                'external_id',
                'group_id',
                'id',
                'name',
                'notes',
                'organization_fields',
                'shared_comments',
                'shared_tickets',
                'tags',
                'updated_at',
                'url'
            ])
            , explainProperty("created_at", explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("details", explainStringOrNullOrUndefined(value?.details))
            , explainProperty("domain_names", explainStringArray(value?.domain_names))
            , explainProperty("external_id", explainStringOrNullOrUndefined(value?.external_id))
            , explainProperty("group_id", explainNumberOrNullOrUndefined(value?.group_id))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("name", explainStringOrNullOrUndefined(value?.name))
            , explainProperty("notes", explainStringOrNullOrUndefined(value?.notes))
            , explainProperty("organization_fields", explainReadonlyJsonObjectOrNullOrUndefined(value?.organization_fields))
            , explainProperty("shared_comments", explainBooleanOrNullOrUndefined(value?.shared_comments))
            , explainProperty("shared_tickets", explainBooleanOrNullOrUndefined(value?.shared_tickets))
            , explainProperty("tags", explainStringArray(value?.tags))
            , explainProperty("updated_at", explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
        ]
    );
}

export function stringifyZendeskOrganization (value : ZendeskOrganization) : string {
    return `ZendeskOrganization(${value})`;
}

export function parseZendeskOrganization (value: unknown) : ZendeskOrganization | undefined {
    if (isZendeskOrganization(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationOrUndefined (value: unknown): value is ZendeskOrganization | undefined {
    return isZendeskOrganization(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationOrUndefined (value: any): string {
    return isZendeskOrganizationOrUndefined(value) ? explainOk() : explainNot('ZendeskOrganization or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskOrganizationOrNullOrUndefined (value: unknown): value is ZendeskOrganization | undefined | null {
    return isZendeskOrganization(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskOrganizationOrNullOrUndefined (value: any): string {
    return isZendeskOrganizationOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskOrganization or undefined or null');
}

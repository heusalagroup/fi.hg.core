// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainZendeskAttachmentOrNullOrUndefined, isZendeskAttachmentOrNullOrUndefined, ZendeskAttachment } from "./ZendeskAttachment";
import { explainReadonlyJsonObjectOrNullOrUndefined, isReadonlyJsonObjectOrNullOrUndefined, ReadonlyJsonObject } from "../../Json";
import { explainBooleanOrNullOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainString, explainStringOrNullOrUndefined, isString, isStringOrNullOrUndefined } from "../../types/String";
import { explainNumber, explainNumberOrNullOrUndefined, isNumber, isNumberOrNullOrUndefined } from "../../types/Number";
import { explainStringArrayOrUndefined, isStringArrayOrUndefined } from "../../types/StringArray";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskUser {
    readonly active ?: boolean | null | undefined;
    readonly alias ?: string | null | undefined;
    readonly chat_only ?: boolean | null | undefined;
    readonly created_at ?: string | null | undefined;
    readonly custom_role_id ?: number | null | undefined;
    readonly default_group_id ?: number | null | undefined;
    readonly details ?: string | null | undefined;
    readonly email ?: string | null | undefined;
    readonly external_id ?: string | null | undefined;
    readonly iana_time_zone ?: string | null | undefined;
    readonly id  : number;
    readonly last_login_at ?: string | null | undefined;
    readonly locale ?: string | null | undefined;
    readonly locale_id ?: number | null | undefined;
    readonly moderator ?: boolean | null | undefined;
    readonly name  : string;
    readonly notes ?: string | null | undefined;
    readonly only_private_comments ?: boolean | null | undefined;
    readonly organization_id ?: number | null | undefined;
    readonly phone ?: string | null | undefined;
    readonly photo ?: ZendeskAttachment | null | undefined;
    readonly remote_photo_url ?: string | null | undefined;
    readonly report_csv ?: boolean | null | undefined;
    readonly restricted_agent ?: boolean | null | undefined;
    readonly role ?: string | null | undefined;
    readonly role_type ?: number | null | undefined;
    readonly shared ?: boolean | null | undefined;
    readonly shared_agent ?: boolean | null | undefined;
    readonly shared_phone_number ?: boolean | null | undefined;
    readonly signature ?: string | null | undefined;
    readonly suspended ?: boolean | null | undefined;
    readonly tags ?: readonly string[];
    readonly ticket_restriction ?: string | null | undefined;
    readonly time_zone ?: string | null | undefined;
    readonly two_factor_auth_enabled ?: boolean | null | undefined;
    readonly updated_at ?: string | null | undefined;
    readonly url ?: string | null | undefined;
    readonly user_fields ?: ReadonlyJsonObject | null | undefined;
    readonly verified ?: boolean | null | undefined;
}

export function isZendeskUser (value: unknown) : value is ZendeskUser {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'active',
            'alias',
            'chat_only',
            'created_at',
            'custom_role_id',
            'default_group_id',
            'details',
            'email',
            'external_id',
            'iana_time_zone',
            'id',
            'last_login_at',
            'locale',
            'locale_id',
            'moderator',
            'name',
            'notes',
            'only_private_comments',
            'organization_id',
            'phone',
            'photo',
            'remote_photo_url',
            'report_csv',
            'restricted_agent',
            'role',
            'role_type',
            'shared',
            'shared_agent',
            'shared_phone_number',
            'signature',
            'suspended',
            'tags',
            'ticket_restriction',
            'time_zone',
            'two_factor_auth_enabled',
            'updated_at',
            'url',
            'user_fields',
            'verified'
        ])
        && isBooleanOrNullOrUndefined(value?.active)
        && isStringOrNullOrUndefined(value?.alias)
        && isBooleanOrNullOrUndefined(value?.chat_only)
        && isStringOrNullOrUndefined(value?.created_at)
        && isNumberOrNullOrUndefined(value?.custom_role_id)
        && isNumberOrNullOrUndefined(value?.default_group_id)
        && isStringOrNullOrUndefined(value?.details)
        && isStringOrNullOrUndefined(value?.email)
        && isStringOrNullOrUndefined(value?.external_id)
        && isStringOrNullOrUndefined(value?.iana_time_zone)
        && isNumber(value?.id)
        && isStringOrNullOrUndefined(value?.last_login_at)
        && isStringOrNullOrUndefined(value?.locale)
        && isNumberOrNullOrUndefined(value?.locale_id)
        && isBooleanOrNullOrUndefined(value?.moderator)
        && isString(value?.name)
        && isStringOrNullOrUndefined(value?.notes)
        && isBooleanOrNullOrUndefined(value?.only_private_comments)
        && isNumberOrNullOrUndefined(value?.organization_id)
        && isStringOrNullOrUndefined(value?.phone)
        && isZendeskAttachmentOrNullOrUndefined(value?.photo)
        && isStringOrNullOrUndefined(value?.remote_photo_url)
        && isBooleanOrNullOrUndefined(value?.report_csv)
        && isBooleanOrNullOrUndefined(value?.restricted_agent)
        && isStringOrNullOrUndefined(value?.role)
        && isNumberOrNullOrUndefined(value?.role_type)
        && isBooleanOrNullOrUndefined(value?.shared)
        && isBooleanOrNullOrUndefined(value?.shared_agent)
        && isBooleanOrNullOrUndefined(value?.shared_phone_number)
        && isStringOrNullOrUndefined(value?.signature)
        && isBooleanOrNullOrUndefined(value?.suspended)
        && isStringArrayOrUndefined(value?.tags)
        && isStringOrNullOrUndefined(value?.ticket_restriction)
        && isStringOrNullOrUndefined(value?.time_zone)
        && isBooleanOrNullOrUndefined(value?.two_factor_auth_enabled)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
        && isReadonlyJsonObjectOrNullOrUndefined(value?.user_fields)
        && isBooleanOrNullOrUndefined(value?.verified)
    );
}

export function explainZendeskUser (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'active',
                'alias',
                'chat_only',
                'created_at',
                'custom_role_id',
                'default_group_id',
                'details',
                'email',
                'external_id',
                'iana_time_zone',
                'id',
                'last_login_at',
                'locale',
                'locale_id',
                'moderator',
                'name',
                'notes',
                'only_private_comments',
                'organization_id',
                'phone',
                'photo',
                'remote_photo_url',
                'report_csv',
                'restricted_agent',
                'role',
                'role_type',
                'shared',
                'shared_agent',
                'shared_phone_number',
                'signature',
                'suspended',
                'tags',
                'ticket_restriction',
                'time_zone',
                'two_factor_auth_enabled',
                'updated_at',
                'url',
                'user_fields',
                'verified'
            ])
            , explainProperty("active", explainBooleanOrNullOrUndefined(value?.active))
            , explainProperty("alias", explainStringOrNullOrUndefined(value?.alias))
            , explainProperty("chat_only", explainBooleanOrNullOrUndefined(value?.chat_only))
            , explainProperty("created_at", explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("custom_role_id", explainNumberOrNullOrUndefined(value?.custom_role_id))
            , explainProperty("default_group_id", explainNumberOrNullOrUndefined(value?.default_group_id))
            , explainProperty("details", explainStringOrNullOrUndefined(value?.details))
            , explainProperty("email", explainStringOrNullOrUndefined(value?.email))
            , explainProperty("external_id", explainStringOrNullOrUndefined(value?.external_id))
            , explainProperty("iana_time_zone", explainStringOrNullOrUndefined(value?.iana_time_zone))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("last_login_at", explainStringOrNullOrUndefined(value?.last_login_at))
            , explainProperty("locale", explainStringOrNullOrUndefined(value?.locale))
            , explainProperty("locale_id", explainNumberOrNullOrUndefined(value?.locale_id))
            , explainProperty("moderator", explainBooleanOrNullOrUndefined(value?.moderator))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("notes", explainStringOrNullOrUndefined(value?.notes))
            , explainProperty("only_private_comments", explainBooleanOrNullOrUndefined(value?.only_private_comments))
            , explainProperty("organization_id", explainNumberOrNullOrUndefined(value?.organization_id))
            , explainProperty("phone", explainStringOrNullOrUndefined(value?.phone))
            , explainProperty("photo", explainZendeskAttachmentOrNullOrUndefined(value?.photo))
            , explainProperty("remote_photo_url", explainStringOrNullOrUndefined(value?.remote_photo_url))
            , explainProperty("report_csv", explainBooleanOrNullOrUndefined(value?.report_csv))
            , explainProperty("restricted_agent", explainBooleanOrNullOrUndefined(value?.restricted_agent))
            , explainProperty("role", explainStringOrNullOrUndefined(value?.role))
            , explainProperty("role_type", explainNumberOrNullOrUndefined(value?.role_type))
            , explainProperty("shared", explainBooleanOrNullOrUndefined(value?.shared))
            , explainProperty("shared_agent", explainBooleanOrNullOrUndefined(value?.shared_agent))
            , explainProperty("shared_phone_number", explainBooleanOrNullOrUndefined(value?.shared_phone_number))
            , explainProperty("signature", explainStringOrNullOrUndefined(value?.signature))
            , explainProperty("suspended", explainBooleanOrNullOrUndefined(value?.suspended))
            , explainProperty("tags", explainStringArrayOrUndefined(value?.tags))
            , explainProperty("ticket_restriction", explainStringOrNullOrUndefined(value?.ticket_restriction))
            , explainProperty("time_zone", explainStringOrNullOrUndefined(value?.time_zone))
            , explainProperty("two_factor_auth_enabled", explainBooleanOrNullOrUndefined(value?.two_factor_auth_enabled))
            , explainProperty("updated_at", explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
            , explainProperty("user_fields", explainReadonlyJsonObjectOrNullOrUndefined(value?.user_fields))
            , explainProperty("verified", explainBooleanOrNullOrUndefined(value?.verified))
        ]
    );
}

export function stringifyZendeskUser (value : ZendeskUser) : string {
    return `ZendeskUser(${value})`;
}

export function parseZendeskUser (value: unknown) : ZendeskUser | undefined {
    if (isZendeskUser(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskUserOrUndefined (value: unknown): value is ZendeskUser | undefined {
    return isZendeskUser(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskUserOrUndefined (value: any): string {
    return isZendeskUserOrUndefined(value) ? explainOk() : explainNot('ZendeskUser or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskUserOrNullOrUndefined (value: unknown): value is ZendeskUser | undefined | null {
    return isZendeskUser(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskUserOrNullOrUndefined (value: any): string {
    return isZendeskUserOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskUser or undefined or null');
}

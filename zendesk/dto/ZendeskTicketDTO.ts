// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskCustomField, isZendeskCustomField, ZendeskCustomField } from "./ZendeskCustomField";
import { explainZendeskSatisfactionRating, isZendeskSatisfactionRating, ZendeskSatisfactionRating } from "./ZendeskSatisfactionRating";
import { explainZendeskVia, isZendeskVia, ZendeskVia } from "./ZendeskVia";
import { explainNumberArray, isNumberArray } from "../../types/NumberArray";
import { explainNumber, isNumber } from "../../types/Number";
import { explainString, isString } from "../../types/String";
import { explainBoolean, isBoolean } from "../../types/Boolean";
import { explainStringArray, isStringArray } from "../../types/StringArray";
import { explainNull, isNull } from "../../types/Null";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskTicketDTO {
    readonly assignee_id: number;
    readonly collaborator_ids: readonly number[];
    readonly created_at: string;
    readonly custom_fields: readonly ZendeskCustomField[];
    readonly description: string;
    readonly due_at: null;
    readonly external_id: string;
    readonly follower_ids: readonly number[];
    readonly from_messaging_channel: boolean;
    readonly group_id: number;
    readonly has_incidents: boolean;
    readonly id: number;
    readonly organization_id: number;
    readonly priority: string;
    readonly raw_subject: string;
    readonly recipient: string;
    readonly requester_id: number;
    readonly satisfaction_rating: ZendeskSatisfactionRating;
    readonly sharing_agreement_ids: readonly number[];
    readonly status: string;
    readonly subject: string;
    readonly submitter_id: number;
    readonly tags: readonly string[];
    readonly type: string;
    readonly updated_at: string;
    readonly url: string;
    readonly via: ZendeskVia;
}

export function createZendeskTicketDTO (
    assignee_id: number,
    collaborator_ids: readonly number[],
    created_at: string,
    custom_fields: readonly ZendeskCustomField[],
    description: string,
    due_at: null,
    external_id: string,
    follower_ids: readonly number[],
    from_messaging_channel: boolean,
    group_id: number,
    has_incidents: boolean,
    id: number,
    organization_id: number,
    priority: string,
    raw_subject: string,
    recipient: string,
    requester_id: number,
    satisfaction_rating: ZendeskSatisfactionRating,
    sharing_agreement_ids: readonly number[],
    status: string,
    subject: string,
    submitter_id: number,
    tags: readonly string[],
    type: string,
    updated_at: string,
    url: string,
    via: ZendeskVia,
) : ZendeskTicketDTO {
    return {
        assignee_id,
        collaborator_ids,
        created_at,
        custom_fields,
        description,
        due_at,
        external_id,
        follower_ids,
        from_messaging_channel,
        group_id,
        has_incidents,
        id,
        organization_id,
        priority,
        raw_subject,
        recipient,
        requester_id,
        satisfaction_rating,
        sharing_agreement_ids,
        status,
        subject,
        submitter_id,
        tags,
        type,
        updated_at,
        url,
        via
    };
}

export function isZendeskTicketDTO (value: unknown) : value is ZendeskTicketDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'assignee_id',
            'collaborator_ids',
            'created_at',
            'custom_fields',
            'description',
            'due_at',
            'external_id',
            'follower_ids',
            'from_messaging_channel',
            'group_id',
            'has_incidents',
            'id',
            'organization_id',
            'priority',
            'raw_subject',
            'recipient',
            'requester_id',
            'satisfaction_rating',
            'sharing_agreement_ids',
            'status',
            'subject',
            'submitter_id',
            'tags',
            'type',
            'updated_at',
            'url',
            'via'
        ])
        && isNumber(value?.assignee_id)
        && isNumberArray(value?.collaborator_ids)
        && isString(value?.created_at)
        && isArrayOf<ZendeskCustomField>(value?.custom_fields, isZendeskCustomField)
        && isString(value?.description)
        && isNull(value?.due_at)
        && isString(value?.external_id)
        && isNumberArray(value?.follower_ids)
        && isBoolean(value?.from_messaging_channel)
        && isNumber(value?.group_id)
        && isBoolean(value?.has_incidents)
        && isNumber(value?.id)
        && isNumber(value?.organization_id)
        && isString(value?.priority)
        && isString(value?.raw_subject)
        && isString(value?.recipient)
        && isNumber(value?.requester_id)
        && isZendeskSatisfactionRating(value?.satisfaction_rating)
        && isNumberArray(value?.sharing_agreement_ids)
        && isString(value?.status)
        && isString(value?.subject)
        && isNumber(value?.submitter_id)
        && isStringArray(value?.tags)
        && isString(value?.type)
        && isString(value?.updated_at)
        && isString(value?.url)
        && isZendeskVia(value?.via)
    );
}

export function explainZendeskTicketDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'assignee_id',
                'collaborator_ids',
                'created_at',
                'custom_fields',
                'description',
                'due_at',
                'external_id',
                'follower_ids',
                'from_messaging_channel',
                'group_id',
                'has_incidents',
                'id',
                'organization_id',
                'priority',
                'raw_subject',
                'recipient',
                'requester_id',
                'satisfaction_rating',
                'sharing_agreement_ids',
                'status',
                'subject',
                'submitter_id',
                'tags',
                'type',
                'updated_at',
                'url',
                'via'
            ])
            , explainProperty("assignee_id", explainNumber(value?.assignee_id))
            , explainProperty("collaborator_ids", explainNumberArray(value?.collaborator_ids))
            , explainProperty("created_at", explainString(value?.created_at))
            , explainProperty("custom_fields", explainArrayOf<ZendeskCustomField>("ZendeskCustomField", explainZendeskCustomField, value?.custom_fields, isZendeskCustomField))
            , explainProperty("description", explainString(value?.description))
            , explainProperty("due_at", explainNull(value?.due_at))
            , explainProperty("external_id", explainString(value?.external_id))
            , explainProperty("follower_ids", explainNumberArray(value?.follower_ids))
            , explainProperty("from_messaging_channel", explainBoolean(value?.from_messaging_channel))
            , explainProperty("group_id", explainNumber(value?.group_id))
            , explainProperty("has_incidents", explainBoolean(value?.has_incidents))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("organization_id", explainNumber(value?.organization_id))
            , explainProperty("priority", explainString(value?.priority))
            , explainProperty("raw_subject", explainString(value?.raw_subject))
            , explainProperty("recipient", explainString(value?.recipient))
            , explainProperty("requester_id", explainNumber(value?.requester_id))
            , explainProperty("satisfaction_rating", explainZendeskSatisfactionRating(value?.satisfaction_rating))
            , explainProperty("sharing_agreement_ids", explainNumberArray(value?.sharing_agreement_ids))
            , explainProperty("status", explainString(value?.status))
            , explainProperty("subject", explainString(value?.subject))
            , explainProperty("submitter_id", explainNumber(value?.submitter_id))
            , explainProperty("tags", explainStringArray(value?.tags))
            , explainProperty("type", explainString(value?.type))
            , explainProperty("updated_at", explainString(value?.updated_at))
            , explainProperty("url", explainString(value?.url))
            , explainProperty("via", explainZendeskVia(value?.via))
        ]
    );
}

export function stringifyZendeskTicketDTO (value : ZendeskTicketDTO) : string {
    return `ZendeskTicketDTO(${value})`;
}

export function parseZendeskTicketDTO (value: unknown) : ZendeskTicketDTO | undefined {
    if (isZendeskTicketDTO(value)) return value;
    return undefined;
}

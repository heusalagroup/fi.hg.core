// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskSatisfactionRatingOrNullOrUndefined, isZendeskSatisfactionRatingOrNullOrUndefined, ZendeskSatisfactionRating } from "./ZendeskSatisfactionRating";
import { explainZendeskViaOrNullOrUndefined, isZendeskViaOrNullOrUndefined, ZendeskVia } from "./ZendeskVia";
import { explainNumberOrNullOrUndefined, isNumberOrNullOrUndefined } from "../../types/Number";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainBooleanOrUndefined, isBooleanOrNullOrUndefined } from "../../types/Boolean";
import { explainStringArrayOrUndefined, isStringArrayOrUndefined } from "../../types/StringArray";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../types/Array";
import { explainNumberArrayOrUndefined, isNumberArrayOrUndefined } from "../../types/NumberArray";
import { explainReadonlyJsonObject, isReadonlyJsonObject, ReadonlyJsonObject } from "../../Json";

export interface ZendeskTicket {

    readonly allow_attachments ?: boolean | null | undefined;
    readonly allow_channelback ?: boolean | null | undefined;
    readonly assignee_email ?: string | null | undefined;
    readonly assignee_id ?: number | null | undefined;
    readonly attribute_value_ids ?: readonly number[];
    readonly brand_id ?: number | null | undefined;
    readonly collaborator_ids ?: readonly number[];
    readonly created_at ?: string | null | undefined;
    readonly custom_fields ?: readonly ReadonlyJsonObject[];
    readonly fields ?: readonly ReadonlyJsonObject[];
    readonly custom_status_id ?: number | null | undefined;
    readonly description ?: string | null | undefined;
    readonly due_at ?: string | null | undefined;
    readonly email_cc_ids ?: readonly string[];
    readonly external_id ?: string | null | undefined;
    readonly follower_ids ?: readonly number[];
    readonly followup_ids ?: readonly number[];
    readonly forum_topic_id ?: number | null | undefined;
    readonly from_messaging_channel ?: boolean | null | undefined;
    readonly group_id ?: number | null | undefined;
    readonly has_incidents ?: boolean | null | undefined;
    readonly id : number | null | undefined;
    readonly is_public ?: boolean | null | undefined;
    readonly organization_id ?: number | null | undefined;
    readonly priority ?: string | null | undefined;
    readonly problem_id ?: number | null | undefined;
    readonly raw_subject ?: string | null | undefined;
    readonly recipient ?: string | null | undefined;
    readonly requester_id : number | null | undefined;
    readonly satisfaction_rating ?: ZendeskSatisfactionRating | null | undefined;
    readonly sharing_agreement_ids ?: readonly number[];
    readonly status ?: string | null | undefined;
    readonly subject ?: string | null | undefined;
    readonly submitter_id ?: number | null | undefined;
    readonly tags ?: readonly string[];
    readonly type ?: string | null | undefined;
    readonly updated_at ?: string | null | undefined;
    readonly url ?: string | null | undefined;
    readonly via ?: ZendeskVia | null | undefined;
    readonly generated_timestamp ?: number | null | undefined;
}

export function isZendeskTicket (value: unknown) : value is ZendeskTicket {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'allow_attachments',
            'allow_channelback',
            'assignee_id',
            'attribute_value_ids',
            'collaborator_ids',
            'created_at',
            'custom_fields',
            'fields',
            'description',
            'due_at',
            'external_id',
            'follower_ids',
            'followup_ids',
            'from_messaging_channel',
            'brand_id',
            'group_id',
            'problem_id',
            'forum_topic_id',
            'custom_status_id',
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
            'email_cc_ids',
            'type',
            'updated_at',
            'url',
            'generated_timestamp',
            'via'
        ])
        && isNumberOrNullOrUndefined(value?.assignee_id)
        && isNumberArrayOrUndefined(value?.attribute_value_ids)
        && isNumberArrayOrUndefined(value?.collaborator_ids)
        && isStringOrNullOrUndefined(value?.created_at)
        && isArrayOfOrUndefined<ReadonlyJsonObject>(value?.custom_fields, isReadonlyJsonObject)
        && isArrayOfOrUndefined<ReadonlyJsonObject>(value?.fields, isReadonlyJsonObject)
        && isStringOrNullOrUndefined(value?.description)
        && isStringOrNullOrUndefined(value?.due_at)
        && isStringOrNullOrUndefined(value?.external_id)
        && isNumberArrayOrUndefined(value?.follower_ids)
        && isNumberArrayOrUndefined(value?.followup_ids)
        && isBooleanOrNullOrUndefined(value?.from_messaging_channel)
        && isBooleanOrNullOrUndefined(value?.allow_attachments)
        && isBooleanOrNullOrUndefined(value?.allow_channelback)
        && isNumberOrNullOrUndefined(value?.brand_id)
        && isNumberOrNullOrUndefined(value?.group_id)
        && isNumberOrNullOrUndefined(value?.problem_id)
        && isNumberOrNullOrUndefined(value?.forum_topic_id)
        && isNumberOrNullOrUndefined(value?.custom_status_id)
        && isBooleanOrNullOrUndefined(value?.has_incidents)
        && isNumberOrNullOrUndefined(value?.id)
        && isNumberOrNullOrUndefined(value?.organization_id)
        && isStringOrNullOrUndefined(value?.priority)
        && isStringOrNullOrUndefined(value?.raw_subject)
        && isStringOrNullOrUndefined(value?.recipient)
        && isNumberOrNullOrUndefined(value?.requester_id)
        && isZendeskSatisfactionRatingOrNullOrUndefined(value?.satisfaction_rating)
        && isNumberArrayOrUndefined(value?.sharing_agreement_ids)
        && isStringOrNullOrUndefined(value?.status)
        && isStringOrNullOrUndefined(value?.subject)
        && isNumberOrNullOrUndefined(value?.submitter_id)
        && isStringArrayOrUndefined(value?.tags)
        && isStringArrayOrUndefined(value?.email_cc_ids)
        && isStringOrNullOrUndefined(value?.type)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
        && isZendeskViaOrNullOrUndefined(value?.via)
        && isNumberOrNullOrUndefined(value?.generated_timestamp)
    );
}

export function explainZendeskTicket (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'allow_attachments',
                'allow_channelback',
                'assignee_id',
                'attribute_value_ids',
                'collaborator_ids',
                'created_at',
                'custom_fields',
                'fields',
                'description',
                'due_at',
                'external_id',
                'follower_ids',
                'followup_ids',
                'from_messaging_channel',
                'brand_id',
                'group_id',
                'problem_id',
                'forum_topic_id',
                'custom_status_id',
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
                'email_cc_ids',
                'type',
                'updated_at',
                'url',
                'generated_timestamp',
                'via'
            ])
            , explainProperty("assignee_id",            explainNumberOrNullOrUndefined(value?.assignee_id))
            , explainProperty("attribute_value_ids",    explainNumberArrayOrUndefined(value?.attribute_value_ids))
            , explainProperty("collaborator_ids",       explainNumberArrayOrUndefined(value?.collaborator_ids))
            , explainProperty("created_at",             explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("custom_fields",          explainArrayOfOrUndefined<ReadonlyJsonObject>("ReadonlyJsonObject", explainReadonlyJsonObject, value?.custom_fields, isReadonlyJsonObject))
            , explainProperty("fields",                 explainArrayOfOrUndefined<ReadonlyJsonObject>("ReadonlyJsonObject", explainReadonlyJsonObject, value?.fields, isReadonlyJsonObject))
            , explainProperty("description",            explainStringOrNullOrUndefined(value?.description))
            , explainProperty("due_at",                 explainStringOrNullOrUndefined(value?.due_at))
            , explainProperty("external_id",            explainStringOrNullOrUndefined(value?.external_id))
            , explainProperty("follower_ids",           explainNumberArrayOrUndefined(value?.follower_ids))
            , explainProperty("followup_ids",           explainNumberArrayOrUndefined(value?.followup_ids))
            , explainProperty("from_messaging_channel", explainBooleanOrUndefined(value?.from_messaging_channel))
            , explainProperty("allow_attachments",      explainBooleanOrUndefined(value?.allow_attachments))
            , explainProperty("allow_channelback",      explainBooleanOrUndefined(value?.allow_channelback))
            , explainProperty("brand_id",               explainNumberOrNullOrUndefined(value?.brand_id))
            , explainProperty("group_id",               explainNumberOrNullOrUndefined(value?.group_id))
            , explainProperty("problem_id",             explainNumberOrNullOrUndefined(value?.problem_id))
            , explainProperty("forum_topic_id",         explainNumberOrNullOrUndefined(value?.forum_topic_id))
            , explainProperty("custom_status_id",       explainNumberOrNullOrUndefined(value?.custom_status_id))
            , explainProperty("generated_timestamp",    explainNumberOrNullOrUndefined(value?.generated_timestamp))
            , explainProperty("has_incidents",          explainBooleanOrUndefined(value?.has_incidents))
            , explainProperty("id",                     explainNumberOrNullOrUndefined(value?.id))
            , explainProperty("organization_id",        explainNumberOrNullOrUndefined(value?.organization_id))
            , explainProperty("priority",               explainStringOrNullOrUndefined(value?.priority))
            , explainProperty("raw_subject",            explainStringOrNullOrUndefined(value?.raw_subject))
            , explainProperty("recipient",              explainStringOrNullOrUndefined(value?.recipient))
            , explainProperty("requester_id",           explainNumberOrNullOrUndefined(value?.requester_id))
            , explainProperty("satisfaction_rating",    explainZendeskSatisfactionRatingOrNullOrUndefined(value?.satisfaction_rating))
            , explainProperty("sharing_agreement_ids",  explainNumberArrayOrUndefined(value?.sharing_agreement_ids))
            , explainProperty("status",                 explainStringOrNullOrUndefined(value?.status))
            , explainProperty("subject",                explainStringOrNullOrUndefined(value?.subject))
            , explainProperty("submitter_id",           explainNumberOrNullOrUndefined(value?.submitter_id))
            , explainProperty("tags",                   explainStringArrayOrUndefined(value?.tags))
            , explainProperty("email_cc_ids",           explainStringArrayOrUndefined(value?.email_cc_ids))
            , explainProperty("type",                   explainStringOrNullOrUndefined(value?.type))
            , explainProperty("updated_at",             explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url",                    explainStringOrNullOrUndefined(value?.url))
            , explainProperty("via",                    explainZendeskViaOrNullOrUndefined(value?.via))
        ]
    );
}

export function stringifyZendeskTicket (value : ZendeskTicket) : string {
    return `ZendeskTicketDTO(${value})`;
}

export function parseZendeskTicket (value: unknown) : ZendeskTicket | undefined {
    if (isZendeskTicket(value)) return value;
    return undefined;
}

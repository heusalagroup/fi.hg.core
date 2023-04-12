// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskAttachment, isZendeskAttachment, ZendeskAttachment } from "./ZendeskAttachment";
import { explainZendeskViaOrNullOrUndefined, isZendeskViaOrNullOrUndefined, ZendeskVia } from "./ZendeskVia";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskAuthorOrNullOrUndefined, isZendeskAuthorOrNullOrUndefined, ZendeskAuthor } from "./ZendeskAuthor";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../types/Array";
import { explainNumber, explainNumberOrNullOrUndefined, isNumber, isNumberOrNullOrUndefined } from "../../types/Number";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainStringArrayOrNullOrUndefined, isStringArrayOrNullOrUndefined } from "../../types/StringArray";

export interface ZendeskSuspendedTicket {
    readonly attachments    ?: readonly ZendeskAttachment[];
    readonly author         ?: ZendeskAuthor | null | undefined;
    readonly brand_id       ?: number | null | undefined;
    readonly cause          ?: string | null | undefined;
    readonly cause_id       ?: number | null | undefined;
    readonly content        ?: string | null | undefined;
    readonly created_at     ?: string | null | undefined;
    readonly error_messages ?: readonly string[] | null | undefined;
    readonly id              : number;
    readonly message_id     ?: string | null | undefined;
    readonly recipient      ?: string | null | undefined;
    readonly subject        ?: string | null | undefined;
    readonly ticket_id      ?: number | null | undefined;
    readonly updated_at     ?: string | null | undefined;
    readonly url            ?: string | null | undefined;
    readonly via            ?: ZendeskVia | null | undefined;
}

export function isZendeskSuspendedTicket (value: unknown) : value is ZendeskSuspendedTicket {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'attachments',
            'author',
            'brand_id',
            'cause',
            'cause_id',
            'content',
            'created_at',
            'error_messages',
            'id',
            'message_id',
            'recipient',
            'subject',
            'ticket_id',
            'updated_at',
            'url',
            'via',
        ])
        && isArrayOfOrUndefined<ZendeskAttachment>(value?.attachments, isZendeskAttachment)
        && isZendeskAuthorOrNullOrUndefined(value?.author)
        && isNumberOrNullOrUndefined(value?.brand_id)
        && isStringOrNullOrUndefined(value?.cause)
        && isNumberOrNullOrUndefined(value?.cause_id)
        && isStringOrNullOrUndefined(value?.content)
        && isStringOrNullOrUndefined(value?.created_at)
        && isStringArrayOrNullOrUndefined(value?.error_messages)
        && isNumber(value?.id)
        && isStringOrNullOrUndefined(value?.message_id)
        && isStringOrNullOrUndefined(value?.recipient)
        && isStringOrNullOrUndefined(value?.subject)
        && isNumberOrNullOrUndefined(value?.ticket_id)
        && isStringOrNullOrUndefined(value?.updated_at)
        && isStringOrNullOrUndefined(value?.url)
        && isZendeskViaOrNullOrUndefined(value?.via)
    );
}

export function explainZendeskSuspendedTicket (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'attachments',
                'author',
                'brand_id',
                'cause',
                'cause_id',
                'content',
                'created_at',
                'error_messages',
                'id',
                'message_id',
                'recipient',
                'subject',
                'ticket_id',
                'updated_at',
                'url',
                'via'
            ])
            , explainProperty("attachments", explainArrayOfOrUndefined<ZendeskAttachment>("ZendeskAttachment", explainZendeskAttachment, value?.attachments, isZendeskAttachment))
            , explainProperty("author", explainZendeskAuthorOrNullOrUndefined(value?.author))
            , explainProperty("brand_id", explainNumberOrNullOrUndefined(value?.brand_id))
            , explainProperty("cause", explainStringOrNullOrUndefined(value?.cause))
            , explainProperty("cause_id", explainNumberOrNullOrUndefined(value?.cause_id))
            , explainProperty("content", explainStringOrNullOrUndefined(value?.content))
            , explainProperty("created_at", explainStringOrNullOrUndefined(value?.created_at))
            , explainProperty("error_messages", explainStringArrayOrNullOrUndefined(value?.error_messages))
            , explainProperty("id", explainNumber(value?.id))
            , explainProperty("message_id", explainStringOrNullOrUndefined(value?.message_id))
            , explainProperty("recipient", explainStringOrNullOrUndefined(value?.recipient))
            , explainProperty("subject", explainStringOrNullOrUndefined(value?.subject))
            , explainProperty("ticket_id", explainNumberOrNullOrUndefined(value?.ticket_id))
            , explainProperty("updated_at", explainStringOrNullOrUndefined(value?.updated_at))
            , explainProperty("url", explainStringOrNullOrUndefined(value?.url))
            , explainProperty("via", explainZendeskViaOrNullOrUndefined(value?.via))
        ]
    );
}

export function stringifyZendeskSuspendedTicket (value : ZendeskSuspendedTicket) : string {
    return `ZendeskSuspendedTicket(${value})`;
}

export function parseZendeskSuspendedTicket (value: unknown) : ZendeskSuspendedTicket | undefined {
    if (isZendeskSuspendedTicket(value)) return value;
    return undefined;
}

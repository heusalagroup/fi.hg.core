// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";

export interface TicketCommentReadDTO {
    readonly ticketCommentReadId : string;
    readonly ticketCommentId : string;
    readonly ticketUserId : string;
    readonly updated : string;
    readonly created : string;
}

export function createTicketCommentReadDTO (
    ticketCommentReadId : string,
    ticketCommentId : string,
    ticketUserId : string,
    updated : string,
    created : string,
) : TicketCommentReadDTO {
    return {
        ticketCommentReadId,
        ticketCommentId,
        ticketUserId,
        updated,
        created
    };
}

export function isTicketCommentReadDTO (value: unknown) : value is TicketCommentReadDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketCommentReadId',
            'ticketCommentId',
            'ticketUserId',
            'updated',
            'created'
        ])
        && isString(value?.ticketCommentReadId)
        && isString(value?.ticketCommentId)
        && isString(value?.ticketUserId)
        && isString(value?.updated)
        && isString(value?.created)
    );
}

export function explainTicketCommentReadDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'ticketCommentReadId',
                'ticketCommentId',
                'ticketUserId',
                'updated',
                'created'
            ])
            , explainProperty("ticketCommentReadId", explainString(value?.ticketCommentReadId))
            , explainProperty("ticketCommentId", explainString(value?.ticketCommentId))
            , explainProperty("ticketUserId", explainString(value?.ticketUserId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
        ]
    );
}

export function stringifyTicketCommentReadDTO (value : TicketCommentReadDTO) : string {
    return `TicketReadDTO(${value})`;
}

export function parseTicketCommentReadDTO (value: unknown) : TicketCommentReadDTO | undefined {
    if (isTicketCommentReadDTO(value)) return value;
    return undefined;
}

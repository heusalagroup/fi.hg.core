// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";

export interface NewTicketCommentReadDTO {
    readonly ticketCommentId : string;
    readonly ticketUserId : string;
}

export function createTicketReadDTO (
    ticketCommentId : string,
    ticketUserId : string,
) : NewTicketCommentReadDTO {
    return {
        ticketCommentId,
        ticketUserId
    };
}

export function isNewTicketCommentReadDTO (value: unknown) : value is NewTicketCommentReadDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketCommentId',
            'ticketUserId'
        ])
        && isString(value?.ticketCommentId)
        && isString(value?.ticketUserId)
    );
}

export function explainNewTicketCommentReadDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'ticketCommentId',
                'ticketUserId',
            ])
            , explainProperty("ticketCommentId", explainString(value?.ticketCommentId))
            , explainProperty("ticketUserId", explainString(value?.ticketUserId))
        ]
    );
}

export function stringifyNewTicketCommentReadDTO (value : NewTicketCommentReadDTO) : string {
    return `NewTicketCommentReadDTO(${value})`;
}

export function parseNewTicketCommentReadDTO (value: unknown) : NewTicketCommentReadDTO | undefined {
    if (isNewTicketCommentReadDTO(value)) return value;
    return undefined;
}

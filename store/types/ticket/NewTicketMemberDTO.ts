// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";

export interface NewTicketMemberDTO {
    readonly ticketId       : string;
    readonly ticketUserId   : string;
    readonly isTerminated  : boolean;
}

export function createNewTicketMemberDTO (
    ticketId      : string,
    ticketUserId  : string,
    isTerminated  : boolean,
) : NewTicketMemberDTO {
    return {
        ticketId,
        ticketUserId,
        isTerminated
    };
}

export function isNewTicketMemberDTO (value: unknown) : value is NewTicketMemberDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketId',
            'ticketUserId',
            'isTerminated'
        ])
        && isString(value?.ticketId)
        && isString(value?.ticketUserId)
        && isString(value?.isTerminated)
    );
}

export function explainNewTicketMemberDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'ticketId',
                'ticketUserId',
                'isTerminated'
            ])
            , explainProperty("ticketId", explainString(value?.ticketId))
            , explainProperty("ticketUserId", explainString(value?.ticketUserId))
            , explainProperty("isTerminated", explainString(value?.isTerminated))
        ]
    );
}

export function stringifyNewTicketMemberDTO (value : NewTicketMemberDTO) : string {
    return `NewTicketMemberDTO(${value})`;
}

export function parseNewTicketMemberDTO (value: unknown) : NewTicketMemberDTO | undefined {
    if (isNewTicketMemberDTO(value)) return value;
    return undefined;
}

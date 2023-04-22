// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import { explainBoolean, isBoolean } from "../../../types/Boolean";

export interface TicketMemberDTO {
    readonly ticketMemberId : string;
    readonly ticketId       : string;
    readonly ticketUserId   : string;
    readonly updated        : string;
    readonly created        : string;
    readonly isTerminated   : boolean;
}

export function createTicketMemberDTO (
    ticketMemberId : string,
    ticketId       : string,
    ticketUserId   : string,
    updated        : string,
    created        : string,
    isTerminated   : boolean,
) : TicketMemberDTO {
    return {
        ticketMemberId,
        ticketId,
        ticketUserId,
        updated,
        created,
        isTerminated
    };
}

export function isTicketMemberDTO (value: unknown) : value is TicketMemberDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketMemberId',
            'ticketId',
            'ticketUserId',
            'updated',
            'created',
            'isTerminated'
        ])
        && isString(value?.ticketMemberId)
        && isString(value?.ticketId)
        && isString(value?.ticketUserId)
        && isString(value?.updated)
        && isString(value?.created)
        && isBoolean(value?.isTerminated)
    );
}

export function explainTicketMemberDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'ticketMemberId',
                'ticketId',
                'ticketUserId',
                'updated',
                'created',
                'isTerminated'
            ])
            , explainProperty("ticketMemberId", explainString(value?.ticketMemberId))
            , explainProperty("ticketId", explainString(value?.ticketId))
            , explainProperty("ticketUserId", explainString(value?.ticketUserId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("isTerminated", explainBoolean(value?.isTerminated))
        ]
    );
}

export function stringifyTicketMemberDTO (value : TicketMemberDTO) : string {
    return `TicketMemberDTO(${value})`;
}

export function parseTicketMemberDTO (value: unknown) : TicketMemberDTO | undefined {
    if (isTicketMemberDTO(value)) return value;
    return undefined;
}

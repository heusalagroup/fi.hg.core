// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isBoolean } from "../../../types/Boolean";

export interface NewTicketCommentDTO {
    readonly ticketId        ?: string;
    readonly ticketUserId    ?: string;
    readonly date            ?: string;
    readonly subject         ?: string;
    readonly description     ?: string;
    readonly dataJson        ?: string;
    readonly isPrivate       ?: boolean;
    readonly onHold          ?: boolean;
    readonly isTerminated    ?: boolean;
    readonly isRead          ?: boolean;
}

export function createNewTicketCommentDTO (
    ticketId          : string,
    ticketUserId      : string,
    date              : string,
    subject           : string,
    description       : string,
    dataJson          : string,
    isPrivate         : boolean,
    onHold            : boolean,
    isTerminated      : boolean,
    isRead            : boolean,
): NewTicketCommentDTO {
    return {
        ticketId,
        ticketUserId,
        date,
        subject,
        description,
        dataJson,
        isPrivate,
        onHold,
        isTerminated,
        isRead
    };
}

export function isNewTicketCommentDTO (value: any): value is NewTicketCommentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketId',
            'ticketUserId',
            'date',
            'subject',
            'description',
            'dataJson',
            'isPrivate',
            'onHold',
            'isTerminated',
            'isRead',
        ])
        && isString(value?.ticketId)
        && isString(value?.ticketUserId)
        && isString(value?.date)
        && isString(value?.subject)
        && isString(value?.description)
        && isString(value?.dataJson)
        && isBoolean(value?.isPrivate)
        && isBoolean(value?.onHold)
        && isBoolean(value?.isTerminated)
        && isBoolean(value?.isRead)
    );
}

export function stringifyNewTicketCommentDTO (value: NewTicketCommentDTO): string {
    return `NewTicketCommentDTO(${value})`;
}

export function parseNewTicketCommentDTO (value: any): NewTicketCommentDTO | undefined {
    if ( isNewTicketCommentDTO(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isBoolean } from "../../../types/Boolean";

export interface TicketCommentDTO {
    readonly ticketCommentId : string;
    readonly ticketId        : string;
    readonly ticketUserId    : string;
    readonly updated         : string;
    readonly created         : string;
    readonly date            : string;
    readonly subject         : string;
    readonly description     : string;
    readonly dataJson        : string;
    readonly isPrivate       : boolean;
    readonly onHold          : boolean;
    readonly isTerminated    : boolean;
    readonly isRead          : boolean;
}

export function createTicketCommentDTO (
    ticketCommentId   : string,
    ticketId          : string,
    ticketUserId      : string,
    updated           : string,
    created           : string,
    date              : string,
    subject           : string,
    description       : string,
    dataJson          : string,
    isPrivate         : boolean,
    onHold            : boolean,
    isTerminated      : boolean,
    isRead            : boolean,
): TicketCommentDTO {
    return {
        ticketCommentId,
        ticketId,
        ticketUserId,
        updated,
        created,
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

export function isTicketCommentDTO (value: any): value is TicketCommentDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketCommentId',
            'ticketId',
            'ticketUserId',
            'updated',
            'created',
            'date',
            'subject',
            'description',
            'dataJson',
            'isPrivate',
            'onHold',
            'isTerminated',
            'isRead',
        ])
        && isString(value?.ticketCommentId)
        && isString(value?.ticketId)
        && isString(value?.ticketUserId)
        && isString(value?.updated)
        && isString(value?.created)
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

export function stringifyTicketCommentDTO (value: TicketCommentDTO): string {
    return `TicketCommentDTO(${value})`;
}

export function parseTicketCommentDTO (value: any): TicketCommentDTO | undefined {
    if ( isTicketCommentDTO(value) ) return value;
    return undefined;
}

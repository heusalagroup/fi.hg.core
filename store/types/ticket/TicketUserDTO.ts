// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import { explainBoolean, isBoolean } from "../../../types/Boolean";

export interface TicketUserDTO {
    readonly ticket_user_id  : string;
    readonly updated         : string;
    readonly created         : string;
    readonly name            : string;
    readonly email           : string;
    readonly onHold          : boolean;
    readonly dataJson        : string;
    readonly isTerminated    : boolean;
}

export function createTicketUserDTO (
    ticket_user_id  : string,
    updated         : string,
    created         : string,
    name            : string,
    email           : string,
    onHold          : boolean,
    dataJson        : string,
    isTerminated    : boolean,
) : TicketUserDTO {
    return {
        ticket_user_id,
        updated,
        created,
        name,
        email,
        onHold,
        dataJson,
        isTerminated
    };
}

export function isTicketUserDTO (value: unknown) : value is TicketUserDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticket_user_id',
            'updated',
            'created',
            'name',
            'email',
            'onHold',
            'dataJson',
            'isTerminated'
        ])
        && isString(value?.ticket_user_id)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.name)
        && isString(value?.email)
        && isBoolean(value?.onHold)
        && isString(value?.dataJson)
        && isBoolean(value?.isTerminated)
    );
}

export function explainTicketUserDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'ticket_user_id',
                'updated',
                'created',
                'name',
                'email',
                'onHold',
                'dataJson',
                'isTerminated'
            ])
            , explainProperty("ticket_user_id", explainString(value?.ticket_user_id))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("email", explainString(value?.email))
            , explainProperty("onHold", explainBoolean(value?.onHold))
            , explainProperty("dataJson", explainString(value?.dataJson))
            , explainProperty("isTerminated", explainBoolean(value?.isTerminated))
        ]
    );
}

export function stringifyTicketUserDTO (value : TicketUserDTO) : string {
    return `TicketUserDTO(${value})`;
}

export function parseTicketUserDTO (value: unknown) : TicketUserDTO | undefined {
    if (isTicketUserDTO(value)) return value;
    return undefined;
}

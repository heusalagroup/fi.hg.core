// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainString, isString } from "../../../types/String";
import { explainBoolean, isBoolean } from "../../../types/Boolean";

export interface TicketUserDTO {
    readonly ticketUserId    : string;
    readonly updated         : string;
    readonly created         : string;
    readonly name            : string;
    readonly email           : string;
    readonly tel             : string;
    readonly onHold          : boolean;
    readonly dataJson        : string;
    readonly isTerminated    : boolean;
}

export function createTicketUserDTO (
    ticketUserId    : string,
    updated         : string,
    created         : string,
    name            : string,
    email           : string,
    tel             : string,
    onHold          : boolean,
    dataJson        : string,
    isTerminated    : boolean,
) : TicketUserDTO {
    return {
        ticketUserId,
        updated,
        created,
        name,
        email,
        tel,
        onHold,
        dataJson,
        isTerminated
    };
}

export function isTicketUserDTO (value: unknown) : value is TicketUserDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'ticketUserId',
            'updated',
            'created',
            'name',
            'email',
            'tel',
            'onHold',
            'dataJson',
            'isTerminated'
        ])
        && isString(value?.ticketUserId)
        && isString(value?.updated)
        && isString(value?.created)
        && isString(value?.name)
        && isString(value?.email)
        && isString(value?.tel)
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
                'ticketUserId',
                'updated',
                'created',
                'name',
                'email',
                'tel',
                'onHold',
                'dataJson',
                'isTerminated'
            ])
            , explainProperty("ticketUserId", explainString(value?.ticketUserId))
            , explainProperty("updated", explainString(value?.updated))
            , explainProperty("created", explainString(value?.created))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("email", explainString(value?.email))
            , explainProperty("tel", explainString(value?.tel))
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

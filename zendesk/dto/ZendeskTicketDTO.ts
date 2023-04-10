// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskTicket, isZendeskTicket, ZendeskTicket } from "./ZendeskTicket";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";

export interface ZendeskTicketDTO {
    readonly ticket : ZendeskTicket;
}

export function createZendeskTicketDTO (
    ticket : ZendeskTicket
) : ZendeskTicketDTO {
    return {
        ticket
    };
}

export function isZendeskTicketDTO (value: unknown) : value is ZendeskTicketDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'ticket'
        ])
        && isZendeskTicket(value?.ticket)
    );
}

export function explainZendeskTicketDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'ticket'
            ])
            , explainProperty("ticket", explainZendeskTicket(value?.ticket))
        ]
    );
}

export function stringifyZendeskTicketDTO (value : ZendeskTicketDTO) : string {
    return `ZendeskTicketDTO(${value})`;
}

export function parseZendeskTicketDTO (value: unknown) : ZendeskTicketDTO | undefined {
    if (isZendeskTicketDTO(value)) return value;
    return undefined;
}

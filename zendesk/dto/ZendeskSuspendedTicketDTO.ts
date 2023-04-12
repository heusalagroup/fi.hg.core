// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskSuspendedTicket, isZendeskSuspendedTicket, ZendeskSuspendedTicket } from "./ZendeskSuspendedTicket";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";

export interface ZendeskSuspendedTicketDTO {
    readonly suspended_ticket: ZendeskSuspendedTicket;
}

export function createZendeskSuspendedTicketDTO (
    suspended_ticket: ZendeskSuspendedTicket
) : ZendeskSuspendedTicketDTO {
    return {
        suspended_ticket
    };
}

export function isZendeskSuspendedTicketDTO (value: unknown) : value is ZendeskSuspendedTicketDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'suspended_ticket'
        ])
        && isZendeskSuspendedTicket(value?.suspended_ticket)
    );
}

export function explainZendeskSuspendedTicketDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'suspended_ticket'
            ])
            , explainProperty("suspended_ticket", explainZendeskSuspendedTicket(value?.suspended_ticket))
        ]
    );
}

export function stringifyZendeskSuspendedTicketDTO (value : ZendeskSuspendedTicketDTO) : string {
    return `ZendeskSuspendedTicketDTO(${value})`;
}

export function parseZendeskSuspendedTicketDTO (value: unknown) : ZendeskSuspendedTicketDTO | undefined {
    if (isZendeskSuspendedTicketDTO(value)) return value;
    return undefined;
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskTicket, isZendeskTicket, ZendeskTicket } from "./ZendeskTicket";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainBoolean, isBoolean } from "../../types/Boolean";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskTicketListDTO {

    readonly after_cursor ?: string | null | undefined;
    readonly after_url ?: string | null | undefined;
    readonly before_cursor ?: string | null | undefined;
    readonly before_url ?: string | null | undefined;
    readonly end_of_stream : boolean;
    readonly tickets : readonly ZendeskTicket[];


}

export function createZendeskTicketListDTO (
    after_cursor : string | null | undefined,
    after_url : string | null | undefined,
    before_cursor : string | null | undefined,
    before_url : string | null | undefined,
    end_of_stream : boolean,
    tickets : readonly ZendeskTicket[],
) : ZendeskTicketListDTO {
    return {
        after_cursor,
        after_url,
        before_cursor,
        before_url,
        end_of_stream,
        tickets
    };
}

export function isZendeskTicketListDTO (value: unknown) : value is ZendeskTicketListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'after_cursor',
            'after_url',
            'before_cursor',
            'before_url',
            'end_of_stream',
            'tickets'
        ])
        && isStringOrNullOrUndefined(value?.after_cursor)
        && isStringOrNullOrUndefined(value?.after_url)
        && isStringOrNullOrUndefined(value?.before_cursor)
        && isStringOrNullOrUndefined(value?.before_url)
        && isBoolean(value?.end_of_stream)
        && isArrayOf<ZendeskTicket>(value?.tickets, isZendeskTicket)
    );
}

export function explainZendeskTicketListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'after_cursor',
                'after_url',
                'before_cursor',
                'before_url',
                'end_of_stream',
                'tickets'
            ])
            , explainProperty("after_cursor", explainStringOrNullOrUndefined(value?.after_cursor))
            , explainProperty("after_url", explainStringOrNullOrUndefined(value?.after_url))
            , explainProperty("before_cursor", explainStringOrNullOrUndefined(value?.before_cursor))
            , explainProperty("before_url", explainStringOrNullOrUndefined(value?.before_url))
            , explainProperty("end_of_stream", explainBoolean(value?.end_of_stream))
            , explainProperty("tickets", explainArrayOf<ZendeskTicket>("ZendeskTicketDTO", explainZendeskTicket, value?.tickets, isZendeskTicket))
        ]
    );
}

export function stringifyZendeskTicketListDTO (value : ZendeskTicketListDTO) : string {
    return `ZendeskTicketListDTO(${value})`;
}

export function parseZendeskTicketListDTO (value: unknown) : ZendeskTicketListDTO | undefined {
    if (isZendeskTicketListDTO(value)) return value;
    return undefined;
}

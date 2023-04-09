// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskTicketDTO, isZendeskTicketDTO, ZendeskTicketDTO } from "./ZendeskTicketDTO";
import { explainString, isString } from "../../types/String";
import { explainBoolean, isBoolean } from "../../types/Boolean";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskTicketListDTO {

    readonly after_cursor : string;
    readonly after_url : string;
    readonly before_cursor : string;
    readonly before_url : string;
    readonly end_of_stream : boolean;
    readonly tickets : readonly ZendeskTicketDTO[];


}

export function createZendeskTicketListDTO (
    after_cursor : string,
    after_url : string,
    before_cursor : string,
    before_url : string,
    end_of_stream : boolean,
    tickets : readonly ZendeskTicketDTO[],
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
        && isString(value?.after_cursor)
        && isString(value?.after_url)
        && isString(value?.before_cursor)
        && isString(value?.before_url)
        && isBoolean(value?.end_of_stream)
        && isArrayOf<ZendeskTicketDTO>(value?.tickets, isZendeskTicketDTO)
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
            , explainProperty("after_cursor", explainString(value?.after_cursor))
            , explainProperty("after_url", explainString(value?.after_url))
            , explainProperty("before_cursor", explainString(value?.before_cursor))
            , explainProperty("before_url", explainString(value?.before_url))
            , explainProperty("end_of_stream", explainBoolean(value?.end_of_stream))
            , explainProperty("tickets", explainArrayOf<ZendeskTicketDTO>("ZendeskTicketDTO", explainZendeskTicketDTO, value?.tickets, isZendeskTicketDTO))
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

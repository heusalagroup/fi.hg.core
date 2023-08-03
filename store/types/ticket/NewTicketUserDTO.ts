// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../../types/RegularObject";
import { explain, explainProperty } from "../../../types/explain";
import { explainStringOrUndefined, isStringOrUndefined } from "../../../types/String";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../../types/Boolean";

export interface NewTicketUserDTO {
    readonly name            ?: string;
    readonly email           ?: string;
    readonly tel             ?: string;
    readonly onHold          ?: boolean;
    readonly dataJson        ?: string;
    readonly isTerminated    ?: boolean;
}

export function createNewTicketUserDTO (
    name            ?: string | undefined,
    email           ?: string | undefined,
    tel             ?: string | undefined,
    onHold          ?: boolean | undefined,
    dataJson        ?: string | undefined,
    isTerminated    ?: boolean | undefined,
) : NewTicketUserDTO {
    return {
        name,
        email,
        tel,
        onHold,
        dataJson,
        isTerminated
    };
}

export function isNewTicketUserDTO (value: unknown) : value is NewTicketUserDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'name',
            'email',
            'tel',
            'onHold',
            'dataJson',
            'isTerminated'
        ])
        && isStringOrUndefined(value?.name)
        && isStringOrUndefined(value?.email)
        && isStringOrUndefined(value?.tel)
        && isBooleanOrUndefined(value?.onHold)
        && isStringOrUndefined(value?.dataJson)
        && isBooleanOrUndefined(value?.isTerminated)
    );
}

export function explainNewTicketUserDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'name',
                'email',
                'tel',
                'onHold',
                'dataJson',
                'isTerminated'
            ])
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("email", explainStringOrUndefined(value?.email))
            , explainProperty("tel", explainStringOrUndefined(value?.tel))
            , explainProperty("onHold", explainBooleanOrUndefined(value?.onHold))
            , explainProperty("dataJson", explainStringOrUndefined(value?.dataJson))
            , explainProperty("isTerminated", explainBooleanOrUndefined(value?.isTerminated))
        ]
    );
}

export function stringifyNewTicketUserDTO (value : NewTicketUserDTO) : string {
    return `NewTicketUserDTO(${value})`;
}

export function parseNewTicketUserDTO (value: unknown) : NewTicketUserDTO | undefined {
    if (isNewTicketUserDTO(value)) return value;
    return undefined;
}

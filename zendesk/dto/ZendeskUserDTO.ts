// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainZendeskUser, isZendeskUser, ZendeskUser } from "./ZendeskUser";
import { explainNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainProperty } from "../../types/explain";

export interface ZendeskUserDTO {
    readonly user: ZendeskUser;
}

export function createZendeskUserDTO (
    user: ZendeskUser
) : ZendeskUserDTO {
    return {
        user
    };
}

export function isZendeskUserDTO (value: unknown) : value is ZendeskUserDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'user'
        ])
        && isZendeskUser(value?.user)
    );
}

export function explainZendeskUserDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'user'
            ])
            , explainProperty("user", explainZendeskUser(value?.user))
        ]
    );
}

export function stringifyZendeskUserDTO (value : ZendeskUserDTO) : string {
    return `ZendeskUserDTO(${value})`;
}

export function parseZendeskUserDTO (value: unknown) : ZendeskUserDTO | undefined {
    if (isZendeskUserDTO(value)) return value;
    return undefined;
}

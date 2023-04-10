// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainZendeskUser, isZendeskUser, ZendeskUser } from "./ZendeskUser";
import { explainZendeskMeta, isZendeskMeta, ZendeskMeta } from "./ZendeskMeta";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskLinks, isZendeskLinks, ZendeskLinks } from "./ZendeskLinks";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskUserListDTO {
    readonly users : readonly ZendeskUser[];
    readonly meta     : ZendeskMeta;
    readonly links    : ZendeskLinks;
}

export function createZendeskUserListDTO (
    users : readonly ZendeskUser[],
    meta     : ZendeskMeta,
    links    : ZendeskLinks
) : ZendeskUserListDTO {
    return {
        users,
        meta,
        links
    };
}

export function isZendeskUserListDTO (value: unknown) : value is ZendeskUserListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'users',
            'meta',
            'links'
        ])
        && isArrayOf<ZendeskUser>(value?.users, isZendeskUser)
        && isZendeskMeta(value?.meta)
        && isZendeskLinks(value?.links)
    );
}

export function explainZendeskUserListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'users',
                'meta',
                'links'
            ])
            , explainProperty("users", explainArrayOf<ZendeskUser>("ZendeskUser", explainZendeskUser, value?.users, isZendeskUser))
            , explainProperty("meta", explainZendeskMeta(value?.meta))
            , explainProperty("links", explainZendeskLinks(value?.links))
        ]
    );
}

export function stringifyZendeskUserListDTO (value : ZendeskUserListDTO) : string {
    return `ZendeskUserListDTO(${value})`;
}

export function parseZendeskUserListDTO (value: unknown) : ZendeskUserListDTO | undefined {
    if (isZendeskUserListDTO(value)) return value;
    return undefined;
}

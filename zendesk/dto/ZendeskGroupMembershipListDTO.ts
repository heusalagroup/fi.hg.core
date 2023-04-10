// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainZendeskMeta, isZendeskMeta, ZendeskMeta } from "./ZendeskMeta";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskLinks, isZendeskLinks, ZendeskLinks } from "./ZendeskLinks";
import { explainArrayOf, isArrayOf } from "../../types/Array";
import { explainZendeskGroupMembership, isZendeskGroupMembership, ZendeskGroupMembership } from "./ZendeskGroupMembership";

export interface ZendeskGroupMembershipListDTO {
    readonly group_memberships : readonly ZendeskGroupMembership[];
    readonly meta     : ZendeskMeta;
    readonly links    : ZendeskLinks;
}

export function createZendeskGroupMembershipListDTO (
    group_memberships : readonly ZendeskGroupMembership[],
    meta     : ZendeskMeta,
    links    : ZendeskLinks
) : ZendeskGroupMembershipListDTO {
    return {
        group_memberships,
        meta,
        links
    };
}

export function isZendeskGroupMembershipListDTO (value: unknown) : value is ZendeskGroupMembershipListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'group_memberships',
            'meta',
            'links'
        ])
        && isArrayOf<ZendeskGroupMembership>(value?.group_memberships, isZendeskGroupMembership)
        && isZendeskMeta(value?.meta)
        && isZendeskLinks(value?.links)
    );
}

export function explainZendeskGroupMembershipListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'group_memberships',
                'meta',
                'links'
            ])
            , explainProperty("group_memberships", explainArrayOf<ZendeskGroupMembership>("ZendeskGroupMembership", explainZendeskGroupMembership, value?.group_memberships, isZendeskGroupMembership))
            , explainProperty("meta", explainZendeskMeta(value?.meta))
            , explainProperty("links", explainZendeskLinks(value?.links))
        ]
    );
}

export function stringifyZendeskGroupMembershipListDTO (value : ZendeskGroupMembershipListDTO) : string {
    return `ZendeskGroupMembershipListDTO(${value})`;
}

export function parseZendeskGroupMembershipListDTO (value: unknown) : ZendeskGroupMembershipListDTO | undefined {
    if (isZendeskGroupMembershipListDTO(value)) return value;
    return undefined;
}

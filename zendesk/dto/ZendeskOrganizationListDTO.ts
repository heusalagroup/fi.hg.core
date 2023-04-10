// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainZendeskOrganization, isZendeskOrganization, ZendeskOrganization } from "./ZendeskOrganization";
import { explainZendeskMeta, isZendeskMeta, ZendeskMeta } from "./ZendeskMeta";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskLinks, isZendeskLinks, ZendeskLinks } from "./ZendeskLinks";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskOrganizationListDTO {
    readonly organizations : readonly ZendeskOrganization[];
    readonly meta     : ZendeskMeta;
    readonly links    : ZendeskLinks;
}

export function createZendeskOrganizationListDTO (
    organizations : readonly ZendeskOrganization[],
    meta     : ZendeskMeta,
    links    : ZendeskLinks
) : ZendeskOrganizationListDTO {
    return {
        organizations,
        meta,
        links
    };
}

export function isZendeskOrganizationListDTO (value: unknown) : value is ZendeskOrganizationListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'organizations',
            'meta',
            'links'
        ])
        && isArrayOf<ZendeskOrganization>(value?.organizations, isZendeskOrganization)
        && isZendeskMeta(value?.meta)
        && isZendeskLinks(value?.links)
    );
}

export function explainZendeskOrganizationListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'organizations',
                'meta',
                'links'
            ])
            , explainProperty("organizations", explainArrayOf<ZendeskOrganization>("ZendeskOrganization", explainZendeskOrganization, value?.organizations, isZendeskOrganization))
            , explainProperty("meta", explainZendeskMeta(value?.meta))
            , explainProperty("links", explainZendeskLinks(value?.links))
        ]
    );
}

export function stringifyZendeskOrganizationListDTO (value : ZendeskOrganizationListDTO) : string {
    return `ZendeskOrganizationListDTO(${value})`;
}

export function parseZendeskOrganizationListDTO (value: unknown) : ZendeskOrganizationListDTO | undefined {
    if (isZendeskOrganizationListDTO(value)) return value;
    return undefined;
}

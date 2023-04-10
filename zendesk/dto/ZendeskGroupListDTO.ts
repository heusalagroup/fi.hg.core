// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainZendeskGroup, isZendeskGroup, ZendeskGroup } from "./ZendeskGroup";
import { explainZendeskMeta, isZendeskMeta, ZendeskMeta } from "./ZendeskMeta";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskLinks, isZendeskLinks, ZendeskLinks } from "./ZendeskLinks";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskGroupListDTO {
    readonly groups : readonly ZendeskGroup[];
    readonly meta     : ZendeskMeta;
    readonly links    : ZendeskLinks;
}

export function createZendeskGroupListDTO (
    groups : readonly ZendeskGroup[],
    meta     : ZendeskMeta,
    links    : ZendeskLinks
) : ZendeskGroupListDTO {
    return {
        groups,
        meta,
        links
    };
}

export function isZendeskGroupListDTO (value: unknown) : value is ZendeskGroupListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'groups',
            'meta',
            'links'
        ])
        && isArrayOf<ZendeskGroup>(value?.groups, isZendeskGroup)
        && isZendeskMeta(value?.meta)
        && isZendeskLinks(value?.links)
    );
}

export function explainZendeskGroupListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'groups',
                'meta',
                'links'
            ])
            , explainProperty("groups", explainArrayOf<ZendeskGroup>("ZendeskGroup", explainZendeskGroup, value?.groups, isZendeskGroup))
            , explainProperty("meta", explainZendeskMeta(value?.meta))
            , explainProperty("links", explainZendeskLinks(value?.links))
        ]
    );
}

export function stringifyZendeskGroupListDTO (value : ZendeskGroupListDTO) : string {
    return `ZendeskGroupListDTO(${value})`;
}

export function parseZendeskGroupListDTO (value: unknown) : ZendeskGroupListDTO | undefined {
    if (isZendeskGroupListDTO(value)) return value;
    return undefined;
}

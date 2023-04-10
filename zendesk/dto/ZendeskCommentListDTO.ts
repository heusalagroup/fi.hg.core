// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainZendeskComment, isZendeskComment, ZendeskComment } from "./ZendeskComment";
import { explainZendeskMeta, isZendeskMeta, ZendeskMeta } from "./ZendeskMeta";
import { explain, explainProperty } from "../../types/explain";
import { explainZendeskLinks, isZendeskLinks, ZendeskLinks } from "./ZendeskLinks";
import { explainArrayOf, isArrayOf } from "../../types/Array";

export interface ZendeskCommentListDTO {
    readonly comments : readonly ZendeskComment[];
    readonly meta     : ZendeskMeta;
    readonly links    : ZendeskLinks;
}

export function createZendeskCommentListDTO (
    comments : readonly ZendeskComment[],
    meta     : ZendeskMeta,
    links    : ZendeskLinks
) : ZendeskCommentListDTO {
    return {
        comments,
        meta,
        links
    };
}

export function isZendeskCommentListDTO (value: unknown) : value is ZendeskCommentListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'comments',
            'meta',
            'links'
        ])
        && isArrayOf<ZendeskComment>(value?.comments, isZendeskComment)
        && isZendeskMeta(value?.meta)
        && isZendeskLinks(value?.links)
    );
}

export function explainZendeskCommentListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'comments',
                'meta',
                'links'
            ])
            , explainProperty("comments", explainArrayOf<ZendeskComment>("ZendeskComment", explainZendeskComment, value?.comments, isZendeskComment))
            , explainProperty("meta", explainZendeskMeta(value?.meta))
            , explainProperty("links", explainZendeskLinks(value?.links))
        ]
    );
}

export function stringifyZendeskCommentListDTO (value : ZendeskCommentListDTO) : string {
    return `ZendeskCommentListDTO(${value})`;
}

export function parseZendeskCommentListDTO (value: unknown) : ZendeskCommentListDTO | undefined {
    if (isZendeskCommentListDTO(value)) return value;
    return undefined;
}

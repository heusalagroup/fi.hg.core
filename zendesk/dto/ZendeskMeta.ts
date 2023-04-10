// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainBoolean, isBoolean } from "../../types/Boolean";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskMeta {
    readonly has_more : boolean;
    readonly after_cursor ?: string | null | undefined;
    readonly before_cursor ?: string | null | undefined;
}

export function createZendeskMeta (
    has_more : boolean,
    after_cursor ?: string | null | undefined,
    before_cursor ?: string | null | undefined
) : ZendeskMeta {
    return {
        has_more,
        after_cursor,
        before_cursor
    };
}

export function isZendeskMeta (value: unknown) : value is ZendeskMeta {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'has_more',
            'after_cursor',
            'before_cursor'
        ])
        && isBoolean(value?.has_more)
        && isStringOrNullOrUndefined(value?.after_cursor)
        && isStringOrNullOrUndefined(value?.before_cursor)
    );
}

export function explainZendeskMeta (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'has_more',
                'after_cursor',
                'before_cursor'
            ])
            , explainProperty("has_more", explainBoolean(value?.has_more))
            , explainProperty("after_cursor", explainStringOrNullOrUndefined(value?.after_cursor))
            , explainProperty("before_cursor", explainStringOrNullOrUndefined(value?.before_cursor))
        ]
    );
}

export function stringifyZendeskMeta (value : ZendeskMeta) : string {
    return `ZendeskMeta(${value})`;
}

export function parseZendeskMeta (value: unknown) : ZendeskMeta | undefined {
    if (isZendeskMeta(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskMetaOrUndefined (value: unknown): value is ZendeskMeta | undefined {
    return isZendeskMeta(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskMetaOrUndefined (value: any): string {
    return isZendeskMetaOrUndefined(value) ? explainOk() : explainNot('ZendeskMeta or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskMetaOrNullOrUndefined (value: unknown): value is ZendeskMeta | undefined | null {
    return isZendeskMeta(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskMetaOrNullOrUndefined (value: any): string {
    return isZendeskMetaOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskMeta or undefined or null');
}

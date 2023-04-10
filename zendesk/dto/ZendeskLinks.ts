// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskLinks {
    readonly next ?: string | null | undefined;
    readonly prev ?: string | null | undefined;
}

export function createZendeskLinks (
    next ?: string | null | undefined,
    prev ?: string | null | undefined,
) : ZendeskLinks {
    return {
        next,
        prev
    };
}

export function isZendeskLinks (value: unknown) : value is ZendeskLinks {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'next',
            'prev'
        ])
        && isStringOrNullOrUndefined(value?.next)
        && isStringOrNullOrUndefined(value?.prev)
    );
}

export function explainZendeskLinks (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'next',
                'prev'
            ])
            , explainProperty("next", explainStringOrNullOrUndefined(value?.next))
            , explainProperty("prev", explainStringOrNullOrUndefined(value?.prev))
        ]
    );
}

export function stringifyZendeskLinks (value : ZendeskLinks) : string {
    return `ZendeskLinks(${value})`;
}

export function parseZendeskLinks (value: unknown) : ZendeskLinks | undefined {
    if (isZendeskLinks(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskLinksOrUndefined (value: unknown): value is ZendeskLinks | undefined {
    return isZendeskLinks(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskLinksOrUndefined (value: any): string {
    return isZendeskLinksOrUndefined(value) ? explainOk() : explainNot('ZendeskLinks or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskLinksOrNullOrUndefined (value: unknown): value is ZendeskLinks | undefined | null {
    return isZendeskLinks(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskLinksOrNullOrUndefined (value: any): string {
    return isZendeskLinksOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskLinks or undefined or null');
}

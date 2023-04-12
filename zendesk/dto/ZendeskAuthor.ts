// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainStringOrNullOrUndefined, isStringOrNullOrUndefined } from "../../types/String";
import { explainNumberOrNullOrUndefined, isNumberOrNullOrUndefined } from "../../types/Number";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskAuthor {
    readonly email ?: string | null | undefined;
    readonly id    ?: number | null | undefined;
    readonly name  ?: string | null | undefined;
}

export function isZendeskAuthor (value: unknown) : value is ZendeskAuthor {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'email',
            'id',
            'name'
        ])
        && isStringOrNullOrUndefined(value?.email)
        && isNumberOrNullOrUndefined(value?.id)
        && isStringOrNullOrUndefined(value?.name)
    );
}

export function explainZendeskAuthor (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'email',
                'id',
                'name'
            ])
            , explainProperty("email", explainStringOrNullOrUndefined(value?.email))
            , explainProperty("id", explainNumberOrNullOrUndefined(value?.id))
            , explainProperty("name", explainStringOrNullOrUndefined(value?.name))
        ]
    );
}

export function stringifyZendeskAuthor (value : ZendeskAuthor) : string {
    return `ZendeskAuthor(${value})`;
}

export function parseZendeskAuthor (value: unknown) : ZendeskAuthor | undefined {
    if (isZendeskAuthor(value)) return value;
    return undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAuthorOrUndefined (value: unknown): value is ZendeskAuthor | undefined {
    return isZendeskAuthor(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAuthorOrUndefined (value: any): string {
    return isZendeskAuthorOrUndefined(value) ? explainOk() : explainNot('ZendeskAuthor or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskAuthorOrNullOrUndefined (value: unknown): value is ZendeskAuthor | undefined | null {
    return isZendeskAuthor(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskAuthorOrNullOrUndefined (value: any): string {
    return isZendeskAuthorOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskAuthor or undefined or null');
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainNot, explainOk, explainProperty } from "../../types/explain";
import { explainString, explainStringOrNullOrUndefined, isString, isStringOrNullOrUndefined } from "../../types/String";
import { explainNumberOrNullOrUndefined, isNumberOrNullOrUndefined } from "../../types/Number";
import { isUndefined } from "../../types/undefined";
import { isNull } from "../../types/Null";

export interface ZendeskSatisfactionRating {
    readonly comment ?: string | null | undefined;
    readonly id ?: number | null | undefined;
    readonly score : string;
}

export function createZendeskSatisfactionRating (
    score : string,
    comment ?: string,
    id ?: number
) : ZendeskSatisfactionRating {
    return {
        comment,
        id,
        score
    };
}

export function isZendeskSatisfactionRating (value: unknown) : value is ZendeskSatisfactionRating {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'comment',
            'id',
            'score'
        ])
        && isStringOrNullOrUndefined(value?.comment)
        && isNumberOrNullOrUndefined(value?.id)
        && isString(value?.score)
    );
}

export function explainZendeskSatisfactionRating (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'comment',
                'id',
                'score'
            ])
            , explainProperty("comment", explainStringOrNullOrUndefined(value?.comment))
            , explainProperty("id", explainNumberOrNullOrUndefined(value?.id))
            , explainProperty("score", explainString(value?.score))
        ]
    );
}

export function stringifyZendeskSatisfactionRating (value : ZendeskSatisfactionRating) : string {
    return `ZendeskSatisfactionRating(${value})`;
}

export function parseZendeskSatisfactionRating (value: unknown) : ZendeskSatisfactionRating | undefined {
    if (isZendeskSatisfactionRating(value)) return value;
    return undefined;
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskSatisfactionRatingOrUndefined (value: unknown): value is ZendeskSatisfactionRating | undefined {
    return isZendeskSatisfactionRating(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskSatisfactionRatingOrUndefined (value: any): string {
    return isZendeskSatisfactionRatingOrUndefined(value) ? explainOk() : explainNot('ZendeskSatisfactionRating or undefined');
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isZendeskSatisfactionRatingOrNullOrUndefined (value: unknown): value is ZendeskSatisfactionRating | undefined | null {
    return isZendeskSatisfactionRating(value) || isUndefined(value) || isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainZendeskSatisfactionRatingOrNullOrUndefined (value: any): string {
    return isZendeskSatisfactionRatingOrNullOrUndefined(value) ? explainOk() : explainNot('ZendeskSatisfactionRating or undefined or null');
}

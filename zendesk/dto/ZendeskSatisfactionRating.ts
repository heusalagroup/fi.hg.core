// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, explainNoOtherKeysInDevelopment, hasNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";
import { explain, explainProperty } from "../../types/explain";
import { explainString, isString } from "../../types/String";
import { explainNumber, isNumber } from "../../types/Number";

export interface ZendeskSatisfactionRating {
    readonly comment : string;
    readonly id : number;
    readonly score : string;
}

export function createZendeskSatisfactionRating (
    comment : string,
    id : number,
    score : string
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
        && isString(value?.comment)
        && isNumber(value?.id)
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
            , explainProperty("comment", explainString(value?.comment))
            , explainProperty("id", explainNumber(value?.id))
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

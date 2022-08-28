// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    hasNoOtherKeys,
    isRegularObject
} from "../../../modules/lodash";
import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "../../../../node/com/joker/dmapi/types/JokerStringObject";

/**
 *
 * @see https://joker.com/faq/content/79/455/en/query_whois.html
 */
export interface JokerComApiWhoisDTO {
    readonly body : JokerStringObject;
    readonly headers : JokerStringObject;
}

export function createJokerComApiWhoisDTO (
    headers: JokerStringObject,
    body : JokerStringObject
) : JokerComApiWhoisDTO {
    return {
        headers,
        body
    };
}

export function isJokerComApiWhoisDTO (value: any) : value is JokerComApiWhoisDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'headers',
            'body'
        ])
        && isJokerStringObject(value?.headers)
        && isJokerStringObject(value?.body)
    );
}

export function explainJokerComApiWhoisDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'headers',
                'body'
            ]),
            explainProperty("headers", explainJokerStringObject(value?.headers)),
            explainProperty("body", explainJokerStringObject(value?.body))
        ]
    );
}

export function stringifyJokerComApiWhoisDTO (value : JokerComApiWhoisDTO) : string {
    return `JokerComApiWhoisDTO(${value})`;
}

export function parseJokerComApiWhoisDTO (value: any) : JokerComApiWhoisDTO | undefined {
    if (isJokerComApiWhoisDTO(value)) return value;
    return undefined;
}

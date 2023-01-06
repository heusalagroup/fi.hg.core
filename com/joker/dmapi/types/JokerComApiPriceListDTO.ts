// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";
import { explainJokerComApiPriceListItem, isJokerComApiPriceListItem, JokerComApiPriceListItem } from "./JokerComApiPriceListItem";
import { explain, explainProperty } from "../../../../types/explain";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";
import { explainArrayOf, isArrayOf } from "../../../../types/Array";

/**
 *
 * @see https://joker.com/faq/content/79/455/en/query_whois.html
 */
export interface JokerComApiPriceListDTO {
    readonly headers : JokerStringObject;
    readonly body : readonly JokerComApiPriceListItem[];
}

export function createJokerComApiPriceListDTO (
    headers: JokerStringObject,
    body : readonly JokerComApiPriceListItem[]
) : JokerComApiPriceListDTO {
    return {
        headers,
        body
    };
}

export function isJokerComApiPriceListDTO (value: any) : value is JokerComApiPriceListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'headers',
            'body'
        ])
        && isJokerStringObject(value?.headers)
        && isArrayOf<JokerComApiPriceListItem>(value?.body, isJokerComApiPriceListItem)
    );
}

export function explainJokerComApiPriceListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'headers',
                'body'
            ]),
            explainProperty("headers", explainJokerStringObject(value?.headers)),
            explainProperty(
                "body",
                explainArrayOf<JokerComApiPriceListItem>(
                    "JokerComApiPriceListItem",
                    explainJokerComApiPriceListItem,
                    value?.body,
                    isJokerComApiPriceListItem
                )
            )
        ]
    );
}

export function stringifyJokerComApiPriceListDTO (value : JokerComApiPriceListDTO) : string {
    return `JokerComApiPriceListDTO(${value})`;
}

export function parseJokerComApiPriceListDTO (value: any) : JokerComApiPriceListDTO | undefined {
    if (isJokerComApiPriceListDTO(value)) return value;
    return undefined;
}

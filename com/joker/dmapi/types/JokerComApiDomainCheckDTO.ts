// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";
import { explainJokerComApiDomainStatus, isJokerComApiDomainStatus, JokerComApiDomainStatus } from "./JokerComApiDomainStatus";
import { explainJokerComApiDomainPrice, isJokerComApiDomainPrice, JokerComApiDomainPrice } from "./JokerComApiDomainPrice";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";
import { explainArrayOfOrUndefined, isArrayOfOrUndefined } from "../../../../types/Array";

/**
 *
 * @see https://joker.com/faq/content/27/497/en/domain_check.html
 */
export interface JokerComApiDomainCheckDTO {
    readonly domain        : string;
    readonly body          : JokerStringObject;
    readonly headers       : JokerStringObject;
    readonly status        : JokerComApiDomainStatus;
    readonly statusReason ?: string;
    readonly domainClass  ?: string;
    readonly prices       ?: readonly JokerComApiDomainPrice[];
}

export function createJokerComApiDomainCheckDTO (
    domain         : string,
    headers        : JokerStringObject,
    body           : JokerStringObject,
    status         : JokerComApiDomainStatus,
    statusReason  ?: string,
    domainClass   ?: string,
    prices        ?: readonly JokerComApiDomainPrice[]
) : JokerComApiDomainCheckDTO {
    return {
        domain,
        headers,
        body,
        status,
        statusReason,
        domainClass,
        prices
    };
}

export function isJokerComApiDomainCheckDTO (value: any) : value is JokerComApiDomainCheckDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'domain',
            'headers',
            'body',
            'status',
            'statusReason',
            'domainClass',
            'prices'
        ])
        && isString(value?.domain)
        && isJokerStringObject(value?.headers)
        && isJokerStringObject(value?.body)
        && isJokerComApiDomainStatus(value?.status)
        && isStringOrUndefined(value?.statusReason)
        && isStringOrUndefined(value?.domainClass)
        && isArrayOfOrUndefined<JokerComApiDomainPrice>(value?.prices, isJokerComApiDomainPrice)
    );
}

export function explainJokerComApiDomainCheckDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'domain',
                'headers',
                'body',
                'status',
                'statusReason',
                'domainClass',
                'prices'
            ]),
            explainProperty("domain", explainString(value?.domain)),
            explainProperty("headers", explainJokerStringObject(value?.headers)),
            explainProperty("body", explainJokerStringObject(value?.body)),
            explainProperty("status", explainJokerComApiDomainStatus(value?.status)),
            explainProperty("statusReason", explainStringOrUndefined(value?.statusReason)),
            explainProperty("domainClass", explainStringOrUndefined(value?.domainClass)),
            explainProperty("prices", explainArrayOfOrUndefined<JokerComApiDomainPrice>(
                "JokerComApiDomainPrice",
                explainJokerComApiDomainPrice,
                value?.domainClass,
                isJokerComApiDomainPrice
            ))
        ]
    );
}

export function stringifyJokerComApiDomainCheckDTO (value : JokerComApiDomainCheckDTO) : string {
    return `JokerComApiDomainCheckDTO(${value})`;
}

export function parseJokerComApiDomainCheckDTO (value: any) : JokerComApiDomainCheckDTO | undefined {
    if (isJokerComApiDomainCheckDTO(value)) return value;
    return undefined;
}

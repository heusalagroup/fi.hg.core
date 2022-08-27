// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainJokerComDomainStatus,
    isJokerComDomainStatus,
    JokerComDomainStatus,
    parseJokerComDomainStatus
} from "./JokerComDomainStatus";
import {
    explain,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    explainString,
    hasNoOtherKeys,
    isRegularObject,
    isString,
    startsWith
} from "../../../modules/lodash";

export interface JokerComWhoisDTO {
    readonly name   : string;
    readonly state  : JokerComDomainStatus;
}

export function createJokerComWhoisDTO (
    name   : string,
    state  : JokerComDomainStatus
) : JokerComWhoisDTO {
    return {
        name,
        state
    };
}

export function isJokerComWhoisDTO (value: any) : value is JokerComWhoisDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name',
            'state'
        ])
        && isString(value?.name)
        && isJokerComDomainStatus(value?.state)
    );
}

export function explainJokerComWhoisDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'name',
                'state'
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("state", explainJokerComDomainStatus(value?.state))
        ]
    );
}

export function stringifyJokerComWhoisDTO (value : JokerComWhoisDTO) : string {
    return `JokerWhoisDTO(${value})`;
}

/**
 *
 * @param value
 * @see https://joker.com/faq/content/85/437/en/check-domain-availability.html
 */
export function parseJokerComWhoisDTOFromString (value: string) : JokerComWhoisDTO | undefined {
    if (!startsWith(value, 'domain:')) {
        return undefined;
    }
    value = value.substring('domain:'.length);
    const parts = value.split(/\s+/);
    const name = parts.shift();
    return createJokerComWhoisDTO(
        name,
        parseJokerComDomainStatus(parts.shift()) ?? JokerComDomainStatus.UNKNOWN
    );
}

/**
 *
 * @param value
 * @see https://joker.com/faq/content/85/437/en/check-domain-availability.html
 */
export function parseJokerComWhoisDTO (value: any) : JokerComWhoisDTO | undefined {
    if (isString(value)) return parseJokerComWhoisDTOFromString(value);
    if (isJokerComWhoisDTO(value)) return value;
    return undefined;
}

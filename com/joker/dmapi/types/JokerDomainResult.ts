// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainProperty } from "../../../../types/explain";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../../../types/Boolean";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface JokerDomainResult {
    readonly domain      : string;
    readonly expiration  : string;
    readonly status     ?: string;
    readonly jokerns    ?: boolean;
    readonly grants     ?: string;
}

export function createJokerDomainResult (
    domain      : string,
    expiration  : string,
    status     ?: string,
    jokerns    ?: boolean,
    grants     ?: string,
) : JokerDomainResult {
    return {
        domain,
        expiration,
        status,
        jokerns,
        grants
    };
}

export function isJokerDomainResult (value: any) : value is JokerDomainResult {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'domain',
            'expiration',
            'status',
            'jokerns',
            'grants'
        ])
        && isString(value?.domain)
        && isString(value?.expiration)
        && isStringOrUndefined(value?.status)
        && isBooleanOrUndefined(value?.jokerns)
        && isStringOrUndefined(value?.grants)
    );
}

export function explainJokerDomainResult (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'domain',
                'expiration',
                'status',
                'jokerns',
                'grants'
            ])
            , explainProperty("domain", explainString(value?.domain))
            , explainProperty("expiration", explainString(value?.expiration))
            , explainProperty("status", explainStringOrUndefined(value?.status))
            , explainProperty("jokerns", explainBooleanOrUndefined(value?.jokerns))
            , explainProperty("grants", explainStringOrUndefined(value?.grants))
        ]
    );
}

export function stringifyJokerDomainResult (value : JokerDomainResult) : string {
    return `JokerDomainResult(${value})`;
}

export function parseJokerDomainResult (value: any) : JokerDomainResult | undefined {
    if (isJokerDomainResult(value)) return value;
    return undefined;
}

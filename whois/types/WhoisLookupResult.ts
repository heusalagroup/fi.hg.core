// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainProperty } from "../../types/explain";
import { explainString, isString } from "../../types/String";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";

export interface WhoisLookupResult {
    readonly server: string;
    readonly data: string;
}

export function createWhoisLookupResult (
    server: string,
    data: string
): WhoisLookupResult {
    return {
        server,
        data
    };
}

export function isWhoisLookupResult (value: any): value is WhoisLookupResult {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'server',
            'data'
        ])
        && isString(value?.server)
        && isString(value?.data)
    );
}

export function explainWhoisLookupResult (value: any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'server',
                'data'
            ]),
            explainProperty("server", explainString(value?.server)),
            explainProperty("data", explainString(value?.data))
        ]
    );
}

export function stringifyWhoisLookupResult (value: WhoisLookupResult): string {
    if ( !isWhoisLookupResult(value) ) throw new TypeError(`Not WhoisLookupResult: ${value}`);
    return `WhoisLookupResult(${value})`;
}

export function parseWhoisLookupResult (value: any): WhoisLookupResult | undefined {
    if ( isWhoisLookupResult(value) ) return value;
    return undefined;
}

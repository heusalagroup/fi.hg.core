// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainProperty } from "../../types/explain";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "../../types/Boolean";
import { explainStringOrUndefined, isStringOrUndefined } from "../../types/String";
import { explainNumberOrUndefined, isNumberOrUndefined } from "../../types/Number";
import { explainRegularObject, isRegularObject } from "../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../types/OtherKeys";

export interface WhoisServerOptions {
    readonly host?: string;
    readonly port?: number;
    readonly query?: string;
    readonly punycode?: boolean;
}

export function createWhoisServerOptions (
    host?: string,
    port?: number,
    query?: string,
    punycode?: boolean
): WhoisServerOptions {
    return {
        host,
        port,
        query,
        punycode
    };
}

export function isWhoisServerOptions (value: any): value is WhoisServerOptions {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'host',
            'port',
            'query',
            'punycode',
        ])
        && isStringOrUndefined(value?.host)
        && isNumberOrUndefined(value?.port)
        && isStringOrUndefined(value?.query)
        && isBooleanOrUndefined(value?.punycode)
    );
}

export function explainWhoisServerOptions (value: any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'host',
                'port',
                'query',
                'punycode',
            ]),
            explainProperty("host", explainStringOrUndefined(value?.host)),
            explainProperty("port", explainNumberOrUndefined(value?.port)),
            explainProperty("query", explainStringOrUndefined(value?.query)),
            explainProperty("punycode", explainBooleanOrUndefined(value?.punycode))
        ]
    );
}

export function stringifyWhoisServerOptions (value: WhoisServerOptions): string {
    if ( !isWhoisServerOptions(value) ) throw new TypeError(`Not WhoisServerOptions: ${value}`);
    return `WhoisServerOptions(${value})`;
}

export function parseWhoisServerOptions (value: any): WhoisServerOptions | undefined {
    if ( isWhoisServerOptions(value) ) return value;
    return undefined;
}

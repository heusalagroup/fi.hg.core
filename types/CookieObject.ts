// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainProperty } from "./explain";
import { explainRegularObject, isRegularObject } from "./RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "./OtherKeys";
import { explainSameSiteOrUndefined, isSameSiteOrUndefined, parseSameSite, SameSite } from "./SameSite";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "./String";
import { explainBooleanOrUndefined, isBooleanOrUndefined } from "./Boolean";
import { trim } from "../functions/trim";
import { split } from "../functions/split";
import { map } from "../functions/map";
import { trimStart } from "../functions/trimStart";
import { reduce } from "../functions/reduce";
import { LogService } from "../LogService";
import { explainNumberOrUndefined, isNumberOrUndefined, parseInteger } from "./Number";

const LOG = LogService.createLogger('CookieObject');

export interface CookieObject {

    readonly name : string;
    readonly value ?: string;
    readonly domain ?: string;
    readonly path ?: string;
    readonly httpOnly ?: boolean;
    readonly secure ?: boolean;
    readonly expires ?: string;
    readonly maxAge ?: number;
    readonly sameSite ?: SameSite;

}

export function createCookieObject (
    name : string,
    value : string,
    domain : string,
    path : string,
    httpOnly : boolean,
    secure : boolean,
    expires : string,
    maxAge : number,
    sameSite : SameSite
) : CookieObject {
    return {
        path,
        name,
        value,
        domain,
        httpOnly,
        secure,
        expires,
        maxAge,
        sameSite
    };
}

export function isCookieObject (value: unknown) : value is CookieObject {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'path',
            'name',
            'value',
            'domain',
            'httpOnly',
            'secure',
            'expires',
            'maxAge',
            'sameSite'
        ])
        && isString(value?.name)
        && isStringOrUndefined(value?.value)
        && isStringOrUndefined(value?.path)
        && isStringOrUndefined(value?.domain)
        && isBooleanOrUndefined(value?.httpOnly)
        && isBooleanOrUndefined(value?.secure)
        && isStringOrUndefined(value?.expires)
        && isNumberOrUndefined(value?.maxAge)
        && isSameSiteOrUndefined(value?.sameSite)
    );
}

export function explainCookieObject (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'path',
                'name',
                'value',
                'domain',
                'httpOnly',
                'secure',
                'expires',
                'maxAge',
                'sameSite'
            ])
            , explainProperty("path", explainStringOrUndefined(value?.path))
            , explainProperty("name", explainString(value?.name))
            , explainProperty("value", explainStringOrUndefined(value?.value))
            , explainProperty("domain", explainStringOrUndefined(value?.domain))
            , explainProperty("httpOnly", explainBooleanOrUndefined(value?.httpOnly))
            , explainProperty("secure", explainBooleanOrUndefined(value?.secure))
            , explainProperty("expires", explainStringOrUndefined(value?.expires))
            , explainProperty("maxAge", explainNumberOrUndefined(value?.maxAge))
            , explainProperty("sameSite", explainSameSiteOrUndefined(value?.sameSite))
        ]
    );
}

export function stringifyCookieObject (value : CookieObject) : string {
    return `CookieObject(${value})`;
}

export function parseCookieObject (value: unknown) : CookieObject | undefined {
    if (isString(value)) {
        const pairs = map(split(trim(value), ';'), trimStart);
        const firstPair = pairs.shift();
        if (!firstPair) return undefined;
        const [name, cookieValue] = parseCookiePair(firstPair);
        const cookie : CookieObject = {
            name,
            value: cookieValue
        };
        return reduce(
            pairs,
            (obj: CookieObject, param: string) : CookieObject => {
                const [paramKey, paramValue] = parseCookiePair(param);
                switch(paramKey.toLowerCase()) {

                    case 'samesite': return {
                        ...obj,
                        sameSite: parseSameSite(paramValue)
                    };

                    case 'path': return {
                        ...obj,
                        path: paramValue
                    };

                    case 'max-age': return {
                        ...obj,
                        maxAge: parseInteger(paramValue)
                    };

                    case 'domain': return {
                        ...obj,
                        domain: paramValue
                    };

                    case 'secure': return {
                        ...obj,
                        secure: true
                    };

                    case 'httponly': return {
                        ...obj,
                        httpOnly: true
                    };

                    case 'expires': return {
                        ...obj,
                        expires: paramValue
                    };

                }
                LOG.warn(`Warning! Could not understand "${paramKey}=${paramValue}"`);
                return obj;
            },
            cookie
        );
    }
    if (isCookieObject(value)) return value;
    return undefined;
}

/**
 * This is exported only so that it can be unit tested.
 *
 * You should use `parseCookieObject()` instead -- or publish more generic utility
 * function under functions.
 *
 * @param line
 */
export function parseCookiePair (
    line: string
) : [string, string|undefined] {
    const i = line.indexOf('=');
    if (i >= 0) {
        const name = line.substring(0, i);
        const value = line.substring(i + 1);
        return [name, value];
    }
    return [line, undefined];
}
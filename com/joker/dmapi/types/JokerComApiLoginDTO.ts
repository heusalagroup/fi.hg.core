// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    explainString,
    explainStringArray,
    hasNoOtherKeys,
    isRegularObject,
    isString,
    isStringArray
} from "../../../../modules/lodash";
import { explainJokerStringObject, isJokerStringObject, JokerStringObject } from "./JokerStringObject";

/**
 * @see https://joker.com/faq/content/26/14/en/login.html
 */
export interface JokerComApiLoginDTO {

    readonly authSID : string;

    readonly uid : string;

    /**
     * List of domain TLDs which are available to the reseller.
     */
    readonly tldList : readonly string[];

    readonly headers ?: JokerStringObject;

}

export function createJokerComApiLoginDTO (
    authSID  : string,
    uid      : string,
    tldList  : readonly string[],
    headers ?: JokerStringObject
) : JokerComApiLoginDTO {
    return {
        authSID,
        uid,
        tldList,
        headers
    };
}

export function isJokerComApiLoginDTO (value: any) : value is JokerComApiLoginDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'authSID',
            'uid',
            'tldList',
            'headers'
        ])
        && isString(value?.authSID)
        && isString(value?.uid)
        && isStringArray(value?.tldList)
        && isJokerStringObject(value?.headers)
    );
}

export function explainJokerComApiLoginDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'authSID',
                'uid',
                'tldList',
                'headers'
            ]),
            explainProperty("authSID", explainString(value?.authSID)),
            explainProperty("uid", explainStringArray(value?.uid)),
            explainProperty("tldList", explainStringArray(value?.tldList)),
            explainProperty("headers", explainJokerStringObject(value?.headers))
        ]
    );
}

export function stringifyJokerComApiLoginDTO (value : JokerComApiLoginDTO) : string {
    return `JokerComApiLoginDTO(${value})`;
}

export function parseJokerComApiLoginDTO (value: any) : JokerComApiLoginDTO | undefined {
    if (isJokerComApiLoginDTO(value)) return value;
    return undefined;
}

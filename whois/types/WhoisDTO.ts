// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNoOtherKeys, explainRegularObject, hasNoOtherKeys, isRegularObject } from "../../modules/lodash";

export interface WhoisDTO {
    readonly server : string;
}

export function createWhoisDTO (
) : WhoisDTO {
    return {

    };
}

export function isWhoisDTO (value: any) : value is WhoisDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            ''
        ])
        //&& isString(value?.foo)
    );
}

export function explainWhoisDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                ''
            ]),
            //explainProperty("foo", explainString(value?.foo))
        ]
    );
}

export function stringifyWhoisDTO (value : WhoisDTO) : string {
    return `WhoisDTO(${value})`;
}

export function parseWhoisDTO (value: any) : WhoisDTO | undefined {
    if (isWhoisDTO(value)) return value;
    return undefined;
}

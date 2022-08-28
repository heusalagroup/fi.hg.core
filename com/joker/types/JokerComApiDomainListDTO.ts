// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explainJokerDomainResult,
    isJokerDomainResult,
    JokerDomainResult
} from "../../../../node/com/joker/dmapi/types/JokerDomainResult";
import {
    explain,
    explainArrayOf,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    hasNoOtherKeys,
    isArrayOf,
    isRegularObject
} from "../../../modules/lodash";

export interface JokerComApiDomainListDTO {
    readonly domainList : readonly JokerDomainResult[];
}

export function createJokerComApiDomainListDTO (
    domainList : readonly JokerDomainResult[]
) : JokerComApiDomainListDTO {
    return {
        domainList
    };
}

export function isJokerComApiDomainListDTO (value: any) : value is JokerComApiDomainListDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'domainList'
        ])
        && isArrayOf<JokerDomainResult>(value?.domainList, isJokerDomainResult)
    );
}

export function explainJokerComApiDomainListDTO (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'domainList'
            ]),
            explainProperty(
                "domainList",
                explainArrayOf<JokerDomainResult>(
                    "JokerDomainResult",
                    explainJokerDomainResult,
                    value?.domainList,
                    isJokerDomainResult
                )
            )
        ]
    );
}

export function stringifyJokerComApiDomainListDTO (value : JokerComApiDomainListDTO) : string {
    return `JokerComApiDomainListDTO(${value})`;
}

export function parseJokerComApiDomainListDTO (value: any) : JokerComApiDomainListDTO | undefined {
    if (isJokerComApiDomainListDTO(value)) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { WhoisLookupResult } from "./WhoisLookupResult";

export interface WhoisDTO {
    readonly payload : readonly WhoisLookupResult[];
}

export function createWhoisDTO (
    payload: readonly WhoisLookupResult[]
) : WhoisDTO {
    return {
        payload
    };
}

// export function isWhoisDTO (value: any) : value is WhoisDTO {
//     return (
//         isRegularObject(value)
//         && hasNoOtherKeys(value, [
//             'payload'
//         ])
//         && isString(value?.foo)
//     );
// }
//
// export function explainWhoisDTO (value: any) : string {
//     return explain(
//         [
//             explainRegularObject(value),
//             explainNoOtherKeys(value, [
//                 ''
//             ]),
//             explainProperty("foo", explainString(value?.foo))
//         ]
//     );
// }
//
// export function stringifyWhoisDTO (value : WhoisDTO) : string {
//     return `WhoisDTO(${value})`;
// }
//
// export function parseWhoisDTO (value: any) : WhoisDTO | undefined {
//     if (isWhoisDTO(value)) return value;
//     return undefined;
// }

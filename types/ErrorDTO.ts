// Copyright (c) 2022. <info@heusalagroup.fi>. All rights reserved.
//

import { explain, explainProperty } from "./explain";
import { explainString, isString } from "./String";
import { explainNumberOrUndefined, isNumberOrUndefined } from "./Number";
import { explainRegularObject, isRegularObject } from "./RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "./OtherKeys";

export interface ErrorDTO {
    readonly error  : string;
    readonly code  ?: number;
}

export function createErrorDTO (
    error  : string,
    code  ?: number
) : ErrorDTO {
    return {
        error,
        code
    };
}

export function isErrorDTO (value: any): value is ErrorDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'error',
            'code'
        ])
        && isString(value?.error)
        && isNumberOrUndefined(value?.code)
    );
}

export function explainErrorDTO (value : any): string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'error',
                'code'
            ]),
            explainProperty("error", explainString(value?.error)),
            explainProperty("code", explainNumberOrUndefined(value?.code))
        ]
    );
}

export function stringifyErrorDTO (value: ErrorDTO): string {
    return `ErrorDTO(${value})`;
}

export function parseErrorDTO (value: any) : ErrorDTO | undefined {
    if ( isErrorDTO(value) ) return value;
    return undefined;
}

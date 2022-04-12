// Copyright (c) 2022. <info@heusalagroup.fi>. All rights reserved.
//

import {
    hasNoOtherKeys,
    isNumberOrUndefined,
    isRegularObject,
    isString
} from "../modules/lodash";

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
        && hasNoOtherKeys(value, [
            'error',
            'code'
        ])
        && isString(value?.error)
        && isNumberOrUndefined(value?.code)
    );
}

export function stringifyErrorDTO (value: ErrorDTO): string {
    return `ErrorDTO(${value})`;
}

export function parseErrorDTO (value: any) : ErrorDTO | undefined {
    if ( isErrorDTO(value) ) return value;
    return undefined;
}

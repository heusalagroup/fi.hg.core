// Copyright (c) 2022. <info@heusalagroup.fi>. All rights reserved.
//

import {
    hasNoOtherKeys,
    isBooleanOrUndefined,
    isRegularObject,
    isString
} from "../../../modules/lodash";

export interface EmailTokenDTO {
    readonly token     : string;
    readonly email     : string;
    readonly verified ?: boolean;
}

export function isEmailTokenDTO (value: any): value is EmailTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'token',
            'email',
            'verified'
        ])
        && isString(value?.token)
        && isString(value?.email)
        && isBooleanOrUndefined(value?.verified)
    );
}

export function stringifyEmailTokenDTO (value: EmailTokenDTO): string {
    return `EmailTokenDTO(${value})`;
}

export function parseEmailTokenDTO (value: any): EmailTokenDTO | undefined {
    if ( isEmailTokenDTO(value) ) return value;
    return undefined;
}

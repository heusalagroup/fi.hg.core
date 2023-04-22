// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface EmailTokenDTO {
    readonly token     : string;
    readonly email     : string;
    readonly verified ?: boolean | undefined;
}

export function isEmailTokenDTO (value: any): value is EmailTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
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

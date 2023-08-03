// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface AuthenticateEmailDTO {
    readonly email : string;
}

export function createAuthenticateEmailDTO (email: string) : AuthenticateEmailDTO {
    return {email};
}

export function isAuthenticateEmailDTO (value: any): value is AuthenticateEmailDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'email'
        ])
        && isString(value?.email)
    );
}

export function stringifyAuthenticateEmailDTO (value: AuthenticateEmailDTO): string {
    return JSON.stringify(value);
}

export function parseAuthenticateEmailDTO (value: any): AuthenticateEmailDTO | undefined {
    if ( isAuthenticateEmailDTO(value) ) return value;
    return undefined;
}

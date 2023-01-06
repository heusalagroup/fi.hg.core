// Copyright (c) 2022. <info@heusalagroup.fi>. All rights reserved.
//

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface AuthenticateEmailDTO {
    readonly email : string;
}

export function createAuthenticateEmailDTO (email: string) : AuthenticateEmailDTO {
    return {email};
}

export function isAuthenticateEmailDTO (value: any): value is AuthenticateEmailDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'email'
        ])
        && isString(value?.email)
    );
}

export function stringifyAuthenticateEmailDTO (value: AuthenticateEmailDTO): string {
    return `AuthenticateEmailDTO(${value})`;
}

export function parseAuthenticateEmailDTO (value: any): AuthenticateEmailDTO | undefined {
    if ( isAuthenticateEmailDTO(value) ) return value;
    return undefined;
}

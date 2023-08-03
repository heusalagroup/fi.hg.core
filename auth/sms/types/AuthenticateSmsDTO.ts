// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface AuthenticateSmsDTO {
    readonly sms : string;
}

export function createAuthenticateSmsDTO (sms: string) : AuthenticateSmsDTO {
    return {sms};
}

export function isAuthenticateSmsDTO (value: any): value is AuthenticateSmsDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'sms'
        ])
        && isString(value?.sms)
    );
}

export function stringifyAuthenticateSmsDTO (value: AuthenticateSmsDTO): string {
    return JSON.stringify(value);
}

export function parseAuthenticateSmsDTO (value: any): AuthenticateSmsDTO | undefined {
    if ( isAuthenticateSmsDTO(value) ) return value;
    return undefined;
}

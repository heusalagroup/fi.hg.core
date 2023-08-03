// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.

import {
    EmailTokenDTO,
    isEmailTokenDTO
} from "./EmailTokenDTO";
import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface VerifyEmailCodeDTO {
    readonly token : EmailTokenDTO;
    readonly code  : string;
}

export function createVerifyEmailCodeDTO (
    token : EmailTokenDTO,
    code  : string
) {
    return {
        token,
        code
    };
}

export function isVerifyEmailCodeDTO (value: any): value is VerifyEmailCodeDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'token',
            'code'
        ])
        && isEmailTokenDTO(value?.token)
        && isString(value?.code)
    );
}

export function stringifyVerifyEmailCodeDTO (value: VerifyEmailCodeDTO): string {
    return `VerifyEmailCodeDTO(${value})`;
}

export function parseVerifyEmailCodeDTO (value: any): VerifyEmailCodeDTO | undefined {
    if ( isVerifyEmailCodeDTO(value) ) return value;
    return undefined;
}

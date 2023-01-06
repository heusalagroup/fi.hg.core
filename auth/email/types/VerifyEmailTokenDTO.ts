// Copyright (c) 2022. <info@heusalagroup.fi>. All rights reserved.

import {
    EmailTokenDTO,
    isEmailTokenDTO
} from "./EmailTokenDTO";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeys } from "../../../types/OtherKeys";

export interface VerifyEmailTokenDTO {
    readonly token : EmailTokenDTO;
}

export function createVerifyEmailTokenDTO (
    token: EmailTokenDTO
) : VerifyEmailTokenDTO {
    return {token};
}

export function isVerifyEmailTokenDTO (value: any): value is VerifyEmailTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'token'
        ])
        && isEmailTokenDTO(value?.token)
    );
}

export function stringifyVerifyEmailTokenDTO (value: VerifyEmailTokenDTO): string {
    return `VerifyEmailTokenDTO(${value})`;
}

export function parseVerifyEmailTokenDTO (value: any): VerifyEmailTokenDTO | undefined {
    if ( isVerifyEmailTokenDTO(value) ) return value;
    return undefined;
}



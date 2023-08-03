// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import {
    EmailTokenDTO,
    isEmailTokenDTO
} from "./EmailTokenDTO";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface VerifyEmailTokenDTO {
    readonly token : EmailTokenDTO;
}

export function createVerifyEmailTokenDTO (
    token: EmailTokenDTO
) : VerifyEmailTokenDTO {
    return {token};
}

export function isVerifyEmailTokenDTO (value: unknown): value is VerifyEmailTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
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

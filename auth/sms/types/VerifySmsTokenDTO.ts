// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import {
    SmsTokenDTO,
    isSmsTokenDTO
} from "./SmsTokenDTO";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface VerifySmsTokenDTO {
    readonly token : SmsTokenDTO;
}

export function createVerifySmsTokenDTO (
    token: SmsTokenDTO
) : VerifySmsTokenDTO {
    return {token};
}

export function isVerifySmsTokenDTO (value: unknown): value is VerifySmsTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'token'
        ])
        && isSmsTokenDTO(value?.token)
    );
}

export function stringifyVerifySmsTokenDTO (value: VerifySmsTokenDTO): string {
    return `VerifySmsTokenDTO(${value})`;
}

export function parseVerifySmsTokenDTO (value: any): VerifySmsTokenDTO | undefined {
    if ( isVerifySmsTokenDTO(value) ) return value;
    return undefined;
}

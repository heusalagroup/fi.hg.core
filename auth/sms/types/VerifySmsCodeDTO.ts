// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.

import {
    SmsTokenDTO,
    isSmsTokenDTO
} from "./SmsTokenDTO";
import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";

export interface VerifySmsCodeDTO {
    readonly token : SmsTokenDTO;
    readonly code  : string;
}

export function createVerifySmsCodeDTO (
    token : SmsTokenDTO,
    code  : string
) {
    return {
        token,
        code
    };
}

export function isVerifySmsCodeDTO (value: any): value is VerifySmsCodeDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'token',
            'code'
        ])
        && isSmsTokenDTO(value?.token)
        && isString(value?.code)
    );
}

export function stringifyVerifySmsCodeDTO (value: VerifySmsCodeDTO): string {
    return `VerifySmsCodeDTO(${value})`;
}

export function parseVerifySmsCodeDTO (value: any): VerifySmsCodeDTO | undefined {
    if ( isVerifySmsCodeDTO(value) ) return value;
    return undefined;
}

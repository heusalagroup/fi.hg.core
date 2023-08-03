// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isUndefined } from "../../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../../types/explain";

export interface SmsTokenDTO {
    readonly token     : string;
    readonly sms       : string;
    readonly verified ?: boolean | undefined;
}

export function createSmsTokenDTO (
    token     : string,
    sms       : string,
    verified ?: boolean | undefined,
) {
    return {
        token,
        sms,
        verified,
    };
}

export function isSmsTokenDTO (value: any): value is SmsTokenDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'token',
            'sms',
            'verified'
        ])
        && isString(value?.token)
        && isString(value?.sms)
        && isBooleanOrUndefined(value?.verified)
    );
}

export function stringifySmsTokenDTO (value: SmsTokenDTO): string {
    return JSON.stringify(value);
}

export function parseSmsTokenDTO (value: any): SmsTokenDTO | undefined {
    if ( isSmsTokenDTO(value) ) return value;
    return undefined;
}

export function isSmsTokenDTOOrUndefined (value: unknown): value is SmsTokenDTO | undefined {
    return isUndefined(value) || isSmsTokenDTO(value);
}

export function explainSmsTokenDTOOrUndefined (value: unknown): string {
    return isSmsTokenDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['SmsTokenDTO', 'undefined']));
}

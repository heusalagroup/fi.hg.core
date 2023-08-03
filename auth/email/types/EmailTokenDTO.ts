// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2022-2023. <info@sendanor.fi>. All rights reserved.

import { isBooleanOrUndefined } from "../../../types/Boolean";
import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isUndefined } from "../../../types/undefined";
import { explainNot, explainOk, explainOr } from "../../../types/explain";

export interface EmailTokenDTO {
    readonly token     : string;
    readonly email     : string;
    readonly verified ?: boolean | undefined;
}

export function createEmailTokenDTO (
    token     : string,
    email     : string,
    verified ?: boolean | undefined,
) {
    return {
        token,
        email,
        verified,
    };
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
    return JSON.stringify(value);
}

export function parseEmailTokenDTO (value: any): EmailTokenDTO | undefined {
    if ( isEmailTokenDTO(value) ) return value;
    return undefined;
}

export function isEmailTokenDTOOrUndefined (value: unknown): value is EmailTokenDTO | undefined {
    return isUndefined(value) || isEmailTokenDTO(value);
}

export function explainEmailTokenDTOOrUndefined (value: unknown): string {
    return isEmailTokenDTOOrUndefined(value) ? explainOk() : explainNot(explainOr(['EmailTokenDTO', 'undefined']));
}

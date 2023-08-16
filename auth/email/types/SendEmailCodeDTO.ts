// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import { isString } from "../../../types/String";
import { isRegularObject } from "../../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../../types/OtherKeys";
import { isLanguage, Language } from "../../../types/Language";
import { EmailTokenDTO, isEmailTokenDTO } from "./EmailTokenDTO";

export interface sendEmailCodeDTO {
    readonly token : EmailTokenDTO;
    readonly code  : string;
    readonly lang  : Language;
}

export function createSendEmailCodeDTO (
    token : EmailTokenDTO,
    code  : string,
    lang  : Language
) {
    return {
        token,
        code,
        lang
    };
}

export function isSendEmailCodeDTO (value: any): value is sendEmailCodeDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'token',
            'code',
            'lang'
        ])
        && isEmailTokenDTO(value?.token)
        && isString(value?.code)
        && isLanguage(value?.lang)
    );
}

export function stringifySendEmailCodeDTO (value: sendEmailCodeDTO): string {
    return `SendEmailCode(${value})`;
}

export function parseSendEmailCodeDTO (value: any): sendEmailCodeDTO | undefined {
    if ( isSendEmailCodeDTO(value) ) return value;
    return undefined;
}

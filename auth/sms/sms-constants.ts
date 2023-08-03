// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Language } from "../../types/Language";
import { AuthSmsQueryParam } from "./types/AuthSmsQueryParam";

/**
 * Callback that uses AuthSmsQueryParam.LANGUAGE as language query parameter
 */
export interface CallbackWithLanguage {
    (lang : Language) : string;
}

export const AUTHENTICATE_SMS_URL : CallbackWithLanguage = (lang: Language) => `/api/authenticateSms?${AuthSmsQueryParam.LANGUAGE}=${q(lang)}`;
export const VERIFY_SMS_CODE_URL : CallbackWithLanguage = (lang: Language) => `/api/verifySmsCode?${AuthSmsQueryParam.LANGUAGE}=${q(lang)}`;
export const VERIFY_SMS_TOKEN_URL : CallbackWithLanguage = (lang: Language) => `/api/verifySmsToken?${AuthSmsQueryParam.LANGUAGE}=${q(lang)}`;

function q (value: string) : string {
    return encodeURIComponent(value);
}

// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Language } from "../../types/Language";
import { AuthEmailQueryParam } from "./types/AuthEmailQueryParam";

/**
 * Callback that uses AuthEmailQueryParam.LANGUAGE as language query parameter
 */
export interface CallbackWithLanguage {
    (lang : Language) : string;
}

export const AUTHENTICATE_EMAIL_URL : CallbackWithLanguage = (lang: Language) => `/api/authenticateEmail?${AuthEmailQueryParam.LANGUAGE}=${q(lang)}`;
export const VERIFY_EMAIL_CODE_URL : CallbackWithLanguage = (lang: Language) => `/api/verifyEmailCode?${AuthEmailQueryParam.LANGUAGE}=${q(lang)}`;
export const VERIFY_EMAIL_TOKEN_URL : CallbackWithLanguage = (lang: Language) => `/api/verifyEmailToken?${AuthEmailQueryParam.LANGUAGE}=${q(lang)}`;

function q (value: string) : string {
    return encodeURIComponent(value);
}

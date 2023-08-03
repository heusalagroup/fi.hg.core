// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021-2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { EmailTokenDTO, isEmailTokenDTO } from "./auth/email/types/EmailTokenDTO";
import { Language } from "./types/Language";
import { LanguageService } from "./LanguageService";
import { HttpService } from "./HttpService";
import { LogService } from "./LogService";
import { createVerifyEmailCodeDTO, VerifyEmailCodeDTO } from "./auth/email/types/VerifyEmailCodeDTO";
import { ReadonlyJsonAny } from "./Json";
import { CallbackWithLanguage, AUTHENTICATE_EMAIL_URL, VERIFY_EMAIL_CODE_URL, VERIFY_EMAIL_TOKEN_URL } from "./auth/email/email-auth-constants";
import { LogLevel } from "./types/LogLevel";
import { createVerifyEmailTokenDTO, VerifyEmailTokenDTO } from "./auth/email/types/VerifyEmailTokenDTO";
import { createAuthenticateEmailDTO } from "./auth/email/types/AuthenticateEmailDTO";

const LOG = LogService.createLogger('EmailAuthHttpService');

/**
 * This is a client service for email address based user authentication over
 * HTTP protocol.
 */
export class EmailAuthHttpService {

    private static _authenticateEmailUrl : CallbackWithLanguage = AUTHENTICATE_EMAIL_URL;
    private static _verifyEmailCodeUrl   : CallbackWithLanguage = VERIFY_EMAIL_CODE_URL;
    private static _verifyEmailTokenUrl  : CallbackWithLanguage = VERIFY_EMAIL_TOKEN_URL;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static initialize (
        authenticateEmailUrl : CallbackWithLanguage = AUTHENTICATE_EMAIL_URL,
        verifyEmailCodeUrl   : CallbackWithLanguage = VERIFY_EMAIL_CODE_URL,
        verifyEmailTokenUrl  : CallbackWithLanguage = VERIFY_EMAIL_TOKEN_URL
    ) {
        this._authenticateEmailUrl = authenticateEmailUrl;
        this._verifyEmailCodeUrl = verifyEmailCodeUrl;
        this._verifyEmailTokenUrl = verifyEmailTokenUrl;
    }

    public static async authenticateEmailAddress (
        email : string,
        language ?: Language
    ) : Promise<EmailTokenDTO> {
        const lang : Language = language ?? LanguageService.getCurrentLanguage();
        const body = createAuthenticateEmailDTO(email);
        return await this._postJson(
            this._authenticateEmailUrl(lang),
            body as unknown as ReadonlyJsonAny
        );
    }

    public static async verifyEmailToken (
        emailToken  : EmailTokenDTO,
        language   ?: Language
    ) : Promise<EmailTokenDTO> {
        const lang : Language = language ?? LanguageService.getCurrentLanguage();
        const body : VerifyEmailTokenDTO = createVerifyEmailTokenDTO(emailToken);
        return await this._postJson(
            this._verifyEmailTokenUrl(lang),
            body as unknown as ReadonlyJsonAny
        );
    }

    public static async verifyEmailCode (
        token : EmailTokenDTO,
        code: string,
        language ?: Language
    ) : Promise<EmailTokenDTO> {
        const lang : Language = language ?? LanguageService.getCurrentLanguage();
        const body : VerifyEmailCodeDTO = createVerifyEmailCodeDTO(token, code);
        return await this._postJson(
            this._verifyEmailCodeUrl(lang),
            body as unknown as ReadonlyJsonAny
        );
    }

    private static async _postJson (
        url  : string,
        body : ReadonlyJsonAny
    ) : Promise<EmailTokenDTO> {
        const response : unknown = await HttpService.postJson(url, body);
        if (!isEmailTokenDTO(response)) {
            LOG.debug(`Response: `, response);
            throw new TypeError(`Response was not EmailTokenDTO`);
        }
        return response;
    }

}

// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.
// Copyright (c) 2021-2023. Sendanor <info@sendanor.fi>. All rights reserved.

import { SmsTokenDTO, isSmsTokenDTO } from "./auth/sms/types/SmsTokenDTO";
import { Language } from "./types/Language";
import { LanguageService } from "./LanguageService";
import { HttpService } from "./HttpService";
import { LogService } from "./LogService";
import { createVerifySmsCodeDTO, VerifySmsCodeDTO } from "./auth/sms/types/VerifySmsCodeDTO";
import { ReadonlyJsonAny } from "./Json";
import { CallbackWithLanguage, AUTHENTICATE_SMS_URL, VERIFY_SMS_CODE_URL, VERIFY_SMS_TOKEN_URL } from "./auth/sms/sms-auth-constants";
import { LogLevel } from "./types/LogLevel";
import { createVerifySmsTokenDTO, VerifySmsTokenDTO } from "./auth/sms/types/VerifySmsTokenDTO";
import { createAuthenticateSmsDTO } from "./auth/sms/types/AuthenticateSmsDTO";

const LOG = LogService.createLogger('SmsAuthHttpService');

/**
 * This is a client service for sms address based user authentication over
 * HTTP protocol.
 */
export class SmsAuthHttpService {

    private static _authenticateSmsUrl : CallbackWithLanguage = AUTHENTICATE_SMS_URL;
    private static _verifySmsCodeUrl   : CallbackWithLanguage = VERIFY_SMS_CODE_URL;
    private static _verifySmsTokenUrl  : CallbackWithLanguage = VERIFY_SMS_TOKEN_URL;

    public static setLogLevel (level: LogLevel) {
        LOG.setLogLevel(level);
    }

    public static initialize (
        authenticateSmsUrl : CallbackWithLanguage = AUTHENTICATE_SMS_URL,
        verifySmsCodeUrl   : CallbackWithLanguage = VERIFY_SMS_CODE_URL,
        verifySmsTokenUrl  : CallbackWithLanguage = VERIFY_SMS_TOKEN_URL
    ) {
        this._authenticateSmsUrl = authenticateSmsUrl;
        this._verifySmsCodeUrl = verifySmsCodeUrl;
        this._verifySmsTokenUrl = verifySmsTokenUrl;
    }

    public static async authenticateSmsAddress (
        sms : string,
        language ?: Language
    ) : Promise<SmsTokenDTO> {
        const lang : Language = language ?? LanguageService.getCurrentLanguage();
        const body = createAuthenticateSmsDTO(sms);
        return await this._postJson(
            this._authenticateSmsUrl(lang),
            body as unknown as ReadonlyJsonAny
        );
    }

    public static async verifySmsToken (
        smsToken  : SmsTokenDTO,
        language   ?: Language
    ) : Promise<SmsTokenDTO> {
        const lang : Language = language ?? LanguageService.getCurrentLanguage();
        const body : VerifySmsTokenDTO = createVerifySmsTokenDTO(smsToken);
        return await this._postJson(
            this._verifySmsTokenUrl(lang),
            body as unknown as ReadonlyJsonAny
        );
    }

    public static async verifySmsCode (
        token : SmsTokenDTO,
        code: string,
        language ?: Language
    ) : Promise<SmsTokenDTO> {
        const lang : Language = language ?? LanguageService.getCurrentLanguage();
        const body : VerifySmsCodeDTO = createVerifySmsCodeDTO(token, code);
        return await this._postJson(
            this._verifySmsCodeUrl(lang),
            body as unknown as ReadonlyJsonAny
        );
    }

    private static async _postJson (
        url  : string,
        body : ReadonlyJsonAny
    ) : Promise<SmsTokenDTO> {
        const response : unknown = await HttpService.postJson(url, body);
        if (!isSmsTokenDTO(response)) {
            LOG.debug(`Response: `, response);
            throw new TypeError(`Response was not SmsTokenDTO`);
        }
        return response;
    }

}

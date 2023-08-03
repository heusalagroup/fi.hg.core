// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonAny } from "../Json";
import { ResponseEntity } from "../request/types/ResponseEntity";
import { ErrorDTO } from "../types/ErrorDTO";
import { Language } from "../types/Language";
import { SmsTokenDTO } from "./sms/types/SmsTokenDTO";

/**
 * This HTTP backend controller can be used to validate the ownership of user's
 * sms address.
 *
 *  1. Call .authenticateSms(body, lang) to send the authentication sms
 *  2. Call .verifySmsCode(body) to verify user supplied code from the sms and create a session JWT
 *  3. Call .verifySmsToken(body) to verify validity of the previously created session JWT and to refresh the session
 *
 * The .verifyTokenAndReturnSubject(token) can be used to validate internally API calls in your own APIs.
 */
export interface SmsAuthController {

    /**
     * Set default language for messages sent to the user by sms.
     * @param value
     */
    setDefaultLanguage (value: Language) : void;

    /**
     * Set default phone prefix, e.g. `+358`
     * @param value
     */
    setDefaultPhonePrefix (value: string) : void;

    /**
     * Handles POST HTTP request to initiate an sms address authentication by
     * sending one time code to the user as a sms message.
     *
     * The message should be in format `AuthenticateSmsDTO`.
     *
     * @param body {AuthenticateSmsDTO}
     * @param langString {Language} The optional language of the message
     */
    authenticateSms (
        body: ReadonlyJsonAny,
        langString: string
    ): Promise<ResponseEntity<SmsTokenDTO | ErrorDTO>>;

    /**
     * Handles HTTP POST request which validates the user supplied code and
     * generates a valid JWT token, which can be used to keep the session active.
     *
     * @param body {VerifySmsCodeDTO}
     */
    verifySmsCode (
        body: ReadonlyJsonAny
    ): Promise<ResponseEntity<SmsTokenDTO | ErrorDTO>>;

    /**
     * Handles HTTP POST request which validates previously validated session and
     * if valid, generates a new refreshed session token.
     *
     * @param body {VerifySmsTokenDTO}
     */
    verifySmsToken (
        body: ReadonlyJsonAny
    ): Promise<ResponseEntity<SmsTokenDTO | ErrorDTO>>;

    /**
     * Can be used internally in APIs to validate and return the subject of this token.
     */
    verifyTokenAndReturnSubject (
        token: string
    ): Promise<string>;

}

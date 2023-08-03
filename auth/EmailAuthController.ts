// Copyright (c) 2022-2023. <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonAny } from "../Json";
import { ResponseEntity } from "../request/types/ResponseEntity";
import { ErrorDTO } from "../types/ErrorDTO";
import { Language } from "../types/Language";
import { EmailTokenDTO } from "./email/types/EmailTokenDTO";

/**
 * This HTTP backend controller can be used to validate the ownership of user's
 * email address.
 *
 *  1. Call .authenticateEmail(body, lang) to send the authentication email
 *  2. Call .verifyEmailCode(body) to verify user supplied code from the email and create a session JWT
 *  3. Call .verifyEmailToken(body) to verify validity of the previously created session JWT and to refresh the session
 *
 * The .verifyTokenAndReturnSubject(token) can be used to validate internally API calls in your own APIs.
 */
export interface EmailAuthController {

    /**
     * Set default language for messages sent to the user by email.
     * @param value
     */
    setDefaultLanguage (value: Language) : void;

    /**
     * Handles POST HTTP request to initiate an email address authentication by
     * sending one time code to the user as a email message.
     *
     * The message should be in format `AuthenticateEmailDTO`.
     *
     * @param body {AuthenticateEmailDTO}
     * @param langString {Language} The optional language of the message
     */
    authenticateEmail (
        body: ReadonlyJsonAny,
        langString: string
    ): Promise<ResponseEntity<EmailTokenDTO | ErrorDTO>>;

    /**
     * Handles HTTP POST request which validates the user supplied code and
     * generates a valid JWT token, which can be used to keep the session active.
     *
     * @param body {VerifyEmailCodeDTO}
     */
    verifyEmailCode (
        body: ReadonlyJsonAny
    ): Promise<ResponseEntity<EmailTokenDTO | ErrorDTO>>;

    /**
     * Handles HTTP POST request which validates previously validated session and
     * if valid, generates a new refreshed session token.
     *
     * @param body {VerifyEmailTokenDTO}
     */
    verifyEmailToken (
        body: ReadonlyJsonAny
    ): Promise<ResponseEntity<EmailTokenDTO | ErrorDTO>>;

    /**
     * Can be used internally in APIs to validate and return the subject of this token.
     * @FIXME: This should be in a service that's not specific to email addresses
     */
    verifyTokenAndReturnSubject (
        token: string
    ): Promise<string>;

}

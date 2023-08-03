// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SmsTokenDTO } from "./sms/types/SmsTokenDTO";

export type SmsTokenServiceAlgorithm = (
    'HS256' | 'HS384' | 'HS512' |
    'RS256' | 'RS384' | 'RS512' |
    'PS256' | 'PS384' | 'PS512' |
    'ES256' | 'ES384' | 'ES512' | "none"
);

/**
 *
 */
export interface SmsTokenService {

    /**
     *
     * @param sms
     * @param token
     * @param requireVerifiedToken
     * @param alg
     */
    verifyToken (
        sms: string,
        token: string,
        requireVerifiedToken: boolean,
        alg ?: SmsTokenServiceAlgorithm
    ): boolean;

    /**
     *
     * @param token
     * @param sms
     * @param alg
     */
    verifyValidTokenForSubject (
        token: string,
        sms: string,
        alg   ?: SmsTokenServiceAlgorithm
    ): boolean;

    /**
     *
     * @param token
     * @param alg
     */
    isTokenValid (
        token: string,
        alg   ?: SmsTokenServiceAlgorithm
    ): boolean;

    /**
     *
     * @param token
     * @param requireVerifiedToken
     * @param alg
     */
    verifyTokenOnly (
        token                : string,
        requireVerifiedToken : boolean,
        alg                  ?: SmsTokenServiceAlgorithm
    ): boolean;

    createUnverifiedSmsToken (
        sms: string,
        alg                  ?: SmsTokenServiceAlgorithm
    ): SmsTokenDTO;

    createVerifiedSmsToken (
        sms: string,
        alg ?: SmsTokenServiceAlgorithm
    ): SmsTokenDTO;

}

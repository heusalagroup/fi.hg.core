// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { EmailTokenDTO } from "./email/types/EmailTokenDTO";

export type EmailTokenServiceAlgorithm = (
    'HS256' | 'HS384' | 'HS512' |
    'RS256' | 'RS384' | 'RS512' |
    'PS256' | 'PS384' | 'PS512' |
    'ES256' | 'ES384' | 'ES512' | "none"
);

/**
 *
 */
export interface EmailTokenService {

    /**
     *
     * @param email
     * @param token
     * @param requireVerifiedToken
     * @param alg
     */
    verifyToken (
        email: string,
        token: string,
        requireVerifiedToken: boolean,
        alg ?: EmailTokenServiceAlgorithm
    ): boolean;

    /**
     *
     * @param token
     * @param email
     * @param alg
     */
    verifyValidTokenForSubject (
        token: string,
        email: string,
        alg   ?: EmailTokenServiceAlgorithm
    ): boolean;

    /**
     *
     * @param token
     * @param alg
     */
    isTokenValid (
        token: string,
        alg   ?: EmailTokenServiceAlgorithm
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
        alg                  ?: EmailTokenServiceAlgorithm
    ): boolean;

    createUnverifiedEmailToken (
        email: string,
        alg                  ?: EmailTokenServiceAlgorithm
    ): EmailTokenDTO;

    createVerifiedEmailToken (
        email: string,
        alg ?: EmailTokenServiceAlgorithm
    ): EmailTokenDTO;

}

// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { JwtPayload } from "./types/JwtPayload";

export class JwtUtils {

    public static calculateExpirationInDays (days: number) : number {
        return Math.floor(Date.now() / 1000 + days * 24 * 60 * 60);
    }

    public static calculateExpirationInMinutes (minutes: number) : number {
        return Math.floor(Date.now() / 1000 + minutes * 60);
    }

    public static createAudPayloadExpiringInDays (
        aud: string,
        days: number
    ) : JwtPayload {
        return {
            exp: JwtUtils.calculateExpirationInDays(days),
            aud
        };
    }

    public static createAudPayloadExpiringInMinutes (
        aud: string,
        minutes: number
    ) : JwtPayload {
        return {
            exp: JwtUtils.calculateExpirationInMinutes(minutes),
            aud
        };
    }

    public static createSubPayloadExpiringInDays (
        sub: string,
        days: number
    ) : JwtPayload {
        return {
            exp: JwtUtils.calculateExpirationInDays(days),
            sub
        };
    }

    public static createSubPayloadExpiringInMinutes (
        sub: string,
        minutes: number
    ) : JwtPayload {
        return {
            exp: JwtUtils.calculateExpirationInMinutes(minutes),
            sub
        };
    }

}

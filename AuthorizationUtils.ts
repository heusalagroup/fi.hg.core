// Copyright (c) 2022. Heusala Group. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { startsWith, trim } from "./modules/lodash";

export class AuthorizationUtils {

    public static createBearerHeader (token: string) : string {
        return `Bearer ${token}`;
    }

    public static parseBearerToken (header : string) : string | undefined {
        const BearerPrefix = 'Bearer ';
        if (!startsWith(header, BearerPrefix)) {
            return undefined;
        }
        return trim(header.substring(BearerPrefix.length));
    }

}

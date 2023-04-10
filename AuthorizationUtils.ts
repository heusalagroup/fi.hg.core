// Copyright (c) 2022. Heusala Group. All rights reserved.
// Copyright (c) 2020-2021. Sendanor. All rights reserved.

import { startsWith } from "./functions/startsWith";
import { trim } from "./functions/trim";

export class AuthorizationUtils {

    public static createBasicHeader (token: string) : string {
        return `Basic ${token}`;
    }

    public static parseBasicToken (header : string) : string | undefined {
        const BasicPrefix = 'Basic ';
        if (!startsWith(header, BasicPrefix)) {
            return undefined;
        }
        return trim(header.substring(BasicPrefix.length));
    }

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

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { trim } from "./functions/trim";
import { isString } from "./types/String";

export class EmailUtils {

    public static isEmailValid (value: string) : boolean {
        if (!isString(value)) return false;
        const l = value?.length ?? 0;
        return l >= 3 && value.includes('@') && !'@.'.includes(value[0]) && !'@.'.includes(value[l-1]);
    }

    public static getEmailDomain (value: string) : string | undefined {
        if (!EmailUtils.isEmailValid(value)) return undefined;
        const atIndex = value.lastIndexOf('@');
        return atIndex >= 0 ? trim(value.substring(atIndex+1)) : undefined;
    }

}

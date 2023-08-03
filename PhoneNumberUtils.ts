// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { startsWith } from "./functions/startsWith";
import { trim } from "./functions/trim";
import { trimStart } from "./functions/trimStart";
import { every } from "./functions/every";

export class PhoneNumberUtils {

    public static getTelLink (phone: string, countryCode: string = '+358') : string {
        return `tel:${countryCode}${trimStart(`${phone ?? ''}`.replace(/[^+0-9]*/ig, ""), "0")}`;
    }

    public static getTelLabel (phone: string) : string {
        return `${trimStart(`${phone ?? ''}`.replace(/[^+0-9 ]*/ig, ""))}`;
    }

    /**
     * @fixme Add real country code checks
     * @param phone
     */
    public static validatePhoneNumber (phone: string) : boolean {
        if ( (phone?.length ?? 0) <= 3 ) return false;
        const s = phone[0];
        if ( !'+0'.includes(s) ) return false;
        const rest = phone.substring(1);
        return ( rest.length >= (s === '+' ? 3 : 3) ) && every(
            rest,
            (char: string) : boolean => '0123456789'.includes(char)
        );
    }

    public static normalizePhoneAddress (value: string, defaultPrefix: string) : string {
        value = trim(value);
        return startsWith(value, '+') ? value : `${defaultPrefix}${startsWith(value, '0') ? value.substring(1) : value}`
    }

}

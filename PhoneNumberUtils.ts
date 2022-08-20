// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { every, trimStart } from "./modules/lodash";

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

}

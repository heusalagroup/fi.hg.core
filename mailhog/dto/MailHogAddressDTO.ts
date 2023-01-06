// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isNull } from "../../types/Null";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeysInDevelopment } from "../../types/OtherKeys";

export interface MailHogAddressDTO {
    readonly Domain : string;
    readonly Mailbox : string;
    readonly Params : string;
    readonly Relays : null;
}

export function isMailHogAddressDTO (value: any): value is MailHogAddressDTO {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'Domain',
            'Mailbox',
            'Params',
            'Relays'
        ])
        && isString(value?.Domain)
        && isString(value?.Mailbox)
        && isString(value?.Params)
        && isNull(value?.Relays)
    );
}

export function stringifyMailHogAddressDTO (value: MailHogAddressDTO): string {
    return `MailHogAddressDTO(${value})`;
}

export function parseMailHogAddressDTO (value: any): MailHogAddressDTO | undefined {
    if ( isMailHogAddressDTO(value) ) return value;
    return undefined;
}

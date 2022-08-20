// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../../../../modules/lodash";

export interface EmailInventoryData {
    readonly hostname : string;
    readonly username : string;
}

export function createEmailInventoryData (
    hostname: string,
    username: string
): EmailInventoryData {
    return {
        hostname,
        username
    };
}

export function isEmailInventoryData (value: any): value is EmailInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'hostname',
            'username'
        ])
        && isString(value?.hostname)
        && isString(value?.username)
    );
}

export function stringifyEmailInventoryData (value: EmailInventoryData): string {
    return `EmailInventoryData(${value})`;
}

export function parseEmailInventoryData (value: any): EmailInventoryData | undefined {
    if ( isEmailInventoryData(value) ) return value;
    return undefined;
}

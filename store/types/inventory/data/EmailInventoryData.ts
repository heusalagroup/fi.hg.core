// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    explain,
    explainNoOtherKeys,
    explainProperty,
    explainRegularObject,
    explainString,
    explainStringOrUndefined,
    hasNoOtherKeys,
    isRegularObject,
    isString,
    isStringOrUndefined
} from "../../../../modules/lodash";
import { InventoryData } from "./InventoryData";

export interface EmailInventoryData extends InventoryData {
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

export function explainEmailInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'hostname',
                'username'
            ])
            && explainProperty("hostname", explainString(value?.hostname))
            && explainProperty("username", explainString(value?.username))
        ]
    );
}

export function isPartialEmailInventoryData (value: any): value is Partial<EmailInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'hostname',
            'username'
        ])
        && isStringOrUndefined(value?.hostname)
        && isStringOrUndefined(value?.username)
    );
}

export function explainPartialEmailInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'hostname',
                'username',
            ])
            && explainProperty("hostname", explainStringOrUndefined(value?.hostname))
            && explainProperty("username", explainStringOrUndefined(value?.username))
        ]
    );
}

export function stringifyEmailInventoryData (value: EmailInventoryData): string {
    return `EmailInventoryData(${value})`;
}

export function parseEmailInventoryData (value: any): EmailInventoryData | undefined {
    if ( isEmailInventoryData(value) ) return value;
    return undefined;
}

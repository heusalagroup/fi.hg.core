// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ReadonlyJsonObject } from "../../../../Json";
import { hasNoOtherKeys, isRegularObject, isString } from "../../../../modules/lodash";

export interface ShellInventoryData extends ReadonlyJsonObject {

    readonly hostname  : string;
    readonly username  : string;

    /**
     * Note! Other users of the server may see this
     */
    readonly realName  : string;

}

export function createShellInventoryData (
    hostname: string,
    username: string,
    realName: string
): ShellInventoryData {
    return {
        hostname,
        username,
        realName
    };
}

export function isShellInventoryData (value: any): value is ShellInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'hostname',
            'username',
            'realName'
        ])
        && isString(value?.hostname)
        && isString(value?.username)
        && isString(value?.realName)
    );
}

export function stringifyShellInventoryData (value: ShellInventoryData): string {
    return `ShellInventoryData(${value})`;
}

export function parseShellInventoryData (value: any): ShellInventoryData | undefined {
    if ( isShellInventoryData(value) ) return value;
    return undefined;
}

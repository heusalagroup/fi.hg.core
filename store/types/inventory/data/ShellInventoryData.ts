// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InventoryData } from "./InventoryData";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainNumber, explainNumberOrUndefined, isNumber, isNumberOrUndefined } from "../../../../types/Number";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../../../../types/OtherKeys";

export interface ShellInventoryData extends InventoryData {

    readonly hostname  : string;

    readonly username  : string;

    /**
     * Note! Other users of the server may see this
     */
    readonly realName  : string;

    /**
     * SSH Port, defaults to 22.
     */
    readonly port      : number;

    /**
     * Total storage in MBs this item should use (but not limited to this)
     */
    readonly totalStorage ?: number | undefined;

    /**
     * Total used storage in MBs from the system
     */
    readonly usedStorage ?: number | undefined;

}

export function createShellInventoryData (
    hostname  : string,
    username  : string,
    realName  : string,
    port     ?: number,
    totalStorage ?: number | undefined,
    usedStorage  ?: number | undefined,
): ShellInventoryData {
    return {
        hostname,
        username,
        realName,
        port: port ?? 22,
        totalStorage: totalStorage ?? undefined,
        usedStorage: usedStorage ?? undefined,
    };
}

export function isShellInventoryData (value: any): value is ShellInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'hostname',
            'username',
            'realName',
            'port',
            'totalStorage',
            'usedStorage',
        ])
        && isString(value?.hostname)
        && isString(value?.username)
        && isString(value?.realName)
        && isNumber(value?.port)
        && isNumberOrUndefined(value?.totalStorage)
        && isNumberOrUndefined(value?.usedStorage)
    );
}

export function explainShellInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeysInDevelopment(value, [
                'hostname',
                'username',
                'realName',
                'port',
                'totalStorage',
                'usedStorage',
            ])
            && explainProperty("hostname", explainString(value?.hostname))
            && explainProperty("username", explainString(value?.username))
            && explainProperty("realName", explainString(value?.realName))
            && explainProperty("port",     explainNumber(value?.port))
            && explainProperty("totalStorage",     explainNumberOrUndefined(value?.totalStorage))
            && explainProperty("usedStorage",      explainNumberOrUndefined(value?.usedStorage))
        ]
    );
}

export function isPartialShellInventoryData (value: any): value is Partial<ShellInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'hostname',
            'username',
            'realName',
            'port',
            'totalStorage',
            'usedStorage',
        ])
        && isStringOrUndefined(value?.hostname)
        && isStringOrUndefined(value?.username)
        && isStringOrUndefined(value?.realName)
        && isNumberOrUndefined(value?.port)
        && isNumberOrUndefined(value?.totalStorage)
        && isNumberOrUndefined(value?.usedStorage)
    );
}

export function explainPartialShellInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeysInDevelopment(value, [
                'hostname',
                'username',
                'realName',
                'port',
                'totalStorage',
                'usedStorage',
            ])
            && explainProperty("hostname", explainStringOrUndefined(value?.hostname))
            && explainProperty("username", explainStringOrUndefined(value?.username))
            && explainProperty("realName", explainStringOrUndefined(value?.realName))
            && explainProperty("port",     explainNumberOrUndefined(value?.port))
            && explainProperty("totalStorage",    explainNumberOrUndefined(value?.totalStorage))
            && explainProperty("usedStorage",     explainNumberOrUndefined(value?.usedStorage))
        ]
    );
}

export function parseShellInventoryData (value: any): ShellInventoryData | undefined {
    if ( isShellInventoryData(value) ) return value;
    return undefined;
}

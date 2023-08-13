// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNumberOrUndefined, isNumberOrUndefined } from "../../../../types/Number";
import { InventoryData } from "./InventoryData";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../../../types/OtherKeys";

export interface EmailInventoryData extends InventoryData {
    readonly hostname : string;
    readonly username : string;

    /**
     * Total storage in MBs this item should use (but not limited to this)
     */
    readonly totalStorage ?: number | undefined;

    /**
     * Total used storage in MBs from the system
     */
    readonly usedStorage ?: number | undefined;

}

export function createEmailInventoryData (
    hostname: string,
    username: string,
    totalStorage ?: number | undefined,
    usedStorage  ?: number | undefined,
): EmailInventoryData {
    return {
        hostname,
        username,
        totalStorage: totalStorage ?? undefined,
        usedStorage: usedStorage ?? undefined,
    };
}

export function isEmailInventoryData (value: any): value is EmailInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'hostname',
            'username',
            'totalStorage',
            'usedStorage',
        ])
        && isString(value?.hostname)
        && isString(value?.username)
        && isNumberOrUndefined(value?.totalStorage)
        && isNumberOrUndefined(value?.usedStorage)
    );
}

export function explainEmailInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'hostname',
                'username',
                'totalStorage',
                'usedStorage',
            ])
            && explainProperty("hostname", explainString(value?.hostname))
            && explainProperty("username", explainString(value?.username))
            && explainProperty("totalStorage", explainNumberOrUndefined(value?.totalStorage))
            && explainProperty("usedStorage", explainNumberOrUndefined(value?.usedStorage))
        ]
    );
}

export function isPartialEmailInventoryData (value: any): value is Partial<EmailInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'hostname',
            'username',
            'totalStorage',
            'usedStorage',
        ])
        && isStringOrUndefined(value?.hostname)
        && isStringOrUndefined(value?.username)
        && isNumberOrUndefined(value?.totalStorage)
        && isNumberOrUndefined(value?.usedStorage)
    );
}

export function explainPartialEmailInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'hostname',
                'username',
                'totalStorage',
                'usedStorage',
            ])
            && explainProperty("hostname", explainStringOrUndefined(value?.hostname))
            && explainProperty("username", explainStringOrUndefined(value?.username))
            && explainProperty("totalStorage", explainNumberOrUndefined(value?.totalStorage))
            && explainProperty("usedStorage", explainNumberOrUndefined(value?.usedStorage))
        ]
    );
}

export function parseEmailInventoryData (value: any): EmailInventoryData | undefined {
    if ( isEmailInventoryData(value) ) return value;
    return undefined;
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNumberOrUndefined, isNumberOrUndefined } from "../../../../types/Number";
import { InventoryData } from "./InventoryData";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, explainNoOtherKeysInDevelopment, hasNoOtherKeys, hasNoOtherKeysInDevelopment } from "../../../../types/OtherKeys";

export interface WebHotelInventoryData extends InventoryData {

    /**
     * Host system name, e.g. `"lxc3"`
     */
    readonly system : string;

    /**
     * The virtual server name, e.g. `"example-1"`
     */
    readonly name : string;

    /**
     * Total storage in MBs this item should use (but not limited to this)
     */
    readonly totalStorage ?: number | undefined;

    /**
     * Total used storage in MBs from the system
     */
    readonly usedStorage ?: number | undefined;

}

export function createWebHotelInventoryData (
    system: string,
    name  : string,
    totalStorage ?: number | undefined,
    usedStorage  ?: number | undefined,
): WebHotelInventoryData {
    return {
        system,
        name,
        totalStorage: totalStorage ?? undefined,
        usedStorage: usedStorage ?? undefined,
    };
}

export function isWebHotelInventoryData (value: any): value is WebHotelInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'system',
            'name',
            'totalStorage',
            'usedStorage',
        ])
        && isString(value?.system)
        && isString(value?.name)
        && isNumberOrUndefined(value?.totalStorage)
        && isNumberOrUndefined(value?.usedStorage)
    );
}

export function explainWebHotelInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeysInDevelopment(value, [
                'system',
                'name',
                'totalStorage',
                'usedStorage',
            ])
            && explainProperty("system", explainString(value?.system))
            && explainProperty("name", explainString(value?.name))
            && explainProperty("totalStorage", explainNumberOrUndefined(value?.totalStorage))
            && explainProperty("usedStorage", explainNumberOrUndefined(value?.usedStorage))
        ]
    );
}

export function isPartialWebHotelInventoryData (value: any): value is Partial<WebHotelInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'system',
            'name',
            'totalStorage',
            'usedStorage',
        ])
        && isStringOrUndefined(value?.system)
        && isStringOrUndefined(value?.name)
        && isNumberOrUndefined(value?.totalStorage)
        && isNumberOrUndefined(value?.usedStorage)
    );
}

export function explainPartialWebHotelInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'system',
                'name',
                'totalStorage',
                'usedStorage',
            ])
            && explainProperty("system", explainStringOrUndefined(value?.system))
            && explainProperty("name", explainStringOrUndefined(value?.name))
            && explainProperty("totalStorage", explainNumberOrUndefined(value?.totalStorage))
            && explainProperty("usedStorage", explainNumberOrUndefined(value?.usedStorage))
        ]
    );
}

export function parseWebHotelInventoryData (value: any): WebHotelInventoryData | undefined {
    if ( isWebHotelInventoryData(value) ) return value;
    return undefined;
}

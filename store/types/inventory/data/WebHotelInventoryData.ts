// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../../../../modules/lodash";
import { InventoryData } from "./InventoryData";

export interface WebHotelInventoryData extends InventoryData {

    /**
     * Host system name, e.g. `"lxc3"`
     */
    readonly system : string;

    /**
     * The virtual server name, e.g. `"examplefi-1"`
     */
    readonly name : string;

}

export function createWebHotelInventoryData (
    system: string,
    name : string
): WebHotelInventoryData {
    return {
        system,
        name
    };
}

export function isWebHotelInventoryData (value: any): value is WebHotelInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'system',
            'name'
        ])
        && isString(value?.system)
        && isString(value?.name)
    );
}

export function stringifyWebHotelInventoryData (value: WebHotelInventoryData): string {
    return `WebHotelInventoryData(${value})`;
}

export function parseWebHotelInventoryData (value: any): WebHotelInventoryData | undefined {
    if ( isWebHotelInventoryData(value) ) return value;
    return undefined;
}

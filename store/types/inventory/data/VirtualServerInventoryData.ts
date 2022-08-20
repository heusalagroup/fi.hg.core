// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../../../../modules/lodash";

export interface VirtualServerInventoryData {

    /**
     * Host system name, e.g. `"vm3"`
     */
    readonly system : string;

    /**
     * The virtual server name, e.g. `"s123"`
     */
    readonly name : string;

}

export function createVirtualServerInventoryData (
    system: string,
    name : string
): VirtualServerInventoryData {
    return {
        system,
        name
    };
}

export function isVirtualServerInventoryData (value: any): value is VirtualServerInventoryData {
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

export function stringifyVirtualServerInventoryData (value: VirtualServerInventoryData): string {
    return `VirtualServerInventoryData(${value})`;
}

export function parseVirtualServerInventoryData (value: any): VirtualServerInventoryData | undefined {
    if ( isVirtualServerInventoryData(value) ) return value;
    return undefined;
}

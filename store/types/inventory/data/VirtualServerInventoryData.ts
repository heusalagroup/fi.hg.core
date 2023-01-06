// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InventoryData } from "./InventoryData";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface VirtualServerInventoryData extends InventoryData {

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

export function explainVirtualServerInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'system',
                'name'
            ])
            && explainProperty("system", explainString(value?.system))
            && explainProperty("name", explainString(value?.name))
        ]
    );
}

export function isPartialVirtualServerInventoryData (value: any): value is Partial<VirtualServerInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'system',
            'name'
        ])
        && isStringOrUndefined(value?.system)
        && isStringOrUndefined(value?.name)
    );
}

export function explainPartialVirtualServerInventoryData (value: any): string {
    return explain(
        [
            explainRegularObject(value)
            && explainNoOtherKeys(value, [
                'system',
                'name'
            ])
            && explainProperty("system", explainStringOrUndefined(value?.system))
            && explainProperty("name", explainStringOrUndefined(value?.name))
        ]
    );
}

export function stringifyVirtualServerInventoryData (value: VirtualServerInventoryData): string {
    return `VirtualServerInventoryData(${value})`;
}

export function parseVirtualServerInventoryData (value: any): VirtualServerInventoryData | undefined {
    if ( isVirtualServerInventoryData(value) ) return value;
    return undefined;
}

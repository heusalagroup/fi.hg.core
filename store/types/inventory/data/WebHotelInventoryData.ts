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

export interface WebHotelInventoryData extends InventoryData {

    /**
     * Host system name, e.g. `"lxc3"`
     */
    readonly system : string;

    /**
     * The virtual server name, e.g. `"example-1"`
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

export function explainWebHotelInventoryData (value: any): string {
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

export function isPartialWebHotelInventoryData (value: any): value is Partial<WebHotelInventoryData> {
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

export function explainPartialWebHotelInventoryData (value: any): string {
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

export function stringifyWebHotelInventoryData (value: WebHotelInventoryData): string {
    return `WebHotelInventoryData(${value})`;
}

export function parseWebHotelInventoryData (value: any): WebHotelInventoryData | undefined {
    if ( isWebHotelInventoryData(value) ) return value;
    return undefined;
}

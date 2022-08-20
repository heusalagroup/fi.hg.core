// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { hasNoOtherKeys, isRegularObject, isString } from "../../../../modules/lodash";

export interface DomainInventoryData {

    /**
     * Domain name, e.g. `example.fi`
     */
    readonly name : string;

}

export function createDomainInventoryData (
    name: string
): DomainInventoryData {
    return {
        name
    };
}

export function isDomainInventoryData (value: any): value is DomainInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name'
        ])
        && isString(value?.name)
    );
}

export function stringifyDomainInventoryData (value: DomainInventoryData): string {
    return `DomainInventoryData(${value})`;
}

export function parseDomainInventoryData (value: any): DomainInventoryData | undefined {
    if ( isDomainInventoryData(value) ) return value;
    return undefined;
}

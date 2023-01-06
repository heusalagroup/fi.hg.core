// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { InventoryData } from "./InventoryData";
import { explain, explainProperty } from "../../../../types/explain";
import { explainString, explainStringOrUndefined, isString, isStringOrUndefined } from "../../../../types/String";
import { explainRegularObject, isRegularObject } from "../../../../types/RegularObject";
import { explainNoOtherKeys, hasNoOtherKeys } from "../../../../types/OtherKeys";

export interface DomainInventoryData extends InventoryData {

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

export function isPartialDomainInventoryData (value: any): value is Partial<DomainInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name'
        ])
        && isStringOrUndefined(value?.name)
    );
}

export function explainDomainInventoryData (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'name'
            ])
            , explainProperty("name", explainString(value?.name))
        ]
    );
}

export function explainPartialDomainInventoryData (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'name'
            ])
            , explainProperty("name", explainStringOrUndefined(value?.name))
        ]
    );
}


export function stringifyDomainInventoryData (value: DomainInventoryData): string {
    return `DomainInventoryData(${value})`;
}

export function parseDomainInventoryData (value: any): DomainInventoryData | undefined {
    if ( isDomainInventoryData(value) ) return value;
    return undefined;
}

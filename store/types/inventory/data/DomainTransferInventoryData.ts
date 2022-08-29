// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explain, explainNoOtherKeys, explainProperty, explainRegularObject, explainString, explainStringOrUndefined, hasNoOtherKeys, isRegularObject, isString, isStringOrUndefined } from "../../../../modules/lodash";
import { InventoryData } from "./InventoryData";

export interface DomainTransferInventoryData extends InventoryData {

    /**
     * Domain name, e.g. `example.fi`
     */
    readonly name : string;

    readonly authId : string;

}

export function createDomainTransferInventoryData (
    name: string,
    authId: string
): DomainTransferInventoryData {
    return {
        name,
        authId
    };
}

export function isDomainTransferInventoryData (value: any): value is DomainTransferInventoryData {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name',
            'authId'
        ])
        && isString(value?.name)
        && isString(value?.authId)
    );
}

export function isPartialDomainTransferInventoryData (value: any): value is Partial<DomainTransferInventoryData> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'name',
            'authId'
        ])
        && isStringOrUndefined(value?.name)
        && isStringOrUndefined(value?.authId)
    );
}

export function explainDomainTransferInventoryData (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'name'
            ])
            , explainProperty("name", explainString(value?.name))
            , explainProperty("authId", explainString(value?.authId))
        ]
    );
}

export function explainPartialDomainTransferInventoryData (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeys(value, [
                'name'
            ])
            , explainProperty("name", explainStringOrUndefined(value?.name))
            , explainProperty("authId", explainStringOrUndefined(value?.authId))
        ]
    );
}

export function stringifyDomainTransferInventoryData (value: DomainTransferInventoryData): string {
    return `DomainTransferInventoryData(${value})`;
}

export function parseDomainTransferInventoryData (value: any): DomainTransferInventoryData | undefined {
    if ( isDomainTransferInventoryData(value) ) return value;
    return undefined;
}

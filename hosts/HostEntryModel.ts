// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainRegularObject, isRegularObject } from "../types/RegularObject";
import { explainNoOtherKeysInDevelopment, hasNoOtherKeysInDevelopment } from "../types/OtherKeys";
import { explainString, isString } from "../types/String";
import { explain, explainProperty } from "../types/explain";
import { explainStringArray, isStringArray } from "../types/StringArray";
import { map } from "../functions/map";

export interface HostEntryModel {
    readonly address: string;
    readonly hostnames: readonly string[];
}

export function createHostEntryModel (
    address : string,
    hostnames: readonly string[] | string
) : HostEntryModel {
    return {
        address,
        hostnames: isString(hostnames) ? [hostnames] : map(hostnames, item => item)
    };
}

export function isHostEntryModel (value: unknown) : value is HostEntryModel {
    return (
        isRegularObject(value)
        && hasNoOtherKeysInDevelopment(value, [
            'address',
            'hostnames',
        ])
        && isString(value?.address)
        && isStringArray(value?.hostnames)
    );
}

export function explainHostEntryModel (value: any) : string {
    return explain(
        [
            explainRegularObject(value),
            explainNoOtherKeysInDevelopment(value, [
                'address',
                'hostnames',
            ])
            , explainProperty("address", explainString(value?.address))
            , explainProperty("hostnames", explainStringArray(value?.hostnames))
        ]
    );
}

export function stringifyHostEntryModel (value : HostEntryModel) : string {
    return `HostEntryModel(${value})`;
}

export function parseHostEntryModel (value: unknown) : HostEntryModel | undefined {
    if (isHostEntryModel(value)) return value;
    return undefined;
}


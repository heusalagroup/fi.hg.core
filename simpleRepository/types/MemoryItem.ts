// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { StoredRepositoryItem, StoredRepositoryItemTestCallback } from "./StoredRepositoryItem";
import { isBoolean } from "../../types/Boolean";
import { isString } from "../../types/String";
import { isNumber } from "../../types/Number";
import { isStringArrayOrUndefined } from "../../types/StringArray";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";

export interface MemoryItem<T extends StoredRepositoryItem> {
    readonly id       : string;
    readonly version  : number;
    readonly data     : T;
    readonly deleted  : boolean;
    readonly members ?: readonly string[];
    readonly invited ?: readonly string[];
}

export function createMemoryItem<T extends StoredRepositoryItem> (
    id       : string,
    version  : number,
    data     : T,
    deleted  : boolean,
    members ?: readonly string[],
    invited ?: readonly string[]
): MemoryItem<T> {
    return {
        id,
        version,
        data,
        deleted,
        members,
        invited
    };
}

export function isMemoryItem<T extends StoredRepositoryItem> (
    value: any,
    isT: StoredRepositoryItemTestCallback
): value is MemoryItem<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'id',
            'version',
            'data',
            'deleted',
            'members',
            'invited'
        ])
        && isString(value?.id)
        && isNumber(value?.version)
        && isT(value?.data)
        && isBoolean(value?.deleted)
        && isStringArrayOrUndefined(value?.members)
        && isStringArrayOrUndefined(value?.invited)
    );
}

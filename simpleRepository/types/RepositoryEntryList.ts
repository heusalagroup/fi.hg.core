// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { RepositoryEntry } from "./RepositoryEntry";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";
import { isArrayOf } from "../../types/Array";

export interface RepositoryEntryList<T> {
    readonly list : RepositoryEntry<T>[];
}

export function isRepositoryEntryList<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is RepositoryEntryList<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'list'
        ])
        && isArrayOf<T>(value?.list, item => isT(item))
    );
}

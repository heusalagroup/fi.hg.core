// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { SimpleRepositoryEntry } from "./SimpleRepositoryEntry";
import { TestCallbackNonStandard } from "../../types/TestCallback";
import { isRegularObject } from "../../types/RegularObject";
import { hasNoOtherKeys } from "../../types/OtherKeys";
import { isArrayOf } from "../../types/Array";

export interface SimpleRepositoryEntryList<T> {
    readonly list : SimpleRepositoryEntry<T>[];
}

export function isSimpleRepositoryEntryList<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is SimpleRepositoryEntryList<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'list'
        ])
        && isArrayOf<T>(value?.list, item => isT(item))
    );
}

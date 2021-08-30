// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys, isArrayOf,
    isRegularObject,
    TestCallbackNonStandard
} from "../../modules/lodash";
import RepositoryEntry from "./RepositoryEntry";

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

export default RepositoryEntryList;

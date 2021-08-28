// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import {
    hasNoOtherKeys,
    isBooleanOrUndefined,
    isNumber,
    isRegularObject,
    isString,
    TestCallbackNonStandard
} from "../../modules/lodash";

export interface RepositoryEntry<T> {
    readonly data     : T;
    readonly id       : string;
    readonly version  : number;
    readonly deleted ?: boolean;
}

export function isRepositoryEntry<T> (
    value : any,
    isT   : TestCallbackNonStandard
): value is RepositoryEntry<T> {
    return (
        isRegularObject(value)
        && hasNoOtherKeys(value, [
            'data',
            'id',
            'version',
            'deleted'
        ])
        && isT(value?.data)
        && isString(value?.id)
        && isNumber(value?.version)
        && isBooleanOrUndefined(value?.deleted)
    );
}

export default RepositoryEntry;

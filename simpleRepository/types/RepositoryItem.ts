// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    isRegularObject,
    isString,
    TestCallbackNonStandard
} from "../../modules/lodash";

export interface RepositoryItem<T> {
    readonly id: string;
    readonly target: T;
}

export function isRepositoryItem<T> (
    value: any,
    isT: TestCallbackNonStandard
): value is RepositoryItem<T> {
    return (
        isRegularObject(value)
        && isString(value?.id)
        && isT(value?.target)
    );
}

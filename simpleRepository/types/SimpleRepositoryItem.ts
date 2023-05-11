// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallbackNonStandard } from "../../types/TestCallback";
import { isString } from "../../types/String";
import { isRegularObject } from "../../types/RegularObject";

export interface SimpleRepositoryItem<T> {
    readonly id: string;
    readonly target: T;
}

export function isRepositoryItem<T> (
    value: any,
    isT: TestCallbackNonStandard
): value is SimpleRepositoryItem<T> {
    return (
        isRegularObject(value)
        && isString(value?.id)
        && isT(value?.target)
    );
}

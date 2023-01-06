// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback, TestCallbackOf } from "../types/TestCallback";
import { default as _isObject } from "lodash/isObject";
import { every, explainEvery } from "./every";
import { keys } from "./keys";
import { explain } from "../types/explain";
import { explainObject } from "../types/Object";

/**
 *
 * @param value
 * @param isKey
 * @__PURE__
 * @nosideeffects
 */
export function everyKey<T extends keyof any = string> (
    value: any,
    isKey: TestCallback
): value is { [P in T]: any } {
    return _isObject(value) && every(keys(value), isKey);
}

/**
 *
 * @param value
 * @param isKey
 * @param keyTypeName
 * @__PURE__
 * @nosideeffects
 */
export function explainEveryKey<T extends keyof any = string> (
    value: any,
    isKey: TestCallbackOf<T> | TestCallbackOf<string>,
    keyTypeName: string
): string {
    return explain(
        [
            explainObject(value),
            explainEvery(keys(value), isKey, keyTypeName)
        ]
    );
}

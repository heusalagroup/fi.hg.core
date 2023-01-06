// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback, TestCallbackOf } from "../types/TestCallback";
import { default as _every } from "lodash/every";
import { explainOk } from "../types/explain";

/**
 *
 * @param value
 * @param isValue
 * @__PURE__
 * @nosideeffects
 */
export function every<T = any> (
    value: any,
    isValue: TestCallback
): value is T[] {
    return _every(value, isValue);
}

/**
 *
 * @param value
 * @param isValue
 * @param valueName
 * @__PURE__
 * @nosideeffects
 */
export function explainEvery<T = any> (
    value: any,
    isValue: TestCallbackOf<T> | TestCallbackOf<string>,
    valueName: string
): string {
    return every(value, isValue) ? explainOk() : `some values were not ${valueName}`;
}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback } from "../types/TestCallback";
import { default as _isObject } from "lodash/isObject";
import { values } from "./values";
import { some } from "./some";

/**
 *
 * @param value
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function someValue<T = any> (
    value: any,
    isItem: TestCallback
): value is {[key: string]: T | undefined} {
    return _isObject(value) && some(values(value), isItem);
}

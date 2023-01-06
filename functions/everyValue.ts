// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback } from "../types/TestCallback";
import { default as _isObject } from "lodash/isObject";
import { every } from "./every";
import { values } from "./values";

/**
 *
 * @param value
 * @param isItem
 * @__PURE__
 * @nosideeffects
 */
export function everyValue<T = any> (
    value: any,
    isItem: TestCallback
): value is {[key: string]: T} {
    return _isObject(value) && every(values(value), isItem);
}

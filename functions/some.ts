// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallback } from "../types/TestCallback";
import { default as _some } from "lodash/some";

/**
 *
 * @param value
 * @param isValue
 * @__PURE__
 * @nosideeffects
 */
export function some<T = any> (
    value: any,
    isValue: TestCallback
): value is (T | any)[] {
    return _some(value, isValue);
}

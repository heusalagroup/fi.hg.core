// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk } from "./explain";
import { default as _isNull } from 'lodash/isNull';

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNull (value: unknown): value is null {
    return _isNull(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNull (value: any): string {
    return isNull(value) ? explainOk() : explainNot('null');
}

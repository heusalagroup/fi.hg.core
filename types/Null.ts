// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainNot, explainOk } from "./explain";
import { default as _isNull } from 'lodash/isNull';
import { isUndefined } from "./undefined";

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


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNullOrUndefined (value: unknown): value is null | undefined {
    return _isNull(value) || isUndefined(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNullOrUndefined (value: any): string {
    return isNullOrUndefined(value) ? explainOk() : explainNot('null or undefined');
}

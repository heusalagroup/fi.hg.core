// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOk } from "./explain";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isUndefined (value: any): value is undefined {
    return value === undefined;
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainUndefined (value: unknown): string {
    return isUndefined(value) ? explainOk() : 'not undefined';
}

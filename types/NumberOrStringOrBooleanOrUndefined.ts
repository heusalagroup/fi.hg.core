// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isUndefined } from "./undefined";
import { isNumber } from "./Number";
import { isString } from "./String";
import { isBoolean } from "./Boolean";
import { explainNot, explainOk, explainOr } from "./explain";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberOrStringOrBooleanOrUndefined (value: unknown): value is number | undefined {
    return isUndefined(value) || isNumber(value) || isString(value) || isBoolean(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberOrStringOrBooleanOrUndefined (value: any): string {
    return isNumberOrStringOrBooleanOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'number', 'string', 'boolean', 'undefined' ]));
}

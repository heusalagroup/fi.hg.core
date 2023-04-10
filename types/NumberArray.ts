// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray } from "./Array";
import { isNumber } from "./Number";
import { every } from "../functions/every";
import { explainNot, explainOk, explainOr } from "./explain";
import { isUndefined } from "./undefined";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberArray (value: unknown): value is number[] {
    return (
        !!value
        && isArray(value)
        && every(value, isNumber)
    );
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberArray (value: any): string {
    return isNumberArray(value) ? explainOk() : explainNot('number[]');
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberArrayOrUndefined (value: unknown): value is number[] | undefined {
    return isUndefined(value) || isNumberArray(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberArrayOrUndefined (value: any): string {
    return isNumberArrayOrUndefined(value) ? explainOk() : explainNot(explainOr([ 'number[]', 'undefined' ]));

}

// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray } from "./Array";
import { isNumber } from "./Number";
import { every } from "../functions/every";
import { explainNot, explainOk, explainOr } from "./explain";
import { isUndefined } from "./undefined";

export type NumberPair = readonly [number, number];

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberPair (value: unknown): value is NumberPair {
    return (
        !!value
        && isArray(value)
        && value.length === 2
        && every(value, isNumber)
    );
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberPair (value: any): string {
    return isNumberPair(value) ? explainOk() : explainNot('[number, number]');
}


/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isNumberPairOrUndefined (value: unknown): value is [number, number] | undefined {
    return isUndefined(value) || isNumberPair(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainNumberPairOrUndefined (value: any): string {
    return isNumberPairOrUndefined(value) ? explainOk() : explainNot(explainOr([ '[number, number]', 'undefined' ]));

}

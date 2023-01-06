// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray } from "./Array";
import { isNumber } from "./Number";
import { every } from "../functions/every";
import { explainNot, explainOk } from "./explain";

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

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { default as _isFunction } from "lodash/isFunction";
import trim from "lodash/trim";
import startsWith from "lodash/startsWith";
import { explainOk } from "./explain";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isFunction (value: unknown): value is Function {
    return _isFunction(value);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function explainFunction (value: unknown): string {
    return isFunction(value) ? explainOk() : 'not function';
}

/**
 *
 * @param f
 * @__PURE__
 * @nosideeffects
 */
export function parseFunctionSignature (f: any): string | undefined {

    if ( !isFunction(f) ) return undefined;

    let fString = trim(`${f}`);

    if ( startsWith(fString, 'function ') ) {
        fString = trim(fString.substr('function '.length));
    }

    const index = fString.indexOf('{');
    if ( index >= 0 ) {
        return trim(fString.substr(0, index));
    }
    return trim(fString);

}

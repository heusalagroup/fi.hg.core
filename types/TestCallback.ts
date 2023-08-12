// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { every } from "../functions/every";
import { some } from "../functions/some";

export interface TestCallback {
    (value: any, index: number, arr: any[]): boolean;
}

export interface TestCallbackOf<T> {
    (value: any, index: number, arr: any[]): value is T;
}

export interface TestCallbackNonStandard {
    (value: any, arg2 ?: undefined | number | string | boolean, arg3 ?: undefined | number | string | boolean): boolean;
}

export interface TestCallbackNonStandardOf<T> {
    (value: any, arg2 ?: undefined | number | string | boolean, arg3 ?: undefined | number | string | boolean): value is T;
}

/**
 *
 * @param callback
 * @__PURE__
 * @nosideeffects
 */
export function toTestCallback (callback: TestCallbackNonStandard): TestCallback {
    return (value,
        // @ts-ignore @todo why unused?
        index,
        // @ts-ignore @todo why unused?
        arr
    ): boolean => callback(value);
}

/**
 *
 * @param callback
 * @__PURE__
 * @nosideeffects
 */
export function toTestCallbackNonStandard (callback: TestCallback): TestCallbackNonStandard {
    // @ts-ignore
    return (value, index, arr): boolean => callback(value);
}

/**
 *
 * @param callbacks
 * @__PURE__
 * @nosideeffects
 */
export function createOr<T = any> (...callbacks: (TestCallback | TestCallbackNonStandard)[]): TestCallback {
    return (value: unknown): value is T => some(callbacks, callback => callback(value));
}

/**
 *
 * @param callbacks
 * @__PURE__
 * @nosideeffects
 */
export function createAnd<T = any> (...callbacks: (TestCallback | TestCallbackNonStandard)[]): TestCallback {
    return (value: unknown): value is T => every(callbacks, callback => callback(value));
}

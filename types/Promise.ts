// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { default as _isObject } from "lodash/isObject";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isPromise (value: any): value is Promise<any> {
    // @ts-ignore
    return _isObject(value) && !!value.then && !!value.catch;
}

// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { default as _isBuffer } from "lodash/isBuffer";

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isBuffer (value: unknown): value is Buffer {
    return _isBuffer(value);
}

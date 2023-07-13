// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

/**
 * Empty object used as a lock object.
 *
 * E.g. the internal memory reference is the ID of the lock.
 */
export interface AsyncLock {
}

/**
 * Creates a new `AsyncLock` instance.
 */
export function createAsyncLock () : AsyncLock {
    return {};
}

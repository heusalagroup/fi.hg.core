// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { reduce } from "./functions/reduce";

export interface CacheClearCallback {
    () : Promise<void> | void;
}

/**
 * This service is used to clear any internal caches.
 *
 * It is implemented mainly for the ReactJS SSR server so that requests can clear internal state between requests.
 */
export class CacheService {

    private static _clearCallbacks : CacheClearCallback[] = [];

    public static registerClearCallback (callback: CacheClearCallback) {
        CacheService._clearCallbacks.push(callback);
    }

    /**
     * Clear caches
     */
    public static async clearCaches () {
        await reduce(
            CacheService._clearCallbacks,
            async (p: Promise<void>, callback: CacheClearCallback) : Promise<void> => {
                await p;
                await callback();
            },
            Promise.resolve()
        );
    }

}



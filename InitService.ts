// Copyright (c) 2021-2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { reduce } from "./functions/reduce";

export interface InitCallback {
    () : Promise<void> | void;
}

export class InitService {

    private static _initialized  : boolean = false;
    private static _initializing : boolean = false;
    private static _initializers : InitCallback[] = [];

    public static registerInitializer (callback: InitCallback) {
        if (InitService._initialized) throw new TypeError('Service already initialized');
        if (InitService._initializing) throw new TypeError('Service already initializing');
        InitService._initializers.push(callback);
    }

    public static isInitializing () : boolean {
        return InitService._initializing;
    }

    public static isInitialized () : boolean {
        return InitService._initialized;
    }

    /**
     * Initializes dynamic data for SSR / SEO
     */
    public static async initialize () {

        if (InitService._initialized) throw new TypeError('Service already initialized');
        if (InitService._initializing) throw new TypeError('Service already initializing');

        InitService._initializing = true;

        await reduce(
            InitService._initializers,
            async (p: Promise<void>, callback: InitCallback) : Promise<void> => {
                await p;
                await callback();
            },
            Promise.resolve()
        );

        InitService._initializing = false;
        InitService._initialized = true;

    }

}



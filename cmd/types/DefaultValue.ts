// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DefaultValueCallbackFactory } from "./DefaultValueCallbackFactory";
import { DefaultValueCallback } from "./DefaultValueCallback";

/**
 * Global access to implementation specific utilities for argument's default
 * value parsing.
 */
export class DefaultValue {

    private static _impl : DefaultValueCallbackFactory | undefined = undefined;

    /**
     * Initialize the internal platform specific implementation.
     *
     * @param impl
     */
    public static initialize (
        impl : DefaultValueCallbackFactory
    ) : void {
        this._impl = impl;
    }

    /**
     * Read argument from autowired variable.
     *
     * @param name The name of the argument. If not specified, uses the previous
     *             value as the name.
     */
    public static fromAutowired (name : string) : DefaultValueCallback {
        if (!this._impl) throw new TypeError('DefaultValue.fromAutowired() not initialized');
        return this._impl.fromAutowired(name);
    }

    /**
     * Read argument from file system text file using UTF-8.
     *
     * Uses the previous value as the path.
     */
    public static fromTextFile () : DefaultValueCallback {
        if (!this._impl) throw new TypeError('DefaultValue.fromTextFile() not initialized');
        return this._impl.fromTextFile();
    }

    /**
     * Build a callback function from a chain of callback functions, passing on
     * the previous value to the next callback.
     *
     * @param callbacks Async or synchronous callback functions
     */
    public static fromChain (
        ...callbacks: DefaultValueCallback[]
    ) : DefaultValueCallback {
        if (!this._impl) throw new TypeError('DefaultValue.fromChain() not initialized');
        return this._impl.fromChain(...callbacks);
    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DefaultValueCallback } from "./DefaultValueCallback";

/**
 * Interface for internal platform specific implementation.
 */
export interface DefaultValueCallbackFactory {

    /**
     * Read argument from autowired variable.
     *
     * @param name The name of the argument
     */
    fromAutowired (
        name: string
    ) : DefaultValueCallback;

    /**
     * Read argument from file system text file using UTF-8.
     */
    fromTextFile () : DefaultValueCallback;

    /**
     * Build a callback function from a chain of callback functions, passing on
     * the previous value to the next callback.
     *
     * @param callbacks Async or synchronous callback functions
     */
    fromChain (
        ...callbacks: DefaultValueCallback[]
    ) : DefaultValueCallback;

}

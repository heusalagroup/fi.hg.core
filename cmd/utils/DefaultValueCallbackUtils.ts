// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DefaultValueCallback } from "../types/DefaultValueCallback";
import { reduce } from "../../functions/reduce";
import { reverse } from "../../functions/reverse";
import { isPromise } from "../../types/Promise";
import { createAutowiredDefaultCallback } from "../functions/createAutowiredDefaultCallback";

export class DefaultValueCallbackUtils {

    /**
     * Read argument from autowired variable.
     *
     * @param name The name of the argument. If not specified, uses the previous
     *             value as the name.
     */
    public static fromAutowired (
        name: string,
    ) : DefaultValueCallback {
        return createAutowiredDefaultCallback(name);
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
        return reduce(
            reverse(callbacks),
            (callback : DefaultValueCallback, previousCallback: DefaultValueCallback): DefaultValueCallback => {
                return (value ?: string | undefined) : string | undefined | Promise<string|undefined> => {
                    const previousValue = previousCallback(value);
                    return isPromise( previousValue ) ? previousValue.then( callback ) : callback( previousValue );
                };
            },
            (value ?: string | undefined) => value
        );
    }

}

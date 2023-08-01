// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DefaultValueCallback } from "../types/DefaultValueCallback";
import { addAutowired } from "../main/addAutowired";
import { autowired } from "../main/autowired";

/**
 * Create a callback that auto wires the named parameter to the return value.
 *
 * @param autowiredTo The name of the parameter to autowire
 */
export function createAutowiredDefaultCallback (
    autowiredTo: string
): DefaultValueCallback {

    class DefaultValueParserImpl {
        @addAutowired()
        public static parseValue (
            @autowired( autowiredTo )
                value ?: string
        ): string | undefined {
            return value;
        }
    }

    return (): string | undefined => DefaultValueParserImpl.parseValue();
}
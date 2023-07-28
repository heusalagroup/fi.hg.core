// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DefaultValueCallback } from "../types/DefaultValueCallback";
import { addAutowired } from "../main/addAutowired";
import { autowired } from "../main/autowired";

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
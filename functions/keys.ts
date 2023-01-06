// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { TestCallbackNonStandard } from "../types/TestCallback";
import { isString } from "../types/String";
import { isArray } from "../types/Array";
import { map } from "../functions/map";
import { filter } from "../functions/filter";
import { isObject } from "../types/Object";

export function keys<T extends keyof any = string> (
    value: any,
    isKey: TestCallbackNonStandard = isString
): T[] {
    if ( isArray(value) ) {
        const indexes: number[] = map(value, (item: any, index: number) => index);
        const items: T[] = filter(indexes, (key: number) => isKey(key)) as T[];
        return items;
    } else if ( isObject(value) ) {
        const allKeys: (string | Symbol)[] = Reflect.ownKeys(value);
        const items = filter(allKeys, (key: string | Symbol) => isKey(key)) as T[];
        return items;
    }
    return [] as T[];
}

// Copyright (c) 2020-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { isArray } from "../types/Array";
import forEach from "lodash/forEach";
import { isObject } from "../types/Object";
import { keys } from "./keys";

/**
 * Returns path to every scalar item in the variable.
 *
 * @param value
 * @param baseKey
 * @returns Every path to scalar properties.
 *          If the value is not an array or object, will return the baseKey itself if it's defined.
 *          If the baseKey is not defined or is empty, will return an empty array.
 * @__PURE__
 * @nosideeffects
 */
export function pathsToScalarItems (
    value: any,
    baseKey: string = ''
): string[] {

    if ( isArray(value) ) {
        let allKeys: string[] = [];
        forEach(
            value,
            (item: any, itemIndex: number) => {

                const itemKey = `${baseKey}${baseKey ? '.' : ''}${itemIndex}`;

                const allItemKeys = pathsToScalarItems(item, itemKey);

                allKeys = allKeys.concat(allItemKeys);

            }
        );
        return allKeys;
    }

    if ( isObject(value) ) {
        let allKeys: string[] = [];
        forEach(
            keys(value),
            (itemKey: any) => {

                const itemFullKey = `${baseKey}${baseKey ? '.' : ''}${itemKey}`;

                const item: any = value[itemKey];

                const allItemKeys = pathsToScalarItems(item, itemFullKey);

                allKeys = allKeys.concat(allItemKeys);

            }
        );
        return allKeys;
    }
    if ( baseKey === '' ) {
        return [];
    }
    return [ baseKey ];
}

// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { filter } from "./functions/filter";
import { map } from "./functions/map";

export interface EnumObject<T> {
    readonly [key: string]: T;
}

export type EnumKeyValuePair<T> = readonly [string, T];

export class EnumUtils {

    public static getKeyValuePairs<T> (
        obj: EnumObject<T>
    ) : readonly EnumKeyValuePair<T>[] {
        return map(EnumUtils.getKeys<T>(obj), (key : string) : EnumKeyValuePair<T> => [key, obj[key]]);
    }

    public static getValues<T> (
        obj: EnumObject<T>
    ) : readonly T[] {
        return map(EnumUtils.getKeys<T>(obj), (key : string) : T => obj[key]);
    }

    public static getKeys<T> (
        obj: EnumObject<T>
    ) : readonly string[] {
        return filter(
            Object.keys(obj),
            (k: string): boolean => k ? '0123456789'.indexOf( k[0] ) < 0 : true
        );
    }

    public static createFilteredKeysFromValues<T> (
        obj          : EnumObject<T>,
        values       : readonly T[]
    ) : readonly string[] {
        return map(
            filter(
                EnumUtils.getKeyValuePairs<T>(obj),
                (item: EnumKeyValuePair<T>) : boolean => values.includes(item[1])
            ),
            (item: EnumKeyValuePair<T>) : string => item[0]
        );
    }

}

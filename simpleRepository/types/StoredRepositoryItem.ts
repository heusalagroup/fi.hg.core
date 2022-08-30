// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    isRegularObject,
    isString
} from "../../modules/lodash";

/**
 * This is the stored item in the repository.
 *
 * All properties should be simple scalar types. Strings are safe and good.
 *
 * Complex values can be serialized as JSON string inside the target property.
 *
 * Any inner value which you want to be able to search should be a property here.
 * Otherwise you would need to parse the JSON on every search item iteration --
 * which would be pretty bad for performance.
 *
 * If you want your search to be case insensitive for example, you can lowercase
 * the string in the link property.
 */
export interface StoredRepositoryItem {

    /**
     * Unique ID
     */
    readonly id : string;

    /** Current item data as JSON string */
    readonly target : string;

}

export function isStoredRepositoryItem (value: any): value is StoredRepositoryItem {
    return (
        isRegularObject(value)
        && isString(value?.id)
        && isString(value?.target)
    );
}

export function stringifyStoredRepositoryItem (value: StoredRepositoryItem): string {
    return `StoredRepositoryItem(${value})`;
}

export function parseStoredRepositoryItem (value: any): StoredRepositoryItem | undefined {
    if ( isStoredRepositoryItem(value) ) return value;
    return undefined;
}

export interface StoredRepositoryItemTestCallback {
    (value: StoredRepositoryItem) : boolean;
}

export interface StoredRepositoryItemExplainCallback {
    (value: StoredRepositoryItem) : string;
}

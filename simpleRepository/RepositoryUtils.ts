// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { isRepositoryEntry, RepositoryEntry } from "./types/RepositoryEntry";

import {
    has, isArrayOf,
    reduce,
    values
} from "../modules/lodash";
import { StoredRepositoryItem, StoredRepositoryItemTestCallback } from "./types/StoredRepositoryItem";

export class RepositoryUtils {

    public static filterLatest<T> (list : RepositoryEntry<T>[]) : RepositoryEntry<T>[] {

        return values(reduce(
            list,
            (cache: {[key: string]: RepositoryEntry<T>}, item: RepositoryEntry<T>) : {[key: string]: RepositoryEntry<T>} => {

                if (!has(cache, item.id)) {
                    cache[item.id] = item;
                } else if (item.version > cache[item.id].version) {
                    cache[item.id] = item;
                }

                return cache;

            },
            {} as {[key: string]: RepositoryEntry<T>}
        ));

    }

    /**
     * Returns true if the list is in correct format.
     *
     * @param list
     * @param isT
     * @private
     */
    public static isRepositoryEntryList<T extends StoredRepositoryItem> (
        list: any,
        isT: StoredRepositoryItemTestCallback
    ) : list is RepositoryEntry<T>[] {
        return isArrayOf(
            list,
            (item: RepositoryEntry<T>): boolean => isRepositoryEntry<T>(
                item,
                isT
            )
        );
    }

}

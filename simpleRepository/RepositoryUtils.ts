// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainRepositoryEntry, isRepositoryEntry, RepositoryEntry } from "./types/RepositoryEntry";
import { has } from "../functions/has";
import { reduce } from "../functions/reduce";
import { values } from "../functions/values";
import { StoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "./types/StoredRepositoryItem";
import { explainArrayOf, isArrayOf } from "../types/Array";

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

    public static explainRepositoryEntryList<T extends StoredRepositoryItem> (
        list: any,
        isT: StoredRepositoryItemTestCallback,
        explainT: StoredRepositoryItemExplainCallback,
        tName : string
    ) : string {
        return explainArrayOf(
            tName,
            (item: RepositoryEntry<T>): string => explainRepositoryEntry<T>(
                item,
                isT,
                explainT
            ),
            list,
            (item: RepositoryEntry<T>): boolean => isRepositoryEntry<T>(
                item,
                isT
            )
        );
    }


}

// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import { explainRepositoryEntry, isRepositoryEntry, SimpleRepositoryEntry } from "./types/SimpleRepositoryEntry";
import { has } from "../functions/has";
import { reduce } from "../functions/reduce";
import { values } from "../functions/values";
import { SimpleStoredRepositoryItem, StoredRepositoryItemExplainCallback, StoredRepositoryItemTestCallback } from "./types/SimpleStoredRepositoryItem";
import { explainArrayOf, isArrayOf } from "../types/Array";

export class SimpleRepositoryUtils {

    public static filterLatest<T> (list : SimpleRepositoryEntry<T>[]) : SimpleRepositoryEntry<T>[] {

        return values(reduce(
            list,
            (cache: {[key: string]: SimpleRepositoryEntry<T>}, item: SimpleRepositoryEntry<T>) : {[key: string]: SimpleRepositoryEntry<T>} => {

                if (!has(cache, item.id)) {
                    cache[item.id] = item;
                } else if (item.version > cache[item.id].version) {
                    cache[item.id] = item;
                }

                return cache;

            },
            {} as {[key: string]: SimpleRepositoryEntry<T>}
        ));

    }

    /**
     * Returns true if the list is in correct format.
     *
     * @param list
     * @param isT
     * @private
     */
    public static isRepositoryEntryList<T extends SimpleStoredRepositoryItem> (
        list: any,
        isT: StoredRepositoryItemTestCallback
    ) : list is SimpleRepositoryEntry<T>[] {
        return isArrayOf(
            list,
            (item: SimpleRepositoryEntry<T>): boolean => isRepositoryEntry<T>(
                item,
                isT
            )
        );
    }

    public static explainRepositoryEntryList<T extends SimpleStoredRepositoryItem> (
        list: any,
        isT: StoredRepositoryItemTestCallback,
        explainT: StoredRepositoryItemExplainCallback,
        tName : string
    ) : string {
        return explainArrayOf(
            tName,
            (item: SimpleRepositoryEntry<T>): string => explainRepositoryEntry(
                item,
                explainT
            ),
            list,
            (item: SimpleRepositoryEntry<T>): boolean => isRepositoryEntry<T>(
                item,
                isT
            )
        );
    }


}

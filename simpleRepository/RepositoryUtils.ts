// Copyright (c) 2021. Sendanor <info@sendanor.fi>. All rights reserved.

import RepositoryEntry from "./types/RepositoryEntry";
import {
    has,
    reduce,
    values
} from "../modules/lodash";

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

}

export default RepositoryUtils;

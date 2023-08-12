// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { map } from "./functions/map";

export class PromiseUtils {

    public static async waitTimeout (time: number) : Promise<void> {
        return await new Promise( (resolve, reject) => {
            try {
                setTimeout(
                    () => {
                        resolve();
                    },
                    time
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    /**
     * This method calls the `callback` function on each item in the `list`.
     *
     * It will start the `concurrentSize` amount of concurrent asynchronous jobs.
     *
     * @param list List of items to process asynchronously.
     * @param callback The callback to call with each item as the argument. It
     *                 is expected to return asynchronous promise in normal
     *                 case. If this callback or the promise from it resolves as
     *                 `false`, the processing will be stopped as soon as
     *                 possible.
     * @param concurrentSize The amount of concurrent asynchronous actions.
     */
    public static async processConcurrently<T> (
        list: readonly T[],
        callback: (item: T) => false | undefined | void | Promise<false | undefined | void>,
        concurrentSize: number
    ) : Promise<false | undefined | void> {
        const queue = map(list, (item: T) => item);
        let shouldEnd : boolean = false;
        while ( queue.length && !shouldEnd ) {
            let promises : Promise<any>[] = [];
            let i = 0;
            for(; i<concurrentSize && queue.length && !shouldEnd; i+=1) {
                const item = queue.shift();
                if (item) {
                    const step = async () : Promise<void> => {
                        const response = await callback(item);
                        if (response === false) {
                            shouldEnd = true;
                        }
                    };
                    const promise = step();
                    promises.push(promise);
                }
            }
            await Promise.allSettled(promises);
        }
        if (shouldEnd) return false;
    }

}

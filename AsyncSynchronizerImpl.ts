// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { first } from "./functions/first";
import { LogService } from "./LogService";
import { AsyncSynchronizer } from "./AsyncSynchronizer";
import { AsyncLock, createAsyncLock } from "./AsyncLock";
import { LogLevel } from "./types/LogLevel";

const LOG = LogService.createLogger( 'AsyncSynchronizerImpl' );

/**
 * @inheritDoc
 */
export class AsyncSynchronizerImpl implements AsyncSynchronizer {

    private readonly _queue : AsyncLock[];
    private _waitLockRelease : Promise<void> | undefined;
    private _releaseLockQueue : (() => void) | undefined;

    protected constructor () {
        this._queue = [];
        this._waitLockRelease = undefined;
        this._releaseLockQueue = undefined;
    }

    public static setLogLevel (level : LogLevel) : void {
        LOG.setLogLevel(level);
    }

    /**
     * Create instance of the AsyncSynchronizer
     */
    public static create () : AsyncSynchronizerImpl {
        return new AsyncSynchronizerImpl();
    }

    /**
     * @inheritDoc
     */
    public async run<T = any> (callback: () => Promise<T>) : Promise<T> {

        // Create a lock for this request
        const lock : AsyncLock = createAsyncLock();
        LOG.debug(`Created a lock. This lock queue has ${this._queue.length} locks.`);

        // Put this request to the queue
        this._queue.push(lock);
        LOG.debug(`Added our lock to the queue`);

        // Wait for a lock
        LOG.debug(`Waiting for us to be the first in the queue`);
        while ( this._queue.length && first(this._queue) !== lock ) {

            LOG.debug(`The queue did not have us, waiting ${this._queue.length} locks...`);

            if (this._waitLockRelease === undefined) {
                let release : boolean = false;
                if (this._releaseLockQueue !== undefined) {
                    this._releaseLockQueue();
                    this._releaseLockQueue = () => {
                        release = true;
                    };
                }
                this._waitLockRelease = new Promise<void>( (resolve) => {
                    if (release) {
                        this._releaseLockQueue = undefined;
                        resolve();
                    } else {
                        this._releaseLockQueue = resolve;
                    }
                });
            }

            await this._waitLockRelease;

        }

        if (first(this._queue) !== lock) {
            throw new TypeError(`Could not acquire lock to the queue`);
        }

        LOG.debug(`Lock acquired to the queue and calling the callback`);
        let result : T;
        try {
            result = await callback();
        } finally {
            // Release the lock
            if ( first(this._queue) !== lock ) {
                LOG.warn(`Warning! The lock queue did not have us as the first item. Could not release the lock.`);
            } else {
                this._queue.shift();
                LOG.debug(`Released the lock from queue`);
            }

            if (this._releaseLockQueue !== undefined) {
                this._releaseLockQueue();
                this._releaseLockQueue = undefined;
                LOG.debug(`Released the lock queue for next lock processing`);
            }

        }
        return result;

    }

}

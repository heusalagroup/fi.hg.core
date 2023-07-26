// Copyright (c) 2022-2023 Heusala Group <info@hg.fi>. All rights reserved.
// Copyright (c) 2020-2021 Sendanor <info@sendanor.fi>. All rights reserved.

import { filter } from "./functions/filter";
import { forEach } from "./functions/forEach";
import { has } from "./functions/has";
import { Disposable } from "./types/Disposable";

// NOTICE! THIS LIBRARY INTENTIONALLY DOES NOT USE HG LOGGER BECAUSE IT IS USED
// IN LOWER LEVEL CALLS

/**
 * A callback function that is registered to be executed when a particular event
 * is triggered by an `Observer` instance.
 *
 * @param event The name of the event that was triggered.
 * @param args An array of arguments that were passed to the `triggerEvent`
 *             method when the event was triggered.
 */
export interface ObserverCallback<EventName extends keyof any, T extends any[] = any[] > {
    (event: EventName, ...args : T) : void;
}

/**
 * A function that can be used to stop listening to events on an `Observer`
 * instance.
 *
 * When this function is called, it will remove the callback function that was
 * registered with the `listenEvent` method
 * from the list of callback functions that are triggered when the corresponding
 * event is triggered.
 */
export interface ObserverDestructor {
    () : void;
}

/**
 * An array of `ObserverCallback` functions that are registered to be executed
 * when a particular event is triggered by an `Observer` instance.
 */
export type ObserverCallbackArray<EventName extends keyof any> = Array<ObserverCallback<EventName>>;

/**
 * A record that maps event names to `ObserverCallbackArray` arrays.
 *
 * This is used by the `Observer` class to store the callback functions that are
 * registered to be executed when particular events are triggered.
 */
export type ObserverRecord<EventName extends keyof any> = Record<EventName, ObserverCallbackArray<EventName> >;

/**
 * This is a simple observer implementation for implementing synchronous in-process events for a local service.
 *
 * You can use it like this:
 *
 * ```
 * enum FooEvent {
 *     CHANGED = "FooService:changed"
 * }
 *
 * class FooService {
 *
 *     private static _data : any;
 *     private static _observer : Observer<FooEvent> = new Observer<FooEvent>("FooService");
 *
 *     public static getData () : any {
 *         return this._data;
 *     }
 *
 *     public static on (name : FooEvent, callback: ObserverCallback<FooEvent>) : ObserverDestructor {
 *         return this._observer.listenEvent(name, callback);
 *     }
 *
 *     public static refreshData () {
 *         HttpService.doSomething().then((response) => {
 *             this._data = response.data;
 *             this._observer.triggerEvent(FooEvent.CHANGED);
 *         }).catch(err => {
 *             console.error('Error: ', err);
 *         });
 *     }
 *
 * }
 *
 * FooService.on(FooEvent.CHANGED, () => {
 *
 *     const currentData = FooService.getData();
 *     // ...
 *
 * });
 *
 * FooService.refreshData();
 *
 * ```
 *
 */
export class Observer<EventName extends keyof any> implements Disposable {

    private _name      : string;
    private _callbacks : ObserverRecord<EventName>;

    /**
     * Returns the name of this `Observer` instance.
     */
    getName () : string {
        return this._name;
    }

    /**
     * Creates a new `Observer` instance.
     *
     * @param name You can name this observer, so that you know where it is used.
     */
    public constructor (name: string) {

        this._name = name;
        this._callbacks = {} as ObserverRecord<EventName>;

    }

    public static create<EventName extends keyof any> (name : string) : Observer<EventName> {
        return new Observer<EventName>(name);
    }

    /**
     * Removes all data associated with this `Observer` instance.
     *
     * After this method is called, the `Observer` instance should no longer be used.
     */
    public destroy () {

        // @ts-ignore
        this._name = undefined;

        // @ts-ignore
        this._callbacks = undefined;

    }

    /**
     * Check if eventName has listeners.
     *
     * @param eventName
     */
    public hasCallbacks (eventName : EventName) : boolean {
        return has(this._callbacks, eventName);
    }

    /**
     * Trigger an event
     *
     * @param eventName
     * @param args
     */
    public triggerEvent (eventName : EventName, ...args : Array<any>) {

        if (!this.hasCallbacks(eventName)) {
            console.warn(`Warning! The observer for "${this._name}" did not have anything listening "${eventName.toString()}"`);
            return;
        }

        const callbacks = this._callbacks[eventName];

        forEach(callbacks, (callback: any) => {
            try {
                callback(eventName, ...args);
            } catch( e ) {
                console.error(`Observer "${this._name}" and the event handler for "${eventName.toString()}" returned an exception: `, e);
            }
        });

    }

    /**
     * Start listening events.
     *
     * Returns destructor function.
     *
     * @param eventName
     * @param callback
     */
    public listenEvent (eventName : EventName, callback : ObserverCallback<EventName> ) : ObserverDestructor {

        if (!this.hasCallbacks(eventName)) {
            this._callbacks[eventName] = [ callback ];
        } else {
            this._callbacks[eventName].push( callback );
        }

        return () => this.removeListener(eventName, callback);

    }

    /**
     * Removes the first found listener callback for eventName
     *
     * @param eventName
     * @param callback
     */
    public removeListener (eventName : EventName, callback: ObserverCallback<EventName>) : void {

        if (!this.hasCallbacks(eventName)) {
            console.warn(`Warning! Could not remove callback since the observer for "${this._name}" did not have anything listening "${eventName.toString()}"`);
            return;
        }

        let removedOnce = false;

        this._callbacks[eventName] = filter(this._callbacks[eventName], (item: any) => {
            if ( !removedOnce && item === callback ) {
                removedOnce = true;
                return false;
            }
            return true;

        });

        if (this._callbacks[eventName].length === 0) {
            delete this._callbacks[eventName];
        }

        if (!removedOnce) {
            console.warn(`Warning! Could not remove the callback since the observer for "${this._name}" did not have that callback`);
            return;
        }

    }

    /**
     * Returns a Promise that is resolved when the specified event is triggered.
     *
     * @param eventName The name of the event to wait for.
     * @param time The maximum amount of time (in milliseconds) to wait for the
     *             event before timing out.
     * @returns A Promise that is resolved when the specified event is triggered,
     *          or rejected with a timeout error if the event is not triggered
     *          within the specified timeout.
     */
    public async waitForEvent (
        eventName : EventName,
        time: number
    ): Promise<void> {
        await new Promise<void>(
            (resolve, reject) => {
                try {
                    let timeout: any | undefined = undefined;
                    let listener: ObserverDestructor | undefined = undefined;
                    timeout = setTimeout(
                        () => {
                            try {
                                timeout = undefined;
                                if ( listener ) {
                                    listener();
                                    listener = undefined;
                                }
                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        },
                        time
                    );

                    listener = this.listenEvent(
                        eventName,
                        () => {
                            try {
                                if ( timeout ) {
                                    clearTimeout(timeout);
                                    timeout = undefined;
                                }
                                if (listener) {
                                    listener();
                                    listener = undefined;
                                }
                                resolve();
                            } catch (err) {
                                reject(err);
                            }
                        }
                    );

                } catch (err) {
                    reject(err);
                }
            }
        );
    }


}

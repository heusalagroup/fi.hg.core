// Copyright (c) 2020 Sendanor. All rights reserved.

import { filter, forEach, has } from "./modules/lodash";

export interface ObserverCallback<EventName extends keyof any, T extends any[] = any[] > {
    (event: EventName, ...args : T) : void;
}

export interface ObserverDestructor {
    () : void;
}

export type ObserverCallbackArray<EventName extends keyof any> = Array<ObserverCallback<EventName>>;

export type ObserverRecord<EventName extends keyof any> = Record<EventName, ObserverCallbackArray<EventName> >;

/**
 * This is a simple observer implementation for implementing synchronous in-process events for a local service.
 *
 * You'll use it like:
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
 *
 *         HttpService.doSomething().then((response) => {
 *
 *             this._data = response.data;
 *
 *             this._observer.triggerEvent(FooEvent.CHANGED);
 *
 *         }).catch(err => {
 *             console.error('Error: ', err);
 *         });
 *
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
export class Observer<EventName extends keyof any> {

    private _name      : string;
    private _callbacks : ObserverRecord<EventName>;

    getName () : string {
        return this._name;
    }

    /**
     *
     * @param name You can name this observer, so that you know where it is used.
     */
    constructor(name: string) {

        this._name = name;
        this._callbacks = {} as ObserverRecord<EventName>;

    }

    /**
     * Destroy the observer data. Stop using this object after you use destroy.
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
            console.warn(`Warning! The observer for "${this._name}" did not have anything listening "${eventName}"`);
            return;
        }

        const callbacks = this._callbacks[eventName];

        forEach(callbacks, callback => {
            try {
                callback(eventName, ...args);
            } catch( e ) {
                console.error(`Observer "${this._name}" and the event handler for "${eventName}" returned an exception: `, e);
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
            console.warn(`Warning! Could not remove callback since the observer for "${this._name}" did not have anything listening "${eventName}"`);
            return;
        }

        let removedOnce = false;

        this._callbacks[eventName] = filter(this._callbacks[eventName], item => {

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

}

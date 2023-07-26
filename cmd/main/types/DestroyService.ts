// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Disposable } from "../../../types/Disposable";
import { DisposeAware } from "../../../types/DisposeAware";
import { ObserverCallback, ObserverDestructor } from "../../../Observer";
import { VoidCallback } from "../../../interfaces/callbacks";

export enum DestroyServiceEvent {
    DESTROYED = "DESTROYED"
}

export type DestroyServiceDestructor = ObserverDestructor;

export interface DestroyService extends Disposable, DisposeAware {

    /**
     * Listen event for disposing
     *
     * @param name
     * @param callback
     */
    on (
        name: DestroyServiceEvent.DESTROYED,
        callback: ObserverCallback<DestroyServiceEvent>
    ): DestroyServiceDestructor;

    /**
     * @inheritDoc
     */
    destroy (): void;

    /**
     * @inheritDoc
     */
    isDestroyed () : boolean;

    /**
     * Add a listener which will be called once when the service is destroyed.
     *
     * @param callback
     */
    addDestroyListener (callback: VoidCallback) : DestroyServiceDestructor;

    /**
     * Register a listener which will be called once when the service is destroyed.
     *
     * @param obj Disposable object
     */
    registerDisposable (obj: Disposable) : DestroyServiceDestructor;

}

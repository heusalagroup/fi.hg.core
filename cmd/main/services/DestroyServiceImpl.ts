// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DestroyService, DestroyServiceDestructor, DestroyServiceEvent } from "./DestroyService";
import { Observer, ObserverCallback, ObserverDestructor } from "../../../Observer";
import { VoidCallback } from "../../../interfaces/callbacks";
import { Disposable } from "../../../types/Disposable";

export class DestroyServiceImpl implements DestroyService {

    private _isDestroyed : boolean;
    private readonly _observer: Observer<DestroyServiceEvent>;

    public static Event = DestroyServiceEvent;

    public static create () : DestroyService {
        return new DestroyServiceImpl();
    }

    protected constructor () {
        this._isDestroyed = false;
        this._observer = new Observer<DestroyServiceEvent>( "DestroyServiceImpl" );
    }

    /**
     * @inheritDoc
     */
    public destroy (): void {
        if (this._observer.hasCallbacks(DestroyServiceEvent.DESTROYED)) {
            this._observer.triggerEvent(DestroyServiceEvent.DESTROYED);
        }
        this._isDestroyed = true;
        this._observer.destroy();
    }

    /**
     * @inheritDoc
     */
    public on (
        name: DestroyServiceEvent,
        callback: ObserverCallback<DestroyServiceEvent>
    ): DestroyServiceDestructor {
        return this._observer.listenEvent( name, callback );
    }

    /**
     * @inheritDoc
     */
    public isDestroyed (): boolean {
        return this._isDestroyed;
    }

    /**
     * @inheritDoc
     */
    public addDestroyListener (
        callback: VoidCallback
    ) : DestroyServiceDestructor {
        let destructor : ObserverDestructor | undefined = this.on(
            DestroyServiceEvent.DESTROYED,
            () => {
                if (destructor) {
                    destructor();
                    destructor = undefined;
                    callback();
                }
            }
        );
        return () => {
            if (destructor) {
                destructor();
                destructor = undefined;
            }
        }
    }

    /**
     * @inheritDoc
     */
    public registerDisposable (
        obj: Disposable
    ) : DestroyServiceDestructor {
        return this.addDestroyListener(
            () => obj.destroy()
        );
    }

}

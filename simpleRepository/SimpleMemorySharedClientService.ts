// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SimpleSharedClientService, SharedClientServiceDestructor } from "./types/SimpleSharedClientService";
import { SimpleMemoryRepositoryClient } from "./SimpleMemoryRepositoryClient";
import { Observer, ObserverCallback } from "../Observer";
import { SimpleSharedClientServiceEvent } from "./types/SimpleSharedClientServiceEvent";

export class SimpleMemorySharedClientService implements SimpleSharedClientService {

    private _observer        : Observer<SimpleSharedClientServiceEvent>;
    private readonly _client : SimpleMemoryRepositoryClient;

    public constructor () {
        this._observer = new Observer<SimpleSharedClientServiceEvent>("MemorySharedClientService");
        this._client = new SimpleMemoryRepositoryClient();
    }

    public destroy (): void {
        this._observer.destroy();
    }

    public getClient (): SimpleMemoryRepositoryClient {
        return this._client;
    }

    public async initialize (
        // @ts-ignore @todo Why not used?
        url: string
    ): Promise<void> {
        if(this._observer.hasCallbacks(SimpleSharedClientServiceEvent.INITIALIZED)) {
            this._observer.triggerEvent(SimpleSharedClientServiceEvent.INITIALIZED);
        }
    }

    public isInitializing (): boolean {
        return false;
    }

    public async login (
        // @ts-ignore @todo Why not used?
        url: string
    ): Promise<void> {
    }

    /**
     *
     * @param name
     * @param callback
     */
    public on (
        name: SimpleSharedClientServiceEvent,
        callback: ObserverCallback<SimpleSharedClientServiceEvent>
    ): SharedClientServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public async waitForInitialization (): Promise<void> {
    }

}


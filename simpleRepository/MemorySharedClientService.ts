// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { SharedClientService, SharedClientServiceDestructor } from "./types/SharedClientService";
import { MemoryRepositoryClient } from "./MemoryRepositoryClient";
import { Observer, ObserverCallback } from "../Observer";
import { SharedClientServiceEvent } from "./types/SharedClientServiceEvent";

export class MemorySharedClientService implements SharedClientService {

    private _observer        : Observer<SharedClientServiceEvent>;
    private readonly _client : MemoryRepositoryClient;

    public constructor () {
        this._observer = new Observer<SharedClientServiceEvent>("MemorySharedClientService");
        this._client = new MemoryRepositoryClient();
    }

    public destroy (): void {
        this._observer.destroy();
    }

    public getClient (): MemoryRepositoryClient {
        return this._client;
    }

    public async initialize (url: string): Promise<void> {
        if(this._observer.hasCallbacks(SharedClientServiceEvent.INITIALIZED)) {
            this._observer.triggerEvent(SharedClientServiceEvent.INITIALIZED);
        }
    }

    public isInitializing (): boolean {
        return false;
    }

    public async login (url: string): Promise<void> {
    }

    /**
     *
     * @param name
     * @param callback
     */
    public on (
        name: SharedClientServiceEvent,
        callback: ObserverCallback<SharedClientServiceEvent>
    ): SharedClientServiceDestructor {
        return this._observer.listenEvent(name, callback);
    }

    public async waitForInitialization (): Promise<void> {
    }

}


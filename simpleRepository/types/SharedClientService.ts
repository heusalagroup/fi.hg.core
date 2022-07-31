// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ObserverCallback, ObserverDestructor } from "../../Observer";
import { RepositoryClient } from "./RepositoryClient";
import { SharedClientServiceEvent } from "./SharedClientServiceEvent";

export type SharedClientServiceDestructor = ObserverDestructor;

export interface SharedClientService {
    getClient () : RepositoryClient | undefined;
    isInitializing () : boolean;
    on (
        name: SharedClientServiceEvent,
        callback: ObserverCallback<SharedClientServiceEvent>
    ): SharedClientServiceDestructor;
    destroy (): void;
    login (url: string) : Promise<void>;
    initialize (url : string) : Promise<void>;
    waitForInitialization () : Promise<void>;
}

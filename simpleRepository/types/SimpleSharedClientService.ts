// Copyright (c) 2022. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ObserverCallback, ObserverDestructor } from "../../Observer";
import { SimpleRepositoryClient } from "./SimpleRepositoryClient";
import { SimpleSharedClientServiceEvent } from "./SimpleSharedClientServiceEvent";

export type SharedClientServiceDestructor = ObserverDestructor;

export interface SimpleSharedClientService {
    destroy (): void;
    getClient () : SimpleRepositoryClient | undefined;
    isInitializing () : boolean;
    on (
        name: SimpleSharedClientServiceEvent,
        callback: ObserverCallback<SimpleSharedClientServiceEvent>
    ): SharedClientServiceDestructor;
    destroy (): void;
    login (url: string) : Promise<void>;
    initialize (url : string) : Promise<void>;
    waitForInitialization () : Promise<void>;
}

// Copyright (c) 2022-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ObserverCallback, ObserverDestructor } from "../../Observer";
import { SimpleRepositoryClient } from "./SimpleRepositoryClient";
import { SimpleSharedClientServiceEvent } from "./SimpleSharedClientServiceEvent";
import { Disposable } from "../../types/Disposable";

export type SharedClientServiceDestructor = ObserverDestructor;

export interface SimpleSharedClientService extends Disposable {
    destroy (): void;
    getClient () : SimpleRepositoryClient | undefined;
    isInitializing () : boolean;
    on (
        name: SimpleSharedClientServiceEvent,
        callback: ObserverCallback<SimpleSharedClientServiceEvent>
    ): SharedClientServiceDestructor;
    login (url: string) : Promise<void>;
    initialize (url : string) : Promise<void>;
    waitForInitialization () : Promise<void>;
}

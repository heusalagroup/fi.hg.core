// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ObserverCallback, ObserverDestructor } from "./Observer";
import { Disposable } from "./types/Disposable";

export enum RequestServerEvent {
    CONTROLLER_ATTACHED = "RequestServer:controllerAttached",
    STARTED = "RequestServer:started",
    STOPPED = "RequestServer:stopped"
}

export type RequestServerDestructor = ObserverDestructor;

export interface RequestServer extends Disposable {

    on (
        name: RequestServerEvent,
        callback: ObserverCallback<RequestServerEvent>
    ): RequestServerDestructor;

    destroy (): void;

    attachController (
        controller : any
    ) : void;

    start () : void;

    stop () : void;

}

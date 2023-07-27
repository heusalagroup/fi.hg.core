// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { Observer, ObserverCallback } from "../../../Observer";
import { StateService, StateServiceDestructor, StateServiceEvent } from "./StateService";
import { ReadonlyJsonObject } from "../../../Json";

export abstract class StateServiceImpl<DTO = ReadonlyJsonObject> implements StateService<DTO> {

    private _fileName : string | undefined;
    protected readonly _observer: Observer<StateServiceEvent>;

    public static Event = StateServiceEvent;

    protected constructor () {
        this._observer = new Observer<StateServiceEvent>( "StateServiceImpl" );
    }

    public destroy (): void {
        this._observer.destroy();
    }

    public on (
        name: StateServiceEvent,
        callback: ObserverCallback<StateServiceEvent>
    ): StateServiceDestructor {
        return this._observer.listenEvent( name, callback );
    }

    public setStateFileName (value: string | undefined) : void {
        this._fileName = value;
    }
    public getStateFileName () : string | undefined {
        return this._fileName;
    }

    abstract setDTO (dto: DTO) : void;
    abstract getDTO () : DTO;

}

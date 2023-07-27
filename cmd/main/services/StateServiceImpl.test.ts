// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { StateService, StateServiceEvent } from './StateService';
import { StateServiceImpl } from './StateServiceImpl';
import { isEqual } from "../../../functions/isEqual";
import { Observer } from "../../../Observer";

// Mock DTO object
type MockDTO = {
    key: string;
};

class MockStateServiceImpl extends StateServiceImpl<MockDTO> {
    private _data: MockDTO;

    protected constructor (data: MockDTO) {
        super();
        this._data = data;
    }

    public static create (data: MockDTO) : StateService<MockDTO> {
        return new MockStateServiceImpl(data);
    }

    public getObserver () : Observer<StateServiceEvent> {
        return this._observer;
    }

    public setDTO (dto: MockDTO): void {
        this._data = dto;
        if (!isEqual(this._data, dto)) {
            if (this._observer.hasCallbacks(StateServiceEvent.CHANGED)) {
                this._observer.triggerEvent(StateServiceEvent.CHANGED);
            }
        }
    }

    public getDTO (): MockDTO {
        return this._data;
    }

}

describe('StateServiceImpl', () => {
    let stateService: MockStateServiceImpl;

    beforeEach(() => {
        stateService = MockStateServiceImpl.create({key: ''}) as MockStateServiceImpl;
    });

    afterEach(() => {
        stateService.destroy();
    });

    describe('on', () => {
        it('registers an event listener', () => {
            const callback = jest.fn();
            stateService.on(StateServiceEvent.CHANGED, callback);

            // In reality, an event should trigger the callback, but for this test, we manually trigger it
            stateService.getObserver().triggerEvent(StateServiceEvent.CHANGED);

            expect(callback).toHaveBeenCalled();
        });
    });

    describe('setStateFileName', () => {
        it('sets the state file name', () => {
            stateService.setStateFileName('test.txt');
            expect(stateService.getStateFileName()).toBe('test.txt');
        });
    });

    describe('getStateFileName', () => {
        it('gets the state file name', () => {
            stateService.setStateFileName('test.txt');
            expect(stateService.getStateFileName()).toBe('test.txt');
        });
    });

    describe('setDTO', () => {
        it('sets the DTO', () => {
            stateService.setDTO({ key: 'value' });
            expect(stateService.getDTO()).toEqual({ key: 'value' });
        });
    });

    describe('getDTO', () => {
        it('gets the DTO', () => {
            stateService.setDTO({ key: 'value' });
            expect(stateService.getDTO()).toEqual({ key: 'value' });
        });
    });

});

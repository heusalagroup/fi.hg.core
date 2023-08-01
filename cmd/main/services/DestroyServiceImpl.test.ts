// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { DestroyService } from './DestroyService';
import { DestroyServiceImpl } from './DestroyServiceImpl';
import { Disposable } from "../../../types/Disposable";

class MockDisposable implements Disposable {
    destroyCalled = false;
    destroy() {
        this.destroyCalled = true;
    }
}

describe('DestroyServiceImpl', () => {
    let destroyService: DestroyService;

    beforeEach(() => {
        destroyService = DestroyServiceImpl.create();
    });

    describe('destroy', () => {
        it('sets isDestroyed to true', () => {
            destroyService.destroy();
            expect(destroyService.isDestroyed()).toBe(true);
        });
    });

    describe('isDestroyed', () => {
        it('returns false if not destroyed', () => {
            expect(destroyService.isDestroyed()).toBe(false);
        });

        it('returns true if destroyed', () => {
            destroyService.destroy();
            expect(destroyService.isDestroyed()).toBe(true);
        });
    });

    describe('addDestroyListener', () => {

        it('calls the callback when destroyed', () => {
            const callback = jest.fn();
            destroyService.addDestroyListener(callback);
            destroyService.destroy();
            expect(callback).toHaveBeenCalled();
        });

        it('can be cancelled by calling the destructor', () => {
            const callback = jest.fn();
            const destructor = destroyService.addDestroyListener(callback);
            destructor();
            destroyService.destroy();
            expect(callback).not.toHaveBeenCalled();
        });

    });

    describe('registerDisposable', () => {
        it('destroys the disposable when destroyed', () => {
            const disposable = new MockDisposable();
            destroyService.registerDisposable(disposable);
            destroyService.destroy();
            expect(disposable.destroyCalled).toBe(true);
        });
    });

});

// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { AsyncSynchronizerImpl } from "./AsyncSynchronizerImpl";
import { LogLevel } from "./types/LogLevel";

describe('AsyncSynchronizerImpl', () => {

    let asyncSynchronizer: AsyncSynchronizerImpl;

    beforeAll(() => {
        AsyncSynchronizerImpl.setLogLevel(LogLevel.NONE);
    });

    beforeEach(() => {
        asyncSynchronizer = AsyncSynchronizerImpl.create();
    });

    describe('create', () => {
        it('should create an instance of AsyncSynchronizerImpl', () => {
            expect(asyncSynchronizer).toBeInstanceOf(AsyncSynchronizerImpl);
        });
    });

    describe('run', () => {

        it('should return the result of the callback', async () => {
            const expectedResult : string = 'Test';
            const callback = jest.fn<() => Promise<string>>().mockResolvedValue(expectedResult);

            const result = await asyncSynchronizer.run<string>(callback);

            expect(result).toBe(expectedResult);
            expect(callback).toHaveBeenCalled();
        });

        it('should execute the callbacks in order', async () => {
            let callbackOrder: number[] = [];
            const callback1 = jest.fn(() => new Promise(resolve => setTimeout(() => resolve(callbackOrder.push(1)), 200)));
            const callback2 = jest.fn(() => new Promise(resolve => setTimeout(() => resolve(callbackOrder.push(2)), 100)));
            asyncSynchronizer.run(callback1);
            asyncSynchronizer.run(callback2);
            await new Promise(resolve => setTimeout(resolve, 400));
            expect(callbackOrder).toEqual([1, 2]);
        });

    });

});

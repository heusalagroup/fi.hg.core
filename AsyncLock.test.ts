// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createAsyncLock } from "./AsyncLock";

describe('AsyncLock', () => {

    describe('createAsyncLock', () => {

        it('should create an instance of AsyncLock', () => {
            const asyncLock = createAsyncLock();
            expect(typeof asyncLock).toBe('object');
        });

        it('should create a new instance each time it is called', () => {
            const asyncLock1 = createAsyncLock();
            const asyncLock2 = createAsyncLock();
            expect(asyncLock1).not.toBe(asyncLock2);
        });

        it('should create an empty object', () => {
            const asyncLock = createAsyncLock();
            expect(Object.keys(asyncLock).length).toBe(0);
        });

    });

});

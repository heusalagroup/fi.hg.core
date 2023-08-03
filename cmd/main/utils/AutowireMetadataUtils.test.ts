// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "reflect-metadata";
import { AutowireMetadataUtils } from './AutowireMetadataUtils';
import { createAutowireMetadata } from '../types/AutowireMetadata';

describe('AutowireMetadataUtils', () => {

    let targetMock : any;
    let methodNameMock : any;

    beforeEach(() => {

        jest.spyOn(Reflect, 'getMetadata');
        jest.spyOn(Reflect, 'defineMetadata');

        // Clear all mocks before each test
        jest.clearAllMocks();

        // Mock target object and methodName
        targetMock = {};
        methodNameMock = 'methodName';

    });

    describe('getMethodMetadata', () => {
        it('should return the metadata of the method', () => {
            const expectedMetadata = createAutowireMetadata(['param1', 'param2']);
            (Reflect.getMetadata as any).mockReturnValue(expectedMetadata);

            const metadata = AutowireMetadataUtils.getMethodMetadata(targetMock, methodNameMock);

            expect(metadata).toBe(expectedMetadata);
            expect(Reflect.getMetadata).toHaveBeenCalledWith(expect.any(Symbol), targetMock, methodNameMock);
        });
    });

    describe('updateMethodMetadata', () => {
        it('should update the metadata of the method', () => {
            const initialMetadata = createAutowireMetadata(['param1', 'param2']);
            const expectedMetadata = createAutowireMetadata(['param3', 'param4']);

            (Reflect.getMetadata as any).mockReturnValue(initialMetadata);

            AutowireMetadataUtils.updateMethodMetadata(targetMock, methodNameMock, () => expectedMetadata);

            expect(Reflect.defineMetadata).toHaveBeenCalledWith(expect.any(Symbol), expectedMetadata, targetMock, methodNameMock);
        });
    });

});

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from '@jest/globals';
import { AutowireServiceImpl } from '../services/AutowireServiceImpl';
import { AutowireMetadataUtils } from './AutowireMetadataUtils';
import { AutowireUtils } from './AutowireUtils';
import { LogLevel } from "../../../types/LogLevel";
import { AutowireService } from "../services/AutowireService";

jest.mock('../services/AutowireServiceImpl', () => ({
    AutowireServiceImpl: {
        getAutowireService: jest.fn<any>()
    }
}));

jest.mock('./AutowireMetadataUtils', () => ({
    AutowireMetadataUtils: {
        getMethodMetadata: jest.fn<any>()
    }
}));

describe('AutowireUtils', () => {

    let autowireServiceMock : Partial<AutowireService>;
    let mockTarget : {propertyName: jest.Mock<any>};

    beforeAll( () => {
        AutowireUtils.setLogLevel(LogLevel.NONE);
    });

    beforeEach(() => {

        // Clear all mocks before each test
        jest.clearAllMocks();

        // Setup mock functions
        autowireServiceMock = {
            setName: jest.fn<any>(),
            hasName: jest.fn<any>(),
            getName: jest.fn<any>(),
            deleteName: jest.fn<any>()
        };

        // Mock target object
        mockTarget = {
            propertyName: jest.fn<any>()
        };

        (AutowireServiceImpl.getAutowireService as any).mockReturnValue(autowireServiceMock);
        (AutowireMetadataUtils.getMethodMetadata as any).mockReturnValue({ paramNames: ['name', 'age'] });

        (autowireServiceMock.hasName as any).mockImplementation((name: any) : boolean => name === 'name' || name === 'age');
        (autowireServiceMock.getName as any).mockImplementation((name: any) => name === 'name' ? 'John' : 30);
    });

    describe('autowireValues', () => {
        it('should return autowired values', () => {
            (autowireServiceMock.hasName as any).mockReturnValue(true);

            const autowiredValues = AutowireUtils.autowireValues(autowireServiceMock as AutowireService, ['name', 'age']);

            expect(autowireServiceMock.hasName).toHaveBeenCalledTimes(2);
            expect(autowiredValues).toEqual(['John', 30]);
        });
    });

    describe('autowireApply', () => {

        it('should apply autowired values to the method', () => {
            const values = {
                name: 'John',
                age: 30
            };

            AutowireUtils.autowireApply(mockTarget, 'propertyName', mockTarget.propertyName, values);

            // Check if mock function was called with autowired values
            expect(mockTarget.propertyName).toHaveBeenCalledWith('John', 30);
        });

        it('should clean up autowired values after method call', () => {
            const values = {
                name: 'John',
                age: 30
            };

            AutowireUtils.autowireApply(mockTarget, 'propertyName', mockTarget.propertyName, values);

            // Check if autowired values are deleted after method call
            expect(autowireServiceMock.deleteName).toHaveBeenCalledTimes(3); // Once for each key in the values and once for 'autowireService'
        });

    });

});

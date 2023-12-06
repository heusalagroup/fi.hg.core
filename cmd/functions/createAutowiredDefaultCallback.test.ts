// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from "@jest/globals";
import { createAutowiredDefaultCallback } from './createAutowiredDefaultCallback';
import { AutowireServiceImpl } from "../main/services/AutowireServiceImpl";
import { AutowireUtils } from "../main/utils/AutowireUtils";
import { LogLevel } from "../../types/LogLevel";
import { autowired } from "../main/autowired";
import { addAutowired } from "../main/addAutowired";

describe('createAutowiredDefaultCallback', () => {

    let setNameSpy: jest.SpiedFunction<(...args: any[]) => any>;
    let hasNameSpy: jest.SpiedFunction<(...args: any[]) => any>;
    let getNameSpy: jest.SpiedFunction<(...args: any[]) => any>;

    // AutowireServiceImpl instance
    let autowireService: AutowireServiceImpl;

    beforeAll(() => {

        AutowireUtils.setLogLevel(LogLevel.NONE);
        addAutowired.setLogLevel(LogLevel.NONE);
        autowired.setLogLevel(LogLevel.NONE);

        // Create a new instance of AutowireServiceImpl
        autowireService = AutowireServiceImpl.create();
        // Make getAutowireService return our instance
        AutowireServiceImpl.getAutowireService = jest.fn(() => autowireService);

        // Now we can spy on setName, hasName, and getName
        setNameSpy = jest.spyOn(autowireService, 'setName');
        hasNameSpy = jest.spyOn(autowireService, 'hasName');
        getNameSpy = jest.spyOn(autowireService, 'getName');
    });

    beforeEach(() => {
        // Clear all mocks before each test
        setNameSpy.mockClear();
        hasNameSpy.mockClear();
        getNameSpy.mockClear();
    });

    it('returns a DefaultValueCallback that returns autowired value', () => {
        const autowiredTo = 'autowiredValue';
        const testValue = 'test';

        // Set up our autowired value
        setNameSpy.mockImplementation((name: any, value: any) => {
            if (name === autowiredTo) {
                hasNameSpy.mockReturnValue(true);
                getNameSpy.mockReturnValue(value);
            }
        });

        autowireService.setName(autowiredTo, testValue);

        // Create the DefaultValueCallback
        const defaultValueCallback = createAutowiredDefaultCallback(autowiredTo);

        // Assert that the DefaultValueCallback returns the autowired value
        expect(defaultValueCallback()).toBe(testValue);
    });

    it('returns a DefaultValueCallback that returns undefined when there is no autowired value', () => {
        const autowiredTo = 'autowiredValue';

        // Make sure there is no autowired value
        setNameSpy.mockImplementation((name: any, value: any) => {
            if (name === autowiredTo) {
                hasNameSpy.mockReturnValue(false);
                getNameSpy.mockReturnValue(value);
            }
        });

        autowireService.setName(autowiredTo, undefined);

        // Create the DefaultValueCallback
        const defaultValueCallback = createAutowiredDefaultCallback(autowiredTo);

        // Assert that the DefaultValueCallback returns undefined
        expect(defaultValueCallback()).toBeUndefined();
    });

});

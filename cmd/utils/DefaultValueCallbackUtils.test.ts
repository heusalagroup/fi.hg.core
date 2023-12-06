// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { jest } from "@jest/globals";
import { DefaultValueCallbackUtils } from "./DefaultValueCallbackUtils";
import { createAutowiredDefaultCallback } from "../functions/createAutowiredDefaultCallback";
import { DefaultValueCallback } from "../types/DefaultValueCallback";
import { LogLevel } from "../../types/LogLevel";
import { addAutowired } from "../main/addAutowired";
import { autowired } from "../main/autowired";
import { AutowireServiceImpl } from "../main/services/AutowireServiceImpl";
import { AutowireUtils } from "../main/utils/AutowireUtils";

describe('DefaultValueCallbackUtils', () => {

    // AutowireServiceImpl instance
    let autowireService: AutowireServiceImpl;
    let setNameSpy: jest.SpiedFunction<(...args: any) => any>;
    let hasNameSpy: jest.SpiedFunction<(...args: any) => any>;
    let getNameSpy: jest.SpiedFunction<(...args: any) => any>;

    beforeAll(() => {
        AutowireUtils.setLogLevel(LogLevel.NONE);
        addAutowired.setLogLevel(LogLevel.NONE);
        autowired.setLogLevel(LogLevel.NONE);
    });

    beforeAll(() => {
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

    describe('#fromAutowired', () => {

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
            const defaultValueCallback = DefaultValueCallbackUtils.fromAutowired(autowiredTo);

            // Assert that the DefaultValueCallback returns the autowired value
            expect(defaultValueCallback()).toBe(testValue);
        });

        it('returns a DefaultValueCallback that returns undefined when there is no autowired value', () => {
            const autowiredTo = 'autowiredValue';

            // Make sure there is no autowired value
            setNameSpy.mockImplementation((name, value) => {
                if (name === autowiredTo) {
                    hasNameSpy.mockReturnValue(false);
                    getNameSpy.mockReturnValue(value);
                }
            });

            autowireService.setName(autowiredTo, undefined);

            // Create the DefaultValueCallback
            const defaultValueCallback = DefaultValueCallbackUtils.fromAutowired(autowiredTo);

            // Assert that the DefaultValueCallback returns undefined
            expect(defaultValueCallback()).toBeUndefined();
        });

    });

    describe('#fromChain', () => {

        it('returns a DefaultValueCallback', () => {
            const callbacks: DefaultValueCallback[] = [
                createAutowiredDefaultCallback('myArg1'),
                createAutowiredDefaultCallback('myArg2')
            ];
            const result = DefaultValueCallbackUtils.fromChain(...callbacks);
            expect(typeof result).toBe('function');
        });

        it('chains multiple DefaultValueCallback functions together', async () => {
            // Create some test callbacks
            const callback1: DefaultValueCallback = jest.fn((value) => `${value}_callback1`);
            const callback2: DefaultValueCallback = jest.fn(async (value) => `${value}_callback2`);
            const callback3: DefaultValueCallback = jest.fn((value) => `${value}_callback3`);

            // Chain the callbacks
            const chainedCallback = DefaultValueCallbackUtils.fromChain(callback1, callback2, callback3);

            // Call the chained callback
            const result = await chainedCallback('initial');

            // Check the result
            expect(result).toBe('initial_callback1_callback2_callback3');

            // Check if the callbacks were called
            expect(callback1).toHaveBeenCalledWith('initial');
            expect(callback2).toHaveBeenCalledWith('initial_callback1');
            expect(callback3).toHaveBeenCalledWith('initial_callback1_callback2');
        });

        it('returns the input value when no callbacks are provided', async () => {
            // Chain no callbacks
            const chainedCallback = DefaultValueCallbackUtils.fromChain();

            // Call the chained callback
            const result = await chainedCallback('initial');

            // Check the result
            expect(result).toBe('initial');
        });

    });

});

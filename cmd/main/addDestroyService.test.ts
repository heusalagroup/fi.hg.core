// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import "../../LogService";

jest.mock('../../LogService', () => ({
    LogService: {
        createLogger: jest.fn().mockImplementation((name: string) => ({
            name,
            setLogLevel: jest.fn(),
            debug: jest.fn(),
            info: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
        }))
    }
}));

// @ts-ignore
import "../../../jest/matchers";
import { addDestroyService } from './addDestroyService';
import { autowired } from './autowired';
import { LogLevel } from "../../types/LogLevel";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { addAutowired } from "./addAutowired";
import { ProcessUtils } from "../../ProcessUtils";
import { AutowireUtils } from "./utils/AutowireUtils";
import { DestroyService } from "./services/DestroyService";
import { LogService } from "../../LogService";
import { find } from "../../functions/find";

jest.mock('../../ProcessUtils', () => ({
    ProcessUtils: {
        setupDestroyHandler: jest.fn(),
    }
}));

jest.mock('./services/DestroyServiceImpl', () => ({
    DestroyServiceImpl : {
        create: jest.fn().mockImplementation(() => ({
            on: jest.fn(),
            destroy: jest.fn(),
            isDestroyed: jest.fn(),
            addDestroyListener: jest.fn(),
            registerDisposable: jest.fn(),
        }))
    }
}));

addDestroyService.setLogLevel(LogLevel.NONE);
addAutowired.setLogLevel(LogLevel.NONE);
autowired.setLogLevel(LogLevel.NONE);

describe('addDestroyService', () => {

    beforeAll(() => {
        AutowireUtils.setLogLevel(LogLevel.NONE);
    });

    it('sets up destroy handlers and correctly autowires destroyService', async () => {

        let retrievedDestroyService: DestroyService | undefined = undefined;

        // Mock class with a method decorated with `addDestroyService` and `addAutowired`
        class MyApp {
            @addDestroyService()
            @addAutowired()
            public async run(
                @autowired('destroyService')
                destroyService ?: any,
            ): Promise<CommandExitStatus> {
                retrievedDestroyService = destroyService;
                return CommandExitStatus.OK;
            }
        }

        const autowireService = AutowireServiceImpl.create();
        AutowireServiceImpl.setAutowireService(autowireService);
        const app = new MyApp();
        await app.run();

        // Check if setupDestroyHandler was called
        expect(ProcessUtils.setupDestroyHandler).toHaveBeenCalled();

        // Check if autowired destroyService matches expected value
        expect(retrievedDestroyService).toBeDefined();

        const callback = (ProcessUtils.setupDestroyHandler as any).mock.calls[0][0];

        // @ts-ignore
        expect(callback).toBeFunction();
        expect((retrievedDestroyService as any)?.destroy).not.toHaveBeenCalled();
        callback();
        expect((retrievedDestroyService as any)?.destroy).toHaveBeenCalled();

    });

    it('sets up destroy handlers and correctly autowires destroyService and handles errors', async () => {

        let retrievedDestroyService: DestroyService | undefined = undefined;

        // Mock class with a method decorated with `addDestroyService` and `addAutowired`
        class MyApp {
            @addDestroyService()
            @addAutowired()
            public async run(
                @autowired('destroyService')
                destroyService ?: any,
            ): Promise<CommandExitStatus> {
                retrievedDestroyService = destroyService;
                return CommandExitStatus.OK;
            }
        }

        const autowireService = AutowireServiceImpl.create();
        AutowireServiceImpl.setAutowireService(autowireService);
        const app = new MyApp();
        await app.run();

        // Check if setupDestroyHandler was called
        expect(ProcessUtils.setupDestroyHandler).toHaveBeenCalled();

        // Check if autowired destroyService matches expected value
        expect(retrievedDestroyService).toBeDefined();

        const errorCallback = (ProcessUtils.setupDestroyHandler as any).mock.calls[0][1];
        expect(errorCallback).toBeFunction();
        errorCallback('mock error');

        const LOG = find(
            (LogService.createLogger as any).mock.results,
            (result) => {
                return result.value.name === 'addDestroyService';
            }
        );

        expect(LOG.value.name).toBe('addDestroyService');
        expect(LOG.value.error).toHaveBeenCalledWith('Error while shutting down the service: ', 'mock error');

    });

});

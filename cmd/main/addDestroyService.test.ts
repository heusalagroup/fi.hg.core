// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { addDestroyService } from './addDestroyService';
import { autowired } from './autowired';
import { LogLevel } from "../../types/LogLevel";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { addAutowired } from "./addAutowired";
import { ProcessUtils } from "../../ProcessUtils";
import { DestroyServiceImpl } from "./services/DestroyServiceImpl";
import { AutowireUtils } from "./utils/AutowireUtils";

jest.mock('../../ProcessUtils', () => ({
    ProcessUtils: {
        setupDestroyHandler: jest.fn(),
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
        let retrievedDestroyService: any = undefined;

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
        expect(retrievedDestroyService).toBeInstanceOf(DestroyServiceImpl);
    });

});

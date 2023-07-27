// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { addErrorHandler } from './addErrorHandler';
import { LogLevel } from "../../types/LogLevel";
import { CommandExitStatus } from "../types/CommandExitStatus";

describe('addErrorHandler', () => {

    beforeAll(() => {
        addErrorHandler.setLogLevel(LogLevel.NONE);
    });

    it('handles errors properly and returns the correct exit status', async () => {
        // Define an example class with a method decorated with `addErrorHandler`
        class MyApp {
            @addErrorHandler(CommandExitStatus.FATAL_ERROR)
            public async run(
                args: string[] = []
            ) {
                if (args.length > 0) {
                    throw new Error('Error!');
                }
                return CommandExitStatus.OK;
            }
        }

        const app = new MyApp();

        // Test when no error is thrown
        let result = await app.run([]);
        expect(result).toEqual(CommandExitStatus.OK);

        // Test when an error is thrown
        result = await app.run(['hello']);
        expect(result).toEqual(CommandExitStatus.FATAL_ERROR);
    });

});

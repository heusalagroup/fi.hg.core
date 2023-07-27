// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { addArgumentParser } from './addArgumentParser';
import { autowired } from './autowired';
import { LogLevel } from "../../types/LogLevel";
import { addAutowired } from "./addAutowired";
import { ArgumentType, CommandArgumentUtils } from "../utils/CommandArgumentUtils";
import type { ArgumentValueMap } from "../utils/CommandArgumentUtils";
import type { ParsedCommandArgumentObject } from "../utils/CommandArgumentUtils";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { AutowireUtils } from "./utils/AutowireUtils";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { AutowireService } from "./services/AutowireService";

addArgumentParser.setLogLevel(LogLevel.NONE);
addAutowired.setLogLevel(LogLevel.NONE);
autowired.setLogLevel(LogLevel.NONE);

describe('addArgumentParser', () => {

    beforeAll(() => {
        CommandArgumentUtils.setLogLevel(LogLevel.NONE);
        AutowireUtils.setLogLevel(LogLevel.NONE);
    });

    describe('integration testing', () => {

        let autowireService : AutowireService;
        let retrievedArgs: string[];
        let retrievedFreeArgs : string[] | undefined;
        let retrievedBackend: string;
        let retrievedUserArgs: ArgumentValueMap | undefined;
        let retrievedParsedArgs: ParsedCommandArgumentObject | undefined;

        // Mock class with a method decorated with `addArgumentParser` and `addAutowired`
        class MyApp {
            @addArgumentParser(
                'testApp',
                () => '1.0.0',
                () => 'usage',
                {
                    backend: [ ArgumentType.STRING, '--backend', '-b' ],
                }
            )
            @addAutowired()
            public async run(
                @autowired('args')
                    args: string[] = [],
                @autowired('parsedArgs')
                    parsedArgs ?: ParsedCommandArgumentObject,
                @autowired('userArgs')
                    userArgs ?: ArgumentValueMap,
                @autowired('freeArgs')
                    freeArgs ?: string[],
                @autowired('backend')
                    backend : string = '',
            ): Promise<CommandExitStatus> {
                retrievedArgs = args;
                retrievedParsedArgs = parsedArgs;
                retrievedBackend = backend;
                retrievedUserArgs = userArgs;
                retrievedFreeArgs = freeArgs;
                return CommandExitStatus.OK;
            }
        }

        let app : MyApp;

        beforeEach( () => {
            retrievedArgs = [];
            retrievedParsedArgs = undefined;
            retrievedBackend = '';
            autowireService = AutowireServiceImpl.create();
            AutowireServiceImpl.setAutowireService(autowireService);
            app = new MyApp();
        });

        it('can parse long arguments', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '--backend=myBackend']);

            // Check if autowired parameters match expected values
            expect(retrievedArgs).toEqual(['/usr/bin/node', 'dist.js', '--backend=myBackend']);
            expect(retrievedParsedArgs).toBeDefined();
            expect((retrievedParsedArgs as any)?.parseStatus).toEqual(ParsedCommandArgumentStatus.OK);
            expect((retrievedParsedArgs as any)?.exitStatus).toEqual(CommandExitStatus.OK);
            expect((retrievedParsedArgs as any)?.userArgs?.backend).toEqual('myBackend');
            expect((retrievedUserArgs as any)?.backend).toEqual('myBackend');
            expect(retrievedBackend).toEqual('myBackend');
            expect(retrievedFreeArgs).toEqual([]);

        });

        it('can parse short arguments', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '-b=myBackend']);

            // Check if autowired parameters match expected values
            expect(retrievedArgs).toEqual(['/usr/bin/node', 'dist.js', '-b=myBackend']);
            expect(retrievedParsedArgs).toBeDefined();
            expect((retrievedParsedArgs as any)?.parseStatus).toEqual(ParsedCommandArgumentStatus.OK);
            expect((retrievedParsedArgs as any)?.exitStatus).toEqual(CommandExitStatus.OK);
            expect((retrievedParsedArgs as any)?.userArgs?.backend).toEqual('myBackend');
            expect((retrievedUserArgs as any)?.backend).toEqual('myBackend');
            expect(retrievedBackend).toEqual('myBackend');
            expect(retrievedFreeArgs).toEqual([]);

        });

        it('can parse free arguments', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '-b=myBackend', 'command', 'one']);

            // Check if autowired parameters match expected values
            expect(retrievedArgs).toEqual(['/usr/bin/node', 'dist.js', '-b=myBackend', 'command', 'one']);
            expect(retrievedParsedArgs).toBeDefined();
            expect((retrievedParsedArgs as any)?.parseStatus).toEqual(ParsedCommandArgumentStatus.OK);
            expect((retrievedParsedArgs as any)?.exitStatus).toEqual(CommandExitStatus.OK);
            expect(retrievedFreeArgs).toEqual(['command', 'one']);

        });

    });

});

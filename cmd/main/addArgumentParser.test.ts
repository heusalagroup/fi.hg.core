// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from "@jest/globals";
import { addArgumentParser } from './addArgumentParser';
import { autowired } from './autowired';
import { LogLevel } from "../../types/LogLevel";
import { addAutowired } from "./addAutowired";
import { CommandArgumentUtils } from "../utils/CommandArgumentUtils";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { AutowireUtils } from "./utils/AutowireUtils";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { AutowireService } from "./services/AutowireService";
import { ArgumentType } from "../types/ArgumentType";
import type { ArgumentValueMap } from "../types/ArgumentValueMap";
import type { ParsedCommandArgumentObject } from "../types/ParsedCommandArgumentObject";

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
        let retrievedArgs: string[] | undefined;
        let retrievedFreeArgs : string[] | undefined;
        let retrievedBackend: string | undefined;
        let retrievedUserArgs: ArgumentValueMap | undefined;
        let retrievedParsedArgs: ParsedCommandArgumentObject | undefined;

        let consoleLog: jest.SpiedFunction<any>;
        let consoleError: jest.SpiedFunction<any>;

        let getVersion = jest.fn<() => string>().mockImplementation(() => '1.0.0');
        let getUsage = jest.fn<() => string>().mockImplementation(() => 'usage');

        // Mock class with a method decorated with `addArgumentParser` and `addAutowired`
        class MyApp {
            @addArgumentParser(
                'testApp',
                getVersion,
                getUsage,
                {
                    backend: [ ArgumentType.STRING, '--backend', '-b' ],
                    integer: [ ArgumentType.INTEGER, '--integer', '-i' ],
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
            retrievedArgs = undefined;
            retrievedParsedArgs = undefined;
            retrievedBackend = undefined;
            retrievedFreeArgs = undefined;
            autowireService = AutowireServiceImpl.create();
            AutowireServiceImpl.setAutowireService(autowireService);
            app = new MyApp();

            consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});

            consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

        });

        afterEach(() => {
            jest.clearAllMocks();
        })

        it('can parse long version argument', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '--version']);

            // Check if autowired parameters match expected values
            expect(consoleLog).toHaveBeenCalledWith('1.0.0');

            expect(getUsage).not.toHaveBeenCalled();

            expect(getVersion).toHaveBeenCalledTimes(1);
            expect(getVersion).toHaveBeenCalledWith(
                'dist.js',
                {
                    "exitStatus": 0,
                    "extraArgs": [],
                    "freeArgs": [],
                    "nodePath": "/usr/bin/node",
                    "parseStatus": 3,
                    "scriptName": "dist.js",
                    "userArgs": {}
                }
            );
            expect(retrievedArgs).toEqual(undefined);
            expect(retrievedParsedArgs).not.toBeDefined();
            expect(retrievedBackend).toEqual(undefined);
            expect(retrievedFreeArgs).toEqual(undefined);

        });

        it('can parse short version argument', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '-v']);

            // Check if autowired parameters match expected values
            expect(consoleLog).toHaveBeenCalledWith('1.0.0');

            expect(getUsage).not.toHaveBeenCalled();

            expect(getVersion).toHaveBeenCalledTimes(1);
            expect(getVersion).toHaveBeenCalledWith(
                'dist.js',
                {
                    "exitStatus": 0,
                    "extraArgs": [],
                    "freeArgs": [],
                    "nodePath": "/usr/bin/node",
                    "parseStatus": 3,
                    "scriptName": "dist.js",
                    "userArgs": {}
                }
            );
            expect(retrievedArgs).toEqual(undefined);
            expect(retrievedParsedArgs).not.toBeDefined();
            expect(retrievedBackend).toEqual(undefined);
            expect(retrievedFreeArgs).toEqual(undefined);

        });

        it('can parse long help argument', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '--help']);

            // Check if autowired parameters match expected values
            expect(consoleLog).toHaveBeenCalledWith('usage');

            expect(getUsage).toHaveBeenCalledTimes(1);
            expect(getUsage).toHaveBeenCalledWith(
                'dist.js',
                {
                    "exitStatus": 0,
                    "extraArgs": [],
                    "freeArgs": [],
                    "nodePath": "/usr/bin/node",
                    "parseStatus": 2,
                    "scriptName": "dist.js",
                    "userArgs": {}
                }
            );

            expect(getVersion).not.toHaveBeenCalled();

            expect(retrievedArgs).toEqual(undefined);
            expect(retrievedParsedArgs).not.toBeDefined();
            expect(retrievedBackend).toEqual(undefined);
            expect(retrievedFreeArgs).toEqual(undefined);

        });

        it('can parse short help argument', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '-h']);

            // Check if autowired parameters match expected values
            expect(consoleLog).toHaveBeenCalledWith('usage');

            expect(getUsage).toHaveBeenCalledTimes(1);
            expect(getUsage).toHaveBeenCalledWith(
                'dist.js',
                {
                    "exitStatus": 0,
                    "extraArgs": [],
                    "freeArgs": [],
                    "nodePath": "/usr/bin/node",
                    "parseStatus": 2,
                    "scriptName": "dist.js",
                    "userArgs": {}
                }
            );
            expect(getVersion).not.toHaveBeenCalled();
            expect(retrievedArgs).toEqual(undefined);
            expect(retrievedParsedArgs).not.toBeDefined();
            expect(retrievedBackend).toEqual(undefined);
            expect(retrievedFreeArgs).toEqual(undefined);

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

        it('can parse illegal integer argument', async () => {

            await app.run(['/usr/bin/node', 'dist.js', '--integer=myBackend']);

            expect(consoleError).toHaveBeenCalledWith('ERROR: Argument parse error: TypeError: Argument --integer=myBackend: not integer');

            // Check if autowired parameters match expected values
            expect(retrievedArgs).not.toBeDefined();
            expect(retrievedParsedArgs).not.toBeDefined();
            expect(retrievedBackend).not.toBeDefined();
            expect(retrievedFreeArgs).not.toBeDefined();

        });


    });

});

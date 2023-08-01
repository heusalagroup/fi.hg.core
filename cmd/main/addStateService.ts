// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { resolve as pathResolve } from "path";
import { LogService } from "../../LogService";
import { ObserverDestructor } from "../../Observer";
import { parseNonEmptyString } from "../../types/String";
import { StateService, StateServiceEvent } from "./services/StateService";
import { ExplainCallback } from "../../types/ExplainCallback";
import { TestCallbackNonStandardOf } from "../../types/TestCallback";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { DestroyService } from "./services/DestroyService";
import { ParsedCommandArgumentObject } from "../types/ParsedCommandArgumentObject";
import { LogLevel } from "../../types/LogLevel";

const LOG = LogService.createLogger( 'addStateService' );

/**
 * Wraps the method body with proper state service handling.
 *
 * Example usage:
 *
 *     ```typescript
 *     import { readFile, writeFile } from "fs/promises";
 *
 *     class MyApp {
 *
 *         @addArgumentParser(...)
 *         @addStateService<MyStateService>(
 *             AgentStateServiceImpl.create,
 *             () => createAgentStateDTO(undefined, undefined, undefined),
 *             isAgentStateDTO,
 *             explainAgentStateDTO,
 *             readFile,
 *             writeFile
 *         )
 *         public static async run (
 *             args          : readonly string[],
 *             parsedArgs   ?: ParsedCommandArgumentObject,
 *             stateService ?: MyStateService,
 *         ): Promise<CommandExitStatus> {
 *             console.log('Hello world');
 *         }
 *
 *     }
 *
 * }
 */
export function addStateService<
    T = any,
    DTO = any,
    StateServiceImpl extends StateService<DTO> = StateService<DTO>,
> (
    name : string,
    createStateService: ((initial: DTO) => StateServiceImpl),
    createDTO: (() => DTO),
    isDTO: TestCallbackNonStandardOf<DTO>,
    explainDTO: ExplainCallback,
    readFile: (file : string, charset: "utf8") => Promise<string>,
    writeFile: (file : string, data: string, charset: "utf8") => Promise<void>,
): MethodDecoratorFunction {
    LOG.debug(`Creating method decorator`);
    return createMethodDecorator( (
        method: Function,
        context: ClassMethodDecoratorContext
    ) => {
        const propertyName = context.name;
        LOG.debug(`Creating method decorator for "${propertyName.toString()}"`);
        return async function (
            this: T,
            ...args: any[]
        ) {
            const autowireService = AutowireServiceImpl.getAutowireService();
            let stateService: StateServiceImpl | undefined = undefined;
            let savePromise: Promise<void> | undefined = undefined;
            let stateServiceChangedDestructor: ObserverDestructor | undefined;
            try {
                LOG.debug(`Running method decorator for "${propertyName.toString()}"`);

                const {
                    userArgs
                } = autowireService.getName<ParsedCommandArgumentObject>('parsedArgs');
                const stateFileArg: string | undefined = parseNonEmptyString( userArgs?.stateFile ) ?? undefined;
                const stateConfigFile: string = pathResolve( stateFileArg ?? process?.env?.HOME ?? process.cwd(), '.nor-agent.json' );
                const initialStateConfig: DTO = await readStateDTOFromFile(
                    readFile,
                    stateConfigFile,
                    createDTO,
                    isDTO,
                    explainDTO
                );
                stateService = createStateService( initialStateConfig );

                if (autowireService.hasName('destroyService')) {
                    const destroyService = autowireService.getName<DestroyService>('destroyService');
                    destroyService.registerDisposable(stateService);
                } else {
                    LOG.warn(`Warning! You should include @addDestroyService() for proper StateService destruction support`);
                }

                stateServiceChangedDestructor = stateService.on( StateServiceEvent.CHANGED, () => {
                    if (!stateService) {
                        LOG.warn(`Warning! State service was already destroyed.`);
                        return;
                    }
                    savePromise = saveStateDTOFromFile(
                        writeFile,
                        stateConfigFile,
                        stateService.getDTO(),
                        savePromise,
                        isDTO,
                        explainDTO
                    );
                    savePromise.catch( (err) => {
                        LOG.warn( `Warning! Failed to save state config: ${err}` );
                    } ).finally( () => {
                        savePromise = undefined;
                    } );
                } );

                autowireService.setName("stateService", stateService);
                autowireService.setName(name, stateService);

                return await method.apply(this, args);

            } catch (err) {
                LOG.warn(`Warning! The addStateService decorator for "${propertyName.toString()}" method had an error: `, err);
                throw err;
            } finally {

                if ( savePromise !== undefined ) {
                    LOG.debug( `Waiting for state saving...` );
                    try {
                        await savePromise;
                    } catch (err) {
                        LOG.warn(`Warning! Saving state failed: `, err);
                    }
                } else {
                    LOG.debug( `State service wasn't saving.` );
                }

                if ( stateServiceChangedDestructor !== undefined ) {
                    LOG.debug( `Removing state service listener` );
                    stateServiceChangedDestructor();
                }

                autowireService.deleteName("stateService");
                autowireService.deleteName(name);

                if (stateService !== undefined) {
                    stateService.destroy();
                    stateService = undefined;
                }

            }
        };
    } );
}

addStateService.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);

async function readStateDTOFromFile<DTO> (
    readFile: (file : string, charset: "utf8") => Promise<string>,
    file: string,
    createDTO: (() => DTO),
    isDTO: TestCallbackNonStandardOf<DTO>,
    explainDTO: ExplainCallback
): Promise<DTO> {
    try {
        const dataString: string = await readFile( file, 'utf8' );
        const data = JSON.parse( dataString );
        if ( !isDTO( data ) ) {
            throw new TypeError( `The file "${file}" is not valid DTO: ${explainDTO( data )}` );
        }
        LOG.debug( `Config loaded from ${file}` );
        return data;
    } catch ( err ) {
        if ( (err as any)?.code === 'ENOENT' ) {
            LOG.debug( `No configuration file found from ${file}. Creating from fresh.` );
            return createDTO();
        }
        throw new TypeError( `Could not read config from "${file}": ${err}` );
    }
}

async function saveStateDTOFromFile<DTO> (
    writeFile: (file : string, data: string, charset: "utf8") => Promise<void>,
    file: string,
    data: DTO,
    previousPromise: Promise<any> | undefined,
    isDTO: TestCallbackNonStandardOf<DTO>,
    explainDTO: ExplainCallback,
): Promise<void> {
    if ( !isDTO( data ) ) {
        throw new TypeError( `The file "${file}" is not valid DTO: ${explainDTO( data )}` );
    }
    try {
        const dataString = JSON.stringify( data, null, 2 );
        if ( previousPromise ) {
            try {
                await previousPromise;
            } catch ( err ) {
                LOG.warn( `Warning! Previous promise had error: `, err );
            }
        }
        await writeFile( file, dataString, 'utf8' );
        LOG.debug( `Config saved to ${file}` );
    } catch ( err ) {
        throw new TypeError( `Could not write config to "${file}": ${err}` );
    }
}

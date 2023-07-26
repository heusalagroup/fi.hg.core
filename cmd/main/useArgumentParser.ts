// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { ArgumentConfigurationMap, CommandArgumentUtils, ParsedCommandArgumentObject } from "../utils/CommandArgumentUtils";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { LogLevel } from "../../types/LogLevel";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { AutowireServiceImpl } from "./types/AutowireServiceImpl";

export interface GetInfoCallback {
    (scriptName: string, parsedOpts ?: ParsedCommandArgumentObject) : string;
}

const LOG = LogService.createLogger( 'useArgumentParser' );

/**
 * Wraps the method body with argument parser.
 *
 * Caught errors will be logged.
 *
 * Example usage:
 *
 *     ```typescript
 *     class MyApp {
 *
 *         @useErrorHandler(CommandExitStatus.FATAL_ERROR)
 *         public static async run (
 *             args: string[] = []
 *         ): Promise<CommandExitStatus> {
 *             console.log('Hello world');
 *         }
 *
 *     }
 * @param defaultScriptName
 * @param getVersion
 * @param getUsage
 * @param configurationMap
 *
 * @see CommandArgumentUtils
 * }
 */
export function useArgumentParser<T = any> (
    defaultScriptName  : string,
    getVersion         : GetInfoCallback,
    getUsage           : GetInfoCallback,
    configurationMap  ?: ArgumentConfigurationMap,
) : MethodDecoratorFunction {
    LOG.debug(`calling createMethodDecorator`);
    return createMethodDecorator( (
        method: Function,
        context: ClassMethodDecoratorContext
    ) => {
        const propertyName = context.name;
        LOG.debug(`overriding method ${context.name.toString()}`);
        return async function (
            this: T,
            args: readonly string[]
        ) {
            LOG.debug(`args = `, args);
            const autowireService = AutowireServiceImpl.getAutowireService();
            try {
                const parsedOpts : ParsedCommandArgumentObject = CommandArgumentUtils.parseArguments(
                    defaultScriptName,
                    args,
                    configurationMap
                );
                autowireService.setName("parsedArgs", parsedOpts);

                const scriptName = parsedOpts.scriptName;
                autowireService.setName("scriptName", scriptName);
                const parseStatus = parsedOpts.parseStatus;
                autowireService.setName("parseStatus", parseStatus);
                const exitStatus = parsedOpts.exitStatus;
                autowireService.setName("exitStatus", exitStatus);

                if ( parseStatus === ParsedCommandArgumentStatus.VERSION ) {
                    console.log( getVersion( scriptName, parsedOpts ) );
                    return exitStatus;
                }

                if ( parseStatus === ParsedCommandArgumentStatus.HELP ) {
                    console.log( getUsage( scriptName, parsedOpts ) );
                    return exitStatus;
                }

                const errorString = parsedOpts.errorString;
                if ( errorString ) {
                    console.error( `ERROR: ${errorString}` );
                    return exitStatus;
                }

                return await method.apply(this, args);

            } catch (err) {
                LOG.warn(`Warning! The useStateService decorator for "${propertyName.toString()}" method had an error: `, err);
                throw err;
            } finally {
                autowireService.deleteName("parsedArgs");
                autowireService.deleteName("scriptName");
                autowireService.deleteName("parseStatus");
                autowireService.deleteName("exitStatus");
            }
        };
    } );
}

useArgumentParser.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogService } from "../../LogService";
import { MethodDecoratorFunction } from "../../decorators/types/MethodDecoratorFunction";
import { CommandArgumentUtils } from "../utils/CommandArgumentUtils";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { LogLevel } from "../../types/LogLevel";
import { createMethodDecorator } from "../../decorators/createMethodDecorator";
import { AutowireServiceImpl } from "./services/AutowireServiceImpl";
import { forEach } from "../../functions/forEach";
import { keys } from "../../functions/keys";
import { ArgumentConfigurationMap } from "../types/ArgumentConfigurationMap";
import { UserDefinedParserMap } from "../types/UserDefinedParserMap";
import { ParsedCommandArgumentObject } from "../types/ParsedCommandArgumentObject";

const LOG = LogService.createLogger( 'addArgumentParser' );

export interface GetInfoCallback {
    (scriptName: string, parsedOpts ?: ParsedCommandArgumentObject) : string;
}

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
 *         @addArgumentParser(
 *             COMMAND_NAME,
 *             () => `${BUILD_COMMAND_NAME} v${BUILD_VERSION} (${BUILD_DATE})`,
 *             getMainUsage,
 *             {
 *                 backend: [ ArgumentType.STRING, '--backend', '-b' ],
 *             }
 *         )
 *         @addAutowired()
 *         public static async run (
 *             @autowired('args')
 *             args: string[] = [],
 *             @autowired('parsedArgs')
 *             parsedArgs ?: ParsedCommandArgumentObject,
 *         ): Promise<CommandExitStatus> {
 *             console.log('Hello world');
 *         }
 *
 *     }
 * @param defaultScriptName
 * @param getVersion
 * @param getUsage
 * @param configurationMap
 * @param parserMap
 *
 * @see CommandArgumentUtils
 * }
 */
export function addArgumentParser<T = any> (
    defaultScriptName  : string,
    getVersion         : GetInfoCallback,
    getUsage           : GetInfoCallback,
    configurationMap  ?: ArgumentConfigurationMap,
    parserMap         ?: UserDefinedParserMap,
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
            args: readonly string[],
        ) {
            LOG.debug(`args = `, args);
            const autowireService = AutowireServiceImpl.getAutowireService();
            let keysToDelete : string[] = [];
            try {
                autowireService.setName("args", args);
                const parsedArgs : ParsedCommandArgumentObject = CommandArgumentUtils.parseArguments(
                    defaultScriptName,
                    args,
                    configurationMap,
                    parserMap
                );
                autowireService.setName("parsedArgs", parsedArgs);

                const {
                    parseStatus,
                    exitStatus,
                    nodePath,
                    scriptName,
                    freeArgs,
                    extraArgs,
                    errorString,
                    userArgs,
                } = parsedArgs;

                keysToDelete = keys(userArgs);
                forEach(
                    keysToDelete,
                    (key: string) => {
                        autowireService.setName(`%${key}`, userArgs[key]);
                        autowireService.setName(key, userArgs[key]);
                    }
                );

                autowireService.setName("parseStatus", parseStatus);
                autowireService.setName("exitStatus", exitStatus);
                autowireService.setName("nodePath", nodePath);
                autowireService.setName("scriptName", scriptName);
                autowireService.setName("freeArgs", freeArgs);
                autowireService.setName("extraArgs", extraArgs);
                autowireService.setName("errorString", errorString);
                autowireService.setName("userArgs", userArgs);

                if ( parseStatus === ParsedCommandArgumentStatus.VERSION ) {
                    console.log( getVersion( scriptName, parsedArgs ) );
                    return exitStatus;
                }

                if ( parseStatus === ParsedCommandArgumentStatus.HELP ) {
                    console.log( getUsage( scriptName, parsedArgs ) );
                    return exitStatus;
                }

                if ( errorString !== undefined ) {
                    console.error( `ERROR: ${errorString}` );
                    return exitStatus;
                }

                return await method.apply(this, args);

            } catch (err) {
                LOG.warn(`Warning! The @addStateService decorator for "${propertyName.toString()}" method had an error: `, err);
                throw err;
            } finally {

                forEach(
                    keys(keysToDelete),
                    (key: string) => {
                        autowireService.deleteName(`%${key}`);
                        autowireService.deleteName(key);
                    }
                );

                autowireService.deleteName("parseStatus");
                autowireService.deleteName("exitStatus");
                autowireService.deleteName("nodePath");
                autowireService.deleteName("scriptName");
                autowireService.deleteName("freeArgs");
                autowireService.deleteName("extraArgs");
                autowireService.deleteName("errorString");
                autowireService.deleteName("userArgs");

            }
        };
    } );
}

addArgumentParser.setLogLevel = (level: LogLevel) => LOG.setLogLevel(level);

// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { startsWith } from "../../functions/startsWith";
import { forEach } from "../../functions/forEach";
import { keys } from "../../functions/keys";
import { has } from "../../functions/has";
import { indexOf } from "../../functions/indexOf";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { CommandArgumentType, parseCommandArgumentType } from "../types/CommandArgumentType";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { ArgumentConfigurationMap } from "../types/ArgumentConfigurationMap";
import { UserDefinedParserMap } from "../types/UserDefinedParserMap";
import { ArgumentValueMap } from "../types/ArgumentValueMap";
import { ParsedCommandArgumentObject } from "../types/ParsedCommandArgumentObject";
import { parseSingleArgument } from "../functions/parseSingleArgument";
import { parseArgumentWithParam } from "../functions/parseArgumentWithParam";

const LOG = LogService.createLogger('CommandArgumentUtils');

export class CommandArgumentUtils {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

    /**
     * Parses command line arguments.
     *
     * @param defaultScriptName The name of the calling script
     * @param args Array of command line arguments passed to the running script
     * @param configurationMap The configuration map for user defined arguments
     * @param parserMap The parser map for user defined types
     * @returns Parsed values
     */
    public static parseArguments (
        defaultScriptName  : string,
        args               : readonly string[] = [],
        configurationMap  ?: ArgumentConfigurationMap,
        parserMap         ?: UserDefinedParserMap,
    ) : ParsedCommandArgumentObject {

        const myArgs = [...args];
        LOG.debug(`myArgs = `, myArgs);
        const nodePath : string = myArgs.shift() ?? '';
        LOG.debug(`nodePath = `, nodePath);
        const scriptNameFromArgs : string = myArgs.shift() ?? '';
        LOG.debug(`scriptNameFromArgs = `, scriptNameFromArgs);

        const argConfigurationMap : ArgumentConfigurationMap = configurationMap ? configurationMap : {};

        if (!scriptNameFromArgs) {
            return {
                parseStatus: ParsedCommandArgumentStatus.ERROR,
                exitStatus: CommandExitStatus.ARGUMENT_PARSE_ERROR,
                nodePath: nodePath,
                scriptName: defaultScriptName,
                freeArgs: [],
                extraArgs: [],
                userArgs: {}
            };
        }

        if (myArgs.length === 0) {
            return {
                parseStatus: ParsedCommandArgumentStatus.ERROR,
                exitStatus: CommandExitStatus.ARGUMENT_PARSE_ERROR,
                nodePath: nodePath,
                scriptName: scriptNameFromArgs,
                freeArgs: [],
                extraArgs: [],
                userArgs: {}
            };
        }

        let parsingArgs : boolean = true;
        let freeArgs    : string[] = []
        let extraArgs   : string[] = []
        let userArgs    : ArgumentValueMap = {};

        let userLongArgs  : {[key: string]: string} = {};
        let userShortArgs : {[key: string]: string} = {};
        let userEnvKeys   : {[key: string]: string} = {};
        forEach(
            keys(argConfigurationMap),
            (key: string) => {
                const [, long, short, envKey] = argConfigurationMap[key];
                if (long) {
                    userLongArgs[long]   = key;
                }
                if (short) {
                    userShortArgs[short] = key;
                }
                if (envKey) {
                    userEnvKeys[envKey] = key;
                }
            }
        );

        do {

            const argName : string = myArgs.shift() ?? '';

            if ( !parsingArgs ) {
                extraArgs.push( argName );
                continue;
            }

            const argType: CommandArgumentType | undefined = parseCommandArgumentType( argName );
            switch ( argType ) {

                case CommandArgumentType.HELP:
                    return {
                        parseStatus: ParsedCommandArgumentStatus.HELP,
                        exitStatus: CommandExitStatus.OK,
                        nodePath,
                        scriptName: scriptNameFromArgs,
                        freeArgs,
                        extraArgs,
                        userArgs
                    };

                case CommandArgumentType.VERSION:
                    return {
                        parseStatus: ParsedCommandArgumentStatus.VERSION,
                        exitStatus: CommandExitStatus.OK,
                        nodePath,
                        scriptName: scriptNameFromArgs,
                        freeArgs,
                        extraArgs,
                        userArgs
                    };

                case CommandArgumentType.DISABLE_ARGUMENT_PARSING:
                    parsingArgs = false;
                    break;

                default:

                    if ( !startsWith( argName, '-' ) ) {
                        freeArgs.push( argName );
                        break;
                    }

                    if ( indexOf( argName, '=' ) >= 1 ) {

                        const [ argKey, ...lastParts ] = argName.split( '=' );
                        const argValue = lastParts.join( '=' );

                        if ( has( userLongArgs, argKey ) ) {
                            const key = userLongArgs[argKey];
                            const [ type, , , , ] = argConfigurationMap[key];
                            try {
                                userArgs[key] = parseArgumentWithParam( argName, type, argValue, parserMap );
                            } catch (err) {
                                return CommandArgumentUtils._getArgumentParseError(err, nodePath, scriptNameFromArgs, freeArgs, extraArgs, userArgs );
                            }
                            break;
                        }

                        if ( has( userShortArgs, argKey ) ) {
                            const key = userShortArgs[argKey];
                            const [ type, , , , ] = argConfigurationMap[key];
                            try {
                                userArgs[key] = parseArgumentWithParam( argName, type, argValue, parserMap );
                            } catch (err) {
                                return CommandArgumentUtils._getArgumentParseError(err, nodePath, scriptNameFromArgs, freeArgs, extraArgs, userArgs );
                            }
                            break;
                        }

                    } else {

                        if ( has( userLongArgs, argName ) ) {
                            const key = userLongArgs[argName];
                            const [ type, , , , ] = argConfigurationMap[key];
                            try {
                                userArgs[key] = parseSingleArgument( argName, type, parserMap );
                            } catch (err) {
                                return CommandArgumentUtils._getArgumentParseError(err, nodePath, scriptNameFromArgs, freeArgs, extraArgs, userArgs );
                            }
                            break;
                        }

                        if ( has( userShortArgs, argName ) ) {
                            const key = userShortArgs[argName];
                            const [ type, , , ,  ] = argConfigurationMap[key];
                            try {
                                userArgs[key] = parseSingleArgument( argName, type, parserMap );
                            } catch (err) {
                                return CommandArgumentUtils._getArgumentParseError(err, nodePath, scriptNameFromArgs, freeArgs, extraArgs, userArgs );
                            }
                            break;
                        }

                    }

                    return {
                        errorString: `Unknown argument: ${argName}`,
                        parseStatus: ParsedCommandArgumentStatus.ERROR,
                        exitStatus: CommandExitStatus.UNKNOWN_ARGUMENT,
                        nodePath,
                        scriptName: scriptNameFromArgs,
                        freeArgs,
                        extraArgs,
                        userArgs
                    };

            } // switch (argType)

        } while( myArgs.length >= 1 );

        // Set ENV keys
        forEach(
            keys(userEnvKeys),
            (envKey: string) => {
                const key = userEnvKeys[envKey];
                const [type, , , ] = argConfigurationMap[key];
                if ( has(process.env, envKey) && !has(userArgs, key) ) {
                    userArgs[key] = parseArgumentWithParam(
                        envKey,
                        type,
                        process.env[envKey] as unknown as string,
                        parserMap
                    );
                }
            }
        );

        return {
            parseStatus: ParsedCommandArgumentStatus.OK,
            exitStatus:CommandExitStatus.OK,
            nodePath,
            scriptName: scriptNameFromArgs,
            freeArgs,
            extraArgs,
            userArgs
        };

    }

    private static _getArgumentParseError (
        err: any,
        nodePath : string,
        scriptNameFromArgs: string,
        freeArgs: string[],
        extraArgs: string[],
        userArgs: ArgumentValueMap,
    ) {
        return {
            errorString: `Argument parse error: ${err}`,
            parseStatus: ParsedCommandArgumentStatus.ERROR,
            exitStatus: CommandExitStatus.ARGUMENT_PARSE_ERROR,
            nodePath,
            scriptName: scriptNameFromArgs,
            freeArgs,
            extraArgs,
            userArgs
        };
    }

}

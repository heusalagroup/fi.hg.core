// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { CommandArgumentType, parseCommandArgumentType } from "../types/CommandArgumentType";
import { startsWith } from "../../functions/startsWith";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { forEach } from "../../functions/forEach";
import { keys } from "../../functions/keys";
import { has } from "../../functions/has";
import { indexOf } from "../../functions/indexOf";
import { explainBoolean, parseBoolean } from "../../types/Boolean";
import { explainString, parseNonEmptyString, parseString } from "../../types/String";
import { explainInteger, parseInteger } from "../../types/Number";
import { LogService } from "../../LogService";
import { LogLevel } from "../../types/LogLevel";
import { ArgumentType } from "../types/ArgumentType";
import { isFunction } from "../../types/Function";

const LOG = LogService.createLogger('CommandArgumentUtils');

export type UserDefinedArgumentType = ArgumentType | string;

/**
 * Type | Long argument | Short argument | Environment variable name | default value
 */
export type ArgumentConfigurationWithEnvAndDefaultValue = readonly [
    UserDefinedArgumentType,
    string | undefined,
    string | undefined,
    string | undefined,
    string | undefined
];

/**
 * Type | Long argument | Short argument | Environment variable name
 */
export type ArgumentConfigurationWithEnv = readonly [
    UserDefinedArgumentType,
    string | undefined,
    string | undefined,
    string | undefined
];

/**
 * Type | Long argument | Short argument
 */
export type ArgumentConfigurationWithoutEnv = readonly [
    UserDefinedArgumentType,
    string | undefined,
    string | undefined
];

/**
 * Type | Long argument | Short argument | Environment variable name | default value
 */
export type ArgumentConfiguration = (
    ArgumentConfigurationWithEnv
    | ArgumentConfigurationWithoutEnv
    | ArgumentConfigurationWithEnvAndDefaultValue
);

export interface ArgumentConfigurationMap {
    [key: string] : ArgumentConfiguration;
}

export interface UserDefinedParser<T = any> {
    (value: unknown) : T | undefined;
}

export interface UserDefinedParserMap {
    [key: string] : UserDefinedParser;
}

export interface ArgumentValueMap {
    [key: string] : string | boolean | number;
}

export interface ParsedCommandArgumentObject {

    readonly parseStatus  : ParsedCommandArgumentStatus;
    readonly exitStatus   : CommandExitStatus;
    readonly nodePath     : string;
    readonly scriptName   : string;
    readonly freeArgs     : string[];
    readonly extraArgs    : string[];
    readonly errorString ?: string;
    readonly userArgs     : ArgumentValueMap;

}

export class CommandArgumentUtils {

    public static setLogLevel (level: LogLevel) : void {
        LOG.setLogLevel(level);
    }

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
        forEach(
            keys(argConfigurationMap),
            (key: string) => {
                const [, long, short] = argConfigurationMap[key];
                userLongArgs[long]   = key;
                userShortArgs[short] = key;
            }
        );

        do {
            const argName : string = myArgs.shift() ?? '';
            if (parsingArgs) {
                const argType : CommandArgumentType | undefined = parseCommandArgumentType(argName);

                switch (argType) {

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

                        if ( parsingArgs ) {

                            if (startsWith(argName, '-')) {

                                if (indexOf(argName, '=') >= 1) {

                                    const [argKey, ...lastParts] = argName.split('=');
                                    const argValue = lastParts.join('=');

                                    if ( has(userLongArgs, argKey) ) {
                                        const key = userLongArgs[argKey];
                                        const [type, , , envKey, defaultValue] = argConfigurationMap[key];
                                        userArgs[key] = parseArgumentWithParam(argName, type, argKey, argValue, parserMap, envKey, defaultValue);
                                        break;
                                    }

                                    if ( has(userShortArgs, argKey) ) {
                                        const key = userShortArgs[argKey];
                                        const [type, , , envKey, defaultValue] = argConfigurationMap[key];
                                        userArgs[key] = parseArgumentWithParam(argName, type, argKey, argValue, parserMap, envKey, defaultValue);
                                        break;
                                    }

                                } else {

                                    if ( has(userLongArgs, argName) ) {
                                        const key = userLongArgs[argName];
                                        const [type, , , envKey, defaultValue] = argConfigurationMap[key];
                                        userArgs[key] = parseSingleArgument(argName, type, parserMap, envKey, defaultValue);
                                        break;
                                    }

                                    if ( has(userShortArgs, argName) ) {
                                        const key = userShortArgs[argName];
                                        const [type, , , envKey, defaultValue] = argConfigurationMap[key];
                                        userArgs[key] = parseSingleArgument(argName, type, parserMap, envKey, defaultValue);
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
                            }

                            freeArgs.push(argName);

                        } else {
                            extraArgs.push(argName);
                        }
                        break;

                }

            }

        } while( myArgs.length >= 1 );

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

}


/**
 *
 * @param argName The full argument string, e.g. `--foo=bar`
 * @param type The type of argument, e.g. `ArgumentType.STRING`
 * @param key The key part of the argument, e.g. `--foo`
 * @param value The value of the argument, e.g. `bar`
 * @param parserMap
 * @param envKey
 * @param defaultValue
 */
function parseArgumentWithParam (
    argName       : string,
    type          : UserDefinedArgumentType,
    key           : string,
    value         : string,
    parserMap     : UserDefinedParserMap | undefined,
    envKey        : string | undefined,
    defaultValue  : string | undefined,
) : number | boolean | string {

    switch(type) {
        case ArgumentType.BOOLEAN          : return parseBooleanArgument(argName, value, envKey, defaultValue);
        case ArgumentType.STRING           : return parseStringArgument(argName, value, envKey, defaultValue);
        case ArgumentType.NON_EMPTY_STRING : return parseNonEmptyStringArgument(argName, value, envKey, defaultValue);
        case ArgumentType.NUMBER           : return parseNumberArgument(argName, value, envKey, defaultValue);
        case ArgumentType.INTEGER          : return parseIntegerArgument(argName, value, envKey, defaultValue);
    }

    if ( parserMap && has(parserMap, type) && isFunction(parserMap[type]) ) {
        return parserMap[type](value) ?? process?.env[envKey] ?? defaultValue;
    }

    throw new TypeError(`Unimplemented type: ${type.toString()}`);
}

/**
 *
 * @param argName The full argument string, e.g. `--foo`
 * @param type The type of argument, e.g. `ArgumentType.BOOLEAN`
 * @param parserMap
 * @param envKey
 * @param defaultValue
 */
function parseSingleArgument (
    argName       : string,
    type          : UserDefinedArgumentType,
    parserMap     : UserDefinedParserMap | undefined,
    envKey        : string | undefined,
    defaultValue  : string | undefined,
) : number | boolean | string {
    return parseArgumentWithParam(argName, type, argName, type === ArgumentType.BOOLEAN ? 'true' : '', parserMap, envKey, defaultValue);
}

function parseBooleanArgument (
    argName       : string,
    value         : string,
    envKey        : string | undefined,
    defaultValue  : string | undefined
) : boolean {
    const output : boolean | undefined = parseBoolean(value ?? process?.env[envKey] ?? defaultValue );
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a boolean: ${explainBoolean(value)}`);
    }
    return output;
}

function parseStringArgument (
    argName       : string,
    value         : string,
    envKey        : string | undefined,
    defaultValue  : string | undefined
) : string {
    const output : string | undefined = parseString(value) ?? parseString(process?.env[envKey]) ?? parseString(defaultValue);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a string: ${explainString(value)}`);
    }
    return output;
}

function parseNonEmptyStringArgument (
    argName       : string,
    value         : string,
    envKey        : string | undefined,
    defaultValue  : string | undefined
) : string {
    const output : string | undefined = parseNonEmptyString(value) ?? parseNonEmptyString(process?.env[envKey]) ?? parseNonEmptyString(defaultValue);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a string: ${explainString(value)}`);
    }
    return output;
}

function parseIntegerArgument (
    argName       : string,
    value         : string,
    envKey        : string | undefined,
    defaultValue  : string | undefined
) : number {
    const output : number | undefined = parseInteger(value ?? process?.env[envKey] ?? defaultValue);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not integer: ${explainInteger(value)}`);
    }
    return output;
}

function parseNumberArgument (
    argName       : string,
    value         : string,
    envKey        : string | undefined,
    defaultValue  : string | undefined
) : number {
    const output : number | undefined = parseFloat(value ?? process?.env[envKey] ?? defaultValue);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a number: ${value}`);
    }
    return output;
}

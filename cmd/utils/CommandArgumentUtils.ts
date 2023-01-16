// Copyright (c) 2021. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { CommandArgumentType, parseCommandArgumentType } from "../types/CommandArgumentType";
import { startsWith } from "../../functions/startsWith";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { forEach } from "../../functions/forEach";
import { keys } from "../../functions/keys";
import { has } from "../../functions/has";
import { indexOf } from "../../functions/indexOf";
import { explainBoolean, parseBoolean } from "../../types/Boolean";
import { explainString, parseString } from "../../types/String";
import { explainInteger, parseInteger } from "../../types/Number";

export enum ArgumentType {
    "BOOLEAN" = "b",
    "STRING"  = "s",
    "NUMBER"  = "n",
    "INTEGER" = "i"
}

/**
 * Type, Long argument, Short argument
 */
export type ArgumentConfiguration = readonly [ArgumentType, string, string];

export interface ArgumentConfigurationMap {
    [key: string] : ArgumentConfiguration;
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

    public static parseArguments (
        defaultScriptName: string,
        args: string[] = [],
        configurationMap ?: ArgumentConfigurationMap
    ) : ParsedCommandArgumentObject {

        const argConfigurationMap = configurationMap ? configurationMap : {};

        const nodePath : string = args.shift() ?? '';

        const scriptNameFromArgs : string = args.shift() ?? '';

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

        if (args.length === 0) {
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

            const argName : string = args.shift() ?? '';

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
                                        const [type] = argConfigurationMap[key];
                                        userArgs[key] = parseArgumentWithParam(argName, type, argKey, argValue);
                                        break;
                                    }

                                    if ( has(userShortArgs, argKey) ) {
                                        const key = userShortArgs[argKey];
                                        const [type] = argConfigurationMap[key];
                                        userArgs[key] = parseArgumentWithParam(argName, type, argKey, argValue);
                                        break;
                                    }

                                } else {

                                    if ( has(userLongArgs, argName) ) {
                                        const key = userLongArgs[argName];
                                        const [type] = argConfigurationMap[key];
                                        userArgs[key] = parseSingleArgument(argName, type);
                                        break;
                                    }

                                    if ( has(userShortArgs, argName) ) {
                                        const key = userShortArgs[argName];
                                        const [type] = argConfigurationMap[key];
                                        userArgs[key] = parseSingleArgument(argName, type);
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

        } while( args.length >= 1 );

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
 */
function parseArgumentWithParam (
    argName : string,
    type  : ArgumentType,
    key   : string,
    value : string
) : number | boolean | string {
    switch(type) {
        case ArgumentType.BOOLEAN : return parseBooleanArgument(argName, value);
        case ArgumentType.STRING  : return parseStringArgument(argName, value);
        case ArgumentType.NUMBER  : return parseNumberArgument(argName, value);
        case ArgumentType.INTEGER : return parseIntegerArgument(argName, value);
        default:
            throw new TypeError(`Unimplemented type: ${type}`);
    }
}

/**
 *
 * @param argName The full argument string, e.g. `--foo`
 * @param type The type of argument, e.g. `ArgumentType.BOOLEAN`
 */
function parseSingleArgument (
    argName : string,
    type  : ArgumentType
) : number | boolean | string {
    return parseArgumentWithParam(argName, type, argName, type === ArgumentType.BOOLEAN ? 'true' : '');
}

function parseBooleanArgument (
    argName   : string,
    value : string
) : boolean {
    const output : boolean | undefined = parseBoolean(value);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a boolean: ${explainBoolean(value)}`);
    }
    return output;
}

function parseStringArgument (
    argName   : string,
    value : string
) : string {
    const output : string | undefined = parseString(value);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a string: ${explainString(value)}`);
    }
    return output;
}

function parseIntegerArgument (
    argName   : string,
    value : string
) : number {
    const output : number | undefined = parseInteger(value);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not integer: ${explainInteger(value)}`);
    }
    return output;
}

function parseNumberArgument (
    argName : string,
    value : string
) : number {
    const output : number | undefined = parseFloat(value);
    if (output === undefined) {
        throw new TypeError(`Argument ${argName}: Not a number: ${value}`);
    }
    return output;
}

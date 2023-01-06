// Copyright (c) 2021. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus } from "../types/CommandExitStatus";
import { CommandArgumentType, parseCommandArgumentType } from "../types/CommandArgumentType";
import { startsWith } from "../../functions/startsWith";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";

export interface ParsedCommandArgumentObject {

    readonly parseStatus  : ParsedCommandArgumentStatus;
    readonly exitStatus   : CommandExitStatus;
    readonly nodePath     : string;
    readonly scriptName   : string;
    readonly freeArgs     : string[];
    readonly extraArgs    : string[];
    readonly errorString ?: string;

}

export class CommandArgumentUtils {

    public static parseArguments (
        defaultScriptName: string,
        args: string[] = []
    ) : ParsedCommandArgumentObject {

        const nodePath : string = args.shift() ?? '';

        const scriptNameFromArgs : string = args.shift() ?? '';

        if (!scriptNameFromArgs) {
            return {
                parseStatus: ParsedCommandArgumentStatus.ERROR,
                exitStatus: CommandExitStatus.ARGUMENT_PARSE_ERROR,
                nodePath: nodePath,
                scriptName: defaultScriptName,
                freeArgs: [],
                extraArgs: []
            };
        }

        if (args.length === 0) {
            return {
                parseStatus: ParsedCommandArgumentStatus.ERROR,
                exitStatus: CommandExitStatus.ARGUMENT_PARSE_ERROR,
                nodePath: nodePath,
                scriptName: scriptNameFromArgs,
                freeArgs: [],
                extraArgs: []
            };
        }

        let parsingArgs : boolean = true;
        let freeArgs    : string[] = []
        let extraArgs   : string[] = []

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
                            extraArgs
                        };

                    case CommandArgumentType.VERSION:
                        return {
                            parseStatus: ParsedCommandArgumentStatus.VERSION,
                            exitStatus: CommandExitStatus.OK,
                            nodePath,
                            scriptName: scriptNameFromArgs,
                            freeArgs,
                            extraArgs
                        };

                    case CommandArgumentType.DISABLE_ARGUMENT_PARSING:
                        parsingArgs = false;
                        break;

                    default:

                        if ( parsingArgs ) {

                            if (startsWith(argName, '-')) {
                                return {
                                    errorString: `Unknown argument: ${argName}`,
                                    parseStatus: ParsedCommandArgumentStatus.ERROR,
                                    exitStatus: CommandExitStatus.UNKNOWN_ARGUMENT,
                                    nodePath,
                                    scriptName: scriptNameFromArgs,
                                    freeArgs,
                                    extraArgs
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
            extraArgs
        };

    }

}

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { ParsedCommandArgumentStatus } from "./ParsedCommandArgumentStatus";
import { CommandExitStatus } from "./CommandExitStatus";
import { ArgumentValueMap } from "./ArgumentValueMap";

/**
 * Result object from a command line argument parsing.
 */
export interface ParsedCommandArgumentObject {

    /**
     * Status of parsing operation
     */
    readonly parseStatus: ParsedCommandArgumentStatus;

    /**
     * The status which to exit
     */
    readonly exitStatus: CommandExitStatus;

    /**
     * The path to the node process running the command
     */
    readonly nodePath: string;

    /**
     * The name of the running command
     */
    readonly scriptName: string;

    /**
     * These are command line arguments which are not detected as options
     */
    readonly freeArgs: string[];

    /**
     * These are command line arguments which exist after the `--` argument
     * which will turn off option parsing. This enables to pass on options to
     * other commands.
     */
    readonly extraArgs: string[];

    /**
     * Optional error string
     */
    readonly errorString?: string;

    /**
     * Values for user defined options
     */
    readonly userArgs: ArgumentValueMap;

}

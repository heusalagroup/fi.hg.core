// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { startsWith } from "../../functions/startsWith";
import { isNumber, parseInteger } from "../../types/Number";

export enum CommandExitStatus {

    /** Standard successful termination */
    OK                              = 0,

    // From Advanced Bash scripting guide
    GENERAL_ERRORS                  = 1,
    MISUSE_OF_SHELL_BUILTINS        = 2,

    // Our custom errors
    ARGUMENT_PARSE_ERROR            = 3,
    UNKNOWN_ARGUMENT                = 4,
    UNIMPLEMENTED_FEATURE           = 5,
    FATAL_ERROR                     = 6,
    CONFLICT                        = 7,

    // From Linux sysexits.h
    USAGE                           = 64,      /* command line usage error */
    DATAERR                         = 65,      /* data format error */
    NOINPUT                         = 66,      /* cannot open input */
    NOUSER                          = 67,      /* addressee unknown */
    NOHOST                          = 68,      /* host name unknown */
    UNAVAILABLE                     = 69,      /* service unavailable */
    SOFTWARE                        = 70,      /* internal software error */
    OSERR                           = 71,      /* system error (e.g., can't fork) */
    OSFILE                          = 72,      /* critical OS file missing */
    CANTCREAT                       = 73,      /* can't create (user) output file */
    IOERR                           = 74,      /* input/output error */
    TEMPFAIL                        = 75,      /* temp failure; user is invited to retry */
    PROTOCOL                        = 76,      /* remote error in protocol */
    NOPERM                          = 77,      /* permission denied */
    CONFIG                          = 78,      /* configuration error */

    /** From Advanced Bash scripting guide
     * @see https://tldp.org/LDP/abs/html/exitcodes.html
     */
    COMMAND_INVOKED_CANNOT_EXECUTE  = 126,

    /** From Advanced Bash scripting guide
     * @see https://tldp.org/LDP/abs/html/exitcodes.html
     */
    COMMAND_NOT_FOUND               = 127,

    /** From Advanced Bash scripting guide
     * @see https://tldp.org/LDP/abs/html/exitcodes.html
     */
    INVALID_ARGUMENT_TO_EXIT        = 128,

    /** The smallest dynamic fatal error signal.
     *
     * From Advanced Bash scripting guide:
     * This should be 128 + smallest_signal
     * Smallest signal is 1.
     *
     * @see https://tldp.org/LDP/abs/html/exitcodes.html
     */
    FATAL_SIGNAL_RANGE_START        = 129,

    /** The maximum dynamic fatal error signal.
     *
     * From Advanced Bash scripting guide:
     * This should be 128 + SIGRTMAX
     * SIGRTMAX is 64
     *
     * @see https://tldp.org/LDP/abs/html/exitcodes.html
     * @see https://chromium.googlesource.com/chromiumos/docs/+/master/constants/signals.md
     * @see https://en.wikipedia.org/wiki/Signal_(IPC)#SIGRTMIN
     */
    FATAL_SIGNAL_RANGE_END          = 192,

    /** From Advanced Bash scripting guide
     * @see https://tldp.org/LDP/abs/html/exitcodes.html
     */
    EXIT_STATUS_OUT_OF_RANGE        = 255

}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function isCommandExitStatus (value: any): value is CommandExitStatus {
    if (!isNumber(value)) return false;
    if (value < 0) return false;
    if (value > 255) return false;
    if ( value >= CommandExitStatus.FATAL_SIGNAL_RANGE_START
        && value <= CommandExitStatus.FATAL_SIGNAL_RANGE_END
    ) {
        return true;
    }
    switch (value) {
        case CommandExitStatus.OK:
        case CommandExitStatus.GENERAL_ERRORS:
        case CommandExitStatus.MISUSE_OF_SHELL_BUILTINS:
        case CommandExitStatus.ARGUMENT_PARSE_ERROR:
        case CommandExitStatus.UNKNOWN_ARGUMENT:
        case CommandExitStatus.UNIMPLEMENTED_FEATURE:
        case CommandExitStatus.FATAL_ERROR:
        case CommandExitStatus.USAGE:
        case CommandExitStatus.DATAERR:
        case CommandExitStatus.NOINPUT:
        case CommandExitStatus.NOUSER:
        case CommandExitStatus.NOHOST:
        case CommandExitStatus.UNAVAILABLE:
        case CommandExitStatus.SOFTWARE:
        case CommandExitStatus.OSERR:
        case CommandExitStatus.OSFILE:
        case CommandExitStatus.CANTCREAT:
        case CommandExitStatus.IOERR:
        case CommandExitStatus.TEMPFAIL:
        case CommandExitStatus.PROTOCOL:
        case CommandExitStatus.NOPERM:
        case CommandExitStatus.CONFIG:
        case CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE:
        case CommandExitStatus.COMMAND_NOT_FOUND:
        case CommandExitStatus.INVALID_ARGUMENT_TO_EXIT:
        case CommandExitStatus.FATAL_SIGNAL_RANGE_START:
        case CommandExitStatus.FATAL_SIGNAL_RANGE_END:
        case CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE:
        case CommandExitStatus.CONFLICT:
            return true;
        default:
            return false;
    }
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function stringifyCommandExitStatus (value: CommandExitStatus): string {
    if (value >= CommandExitStatus.FATAL_SIGNAL_RANGE_START && value <= CommandExitStatus.FATAL_SIGNAL_RANGE_END) {
        return `FATAL_SIGNAL_${ value - CommandExitStatus.FATAL_SIGNAL_RANGE_START + 1 }`;
    }
    switch (value) {
        case CommandExitStatus.OK                              : return 'OK';
        case CommandExitStatus.GENERAL_ERRORS                  : return 'GENERAL_ERRORS';
        case CommandExitStatus.MISUSE_OF_SHELL_BUILTINS        : return 'MISUSE_OF_SHELL_BUILTINS';
        case CommandExitStatus.ARGUMENT_PARSE_ERROR            : return 'ARGUMENT_PARSE_ERROR';
        case CommandExitStatus.UNKNOWN_ARGUMENT                : return 'UNKNOWN_ARGUMENT';
        case CommandExitStatus.UNIMPLEMENTED_FEATURE           : return 'UNIMPLEMENTED_FEATURE';
        case CommandExitStatus.FATAL_ERROR                     : return 'FATAL_ERROR';
        case CommandExitStatus.USAGE                           : return 'USAGE';
        case CommandExitStatus.DATAERR                         : return 'DATAERR';
        case CommandExitStatus.NOINPUT                         : return 'NOINPUT';
        case CommandExitStatus.NOUSER                          : return 'NOUSER';
        case CommandExitStatus.NOHOST                          : return 'NOHOST';
        case CommandExitStatus.UNAVAILABLE                     : return 'UNAVAILABLE';
        case CommandExitStatus.SOFTWARE                        : return 'SOFTWARE';
        case CommandExitStatus.OSERR                           : return 'OSERR';
        case CommandExitStatus.OSFILE                          : return 'OSFILE';
        case CommandExitStatus.CANTCREAT                       : return 'CANTCREAT';
        case CommandExitStatus.IOERR                           : return 'IOERR';
        case CommandExitStatus.TEMPFAIL                        : return 'TEMPFAIL';
        case CommandExitStatus.PROTOCOL                        : return 'PROTOCOL';
        case CommandExitStatus.NOPERM                          : return 'NOPERM';
        case CommandExitStatus.CONFIG                          : return 'CONFIG';
        case CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE  : return 'COMMAND_INVOKED_CANNOT_EXECUTE';
        case CommandExitStatus.COMMAND_NOT_FOUND               : return 'COMMAND_NOT_FOUND';
        case CommandExitStatus.INVALID_ARGUMENT_TO_EXIT        : return 'INVALID_ARGUMENT_TO_EXIT';
        case CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE        : return 'EXIT_STATUS_OUT_OF_RANGE';
        case CommandExitStatus.CONFLICT                        : return 'CONFLICT';
    }
    throw new TypeError(`Unsupported RunnerExitStatus value: ${value}`);
}

/**
 *
 * @param value
 * @__PURE__
 * @nosideeffects
 */
export function parseCommandExitStatus (value: any): CommandExitStatus | undefined {
    if (value === undefined) return undefined;
    if (isCommandExitStatus(value)) return value;

    const valueString = `${value}`.toUpperCase();
    if (startsWith(valueString, 'FATAL_SIGNAL_')) {
        const int : number | undefined = parseInteger( valueString.substring('FATAL_SIGNAL_'.length, valueString.length) );
        if (int === undefined) return undefined;
        if ( int >= 1 && int <= (CommandExitStatus.FATAL_SIGNAL_RANGE_END+1 - CommandExitStatus.FATAL_SIGNAL_RANGE_START) ) {
            return int + CommandExitStatus.FATAL_SIGNAL_RANGE_START-1;
        } else {
            return undefined;
        }
    }

    switch (valueString) {
        case 'OK'                              : return CommandExitStatus.OK;
        case 'GENERAL_ERRORS'                  : return CommandExitStatus.GENERAL_ERRORS;
        case 'MISUSE_OF_SHELL_BUILTINS'        : return CommandExitStatus.MISUSE_OF_SHELL_BUILTINS;
        case 'ARGUMENT_PARSE_ERROR'            : return CommandExitStatus.ARGUMENT_PARSE_ERROR;
        case 'UNKNOWN_ARGUMENT'                : return CommandExitStatus.UNKNOWN_ARGUMENT;
        case 'UNIMPLEMENTED_FEATURE'           : return CommandExitStatus.UNIMPLEMENTED_FEATURE;
        case 'FATAL_ERROR'                     : return CommandExitStatus.FATAL_ERROR;
        case 'USAGE'                           : return CommandExitStatus.USAGE;
        case 'DATAERR'                         : return CommandExitStatus.DATAERR;
        case 'NOINPUT'                         : return CommandExitStatus.NOINPUT;
        case 'NOUSER'                          : return CommandExitStatus.NOUSER;
        case 'NOHOST'                          : return CommandExitStatus.NOHOST;
        case 'UNAVAILABLE'                     : return CommandExitStatus.UNAVAILABLE;
        case 'SOFTWARE'                        : return CommandExitStatus.SOFTWARE;
        case 'OSERR'                           : return CommandExitStatus.OSERR;
        case 'OSFILE'                          : return CommandExitStatus.OSFILE;
        case 'CANTCREAT'                       : return CommandExitStatus.CANTCREAT;
        case 'IOERR'                           : return CommandExitStatus.IOERR;
        case 'TEMPFAIL'                        : return CommandExitStatus.TEMPFAIL;
        case 'PROTOCOL'                        : return CommandExitStatus.PROTOCOL;
        case 'NOPERM'                          : return CommandExitStatus.NOPERM;
        case 'CONFIG'                          : return CommandExitStatus.CONFIG;
        case 'COMMAND_INVOKED_CANNOT_EXECUTE'  : return CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE;
        case 'COMMAND_NOT_FOUND'               : return CommandExitStatus.COMMAND_NOT_FOUND;
        case 'INVALID_ARGUMENT_TO_EXIT'        : return CommandExitStatus.INVALID_ARGUMENT_TO_EXIT;
        case 'EXIT_STATUS_OUT_OF_RANGE'        : return CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE;
        case 'CONFLICT'                        : return CommandExitStatus.CONFLICT;
        default: return undefined;
    }
}

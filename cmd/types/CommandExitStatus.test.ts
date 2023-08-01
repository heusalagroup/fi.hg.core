// Copyright (c) 2021-2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { CommandExitStatus, isCommandExitStatus, stringifyCommandExitStatus, parseCommandExitStatus } from './CommandExitStatus';

describe('CommandExitStatus', () => {

    describe('isCommandExitStatus', () => {

        it('should return true for valid CommandExitStatus values', () => {
            expect(isCommandExitStatus(CommandExitStatus.OK)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.GENERAL_ERRORS)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.MISUSE_OF_SHELL_BUILTINS)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.ARGUMENT_PARSE_ERROR)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.UNKNOWN_ARGUMENT)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.UNIMPLEMENTED_FEATURE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.FATAL_ERROR)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.USAGE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.DATAERR)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.NOINPUT)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.NOUSER)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.NOHOST)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.UNAVAILABLE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.SOFTWARE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.OSERR)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.OSFILE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.CANTCREAT)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.IOERR)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.TEMPFAIL)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.PROTOCOL)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.NOPERM)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.CONFIG)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.COMMAND_NOT_FOUND)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.INVALID_ARGUMENT_TO_EXIT)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.FATAL_SIGNAL_RANGE_START)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.FATAL_SIGNAL_RANGE_END)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE)).toBeTruthy();
            expect(isCommandExitStatus(CommandExitStatus.CONFLICT)).toBeTruthy();
        });

        it('should return false for invalid CommandExitStatus values', () => {
            expect(isCommandExitStatus(-1)).toBeFalsy();
            expect(isCommandExitStatus(256)).toBeFalsy();
            expect(isCommandExitStatus([])).toBeFalsy();
            expect(isCommandExitStatus([1])).toBeFalsy();
            expect(isCommandExitStatus({})).toBeFalsy();
            expect(isCommandExitStatus({'1':'hello'})).toBeFalsy();
            expect(isCommandExitStatus({'foo':'bar'})).toBeFalsy();
            expect(isCommandExitStatus(true)).toBeFalsy();
            expect(isCommandExitStatus(false)).toBeFalsy();
            expect(isCommandExitStatus(null)).toBeFalsy();
            expect(isCommandExitStatus(undefined)).toBeFalsy();
            expect(isCommandExitStatus('1')).toBeFalsy();
            expect(isCommandExitStatus('123')).toBeFalsy();
            expect(isCommandExitStatus('INVALID_VALUE')).toBeFalsy();
            // test other invalid values...
        });

        it('should return true for CommandExitStatus.FATAL_SIGNAL_1 until FATAL_SIGNAL_64', () => {
            expect(isCommandExitStatus(129)).toBeTruthy();
            expect(isCommandExitStatus(130)).toBeTruthy();
            // ...test other enum values in this range...
            expect(isCommandExitStatus(192)).toBeTruthy();
            expect(isCommandExitStatus(193)).toBeFalsy();
        });

    });

    describe('stringifyCommandExitStatus', () => {

        it('should return correct string representation for CommandExitStatus values', () => {
            expect(stringifyCommandExitStatus(CommandExitStatus.OK)).toEqual('OK');
            expect(stringifyCommandExitStatus(CommandExitStatus.GENERAL_ERRORS)).toEqual('GENERAL_ERRORS');
            expect(stringifyCommandExitStatus(CommandExitStatus.MISUSE_OF_SHELL_BUILTINS)).toEqual('MISUSE_OF_SHELL_BUILTINS');
            expect(stringifyCommandExitStatus(CommandExitStatus.ARGUMENT_PARSE_ERROR)).toEqual('ARGUMENT_PARSE_ERROR');
            expect(stringifyCommandExitStatus(CommandExitStatus.UNKNOWN_ARGUMENT)).toEqual('UNKNOWN_ARGUMENT');
            expect(stringifyCommandExitStatus(CommandExitStatus.UNIMPLEMENTED_FEATURE)).toEqual('UNIMPLEMENTED_FEATURE');
            expect(stringifyCommandExitStatus(CommandExitStatus.FATAL_ERROR)).toEqual('FATAL_ERROR');
            expect(stringifyCommandExitStatus(CommandExitStatus.USAGE)).toEqual('USAGE');
            expect(stringifyCommandExitStatus(CommandExitStatus.DATAERR)).toEqual('DATAERR');
            expect(stringifyCommandExitStatus(CommandExitStatus.NOINPUT)).toEqual('NOINPUT');
            expect(stringifyCommandExitStatus(CommandExitStatus.NOUSER)).toEqual('NOUSER');
            expect(stringifyCommandExitStatus(CommandExitStatus.NOHOST)).toEqual('NOHOST');
            expect(stringifyCommandExitStatus(CommandExitStatus.UNAVAILABLE)).toEqual('UNAVAILABLE');
            expect(stringifyCommandExitStatus(CommandExitStatus.SOFTWARE)).toEqual('SOFTWARE');
            expect(stringifyCommandExitStatus(CommandExitStatus.OSERR)).toEqual('OSERR');
            expect(stringifyCommandExitStatus(CommandExitStatus.OSFILE)).toEqual('OSFILE');
            expect(stringifyCommandExitStatus(CommandExitStatus.CANTCREAT)).toEqual('CANTCREAT');
            expect(stringifyCommandExitStatus(CommandExitStatus.IOERR)).toEqual('IOERR');
            expect(stringifyCommandExitStatus(CommandExitStatus.TEMPFAIL)).toEqual('TEMPFAIL');
            expect(stringifyCommandExitStatus(CommandExitStatus.PROTOCOL)).toEqual('PROTOCOL');
            expect(stringifyCommandExitStatus(CommandExitStatus.NOPERM)).toEqual('NOPERM');
            expect(stringifyCommandExitStatus(CommandExitStatus.CONFIG)).toEqual('CONFIG');
            expect(stringifyCommandExitStatus(CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE)).toEqual('COMMAND_INVOKED_CANNOT_EXECUTE');
            expect(stringifyCommandExitStatus(CommandExitStatus.COMMAND_NOT_FOUND)).toEqual('COMMAND_NOT_FOUND');
            expect(stringifyCommandExitStatus(CommandExitStatus.INVALID_ARGUMENT_TO_EXIT)).toEqual('INVALID_ARGUMENT_TO_EXIT');
            expect(stringifyCommandExitStatus(CommandExitStatus.FATAL_SIGNAL_RANGE_START)).toEqual('FATAL_SIGNAL_1');
            expect(stringifyCommandExitStatus(CommandExitStatus.FATAL_SIGNAL_RANGE_END)).toEqual('FATAL_SIGNAL_64');
            expect(stringifyCommandExitStatus(CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE)).toEqual('EXIT_STATUS_OUT_OF_RANGE');
            expect(stringifyCommandExitStatus(CommandExitStatus.CONFLICT)).toEqual('CONFLICT');
        });

        it('should throw an error for invalid CommandExitStatus values', () => {
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(-1)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(256)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus([])).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus([1])).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus({})).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus({'1':'hello'})).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus({'foo':'bar'})).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(true)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(false)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(null)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(undefined)).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus('1')).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus('123')).toThrowError(TypeError);
            // @ts-ignore
            expect(() => stringifyCommandExitStatus('INVALID_VALUE')).toThrowError(TypeError);
        });

        it('should return correct string representation for CommandExitStatus.FATAL_SIGNAL_0 and beyond', () => {
            expect(stringifyCommandExitStatus(129)).toEqual('FATAL_SIGNAL_1');
            // @ts-ignore
            expect(stringifyCommandExitStatus(130)).toEqual('FATAL_SIGNAL_2');
            // ...test other enum values in this range...
            // @ts-ignore
            expect(stringifyCommandExitStatus(192)).toEqual('FATAL_SIGNAL_64');
            // @ts-ignore
            expect(() => stringifyCommandExitStatus(193)).toThrowError(TypeError);
        });

    });

    describe('parseCommandExitStatus', () => {

        it('should return correct CommandExitStatus values for valid inputs', () => {

            expect(parseCommandExitStatus(CommandExitStatus.OK)).toEqual(CommandExitStatus.OK);
            expect(parseCommandExitStatus(CommandExitStatus.GENERAL_ERRORS)).toEqual(CommandExitStatus.GENERAL_ERRORS);
            expect(parseCommandExitStatus(CommandExitStatus.MISUSE_OF_SHELL_BUILTINS)).toEqual(CommandExitStatus.MISUSE_OF_SHELL_BUILTINS);
            expect(parseCommandExitStatus(CommandExitStatus.ARGUMENT_PARSE_ERROR)).toEqual(CommandExitStatus.ARGUMENT_PARSE_ERROR);
            expect(parseCommandExitStatus(CommandExitStatus.UNKNOWN_ARGUMENT)).toEqual(CommandExitStatus.UNKNOWN_ARGUMENT);
            expect(parseCommandExitStatus(CommandExitStatus.UNIMPLEMENTED_FEATURE)).toEqual(CommandExitStatus.UNIMPLEMENTED_FEATURE);
            expect(parseCommandExitStatus(CommandExitStatus.FATAL_ERROR)).toEqual(CommandExitStatus.FATAL_ERROR);
            expect(parseCommandExitStatus(CommandExitStatus.USAGE)).toEqual(CommandExitStatus.USAGE);
            expect(parseCommandExitStatus(CommandExitStatus.DATAERR)).toEqual(CommandExitStatus.DATAERR);
            expect(parseCommandExitStatus(CommandExitStatus.NOINPUT)).toEqual(CommandExitStatus.NOINPUT);
            expect(parseCommandExitStatus(CommandExitStatus.NOUSER)).toEqual(CommandExitStatus.NOUSER);
            expect(parseCommandExitStatus(CommandExitStatus.NOHOST)).toEqual(CommandExitStatus.NOHOST);
            expect(parseCommandExitStatus(CommandExitStatus.UNAVAILABLE)).toEqual(CommandExitStatus.UNAVAILABLE);
            expect(parseCommandExitStatus(CommandExitStatus.SOFTWARE)).toEqual(CommandExitStatus.SOFTWARE);
            expect(parseCommandExitStatus(CommandExitStatus.OSERR)).toEqual(CommandExitStatus.OSERR);
            expect(parseCommandExitStatus(CommandExitStatus.OSFILE)).toEqual(CommandExitStatus.OSFILE);
            expect(parseCommandExitStatus(CommandExitStatus.CANTCREAT)).toEqual(CommandExitStatus.CANTCREAT);
            expect(parseCommandExitStatus(CommandExitStatus.IOERR)).toEqual(CommandExitStatus.IOERR);
            expect(parseCommandExitStatus(CommandExitStatus.TEMPFAIL)).toEqual(CommandExitStatus.TEMPFAIL);
            expect(parseCommandExitStatus(CommandExitStatus.PROTOCOL)).toEqual(CommandExitStatus.PROTOCOL);
            expect(parseCommandExitStatus(CommandExitStatus.NOPERM)).toEqual(CommandExitStatus.NOPERM);
            expect(parseCommandExitStatus(CommandExitStatus.CONFIG)).toEqual(CommandExitStatus.CONFIG);
            expect(parseCommandExitStatus(CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE)).toEqual(CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE);
            expect(parseCommandExitStatus(CommandExitStatus.COMMAND_NOT_FOUND)).toEqual(CommandExitStatus.COMMAND_NOT_FOUND);
            expect(parseCommandExitStatus(CommandExitStatus.INVALID_ARGUMENT_TO_EXIT)).toEqual(CommandExitStatus.INVALID_ARGUMENT_TO_EXIT);
            expect(parseCommandExitStatus(CommandExitStatus.FATAL_SIGNAL_RANGE_START)).toEqual(CommandExitStatus.FATAL_SIGNAL_RANGE_START);
            expect(parseCommandExitStatus(CommandExitStatus.FATAL_SIGNAL_RANGE_END)).toEqual(CommandExitStatus.FATAL_SIGNAL_RANGE_END);
            expect(parseCommandExitStatus(CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE)).toEqual(CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE);
            expect(parseCommandExitStatus(CommandExitStatus.CONFLICT)).toEqual(CommandExitStatus.CONFLICT);

            expect(parseCommandExitStatus('OK')).toEqual(CommandExitStatus.OK);
            expect(parseCommandExitStatus('GENERAL_ERRORS')).toEqual(CommandExitStatus.GENERAL_ERRORS);
            expect(parseCommandExitStatus('MISUSE_OF_SHELL_BUILTINS')).toEqual(CommandExitStatus.MISUSE_OF_SHELL_BUILTINS);
            expect(parseCommandExitStatus('ARGUMENT_PARSE_ERROR')).toEqual(CommandExitStatus.ARGUMENT_PARSE_ERROR);
            expect(parseCommandExitStatus('UNKNOWN_ARGUMENT')).toEqual(CommandExitStatus.UNKNOWN_ARGUMENT);
            expect(parseCommandExitStatus('UNIMPLEMENTED_FEATURE')).toEqual(CommandExitStatus.UNIMPLEMENTED_FEATURE);
            expect(parseCommandExitStatus('FATAL_ERROR')).toEqual(CommandExitStatus.FATAL_ERROR);
            expect(parseCommandExitStatus('USAGE')).toEqual(CommandExitStatus.USAGE);
            expect(parseCommandExitStatus('DATAERR')).toEqual(CommandExitStatus.DATAERR);
            expect(parseCommandExitStatus('NOINPUT')).toEqual(CommandExitStatus.NOINPUT);
            expect(parseCommandExitStatus('NOUSER')).toEqual(CommandExitStatus.NOUSER);
            expect(parseCommandExitStatus('NOHOST')).toEqual(CommandExitStatus.NOHOST);
            expect(parseCommandExitStatus('UNAVAILABLE')).toEqual(CommandExitStatus.UNAVAILABLE);
            expect(parseCommandExitStatus('SOFTWARE')).toEqual(CommandExitStatus.SOFTWARE);
            expect(parseCommandExitStatus('OSERR')).toEqual(CommandExitStatus.OSERR);
            expect(parseCommandExitStatus('OSFILE')).toEqual(CommandExitStatus.OSFILE);
            expect(parseCommandExitStatus('CANTCREAT')).toEqual(CommandExitStatus.CANTCREAT);
            expect(parseCommandExitStatus('IOERR')).toEqual(CommandExitStatus.IOERR);
            expect(parseCommandExitStatus('TEMPFAIL')).toEqual(CommandExitStatus.TEMPFAIL);
            expect(parseCommandExitStatus('PROTOCOL')).toEqual(CommandExitStatus.PROTOCOL);
            expect(parseCommandExitStatus('NOPERM')).toEqual(CommandExitStatus.NOPERM);
            expect(parseCommandExitStatus('CONFIG')).toEqual(CommandExitStatus.CONFIG);
            expect(parseCommandExitStatus('COMMAND_INVOKED_CANNOT_EXECUTE')).toEqual(CommandExitStatus.COMMAND_INVOKED_CANNOT_EXECUTE);
            expect(parseCommandExitStatus('COMMAND_NOT_FOUND')).toEqual(CommandExitStatus.COMMAND_NOT_FOUND);
            expect(parseCommandExitStatus('INVALID_ARGUMENT_TO_EXIT')).toEqual(CommandExitStatus.INVALID_ARGUMENT_TO_EXIT);
            expect(parseCommandExitStatus('EXIT_STATUS_OUT_OF_RANGE')).toEqual(CommandExitStatus.EXIT_STATUS_OUT_OF_RANGE);
            expect(parseCommandExitStatus('CONFLICT')).toEqual(CommandExitStatus.CONFLICT);

        });

        it('should return undefined for invalid inputs', () => {
            expect(parseCommandExitStatus(-1)).toBeUndefined();
            expect(parseCommandExitStatus(256)).toBeUndefined();
            expect(parseCommandExitStatus([])).toBeUndefined();
            expect(parseCommandExitStatus([1])).toBeUndefined();
            expect(parseCommandExitStatus({})).toBeUndefined();
            expect(parseCommandExitStatus({'1':'hello'})).toBeUndefined();
            expect(parseCommandExitStatus({'foo':'bar'})).toBeUndefined();
            expect(parseCommandExitStatus(true)).toBeUndefined();
            expect(parseCommandExitStatus(false)).toBeUndefined();
            expect(parseCommandExitStatus(null)).toBeUndefined();
            expect(parseCommandExitStatus(undefined)).toBeUndefined();
            expect(parseCommandExitStatus('1')).toBeUndefined();
            expect(parseCommandExitStatus('123')).toBeUndefined();
            expect(parseCommandExitStatus('INVALID_VALUE')).toBeUndefined();
        });

        it('should return correct CommandExitStatus values for FATAL_SIGNAL_0 and beyond', () => {
            expect(parseCommandExitStatus('FATAL_SIGNAL_0')).toEqual(undefined);
            expect(parseCommandExitStatus('FATAL_SIGNAL_1')).toEqual(128+1);
            expect(parseCommandExitStatus('FATAL_SIGNAL_2')).toEqual(128+2);
            expect(parseCommandExitStatus('FATAL_SIGNAL_3')).toEqual(128+3);
            // ...test other valid inputs in this range...
            expect(parseCommandExitStatus('FATAL_SIGNAL_63')).toEqual(128+63);
            expect(parseCommandExitStatus('FATAL_SIGNAL_64')).toEqual(128+64);
            expect(parseCommandExitStatus('FATAL_SIGNAL_65')).toEqual(undefined);
        });

    });

});

// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { CommandArgumentUtils } from "./CommandArgumentUtils";
import { ParsedCommandArgumentStatus } from "../types/ParsedCommandArgumentStatus";
import { CommandExitStatus } from "../types/CommandExitStatus";
import { ArgumentType } from "../types/ArgumentType";
import { ArgumentConfigurationMap } from "../types/ArgumentConfigurationMap";
import { LogLevel } from "../../types/LogLevel";

describe('CommandArgumentUtils', () => {

    beforeAll( () => {
        CommandArgumentUtils.setLogLevel(LogLevel.NONE);
    });

    describe('parseArguments', () => {

        it('should return error status when no script name is provided', () => {
            const defaultScriptName = '';
            const args : string[] = [];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.ARGUMENT_PARSE_ERROR);
        });

        it('should return error status when script name is provided but no args', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.ARGUMENT_PARSE_ERROR);
        });

        it('should handle --help argument correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--help'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.HELP);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
        });

        it('should handle --version argument correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--version'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.VERSION);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
        });

        it('should handle long user defined arguments correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--backend=1.2.3.4'];
            const configMap : ArgumentConfigurationMap = {
                backend: [ArgumentType.STRING, '--backend', undefined, undefined, 'localhost']
            };
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args, configMap);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.OK);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
            expect(result.userArgs?.backend).toBe('1.2.3.4');
        });

        it('should handle long single user defined arguments correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--backend'];
            const configMap : ArgumentConfigurationMap = {
                backend: [ArgumentType.STRING, '--backend', undefined, undefined, 'localhost']
            };
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args, configMap);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.OK);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
            expect(result.userArgs).toHaveProperty('backend');
        });

        it('should handle short user defined arguments correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '-b=1.2.3.4'];
            const configMap : ArgumentConfigurationMap = {
                backend: [ArgumentType.STRING, undefined, '-b', undefined, 'localhost']
            };
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args, configMap);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.OK);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
            expect(result.userArgs?.backend).toBe('1.2.3.4');
        });

        it('should handle short single user defined arguments correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '-b'];
            const configMap : ArgumentConfigurationMap = {
                backend: [ArgumentType.STRING, undefined, '-b', undefined, 'localhost']
            };
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args, configMap);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.OK);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
            expect(result.userArgs).toHaveProperty('backend');
        });

        it('should return error status for long valueless unknown arguments', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--unknown'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.UNKNOWN_ARGUMENT);
            expect(result.errorString).toBe('Unknown argument: --unknown');
        });

        it('should return error status for short valueless unknown arguments', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '-u'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.UNKNOWN_ARGUMENT);
            expect(result.errorString).toBe('Unknown argument: -u');
        });

        it('should return error status for long with value unknown arguments', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--unknown=bar'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.UNKNOWN_ARGUMENT);
            expect(result.errorString).toBe('Unknown argument: --unknown=bar');
        });

        it('should return error status for short with value unknown arguments', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '-u=bar'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.UNKNOWN_ARGUMENT);
            expect(result.errorString).toBe('Unknown argument: -u=bar');
        });

        it('should return error status for long illegal integer arguments', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--integer=bar'];
            const result = CommandArgumentUtils.parseArguments(
                defaultScriptName,
                args,
                {
                    integer: [ ArgumentType.INTEGER, '--integer', '-I' ]
                }
            );
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.ARGUMENT_PARSE_ERROR);
            expect(result.errorString).toBe('Argument parse error: TypeError: Argument --integer=bar: not integer');
        });

        it('should return error status for short illegal integer arguments', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '-I=bar'];
            const result = CommandArgumentUtils.parseArguments(
                defaultScriptName,
                args,
                {
                    integer: [ ArgumentType.INTEGER, '--integer', '-I' ]
                }
            );
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.ARGUMENT_PARSE_ERROR);
            expect(result.errorString).toBe('Argument parse error: TypeError: Argument -I=bar: not integer');
        });

        it('should return error status for short arguments with undefined custom type', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '-I'];
            const result = CommandArgumentUtils.parseArguments(
                defaultScriptName,
                args,
                {
                    integer: [ 'CUSTOM', '--integer', '-I' ]
                },
                {

                }
            );
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.ARGUMENT_PARSE_ERROR);
            expect(result.errorString).toBe('Argument parse error: TypeError: Unimplemented type: CUSTOM');
        });

        it('should return error status for long arguments with undefined custom type', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--integer'];
            const result = CommandArgumentUtils.parseArguments(
                defaultScriptName,
                args,
                {
                    integer: [ 'CUSTOM', '--integer', '-I' ]
                },
                {

                }
            );
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.ERROR);
            expect(result.exitStatus).toBe(CommandExitStatus.ARGUMENT_PARSE_ERROR);
            expect(result.errorString).toBe('Argument parse error: TypeError: Unimplemented type: CUSTOM');
        });

        it('should handle arguments after --', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', '--', '--backend'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.OK);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
            expect(result.extraArgs).toContain('--backend');
        });

        it('should handle free args correctly', () => {
            const defaultScriptName = 'scriptName';
            const args = ['nodePath', 'scriptName', 'freeArg'];
            const result = CommandArgumentUtils.parseArguments(defaultScriptName, args);
            expect(result.parseStatus).toBe(ParsedCommandArgumentStatus.OK);
            expect(result.exitStatus).toBe(CommandExitStatus.OK);
            expect(result.freeArgs).toContain('freeArg');
        });

    });

});

// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ProcessUtils } from "./ProcessUtils";
import FS from 'fs';

jest.mock('fs');

describe('ProcessUtils', () => {

    describe('getArguments', () => {

        it('should get process arguments', () => {
            process.argv = ['node', 'script.js', 'arg1', 'arg2'];
            const args = ProcessUtils.getArguments();
            expect(args).toEqual(['arg1', 'arg2']);
        });

    });

    describe('parseEnvFileLine', () => {

        it('should parse environment variable line with equal sign', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key=value');
            expect(result).toEqual({ key: 'value' });
        });

        it('should parse environment variable line without equal sign', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key');
            expect(result).toEqual({ key: '' });
        });

        it('should parse environment variable line with double quotes sign', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key="value"');
            expect(result).toEqual({ key: 'value' });
        });

        it('should parse environment variable line with double quotes sign and line breaks', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key="row1\nrow2\n"');
            expect(result).toEqual({ key: 'row1\nrow2\n' });
        });

        it('should parse environment variable line with double quotes sign and line breaks with multiple keys', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key="row1\nrow2\n"\nkey2=value2');
            expect(result).toEqual({ key: 'row1\nrow2\n', key2: 'value2' });
        });

        it('should parse environment variable line with escaped line breaks', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key=row1\\nrow2\\n');
            expect(result).toEqual({ key: 'row1\nrow2\n' });
        });

        it('should parse environment variable line with escaped line breaks and other keys', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key=row1\\nrow2\\n\nkey2=value2');
            expect(result).toEqual({ key: 'row1\nrow2\n', key2: 'value2' });
        });

        it('should parse environment variables with multiple lines and double quotes', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key="value"\nkey2="value2"');
            expect(result).toEqual({ key: 'value', key2: 'value2' });
        });

        it('should parse environment variables with multiple lines', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key=value\nkey2=value2');
            expect(result).toEqual({ key: 'value', key2: 'value2' });
        });

        it('should parse environment variables with multiple lines and mixed types', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key=value\nkey2="value2"');
            expect(result).toEqual({ key: 'value', key2: 'value2' });
        });

        it('should parse environment variables with multiple lines and mixed types otherway around', () => {
            const result = ProcessUtils.parseEnvFileLine({}, 'key="value"\nkey2=value2');
            expect(result).toEqual({ key: 'value', key2: 'value2' });
        });

    });

    describe('parseEnvFile', () => {

        it('should read and parse environment variables from file', () => {
            (FS.readFileSync as any).mockReturnValue('key1=value1\nkey2=value2');
            const result = ProcessUtils.parseEnvFile('filepath');
            expect(result).toEqual({ key1: 'value1', key2: 'value2' });
        });

    });

    describe('parseEnvString', () => {

        it('should parse environment variables from string', () => {
            const envString = 'key1=value1\nkey2=value2';
            const result = ProcessUtils.parseEnvString(envString);
            expect(result).toEqual({ key1: 'value1', key2: 'value2' });
        });

        it('should parse environment variables from double quoted string', () => {
            const envString = 'key1="value1"\nkey2="value2"';
            const result = ProcessUtils.parseEnvString(envString);
            expect(result).toEqual({ key1: 'value1', key2: 'value2' });
        });

    });

    describe('initEnvFromRecord', () => {
        it('should initialize environment variables from a record', () => {
            const record = { key1: 'value1', key2: 'value2' };
            ProcessUtils.initEnvFromRecord(record);
            expect(process.env.key1).toEqual('value1');
            expect(process.env.key2).toEqual('value2');
        });
    });

    describe('setupDestroyHandler', () => {

        // Not correctly written test
        it.skip('should set up a handler for process destruction', () => {

            const callback = jest.fn();
            const errorHandler = jest.fn();

            ProcessUtils.setupDestroyHandler(callback, errorHandler);

            const closeProcess = (reason: any) => {
                const event = new Error('Test error');
                process.emit(reason, event);
            };

            closeProcess('exit');
            expect(callback).toHaveBeenCalled();
            expect(errorHandler).toHaveBeenCalledWith(new Error('Test error'));

            callback.mockClear();
            errorHandler.mockClear();

            closeProcess('SIGTERM');
            expect(callback).toHaveBeenCalled();
            expect(errorHandler).toHaveBeenCalledWith(new Error('Test error'));

            callback.mockClear();
            errorHandler.mockClear();

            closeProcess('uncaughtException');
            expect(callback).toHaveBeenCalled();
            expect(errorHandler).toHaveBeenCalledWith(new Error('Test error'));
        });

    });

});

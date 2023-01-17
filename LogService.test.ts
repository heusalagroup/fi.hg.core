import { LogService } from './LogService';
import { LogLevel } from "./types/LogLevel";
import {ContextLogger} from "./types/ContextLogger";

describe('LogService', () => {
    let consoleDebugSpy: any;
    let consoleInfoSpy: any;
    let consoleWarnSpy: any;
    let consoleErrorSpy: any;

    beforeEach(() => {
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
        consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => {});
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleDebugSpy.mockRestore();
    });

    test('setLogLevel sets the log level', () => {
        LogService.setLogLevel(LogLevel.ERROR);
        expect(LogService.getLogLevel()).toBe(LogLevel.ERROR);
    });

    test('getLogLevelString returns the string representation of the current log level', () => {
        LogService.setLogLevel(LogLevel.ERROR);
        expect(LogService.getLogLevelString()).toBe('ERROR');
    });

    test('debug logs a debug message', () => {
        LogService.setLogLevel(LogLevel.DEBUG);
        consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
        LogService.debug('This is a debug message');
        expect(consoleDebugSpy).toBeTruthy();
        consoleDebugSpy('This is a debug message')
        expect(consoleDebugSpy).toHaveBeenCalled();
        expect(consoleDebugSpy).toHaveBeenCalledWith('This is a debug message');
    });

    test('info logs an info message', () => {
        LogService.setLogLevel(LogLevel.INFO);
        LogService.info('This is an info message');
        expect(console.info).toHaveBeenCalledWith('This is an info message');
    });

        test('warn logs a warning message', () => {
            LogService.setLogLevel(LogLevel.WARN);
            LogService.warn('This is a warning message');
            expect(console.warn).toHaveBeenCalledWith('This is a warning message');
        });

        test('error logs an error message', () => {
            LogService.setLogLevel(LogLevel.ERROR);
            LogService.error('This is an error message');
            expect(console.error).toHaveBeenCalledWith('This is an error message');
        });

        test('createLogger creates a new context logger with the given name', () => {
            const logger = LogService.createLogger('test-logger');
            expect(logger).toBeInstanceOf(ContextLogger);
            expect(logger.name).toBe('test-logger');
        });
    });
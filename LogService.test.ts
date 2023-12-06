// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { MockLogger } from "./logger/mock/MockLogger";
import { LogLevel } from "./types/LogLevel";
import { LogService } from "./LogService";
import { Logger } from "./types/Logger";
import { ContextLogger } from "./logger/context/ContextLogger";

describe('LogService', () => {

    let mockLogger: Logger;
    let prevLogger : Logger;
    let prevLogLevel: LogLevel;
    let spyDebug : any;
    let spyInfo : any;
    let spyWarn : any;
    let spyError : any;

    beforeEach(() => {
        prevLogger = LogService.getLogger();
        prevLogLevel = LogService.getLogLevel();
        mockLogger = new MockLogger();
        spyDebug = jest.spyOn(mockLogger, 'debug').mockImplementation(() => {});
        spyInfo = jest.spyOn(mockLogger, 'info').mockImplementation(() => {});
        spyWarn = jest.spyOn(mockLogger, 'warn').mockImplementation(() => {});
        spyError = jest.spyOn(mockLogger, 'error').mockImplementation(() => {});
        LogService.setLogger(mockLogger);
        LogService.setLogLevel(LogLevel.DEBUG);
    });

    afterEach( () => {
        spyDebug.mockRestore();
        spyInfo.mockRestore();
        spyWarn.mockRestore();
        spyError.mockRestore();
        LogService.setLogLevel(prevLogLevel);
        LogService.setLogger(prevLogger)
    });

    describe('#setLogLevel', () => {

        it('sets the log level to the specified value', () => {
            LogService.setLogLevel(LogLevel.INFO);
            expect(LogService.getLogLevel()).toEqual(LogLevel.INFO);
        });

    });

    describe('#getLogLevel', () => {

        it('returns the current log level', () => {
            expect(LogService.getLogLevel()).toEqual(LogLevel.DEBUG);
        });

    });

    describe('#getLogLevelString', () => {

        it('returns the string representation of the current log level', () => {
            expect(LogService.getLogLevelString()).toEqual('DEBUG');
        });

    });

    describe('#setLogger', () => {

        it('sets the logger to the specified value', () => {
            const newLogger = new MockLogger();
            LogService.setLogger(newLogger);
            expect(LogService['_logger']).toEqual(newLogger);
        });

        it('throws an error when the logger is not defined', () => {
            expect(() => LogService.setLogger(undefined as any)).toThrow(TypeError);
        });

    });

    describe('#debug', () => {

        it('logs messages with log level DEBUG', () => {
            LogService.debug('test message');
            expect(mockLogger.debug).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level INFO', () => {
            LogService.setLogLevel(LogLevel.INFO);
            LogService.debug('test message');
            expect(mockLogger.debug).not.toHaveBeenCalled();
        });

    });

    describe('#info', () => {

        it('logs messages with log level INFO', () => {
            LogService.setLogLevel(LogLevel.INFO);
            LogService.info('test message');
            expect(mockLogger.info).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level WARN', () => {
            LogService.setLogLevel(LogLevel.WARN);
            LogService.info('test message');
            expect(mockLogger.info).not.toHaveBeenCalled();
        });

    });

    describe('#warn', () => {

        it('logs messages with log level WARN', () => {
            LogService.setLogLevel(LogLevel.WARN);
            LogService.warn('test message');
            expect(mockLogger.warn).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level ERROR', () => {
            LogService.setLogLevel(LogLevel.ERROR);
            LogService.warn('test message');
            expect(mockLogger.warn).not.toHaveBeenCalled();
        });

    });

    describe('#error', () => {

        it('logs messages with log level ERROR', () => {
            LogService.setLogLevel(LogLevel.ERROR);
            LogService.error('test message');
            expect(mockLogger.error).toHaveBeenCalledWith('test message');
        });

    });

    describe('#createLogger', () => {

        it('returns a new ContextLogger instance', () => {
            const contextLogger = LogService.createLogger('test');
            expect(contextLogger).toBeInstanceOf(ContextLogger);
        });

    });

});

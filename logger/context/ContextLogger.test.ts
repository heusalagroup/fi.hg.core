// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ContextLogger } from "./ContextLogger";
import { LogLevel } from "../../types/LogLevel";
import { Logger } from "../../types/Logger";
import { MockLogger } from "../mock/MockLogger";

const TEST_CONTEXT_NAME = 'test';

describe('ContextLogger', () => {

    let mockLogger : Logger;
    let spyDebug : any;
    let spyInfo : any;
    let spyWarn : any;
    let spyError : any;
    let logger : Logger;

    beforeEach( () => {
        mockLogger = new MockLogger();
        spyDebug = jest.spyOn(mockLogger, 'debug').mockImplementation( () => {});
        spyInfo = jest.spyOn(mockLogger, 'info').mockImplementation( () => {});
        spyWarn = jest.spyOn(mockLogger, 'warn').mockImplementation( () => {});
        spyError = jest.spyOn(mockLogger, 'error').mockImplementation( () => {});
        logger = new ContextLogger(
            TEST_CONTEXT_NAME,
            mockLogger,
            LogLevel.DEBUG
        );
    });

    afterEach( () => {
        spyDebug.mockRestore();
        spyInfo.mockRestore();
        spyWarn.mockRestore();
        spyError.mockRestore();
        logger.setLogLevel(LogLevel.DEBUG);
    });

    describe('#debug', () => {

        it('logs messages with log level DEBUG', () => {
            logger.debug('test message');
            expect(mockLogger.debug).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('does not log messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.debug('test message');
            expect(mockLogger.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.debug('test message');
            expect(mockLogger.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.debug('test message');
            expect(mockLogger.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.debug('test message');
            expect(mockLogger.debug).not.toHaveBeenCalled();
        });

    });

    describe('#info', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.info('test message');
            expect(mockLogger.info).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.info('test message');
            expect(mockLogger.info).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('does not log messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.info('test message');
            expect(mockLogger.info).not.toHaveBeenCalled();
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.info('test message');
            expect(mockLogger.info).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.info('test message');
            expect(mockLogger.info).not.toHaveBeenCalled();
        });

    });

    describe('#warn', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.warn('test message');
            expect(mockLogger.warn).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.warn('test message');
            expect(mockLogger.warn).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('logs messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.warn('test message');
            expect(mockLogger.warn).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.warn('test message');
            expect(mockLogger.warn).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.warn('test message');
            expect(mockLogger.warn).not.toHaveBeenCalled();
        });

    });

    describe('#error', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.error('test message');
            expect(mockLogger.error).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.error('test message');
            expect(mockLogger.error).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('logs messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.error('test message');
            expect(mockLogger.error).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('logs messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.error('test message');
            expect(mockLogger.error).toHaveBeenCalledWith(`[${TEST_CONTEXT_NAME}]`, 'test message');
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.error('test message');
            expect(mockLogger.error).not.toHaveBeenCalled();
        });

    });

});

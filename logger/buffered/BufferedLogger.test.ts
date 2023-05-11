// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { BufferedLogger } from "./BufferedLogger";
import { LogLevel } from "../../types/LogLevel";
import { Logger } from "../../types/Logger";

describe('BufferedLogger', () => {

    jest.useFakeTimers();

    let logger : Logger;
    let writtenData: string;

    beforeEach(() => {
        writtenData = '';
        logger = new BufferedLogger(
            (value: string) => {
                writtenData += value;
            },
            25,
            1000,
            '>>>',
            '...\n',
            '\n',
            LogLevel.DEBUG
        );
    });

    it('creates a BufferedLogger instance', () => {
        expect(logger).toBeInstanceOf(BufferedLogger);
    });

    function setLogLevelInfo () {
        logger.setLogLevel(LogLevel.INFO);
    }

    function setLogLevelWarn () {
        logger.setLogLevel(LogLevel.WARN);
    }
    function setLogLevelError () {
        logger.setLogLevel(LogLevel.ERROR);
    }

    function setLogLevelNone () {
        logger.setLogLevel(LogLevel.NONE);
    }

    function happyDebugTests () {

        it('logs short debug message', () => {
            logger.debug('Hello debug doh!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                '[DEBUG] Hello debug doh!\n' // Exactly 25 characters (including linebreak)
            );
        });

        it('logs long debug message', () => {
            logger.debug('Hello debug dude!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                // Would be exactly 26 characters (including linebreak), so will split
                '[DEBUG] Hello debug d...\n'
                    +'>>>ude!\n'
            );
        });

    }

    function unhappyDebugTests () {
        it('cannot write debug log message', () => {
            logger.debug('Hello debug doh!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).not.toContain('Hello');
        });
    }

    function happyInfoTests () {

        it('logs short info message', () => {
            logger.info('Hello debug dude!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                '[INFO] Hello debug dude!\n' // Exactly 25 characters (including linebreak)
            );
        });

        it('logs long info message', () => {
            logger.info('Hello, debug dude!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                // Would be exactly 26 characters (including linebreak), so will split
                '[INFO] Hello, debug d...\n'
                    +'>>>ude!\n'
            );
        });

    }

    function unhappyInfoTests () {
        it('cannot write info log message', () => {
            logger.info('Hello debug doh!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).not.toContain('Hello');
        });
    }

    function happyWarnTests () {

        it('logs short warn message', () => {
            logger.warn('Hello debug dude!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                '[WARN] Hello debug dude!\n' // Exactly 25 characters (including linebreak)
            );
        });

        it('logs long warn message', () => {
            logger.warn('Hello, debug dude!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                // Would be exactly 26 characters (including linebreak), so will split
                '[WARN] Hello, debug d...\n'
                    +'>>>ude!\n'
            );
        });

    }

    function unhappyWarnTests () {
        it('cannot write warn log message', () => {
            logger.warn('Hello debug doh!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).not.toContain('Hello');
        });
    }

    function happyErrorTests () {

        it('logs short error message', () => {
            logger.error('Hello debug doh!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                '[ERROR] Hello debug doh!\n' // Exactly 25 characters (including linebreak)
            );
        });

        it('logs long error message', () => {
            logger.error('Hello, debug dude!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).toContain(
                // Would be exactly 26 characters (including linebreak), so will split
                '[ERROR] Hello, debug ...\n'
                    +'>>>dude!\n'
            );
        });

    }

    function unhappyErrorTests () {
        it('cannot write error log message', () => {
            logger.error('Hello debug doh!');
            jest.advanceTimersByTime(1100);
            expect(writtenData).not.toContain('Hello');
        });
    }

    function happyGetDebugLevelTest () {
        it('gets log level as DEBUG', () => {
            expect(logger.getLogLevel()).toBe(LogLevel.DEBUG);
        });
    }

    function happyGetInfoLevelTest () {
        it('gets log level as INFO', () => {
            expect(logger.getLogLevel()).toBe(LogLevel.INFO);
        });
    }

    function happyGetWarnLevelTest () {
        it('gets log level as WARN', () => {
            expect(logger.getLogLevel()).toBe(LogLevel.WARN);
        });
    }

    function happyGetErrorLevelTest () {
        it('gets log level as ERROR', () => {
            expect(logger.getLogLevel()).toBe(LogLevel.ERROR);
        });
    }

    function happyGetNoneLevelTest () {
        it('gets log level as NONE', () => {
            expect(logger.getLogLevel()).toBe(LogLevel.NONE);
        });
    }

    function happySetDebugLevelTest () {
        it('can set the log level as DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            expect(logger.getLogLevel()).toBe(LogLevel.DEBUG);
        });
    }

    function happySetInfoLevelTest () {
        it('can set the log level as INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            expect(logger.getLogLevel()).toBe(LogLevel.INFO);
        });
    }

    function happySetWarnLevelTest () {
        it('can set the log level as WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            expect(logger.getLogLevel()).toBe(LogLevel.WARN);
        });
    }

    function happySetErrorLevelTest () {
        it('can set the log level as ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            expect(logger.getLogLevel()).toBe(LogLevel.ERROR);
        });
    }

    function happySetNoneLevelTest () {
        it('can set the log level as NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            expect(logger.getLogLevel()).toBe(LogLevel.NONE);
        });
    }

    function happySetLogLevelTests () {
        happySetDebugLevelTest();
        happySetInfoLevelTest();
        happySetWarnLevelTest();
        happySetErrorLevelTest();
        happySetNoneLevelTest();
    }

    describe('log level is DEBUG', () => {
        describe('#getLogLevel', happyGetDebugLevelTest);
        describe('#setLogLevel', happySetLogLevelTests);
        describe('#debug', happyDebugTests);
        describe('#info', happyInfoTests);
        describe('#warn', happyWarnTests);
        describe('#error', happyErrorTests);
    });

    describe('log level is INFO', () => {
        beforeEach(setLogLevelInfo);
        describe('#getLogLevel', happyGetInfoLevelTest);
        describe('#setLogLevel', happySetLogLevelTests);
        describe('#debug', unhappyDebugTests);
        describe('#info', happyInfoTests);
        describe('#warn', happyWarnTests);
        describe('#error', happyErrorTests);
    });

    describe('log level is WARN', () => {
        beforeEach(setLogLevelWarn);
        describe('#getLogLevel', happyGetWarnLevelTest);
        describe('#setLogLevel', happySetLogLevelTests);
        describe('#debug', unhappyDebugTests);
        describe('#info', unhappyInfoTests);
        describe('#warn', happyWarnTests);
        describe('#error', happyErrorTests);
    });

    describe('log level is ERROR', () => {
        beforeEach(setLogLevelError);
        describe('#getLogLevel', happyGetErrorLevelTest);
        describe('#setLogLevel', happySetLogLevelTests);
        describe('#debug', unhappyDebugTests);
        describe('#info', unhappyInfoTests);
        describe('#warn', unhappyWarnTests);
        describe('#error', happyErrorTests);
    });

    describe('log level is NONE', () => {
        beforeEach(setLogLevelNone);
        describe('#getLogLevel', happyGetNoneLevelTest);
        describe('#setLogLevel', happySetLogLevelTests);
        describe('#debug', unhappyDebugTests);
        describe('#info', unhappyInfoTests);
        describe('#warn', unhappyWarnTests);
        describe('#error', unhappyErrorTests);
    });

});

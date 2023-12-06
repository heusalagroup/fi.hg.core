// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { ConsoleLogger } from "./ConsoleLogger";
import { LogLevel } from "../../types/LogLevel";
import { Logger } from "../../types/Logger";

describe('ConsoleLogger', () => {

    let spyDebug : any;
    let spyInfo : any;
    let spyWarn : any;
    let spyError : any;
    let logger : Logger;

    beforeEach( () => {
        spyDebug = jest.spyOn(console, 'debug').mockImplementation( () => {} );
        spyInfo = jest.spyOn(console, 'info').mockImplementation( () => {} );
        spyWarn = jest.spyOn(console, 'warn').mockImplementation( () => {} );
        spyError = jest.spyOn(console, 'error').mockImplementation( () => {} );
        logger = new ConsoleLogger(LogLevel.DEBUG);
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
            expect(console.debug).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.debug('test message');
            expect(console.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.debug('test message');
            expect(console.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.debug('test message');
            expect(console.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.debug('test message');
            expect(console.debug).not.toHaveBeenCalled();
        });

    });

    describe('#info', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.info('test message');
            expect(console.info).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.info('test message');
            expect(console.info).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.info('test message');
            expect(console.info).not.toHaveBeenCalled();
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.info('test message');
            expect(console.info).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.info('test message');
            expect(console.info).not.toHaveBeenCalled();
        });

    });

    describe('#warn', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.warn('test message');
            expect(console.warn).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.warn('test message');
            expect(console.warn).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.warn('test message');
            expect(console.warn).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.warn('test message');
            expect(console.warn).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.warn('test message');
            expect(console.warn).not.toHaveBeenCalled();
        });

    });

    describe('#error', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.error('test message');
            expect(console.error).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.error('test message');
            expect(console.error).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.error('test message');
            expect(console.error).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.error('test message');
            expect(console.error).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.error('test message');
            expect(console.error).not.toHaveBeenCalled();
        });

    });

});

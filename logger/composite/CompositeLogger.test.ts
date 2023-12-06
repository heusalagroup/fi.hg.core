// Copyright (c) 2023. Heusala Group Oy <info@hg.fi>. All rights reserved.

import { CompositeLogger } from "./CompositeLogger";
import { LogLevel } from "../../types/LogLevel";
import { Logger } from "../../types/Logger";
import { MockLogger } from "../mock/MockLogger";

describe('CompositeLogger', () => {

    let mockLogger1 : Logger;
    let mockLogger2 : Logger;
    let spyDebug1 : any;
    let spyDebug2 : any;
    let spyInfo1 : any;
    let spyInfo2 : any;
    let spyWarn1 : any;
    let spyWarn2 : any;
    let spyError1 : any;
    let spyError2 : any;
    let logger : Logger;

    beforeEach( () => {
        mockLogger1 = new MockLogger();
        mockLogger2 = new MockLogger();
        spyDebug1 = jest.spyOn(mockLogger1, 'debug').mockImplementation( () => {} );
        spyInfo1 = jest.spyOn(mockLogger1, 'info').mockImplementation( () => {} );
        spyWarn1 = jest.spyOn(mockLogger1, 'warn').mockImplementation( () => {} );
        spyError1 = jest.spyOn(mockLogger1, 'error').mockImplementation( () => {} );
        spyDebug2 = jest.spyOn(mockLogger2, 'debug').mockImplementation( () => {} );
        spyInfo2 = jest.spyOn(mockLogger2, 'info').mockImplementation( () => {} );
        spyWarn2 = jest.spyOn(mockLogger2, 'warn').mockImplementation( () => {} );
        spyError2 = jest.spyOn(mockLogger2, 'error').mockImplementation( () => {} );
        logger = new CompositeLogger(
            [
                mockLogger1,
                mockLogger2
            ],
            LogLevel.DEBUG
        );
    });

    afterEach( () => {
        spyDebug1.mockRestore();
        spyInfo1.mockRestore();
        spyWarn1.mockRestore();
        spyError1.mockRestore();
        spyDebug2.mockRestore();
        spyInfo2.mockRestore();
        spyWarn2.mockRestore();
        spyError2.mockRestore();
        logger.setLogLevel(LogLevel.DEBUG);
    });

    describe('#debug', () => {

        it('logs messages with log level DEBUG', () => {
            logger.debug('test message');
            expect(mockLogger1.debug).toHaveBeenCalledWith('test message');
            expect(mockLogger2.debug).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.debug('test message');
            expect(mockLogger1.debug).not.toHaveBeenCalled();
            expect(mockLogger2.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.debug('test message');
            expect(mockLogger1.debug).not.toHaveBeenCalled();
            expect(mockLogger2.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.debug('test message');
            expect(mockLogger1.debug).not.toHaveBeenCalled();
            expect(mockLogger2.debug).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.debug('test message');
            expect(mockLogger1.debug).not.toHaveBeenCalled();
            expect(mockLogger2.debug).not.toHaveBeenCalled();
        });

    });

    describe('#info', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.info('test message');
            expect(mockLogger1.info).toHaveBeenCalledWith('test message');
            expect(mockLogger2.info).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.info('test message');
            expect(mockLogger1.info).toHaveBeenCalledWith('test message');
            expect(mockLogger2.info).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.info('test message');
            expect(mockLogger1.info).not.toHaveBeenCalled();
            expect(mockLogger2.info).not.toHaveBeenCalled();
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.info('test message');
            expect(mockLogger1.info).not.toHaveBeenCalled();
            expect(mockLogger2.info).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.info('test message');
            expect(mockLogger1.info).not.toHaveBeenCalled();
            expect(mockLogger2.info).not.toHaveBeenCalled();
        });

    });

    describe('#warn', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.warn('test message');
            expect(mockLogger1.warn).toHaveBeenCalledWith('test message');
            expect(mockLogger2.warn).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.warn('test message');
            expect(mockLogger1.warn).toHaveBeenCalledWith('test message');
            expect(mockLogger2.warn).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.warn('test message');
            expect(mockLogger1.warn).toHaveBeenCalledWith('test message');
            expect(mockLogger2.warn).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.warn('test message');
            expect(mockLogger1.warn).not.toHaveBeenCalled();
            expect(mockLogger2.warn).not.toHaveBeenCalled();
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.warn('test message');
            expect(mockLogger1.warn).not.toHaveBeenCalled();
            expect(mockLogger2.warn).not.toHaveBeenCalled();
        });

    });

    describe('#error', () => {

        it('logs messages with log level DEBUG', () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.error('test message');
            expect(mockLogger1.error).toHaveBeenCalledWith('test message');
            expect(mockLogger2.error).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level INFO', () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.error('test message');
            expect(mockLogger1.error).toHaveBeenCalledWith('test message');
            expect(mockLogger2.error).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level WARN', () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.error('test message');
            expect(mockLogger1.error).toHaveBeenCalledWith('test message');
            expect(mockLogger2.error).toHaveBeenCalledWith('test message');
        });

        it('logs messages with log level ERROR', () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.error('test message');
            expect(mockLogger1.error).toHaveBeenCalledWith('test message');
            expect(mockLogger2.error).toHaveBeenCalledWith('test message');
        });

        it('does not log messages with log level NONE', () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.error('test message');
            expect(mockLogger1.error).not.toHaveBeenCalled();
            expect(mockLogger2.error).not.toHaveBeenCalled();
        });

    });

});

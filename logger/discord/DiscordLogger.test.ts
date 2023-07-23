// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../../types/LogLevel";
import { DiscordLogger } from "./DiscordLogger";
import { MockRequestClientAdapter } from "../../requestClient/mock/MockRequestClientAdapter";
import { Logger } from "../../types/Logger";
import { RequestClientImpl } from "../../RequestClientImpl";
import { RequestClientAdapter } from "../../requestClient/RequestClientAdapter";
import { RequestMethod } from "../../request/types/RequestMethod";
import { HttpService } from "../../HttpService";

const TEST_NAME = 'test';
const TEST_DISCORD_URL = 'https://discord.com/api/webhooks/1234567890/ABCDEFG';

describe('DiscordLogger', () => {

    jest.useFakeTimers();

    let logger : Logger;
    let prevRequestClient : RequestClientAdapter | undefined;
    let mockRequestClient : RequestClientAdapter;
    let spy : any;

    beforeEach(() => {
        HttpService.setLogLevel(LogLevel.NONE);
        mockRequestClient = new MockRequestClientAdapter();
        prevRequestClient = RequestClientImpl.hasClient() ? RequestClientImpl.getClient() : undefined;
        RequestClientImpl.setClient(mockRequestClient);
        spy = jest.spyOn(mockRequestClient, 'jsonRequest').mockImplementation();
        logger = new DiscordLogger(
            TEST_NAME,
            TEST_DISCORD_URL,
            LogLevel.DEBUG,
            undefined,
            2000,
            1000,
            '>>>',
            '...\n',
            '\n'
        );
    });

    afterEach( () => {
        if (prevRequestClient) {
            RequestClientImpl.setClient(prevRequestClient);
        }
        spy.mockRestore();
        logger.setLogLevel(LogLevel.DEBUG);
    });

    describe('#debug', () => {

        it('should send message with level INFO to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.debug('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [DEBUG] test message\n' }),
            );
        });

        it('should not send message with level INFO to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.debug('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.debug('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.debug('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.debug('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

    describe('#info', () => {

        it('should send message with level INFO to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.info('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [INFO] test message\n' }),
            );
        });

        it('should send message with level INFO to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.info('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [INFO] test message\n' }),
            );
        });

        it('should not send message with level INFO to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.info('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.info('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.info('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

    describe('#warn', () => {

        it('should send message with level WARN to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.warn('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [WARN] test message\n' }),
            );
        });

        it('should send message with level WARN to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.warn('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [WARN] test message\n' }),
            );
        });

        it('should send message with level WARN to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.warn('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [WARN] test message\n' }),
            );
        });

        it('should not send message with level WARN to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.warn('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level WARN to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.warn('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

    describe('#error', () => {

        it('should send message with level ERROR to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            logger.error('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message\n' }),
            );
        });

        it('should send message with level ERROR to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            logger.error('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message\n' }),
            );
        });

        it('should send message with level ERROR to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            logger.error('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message\n' }),
            );
        });

        it('should send message with level ERROR to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            logger.error('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message\n' }),
            );
        });

        it('should not send message with level ERROR to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            logger.error('test message');
            jest.advanceTimersByTime(1100);
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

});

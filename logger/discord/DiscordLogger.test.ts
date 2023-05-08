// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { LogLevel } from "../../types/LogLevel";
import { DiscordLogger } from "./DiscordLogger";
import { MockRequestClient } from "../../requestClient/mock/MockRequestClient";
import { Logger } from "../../types/Logger";
import { RequestClient } from "../../RequestClient";
import { RequestClientInterface } from "../../requestClient/RequestClientInterface";
import { RequestMethod } from "../../request/types/RequestMethod";
import { HttpService } from "../../HttpService";

const TEST_NAME = 'test';
const TEST_DISCORD_URL = 'https://discord.com/api/webhooks/1234567890/ABCDEFG';

describe('DiscordLogger', () => {

    let logger : Logger;
    let prevRequestClient : RequestClientInterface | undefined;
    let mockRequestClient : RequestClientInterface;
    let spy : any;

    beforeEach(() => {
        HttpService.setLogLevel(LogLevel.NONE);
        mockRequestClient = new MockRequestClient();
        prevRequestClient = RequestClient.hasClient() ? RequestClient.getClient() : undefined;
        RequestClient.setClient(mockRequestClient);
        spy = jest.spyOn(mockRequestClient, 'jsonRequest').mockImplementation();
        logger = new DiscordLogger(
            TEST_NAME,
            TEST_DISCORD_URL,
            LogLevel.DEBUG
        );
    });

    afterEach( () => {
        if (prevRequestClient) {
            RequestClient.setClient(prevRequestClient);
        }
        spy.mockRestore();
        logger.setLogLevel(LogLevel.DEBUG);
    });

    describe('#debug', () => {

        it('should send message with level INFO to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            await logger.debug('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [DEBUG] test message' }),
            );
        });

        it('should not send message with level INFO to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            await logger.debug('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            await logger.debug('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            await logger.debug('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            await logger.debug('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

    describe('#info', () => {

        it('should send message with level INFO to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            await logger.info('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [INFO] test message' }),
            );
        });

        it('should send message with level INFO to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            await logger.info('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [INFO] test message' }),
            );
        });

        it('should not send message with level INFO to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            await logger.info('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            await logger.info('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level INFO to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            await logger.info('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

    describe('#warn', () => {

        it('should send message with level WARN to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            await logger.warn('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [WARN] test message' }),
            );
        });

        it('should send message with level WARN to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            await logger.warn('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [WARN] test message' }),
            );
        });

        it('should send message with level WARN to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            await logger.warn('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [WARN] test message' }),
            );
        });

        it('should not send message with level WARN to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            await logger.warn('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

        it('should not send message with level WARN to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            await logger.warn('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

    describe('#error', () => {

        it('should send message with level ERROR to Discord when log level is DEBUG', async () => {
            logger.setLogLevel(LogLevel.DEBUG);
            await logger.error('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message' }),
            );
        });

        it('should send message with level ERROR to Discord when log level is INFO', async () => {
            logger.setLogLevel(LogLevel.INFO);
            await logger.error('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message' }),
            );
        });

        it('should send message with level ERROR to Discord when log level is WARN', async () => {
            logger.setLogLevel(LogLevel.WARN);
            await logger.error('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message' }),
            );
        });

        it('should send message with level ERROR to Discord when log level is ERROR', async () => {
            logger.setLogLevel(LogLevel.ERROR);
            await logger.error('test message');
            expect(mockRequestClient.jsonRequest).toHaveBeenCalledWith(
                RequestMethod.POST,
                TEST_DISCORD_URL,
                undefined, // e.g. headers
                expect.objectContaining({ content: '[test] [ERROR] test message' }),
            );
        });

        it('should not send message with level ERROR to Discord when log level is NONE', async () => {
            logger.setLogLevel(LogLevel.NONE);
            await logger.error('test message');
            expect(mockRequestClient.jsonRequest).not.toHaveBeenCalled();
        });

    });

});

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

// NOTE!
//
// This test calls the real OpenAI API if the `OPENAI_API_KEY` is provided.
//

import { HttpOpenAiClient } from './HttpOpenAiClient';
import { HgNode } from "../../node/HgNode";
import { LogLevel } from "../types/LogLevel";
import { RequestClient } from "../RequestClient";
import { HttpService } from "../HttpService";

const OPENAI_API_KEY  = process?.env?.OPENAI_API_KEY  ?? '';
const OPENAI_BASE_URL = process?.env?.OPENAI_BASE_URL ?? 'https://api.openai.com';

RequestClient.setLogLevel(LogLevel.NONE);
HttpService.setLogLevel(LogLevel.NONE);

(OPENAI_API_KEY ? describe : describe.skip)('system', () => {

    beforeAll( () => {
        HgNode.initialize();
    });

    describe('HttpOpenAiClient', () => {

        let client: HttpOpenAiClient;
        let prevDefaultUrl: string;

        beforeEach(() => {
            prevDefaultUrl = HttpOpenAiClient.getDefaultUrl();
            client = HttpOpenAiClient.create(OPENAI_API_KEY, OPENAI_BASE_URL);
        });

        afterEach(() => {
            HttpOpenAiClient.setDefaultUrl(prevDefaultUrl);
        });

        describe('create', () => {

            it('method should return a new instance of OpenAiClient', () => {
                expect(client).toBeInstanceOf(HttpOpenAiClient);
            });

        });

        describe('getUrl', () => {

            it('returns the correct URL', () => {
                expect(client.getUrl()).toBe('https://api.openai.com');
            });

        });

        describe('setDefaultUrl', () => {
            it('should set the default URL for the OpenAI API', () => {
                const newDefaultUrl = 'https://new-api.openai.com';
                HttpOpenAiClient.setDefaultUrl(newDefaultUrl);
                expect(HttpOpenAiClient.getDefaultUrl()).toBe(newDefaultUrl);
            });
        });

        describe('getCompletion', () => {

            it('returns a promise that resolves to a valid response', async () => {
                const response = await client.getCompletion('Hello, world!');
                // console.log(`response: `, response);
                expect(response).toBeDefined();
                expect(response).toHaveProperty('choices');
                expect(response.choices).toBeInstanceOf(Array);
            });

        });

    });

});

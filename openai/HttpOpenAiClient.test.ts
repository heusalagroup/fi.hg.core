// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OPENAI_API_POST_COMPLETIONS_PATH, HttpOpenAiClient } from './HttpOpenAiClient';
import { OpenAiApiModel } from "./types/OpenAiApiModel";
import { HttpService } from "../HttpService";
import { createOpenAiCompletionResponseDTO } from "./dto/OpenAiCompletionResponseDTO";
import { createOpenAiCompletionResponseChoice } from "./dto/OpenAiCompletionResponseChoice";
import { ReadonlyJsonAny } from "../Json";
import { createOpenAiCompletionResponseUsage } from "./dto/OpenAiCompletionResponseUsage";

describe('HttpOpenAiClient', () => {

    const apiKey = '1234';
    const baseUrl = 'https://api.openai.com';
    let client: HttpOpenAiClient;
    let prevDefaultUrl: string;
    let postJsonSpy: jest.SpyInstance;

    beforeAll(() => {
        postJsonSpy = jest.spyOn(HttpService, 'postJson').mockResolvedValue(
            createOpenAiCompletionResponseDTO(
                "response-id",
                "text",
                12345678,
                OpenAiApiModel.DAVINCI,
                [
                    createOpenAiCompletionResponseChoice('hello world', 0, null, 'length')
                ],
                createOpenAiCompletionResponseUsage(
                    1,
                    2,
                    3
                )
            ) as unknown as ReadonlyJsonAny
        );
    });

    afterAll(() => {
        postJsonSpy.mockRestore();
    });

    beforeEach(() => {
        prevDefaultUrl = HttpOpenAiClient.getDefaultUrl();
        client = HttpOpenAiClient.create(apiKey, baseUrl);
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

            const response = await client.getCompletion("What's the weather like today?");

            expect(postJsonSpy).toHaveBeenCalledWith(
                `${baseUrl}${OPENAI_API_POST_COMPLETIONS_PATH}`,
                {
                    "frequency_penalty": 0,
                    "max_tokens": 4000,
                    "model": "text-davinci-003",
                    "presence_penalty": 0,
                    "prompt": "What's the weather like today?",
                    "temperature": 0.5,
                    "top_p": 1,
                },
                {
                    "Authorization": "Bearer "+apiKey
                }
            );
            expect(response).toBeDefined();
            expect(response).toHaveProperty('choices');
            expect(response.choices).toBeInstanceOf(Array);
        });
    });

});

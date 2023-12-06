// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { jest } from "@jest/globals";
import { HttpOpenAiClient, OPENAI_API_POST_COMPLETIONS_PATH, OPENAI_API_POST_EDITS_PATH } from './HttpOpenAiClient';
import { OpenAiModel } from "./types/OpenAiModel";
import { HttpService } from "../HttpService";
import { createOpenAiCompletionResponseDTO } from "./dto/OpenAiCompletionResponseDTO";
import { createOpenAiCompletionResponseChoice } from "./dto/OpenAiCompletionResponseChoice";
import { ReadonlyJsonAny } from "../Json";
import { createOpenAiCompletionResponseUsage } from "./dto/OpenAiCompletionResponseUsage";
import { createOpenAiEditRequestDTO } from "./dto/OpenAiEditRequestDTO";
import { LogLevel } from "../types/LogLevel";

describe('HttpOpenAiClient', () => {

    const apiKey = '1234';
    const baseUrl = 'https://api.openai.com';
    let client: HttpOpenAiClient;
    let prevDefaultUrl: string;
    let postJsonSpy: jest.SpiedFunction<(...args: any) => any>;

    beforeAll(() => {

        HttpOpenAiClient.setLogLevel(LogLevel.NONE);

        postJsonSpy = jest.spyOn(HttpService, 'postJson').mockResolvedValue(
            createOpenAiCompletionResponseDTO(
                "response-id",
                "text",
                12345678,
                OpenAiModel.DAVINCI,
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
        postJsonSpy.mockClear();
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
                    "model": "text-davinci-003",
                    "prompt": "What's the weather like today?"
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

    describe("getEdit", () => {
        it("should make a request to the OpenAI API's text edit endpoint and return the response", async () => {
            // Set up test data
            const input = "This is some text.";
            const instruction = "Change 'some' to 'an'.";
            const model: OpenAiModel = OpenAiModel.DAVINCI;
            const n = 1;
            const temperature = 0.5;
            const topP = 1;

            // Mock the response from the OpenAI API
            const mockResponse: ReadonlyJsonAny = {
                "object": "edit",
                "created": 1589478378,
                "choices": [
                    {
                        "text": "What day of the week is it?",
                        "index": 0,
                    }
                ],
                "usage": {
                    "prompt_tokens": 25,
                    "completion_tokens": 32,
                    "total_tokens": 57
                }
            };

            // Set up the mock for HttpService.post
            jest.spyOn(HttpService, "postJson").mockImplementation(
                (_url: string, _body?: ReadonlyJsonAny | undefined, _headers?: ReadonlyJsonAny | undefined) : Promise<ReadonlyJsonAny|undefined> => {
                    return Promise.resolve(mockResponse);
                }
            );

            // Call the getEdit method
            const response = await client.getEdit(instruction, input, model, n, temperature, topP);

            // Verify that the response is correct
            expect(response).toEqual(mockResponse);

            // Verify that HttpService.post was called with the correct arguments
            expect(HttpService.postJson).toHaveBeenCalledWith(
                `${client.getUrl()}${OPENAI_API_POST_EDITS_PATH}`,
                createOpenAiEditRequestDTO(
                     instruction,
                     input,
                     model,
                     n,
                     temperature,
                     topP
                ),
                {
                    "Authorization": `Bearer ${apiKey}`
                }
            );
        });
    });


});

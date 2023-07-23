// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

// NOTE!
//
// These tests calls the real OpenAI API if the `OPENAI_API_KEY` is provided.
//
// Make sure your system testing environment runs `HgNode.initialize()`
//

import { HttpOpenAiClient } from './HttpOpenAiClient';
import { LogLevel } from "../types/LogLevel";
import { RequestClientImpl } from "../RequestClientImpl";
import { HttpService } from "../HttpService";
import { OpenAiModel } from "./types/OpenAiModel";
import { isNumber } from "../types/Number";
import { isArray } from "../types/Array";

const OPENAI_API_KEY  = process?.env?.OPENAI_API_KEY  ?? '';
const OPENAI_BASE_URL = process?.env?.OPENAI_BASE_URL ?? 'https://api.openai.com';

RequestClientImpl.setLogLevel(LogLevel.NONE);
HttpService.setLogLevel(LogLevel.NONE);

(OPENAI_API_KEY ? describe : describe.skip)('system', () => {

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

        describe("getEdit", () => {
            it("should make a request to the OpenAI API's text edit endpoint and return the response", async () => {

                // Set up test data
                const input = "What day of the wek is it?";
                const instruction = "Fix the spelling mistakes";
                const model: OpenAiModel = OpenAiModel.DAVINCI_EDIT_TEXT;

                // Call the getEdit method
                const response = await client.getEdit(instruction, input, model);

                // console.log(`response = ${JSON.stringify(response)}`);

                /**
                 * {
                 *   "object": "edit",
                 *   "created": 1589478378,
                 *   "choices": [
                 *     {
                 *       "text": "What day of the week is it?",
                 *       "index": 0,
                 *     }
                 *   ],
                 *   "usage": {
                 *     "prompt_tokens": 25,
                 *     "completion_tokens": 32,
                 *     "total_tokens": 57
                 *   }
                 * }
                 */

                // Verify that the response is correct
                expect(response?.object).toStrictEqual("edit");
                expect(isNumber( response?.created )).toBe(true);
                expect(isArray(response?.choices)).toBe(true);
                expect((response?.choices[0] as any)?.text).toMatch(/What day of the week is it?/);
                expect(isNumber(response?.usage?.prompt_tokens)).toBe(true);
                expect(isNumber(response?.usage?.completion_tokens)).toBe(true);
                expect(isNumber(response?.usage?.total_tokens)).toBe(true);

            });
        });

    });

});

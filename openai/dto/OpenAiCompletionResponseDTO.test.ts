// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createOpenAiCompletionResponseItemDTO } from "./OpenAiCompletionResponseItemDTO";
import { createOpenAiCompletionResponseDTO, isOpenAiCompletionResponseDTO } from "./OpenAiCompletionResponseDTO";
import { OpenAiApiModel } from "../types/OpenAiApiModel";

describe("OpenAiCompletionResponseDTO", () => {

    describe('createOpenAiCompletionResponseDTO', () => {
        it('creates a valid OpenAiCompletionResponseDTO object', () => {
            const id = 'abc123';
            const model = OpenAiApiModel.DAVINCI;
            const prompt = 'What is the weather today?';
            const completions = ['It is raining.', 'It is sunny.'];
            const tokens = ['It', 'is', 'raining', '.'];
            const scores = [0.7, 0.6, 0.9, 0.8];
            const responses = [
                createOpenAiCompletionResponseItemDTO('It', 0.7, ['It']),
                createOpenAiCompletionResponseItemDTO('is', 0.6, ['is']),
                createOpenAiCompletionResponseItemDTO('raining', 0.9, ['raining']),
                createOpenAiCompletionResponseItemDTO('.', 0.8, ['.'])
            ];

            const result = createOpenAiCompletionResponseDTO(id, model, prompt, completions, tokens, scores, responses);

            expect(result).toEqual({
                                       id,
                                       model,
                                       prompt,
                                       completions,
                                       tokens,
                                       scores,
                                       responses
                                   });
        });
    });

    describe("isOpenAiCompletionResponseDTO", () => {

        it("returns true for valid OpenAiCompletionResponseDTO objects", () => {
            const validOpenAiCompletionResponseDTO = createOpenAiCompletionResponseDTO(
                "response-id",
                OpenAiApiModel.DAVINCI_002,
                "What's the weather like today?",
                ["It's raining today"],
                ["It's raining today"],
                [1.0],
                [createOpenAiCompletionResponseItemDTO("It's raining today", 1.0, ["It's raining today"])]
            );
            expect(isOpenAiCompletionResponseDTO(validOpenAiCompletionResponseDTO)).toBe(true);
        });

        it("returns false for objects with missing properties", () => {
            const incompleteOpenAiCompletionResponseDTO = {
                id: "response-id",
                model: "text-davinci-002",
                prompt: "What's the weather like today?",
                completions: ["It's raining today"],
                tokens: ["It's raining today"]
            };
            expect(isOpenAiCompletionResponseDTO(incompleteOpenAiCompletionResponseDTO)).toBe(false);
        });

        it("returns false for a value with an extra key", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: "some-id",
                                                     model: "davinci",
                                                     prompt: "What is the meaning of life?",
                                                     completions: ["The meaning of life is 42"],
                                                     tokens: ["The", "meaning", "of", "life", "is", "42"],
                                                     scores: [1],
                                                     responses: [{
                                                         text: "The meaning of life is 42",
                                                         score: 1,
                                                         choices: ["The", "meaning", "of", "life", "is", "42"]
                                                     }],
                                                     extraKey: "this should not be here"
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-string id property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: 123,
                                                     model: OpenAiApiModel.DAVINCI,
                                                     prompt: "Hello world",
                                                     completions: ["Hello", "world"],
                                                     tokens: ["Hello", "world"],
                                                     scores: [1, 1],
                                                     responses: []
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-OpenAiApiModel model property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: "some-id",
                                                     model: "not-a-model",
                                                     prompt: "some prompt",
                                                     completions: ["completion 1", "completion 2"],
                                                     tokens: ["token 1", "token 2"],
                                                     scores: [0.5, 0.7],
                                                     responses: [
                                                         createOpenAiCompletionResponseItemDTO("response 1", 0.5, ["choice 1", "choice 2"]),
                                                         createOpenAiCompletionResponseItemDTO("response 2", 0.7, ["choice 3", "choice 4"])
                                                     ]
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-string prompt property", () => {
            const value = {
                id: "some-id",
                model: "text-davinci-002",
                prompt: 123,
                completions: ["some", "completions"],
                tokens: ["some", "tokens"],
                scores: [0.9, 0.8, 0.7],
                responses: [
                    {
                        text: "some text",
                        score: 0.9,
                        choices: ["some", "choices"],
                    },
                ],
            };
            expect(isOpenAiCompletionResponseDTO(value)).toBe(false);
        });

        it("returns false for a value with a non-string array completions property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: "some-id",
                                                     model: "model-name",
                                                     prompt: "some prompt",
                                                     completions: [1, 2, 3],
                                                     tokens: ["some", "tokens"],
                                                     scores: [0.5, 0.6, 0.7],
                                                     responses: [{
                                                         text: "some text",
                                                         score: 0.8,
                                                         choices: ["choice1", "choice2"]
                                                     }]
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-string array tokens property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: "abc",
                                                     model: OpenAiApiModel.DAVINCI_002,
                                                     prompt: "This is a prompt",
                                                     completions: ["completion1", "completion2"],
                                                     tokens: [1, 2],
                                                     scores: [0.5, 0.7],
                                                     responses: [
                                                         {
                                                             text: "This is the text",
                                                             score: 0.6,
                                                             choices: ["choice1", "choice2"]
                                                         }
                                                     ]
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-number array scores property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: "123",
                                                     model: OpenAiApiModel.DAVINCI,
                                                     prompt: "This is a prompt",
                                                     completions: ["completion1", "completion2"],
                                                     tokens: ["token1", "token2"],
                                                     scores: ["not a number", 123],
                                                     responses: [{
                                                         text: "This is a response",
                                                         score: 0.5,
                                                         choices: ["choice1", "choice2"]
                                                     }]
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-OpenAiCompletionResponseItemDTO array responses property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: 'id',
                                                     model: 'model',
                                                     prompt: 'prompt',
                                                     completions: ['completion1', 'completion2'],
                                                     tokens: ['token1', 'token2'],
                                                     scores: [0.5, 0.7],
                                                     responses: [{ text: 'text1', score: 0.5, choices: ['choice1', 'choice2'] }, { text: 'text2' }]
                                                 })).toBe(false);
        });

        it("returns false for a non-object value", () => {
            expect(isOpenAiCompletionResponseDTO(null)).toBe(false);
            expect(isOpenAiCompletionResponseDTO(undefined)).toBe(false);
            expect(isOpenAiCompletionResponseDTO(true)).toBe(false);
            expect(isOpenAiCompletionResponseDTO(false)).toBe(false);
            expect(isOpenAiCompletionResponseDTO(123)).toBe(false);
            expect(isOpenAiCompletionResponseDTO("abc")).toBe(false);
        });

    });

    describe("explainOpenAiCompletionResponseDTO", () => {
        xit("", () => {});
    });

    describe("stringifyOpenAiCompletionResponseDTO", () => {
        xit("", () => {});
    });

    describe("parseOpenAiCompletionResponseDTO", () => {
        xit("", () => {});
    });

});

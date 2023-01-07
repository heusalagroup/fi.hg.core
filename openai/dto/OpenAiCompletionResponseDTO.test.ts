// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createOpenAiCompletionResponseChoice } from "./OpenAiCompletionResponseChoice";
import { createOpenAiCompletionResponseDTO, isOpenAiCompletionResponseDTO } from "./OpenAiCompletionResponseDTO";
import { OpenAiModel } from "../types/OpenAiModel";
import { createOpenAiCompletionResponseUsage } from "./OpenAiCompletionResponseUsage";

describe("OpenAiCompletionResponseDTO", () => {

    describe('createOpenAiCompletionResponseDTO', () => {
        it('creates a valid OpenAiCompletionResponseDTO object', () => {
            const id = 'abc123';
            const object = 'text_completion';
            const created = 1589478378;
            const model = OpenAiModel.DAVINCI;
            const choices = [
                createOpenAiCompletionResponseChoice('It', 0, null, 'length'),
                createOpenAiCompletionResponseChoice('is', 1, null, 'length'),
                createOpenAiCompletionResponseChoice('raining', 2, null, 'length'),
                createOpenAiCompletionResponseChoice('.', 3, null, 'length')
            ];
            const usage = createOpenAiCompletionResponseUsage(
                1,
                2,
                3
            );

            const result = createOpenAiCompletionResponseDTO(
                id,
                object,
                created,
                model,
                choices,
                usage
            );

            expect(result).toEqual({
                                       id,
                                       object,
                                       created,
                                       model,
                                       choices,
                                       usage
                                   });
        });
    });

    describe("isOpenAiCompletionResponseDTO", () => {

        it("returns true for valid OpenAiCompletionResponseDTO objects", () => {
            const validOpenAiCompletionResponseDTO = createOpenAiCompletionResponseDTO(
                "response-id",
                "text_completion",
                1589478378,
                OpenAiModel.DAVINCI,
                [
                    createOpenAiCompletionResponseChoice("It's raining today", 0, null, 'length')
                ],
                createOpenAiCompletionResponseUsage(
                    1,
                    2,
                    3
                ),
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
            expect(isOpenAiCompletionResponseDTO(
                {
                    id: "some-id",
                    object: "some-id",
                    created: 1234,
                    model: "davinci",
                    choices: [ {
                        text: "The meaning of life is 42",
                        index: 0,
                        logprobs: null,
                        finish_reason: 'length'
                    } ],
                    usage: createOpenAiCompletionResponseUsage(
                        1,
                        2,
                        3
                    ),
                    extraKey: "this should not be here"
                }
            )).toBe(false);
        });

        it("returns false for a value with a non-string id property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: 123,
                                                     object: "some-id",
                                                     created: 1234,
                                                     model: "davinci",
                                                     choices: [ {
                                                         text: "The meaning of life is 42",
                                                         index: 0,
                                                         logprobs: null,
                                                         finish_reason: 'length'
                                                     } ],
                                                     usage: createOpenAiCompletionResponseUsage(
                                                         1,
                                                         2,
                                                         3
                                                     )
                                                 })).toBe(false);
        });

        it("returns false for a value with a non-OpenAiApiModel model property", () => {
            expect(isOpenAiCompletionResponseDTO(
                {
                    id: "some-id",
                    created: 1589478378,
                    model: "not-a-model",
                    choices: [
                        createOpenAiCompletionResponseChoice("response 1", 0, null, 'length'),
                        createOpenAiCompletionResponseChoice("response 2", 1, null, 'length')
                    ],
                    usage: createOpenAiCompletionResponseUsage(
                        1,
                        2,
                        3
                    ),
                }
            )).toBe(false);
        });

        it("returns false for a value with a non-OpenAiCompletionResponseChoice array choices property", () => {
            expect(isOpenAiCompletionResponseDTO({
                                                     id: 'id',
                                                     object: "some-id",
                                                     created: 1234,
                                                     model: "davinci",
                                                     choices: [
                                                         { text: 'text1', score: 0.5, choices: ['choice1', 'choice2'] },
                                                         { text: 'text2' }
                                                     ],
                                                     usage: createOpenAiCompletionResponseUsage(
                                                         1,
                                                         2,
                                                         3
                                                     )
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

});

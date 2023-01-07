// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createOpenAiEditResponseChoice } from "./OpenAiEditResponseChoice";
import { createOpenAiEditResponseDTO, isOpenAiEditResponseDTO } from "./OpenAiEditResponseDTO";
import { createOpenAiEditResponseUsage } from "./OpenAiEditResponseUsage";

describe("OpenAiEditResponseDTO", () => {

    describe('createOpenAiEditResponseDTO', () => {
        it('creates a valid OpenAiEditResponseDTO object', () => {
            const object = 'text_completion';
            const created = 1589478378;
            const choices = [
                createOpenAiEditResponseChoice('It', 0, null, 'length'),
                createOpenAiEditResponseChoice('is', 1, null, 'length'),
                createOpenAiEditResponseChoice('raining', 2, null, 'length'),
                createOpenAiEditResponseChoice('.', 3, null, 'length')
            ];
            const usage = createOpenAiEditResponseUsage(
                1,
                2,
                3
            );

            const result = createOpenAiEditResponseDTO(
                object,
                created,
                choices,
                usage
            );

            expect(result).toStrictEqual(
                {
                    object,
                    created,
                    choices,
                    usage
                }
            );
        });
    });

    describe("isOpenAiEditResponseDTO", () => {

        it("returns true for valid OpenAiEditResponseDTO objects", () => {
            const validOpenAiEditResponseDTO = createOpenAiEditResponseDTO(
                "text_completion",
                1589478378,
                [
                    createOpenAiEditResponseChoice("It's raining today", 0, null, 'length')
                ],
                createOpenAiEditResponseUsage(
                    1,
                    2,
                    3
                ),
            );
            expect(isOpenAiEditResponseDTO(validOpenAiEditResponseDTO)).toBe(true);
        });

        it("returns false for objects with missing properties", () => {
            const incompleteOpenAiEditResponseDTO = {
                n: 1
            };
            expect(isOpenAiEditResponseDTO(incompleteOpenAiEditResponseDTO)).toBe(false);
        });

        it("returns false for a value with an extra key", () => {
            expect(isOpenAiEditResponseDTO(
                {
                    object: "some-id",
                    created: 1234,
                    choices: [ {
                        text: "The meaning of life is 42",
                        index: 0,
                        logprobs: null,
                        finish_reason: 'length'
                    } ],
                    usage: createOpenAiEditResponseUsage(
                        1,
                        2,
                        3
                    ),
                    extraKey: "this should not be here"
                }
            )).toBe(false);
        });

        it("returns false for a value with a non-OpenAiEditResponseChoice array choices property", () => {
            expect(isOpenAiEditResponseDTO({
                                                     object: "some-id",
                                                     created: 1234,
                                                     choices: [
                                                         { text: 'text1', score: 0.5, choices: ['choice1', 'choice2'] },
                                                         { text: 'text2' }
                                                     ],
                                                     usage: createOpenAiEditResponseUsage(
                                                         1,
                                                         2,
                                                         3
                                                     )
                                                 })).toBe(false);
        });

        it("returns false for a non-object value", () => {
            expect(isOpenAiEditResponseDTO(null)).toBe(false);
            expect(isOpenAiEditResponseDTO(undefined)).toBe(false);
            expect(isOpenAiEditResponseDTO(true)).toBe(false);
            expect(isOpenAiEditResponseDTO(false)).toBe(false);
            expect(isOpenAiEditResponseDTO(123)).toBe(false);
            expect(isOpenAiEditResponseDTO("abc")).toBe(false);
        });

    });

});

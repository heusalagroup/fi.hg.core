// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiCompletionRequestDTO, createOpenAiCompletionRequestDTO, isOpenAiCompletionRequestDTO, explainOpenAiCompletionRequestDTO, stringifyOpenAiCompletionRequestDTO, parseOpenAiCompletionRequestDTO } from "./OpenAiCompletionRequestDTO";
import { OpenAiModel } from "../types/OpenAiModel";

describe("OpenAiCompletionRequestDTO", () => {

    describe("createOpenAiCompletionRequestDTO", () => {

        it("creates valid OpenAiCompletionRequestDTO objects", () => {
            const request1: OpenAiCompletionRequestDTO = createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                OpenAiModel.DAVINCI,
                10,
                0.5,
                0.9,
                0.5,
                0.5
            );
            expect(request1).toEqual({
                                         prompt: "What is the weather like today?",
                                         model: OpenAiModel.DAVINCI,
                                         max_tokens: 10,
                                         temperature: 0.5,
                                         top_p: 0.9,
                                         frequency_penalty: 0.5,
                                         presence_penalty: 0.5
                                     });

            const request2: OpenAiCompletionRequestDTO = createOpenAiCompletionRequestDTO(
                "What is the capital city of France?",
                OpenAiModel.DAVINCI,
                15,
                0.7,
                0.8,
                0.6,
                0.7
            );
            expect(request2).toEqual({
                                         prompt: "What is the capital city of France?",
                                         model: OpenAiModel.DAVINCI,
                                         max_tokens: 15,
                                         temperature: 0.7,
                                         top_p: 0.8,
                                         frequency_penalty: 0.6,
                                         presence_penalty: 0.7
                                     });
        });

        it("throws an error if prompt is not a string", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                // @ts-ignore
                undefined, // this should throw an error
                OpenAiModel.DAVINCI,
                10,
                0.5,
                0.9,
                0.5,
                0.5
            )).toThrowError();

            expect(() => createOpenAiCompletionRequestDTO(
                // @ts-ignore
                123, // this should throw an error
                OpenAiModel.DAVINCI,
                10,
                0.5,
                0.9,
                0.5,
                0.5
            )).toThrowError();
        });

        it("does not throw an error if model is not a valid OpenAiApiModel", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                "invalid-model" as OpenAiModel, // this should not throw an error
                10,
                0.5,
                0.9,
                0.5,
                0.5
            )).not.toThrowError();
        });

        it("throws an error if max_tokens is not a number", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                OpenAiModel.DAVINCI,
                "10" as any, // this should throw an error
                0.5,
                0.9,
                0.5,
                0.5
            )).toThrowError();
        });

        it("throws an error if temperature is not a number", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                OpenAiModel.DAVINCI,
                10,
                "0.5" as any, // this should throw an error
                0.9,
                0.5,
                0.5
            )).toThrowError();
        });

        it("throws an error if top_p is not a number", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                OpenAiModel.DAVINCI,
                10,
                0.5,
                "0.9" as any, // this should throw an error
                0.5,
                0.5
            )).toThrowError();
        });

        it("createOpenAiCompletionRequestDTO throws an error if frequency_penalty is not a number", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                OpenAiModel.DAVINCI,
                10,
                0.5,
                0.9,
                // @ts-ignore
                "not a number",
                0.5
            )).toThrow();
        });

        it("createOpenAiCompletionRequestDTO throws an error if presence_penalty is not a number", () => {
            expect(() => createOpenAiCompletionRequestDTO(
                "What is the weather like today?",
                OpenAiModel.DAVINCI,
                10,
                0.5,
                0.9,
                0.5,
                // @ts-ignore
                "not a number"
            )).toThrow();
        });

    });

    describe("isOpenAiCompletionRequestDTO", () => {

        it("returns true for valid OpenAiCompletionRequestDTO objects", () => {
            const request1: OpenAiCompletionRequestDTO = {
                prompt: "What is the weather like today?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 10,
                temperature: 0.5,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.5
            };
            expect(isOpenAiCompletionRequestDTO(request1)).toBe(true);

            const request2: OpenAiCompletionRequestDTO = {
                prompt: "What is the capital city of France?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 15,
                temperature: 0.7,
                top_p: 0.8,
                frequency_penalty: 0.6,
                presence_penalty: 0.7
            };
            expect(isOpenAiCompletionRequestDTO(request2)).toBe(true);
        });

        it("returns false for non-object values", () => {
            expect(isOpenAiCompletionRequestDTO(null)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(undefined)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(true)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(false)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(0)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(1)).toBe(false);
            expect(isOpenAiCompletionRequestDTO("")).toBe(false);
            expect(isOpenAiCompletionRequestDTO("hello")).toBe(false);
        });

        it("returns false for invalid OpenAiCompletionRequestDTO objects", () => {
            expect(isOpenAiCompletionRequestDTO(undefined)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(null)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(false)).toBe(false);
            expect(isOpenAiCompletionRequestDTO(true)).toBe(false);
            expect(isOpenAiCompletionRequestDTO("string")).toBe(false);
            expect(isOpenAiCompletionRequestDTO(123)).toBe(false);
            expect(isOpenAiCompletionRequestDTO({})).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ prompt: 123 })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ model: 123 })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ max_tokens: "string" })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ temperature: "string" })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ top_p: "string" })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ frequency_penalty: "string" })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({ presence_penalty: "string" })).toBe(false);
        });

        it("returns false for objects with extra keys", () => {
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: "What is the weather like today?",
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 10,
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5,
                                                    extraKey: "extra value"
                                                })).toBe(false);
        });

        it("returns false for objects with non-string prompt value", () => {
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: 123,
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 10,
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5
                                                })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: null,
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 10,
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5
                                                })).toBe(false);
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: undefined,
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 10,
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5
                                                })).toBe(false);
        });

        it("returns false for objects with non-OpenAiApiModel model value", () => {
            const invalidModel: any = "invalid model";
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: "What is the weather like today?",
                                                    model: invalidModel,
                                                    max_tokens: 10,
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5
                                                })).toBe(false);
        });

        it("returns false for objects with non-number max_tokens value", () => {
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: "What is the weather like today?",
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: "10", // invalid value
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5
                                                })).toBe(false);
        });

        it("returns false for objects with non-number temperature value", () => {
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: "What is the weather like today?",
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 10,
                                                    temperature: "0.5",
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: 0.5
                                                })).toBe(false);
        });

        it("returns false for objects with non-number top_p value", () => {
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: "What is the capital city of France?",
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 15,
                                                    temperature: 0.7,
                                                    top_p: "0.8",
                                                    frequency_penalty: 0.6,
                                                    presence_penalty: 0.7
                                                })).toBe(false);
        });

        it("returns false for objects with non-number frequency_penalty value", () => {
            const request: any = {
                prompt: "What is the weather like today?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 10,
                temperature: 0.5,
                top_p: 0.9,
                frequency_penalty: "0.5",
                presence_penalty: 0.5
            };
            expect(isOpenAiCompletionRequestDTO(request)).toBe(false);
        });

        it("returns false for objects with non-number presence_penalty value", () => {
            expect(isOpenAiCompletionRequestDTO({
                                                    prompt: "What is the weather like today?",
                                                    model: OpenAiModel.DAVINCI,
                                                    max_tokens: 10,
                                                    temperature: 0.5,
                                                    top_p: 0.9,
                                                    frequency_penalty: 0.5,
                                                    presence_penalty: "0.5"
                                                })).toBe(false);
        });

    });

    describe("explainOpenAiCompletionRequestDTO", () => {

        it("returns a human-readable string explaining why the value is not a regular object", () => {
            expect(explainOpenAiCompletionRequestDTO(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO(null)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO(false)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO(true)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO(0)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO(1)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO("")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO("foo")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO([])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO([1, 2, 3])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionRequestDTO(() => {})).toMatch(/not regular object/);
        });

        it("returns a human-readable string explaining why the value has extra keys", () => {
            expect(explainOpenAiCompletionRequestDTO({
                                                         prompt: "What is the capital city of France?",
                                                         model: OpenAiModel.DAVINCI,
                                                         max_tokens: 15,
                                                         temperature: 0.7,
                                                         top_p: 0.8,
                                                         frequency_penalty: 0.6,
                                                         presence_penalty: 0.7,
                                                         extraKey: "this shouldn't be here"
                                                     })).toBe("Value had extra properties: extraKey");
        });

        it("returns a human-readable string explaining why the value has a non-string prompt property", () => {
            expect(explainOpenAiCompletionRequestDTO({
                                                         prompt: 12345,
                                                         model: OpenAiModel.DAVINCI,
                                                         max_tokens: 10,
                                                         temperature: 0.5,
                                                         top_p: 0.9,
                                                         frequency_penalty: 0.5,
                                                         presence_penalty: 0.5
                                                     })).toEqual(
                                                         // TODO: 'value has a property "prompt" with invalid value: expected string, got number'
                                                         'property "prompt" not string'
            );
        });

        it("returns a human-readable string explaining why the value has a non-OpenAiApiModel model property", () => {
            expect(explainOpenAiCompletionRequestDTO({ prompt: "What is the weather like today?", model: "not a model" })).toMatch(
                // 'incorrect enum value "not a model" for model: Accepted values davinci, curie, babbage, ada, eliza, einstein'
                /incorrect enum value/
            );
        });

        it('returns a human-readable string explaining why the value has a non-number max_tokens property', () => {
            const nonNumberMaxTokensValues = [null, true, false, '5', [], {}];
            for (const nonNumberMaxTokensValue of nonNumberMaxTokensValues) {
                const value = {
                    prompt: 'What is the weather like today?',
                    model: OpenAiModel.DAVINCI,
                    max_tokens: nonNumberMaxTokensValue,
                    temperature: 0.5,
                    top_p: 0.9,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.5,
                };
                expect(explainOpenAiCompletionRequestDTO(value)).toMatch(/property "max_tokens" not number/);
            }
        });

        it("returns a human-readable string explaining why the value has a non-number temperature property", () => {
            const value = {
                prompt: "What is the capital city of France?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 15,
                temperature: "0.7", // This value is a string, not a number
                top_p: 0.8,
                frequency_penalty: 0.6,
                presence_penalty: 0.7
            };

            expect(explainOpenAiCompletionRequestDTO(value)).toBe(
                // TODO: 'incorrect property value for temperature: expected a number, but got a string'
                'property "temperature" not number'
            );
        });

        it("returns a human-readable string explaining why the value has a non-number top_p property", () => {
            const value = {
                prompt: "What is the weather like today?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 10,
                temperature: 0.5,
                top_p: "0.9", // top_p is a string, not a number
                frequency_penalty: 0.5,
                presence_penalty: 0.5
            };
            const result = explainOpenAiCompletionRequestDTO(value);
            // TODO: const expected = `invalid OpenAiCompletionRequestDTO: top_p: expected a number, got string`;
            const expected = `property "top_p" not number`;
            expect(result).toEqual(expected);
        });

        it("returns a human-readable string explaining why the value has a non-number frequency_penalty property", () => {
            const invalidValue = {
                prompt: "What is the capital city of France?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 15,
                temperature: 0.7,
                top_p: 0.8,
                frequency_penalty: "not a number",
                presence_penalty: 0.7
            };
            expect(explainOpenAiCompletionRequestDTO(invalidValue)).toEqual(
                // TODO: 'incorrect property value "not a number" for frequency_penalty: must be a number'
                'property "frequency_penalty" not number'
            );
        });

        it('returns a human-readable string explaining why the value has a non-number presence_penalty property', () => {
            expect(explainOpenAiCompletionRequestDTO({
                                                         prompt: 'What is the weather like today?',
                                                         model: OpenAiModel.DAVINCI,
                                                         max_tokens: 10,
                                                         temperature: 0.5,
                                                         top_p: 0.9,
                                                         frequency_penalty: 0.5,
                                                         presence_penalty: '0.5'
                                                     })).toBe(
                                                         // TODO: 'incorrect value "0.5" for presence_penalty: Value must be a number'
                                                         'property "presence_penalty" not number'
            );
        });

    });

    describe("stringifyOpenAiCompletionRequestDTO", () => {

        it("returns a string representation of the OpenAiCompletionRequestDTO object", () => {
            const request: OpenAiCompletionRequestDTO = {
                prompt: "What is the weather like today?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 10,
                temperature: 0.5,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.5
            };
            expect(stringifyOpenAiCompletionRequestDTO(request)).toEqual(`OpenAiCompletionRequestDTO(${JSON.stringify(request)})`);
        });

    });

    describe("parseOpenAiCompletionRequestDTO", () => {

        it("parses a valid OpenAiCompletionRequestDTO string as an OpenAiCompletionRequestDTO object", () => {
            const request: OpenAiCompletionRequestDTO = {
                prompt: "What is the weather like today?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 10,
                temperature: 0.5,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.5
            };
            const requestString: string = `OpenAiCompletionRequestDTO(${JSON.stringify(request)})`;
            expect(parseOpenAiCompletionRequestDTO(requestString)).toEqual(request);
        });

        it("parses a valid JSON string as an OpenAiCompletionRequestDTO object", () => {
            const request: OpenAiCompletionRequestDTO = {
                prompt: "What is the weather like today?",
                model: OpenAiModel.DAVINCI,
                max_tokens: 10,
                temperature: 0.5,
                top_p: 0.9,
                frequency_penalty: 0.5,
                presence_penalty: 0.5
            };
            const requestString: string = `${JSON.stringify(request)}`;
            expect(parseOpenAiCompletionRequestDTO(requestString)).toEqual(request);
        });

        it("returns undefined for invalid OpenAiCompletionRequestDTO strings", () => {
            expect(parseOpenAiCompletionRequestDTO("invalid string")).toBeUndefined();
            expect(parseOpenAiCompletionRequestDTO("OpenAiCompletionRequestDTO(invalid json)")).toBeUndefined();
        });
    });

});

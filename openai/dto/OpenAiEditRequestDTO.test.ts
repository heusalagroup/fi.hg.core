// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { OpenAiEditRequestDTO, createOpenAiEditRequestDTO, isOpenAiEditRequestDTO, explainOpenAiEditRequestDTO, stringifyOpenAiEditRequestDTO, parseOpenAiEditRequestDTO } from "./OpenAiEditRequestDTO";
import { OpenAiModel } from "../types/OpenAiModel";

describe("OpenAiEditRequestDTO", () => {

    describe("createOpenAiEditRequestDTO", () => {

        it("creates valid OpenAiEditRequestDTO objects", () => {
            const request1: OpenAiEditRequestDTO = createOpenAiEditRequestDTO(
                "Fix the spelling mistakes",
                "What day of the wek is it?",
                OpenAiModel.DAVINCI_EDIT_TEXT,
                1,
                2,
                3
            );
            expect(request1).toEqual({
                                         instruction: "Fix the spelling mistakes",
                                         input: "What day of the wek is it?",
                                         model: OpenAiModel.DAVINCI_EDIT_TEXT,
                                         n: 1,
                                         temperature: 2,
                                         top_p: 3
                                     });

            const request2: OpenAiEditRequestDTO = createOpenAiEditRequestDTO(
                "What is the capital city of France?",
                "",
                OpenAiModel.DAVINCI_EDIT_TEXT,
                1,
                0.5,
                0.7
            );
            expect(request2).toEqual({
                                         instruction: "What is the capital city of France?",
                                         input: "",
                                         model: OpenAiModel.DAVINCI_EDIT_TEXT,
                                         n: 1,
                                         temperature: 0.5,
                                         top_p: 0.7
                                     });
        });

        it("throws an error if instruction is not a string", () => {
            expect(() => createOpenAiEditRequestDTO(
                // @ts-ignore
                undefined, // this should throw an error
                '',
                OpenAiModel.DAVINCI_EDIT_TEXT,
                10,
                0.5,
                0.9
            )).toThrowError();

            expect(() => createOpenAiEditRequestDTO(
                // @ts-ignore
                123, // this should throw an error
                '',
                OpenAiModel.DAVINCI_EDIT_TEXT,
                10,
                0.5,
                0.9
            )).toThrowError();
        });

        it("can have models which are not a valid OpenAiApiModel", () => {
            expect(() => createOpenAiEditRequestDTO(
                "What is the weather like today?",
                '',
                "invalid-model" as OpenAiModel, // this should work
                10,
                0.5,
                0.9
            )).not.toThrowError();
        });

        it("throws an error if n is not a number", () => {
            expect(() => createOpenAiEditRequestDTO(
                "What is the weather like today?",
                "",
                OpenAiModel.DAVINCI_EDIT_TEXT,
                "10" as any, // this should throw an error
                0.5,
                0.9
            )).toThrowError();
        });

        it("throws an error if temperature is not a number", () => {
            expect(() => createOpenAiEditRequestDTO(
                "What is the weather like today?",
                "",
                OpenAiModel.DAVINCI_EDIT_TEXT,
                10,
                "0.5" as any, // this should throw an error
                0.9
            )).toThrowError();
        });

        it("throws an error if top_p is not a number", () => {
            expect(() => createOpenAiEditRequestDTO(
                "What is the weather like today?",
                "",
                OpenAiModel.DAVINCI_EDIT_TEXT,
                10,
                0.5,
                "0.9" as any // this should throw an error
            )).toThrowError();
        });

    });

    describe("isOpenAiEditRequestDTO", () => {

        it("returns true for valid OpenAiEditRequestDTO objects", () => {
            const request1: OpenAiEditRequestDTO = {
                instruction: "What is the weather like today?",
                input: "",
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 10,
                temperature: 0.5,
                top_p: 0.9
            };
            expect(isOpenAiEditRequestDTO(request1)).toBe(true);

            const request2: OpenAiEditRequestDTO = {
                instruction: "What is the capital city of France?",
                input: '',
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 15,
                temperature: 0.7,
                top_p: 0.8
            };
            expect(isOpenAiEditRequestDTO(request2)).toBe(true);
        });

        it("returns false for non-object values", () => {
            expect(isOpenAiEditRequestDTO(null)).toBe(false);
            expect(isOpenAiEditRequestDTO(undefined)).toBe(false);
            expect(isOpenAiEditRequestDTO(true)).toBe(false);
            expect(isOpenAiEditRequestDTO(false)).toBe(false);
            expect(isOpenAiEditRequestDTO(0)).toBe(false);
            expect(isOpenAiEditRequestDTO(1)).toBe(false);
            expect(isOpenAiEditRequestDTO("")).toBe(false);
            expect(isOpenAiEditRequestDTO("hello")).toBe(false);
        });

        it("returns false for invalid OpenAiEditRequestDTO objects", () => {
            expect(isOpenAiEditRequestDTO(undefined)).toBe(false);
            expect(isOpenAiEditRequestDTO(null)).toBe(false);
            expect(isOpenAiEditRequestDTO(false)).toBe(false);
            expect(isOpenAiEditRequestDTO(true)).toBe(false);
            expect(isOpenAiEditRequestDTO("string")).toBe(false);
            expect(isOpenAiEditRequestDTO(123)).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {})).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {instruction: 123})).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {input: 123})).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {model: 123})).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {n: "string"})).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {temperature: "string"})).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {top_p: "string"})).toBe(false);
        });

        it("returns false for objects with extra keys", () => {
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: "What is the weather like today?",
                    input: "",
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 10,
                    temperature: 0.5,
                    top_p: 0.9,
                    extraKey: "extra value"
                }
            )).toBe(false);
        });

        it("returns false for objects with non-string instruction value", () => {
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: 123,
                    input: '',
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 10,
                    temperature: 0.5,
                    top_p: 0.9
                }
            )).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: null,
                    input: "",
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 10,
                    temperature: 0.5,
                    top_p: 0.9
                }
            )).toBe(false);
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: undefined,
                    input: "",
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 10,
                    temperature: 0.5,
                    top_p: 0.9
                }
            )).toBe(false);
        });

        it("returns false for objects with non-OpenAiApiModel model value", () => {
            const invalidModel: any = "invalid model";
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: "What is the weather like today?",
                    input: '',
                    model: invalidModel,
                    n: 10,
                    temperature: 0.5,
                    top_p: 0.9
                }
            )).toBe(false);
        });

        it("returns false for objects with non-number n value", () => {
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: "What is the weather like today?",
                    input: '',
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: "10", // invalid value
                    temperature: 0.5,
                    top_p: 0.9
                }
            )).toBe(false);
        });

        it("returns false for objects with non-number temperature value", () => {
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: "What is the weather like today?",
                    input: '',
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 10,
                    temperature: "0.5",
                    top_p: 0.9
                })).toBe(false);
        });

        it("returns false for objects with non-number top_p value", () => {
            expect(isOpenAiEditRequestDTO(
                {
                    instruction: "What is the capital city of France?",
                    input: '',
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 15,
                    temperature: 0.7,
                    top_p: "0.8"
                })).toBe(false);
        });

    });

    describe("explainOpenAiEditRequestDTO", () => {

        it("returns a human-readable string explaining why the value is not a regular object", () => {
            expect(explainOpenAiEditRequestDTO(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO(null)).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO(false)).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO(true)).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO(0)).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO(1)).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO("")).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO("foo")).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO([])).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO([ 1, 2, 3 ])).toMatch(/not regular object/);
            expect(explainOpenAiEditRequestDTO(() => {
            })).toMatch(/not regular object/);
        });

        it("returns a human-readable string explaining why the value has extra keys", () => {
            expect(explainOpenAiEditRequestDTO(
                {
                    instruction: "What is the capital city of France?",
                    input: "",
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 15,
                    temperature: 0.7,
                    top_p: 0.8,
                    extraKey: "this shouldn't be here"
                })).toBe("Value had extra properties: extraKey");
        });

        it("returns a human-readable string explaining why the value has a non-string instruction property", () => {
            expect(explainOpenAiEditRequestDTO(
                {
                    instruction: 12345,
                    input: "",
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: 10,
                    temperature: 0.5,
                    top_p: 0.9
                })).toEqual(
                // TODO: 'value has a property "instruction" with invalid value: expected string, got number'
                'property "instruction" not string'
            );
        });

        it("returns a human-readable string explaining why the value has a non-OpenAiApiModel model property", () => {
            expect(explainOpenAiEditRequestDTO(
                {instruction: "What is the weather like today?", model: "not a model"})).toMatch(
                // 'incorrect enum value "not a model" for model: Accepted values davinci, curie, babbage, ada, eliza, einstein'
                /incorrect enum value/
            );
        });

        it('returns a human-readable string explaining why the value has a non-number n property', () => {
            const nonNumberMaxTokensValues = [ null, true, false, '5', [], {} ];
            for ( const nonNumberMaxTokensValue of nonNumberMaxTokensValues ) {
                const value = {
                    instruction: 'What is the weather like today?',
                    input: "",
                    model: OpenAiModel.DAVINCI_EDIT_TEXT,
                    n: nonNumberMaxTokensValue,
                    temperature: 0.5,
                    top_p: 0.9
                };
                expect(explainOpenAiEditRequestDTO(value)).toMatch(/property "n" not number/);
            }
        });

        it("returns a human-readable string explaining why the value has a non-number temperature property", () => {
            const value = {
                instruction: "What is the capital city of France?",
                input: "",
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 15,
                temperature: "0.7", // This value is a string, not a number
                top_p: 0.8
            };

            expect(explainOpenAiEditRequestDTO(value)).toBe(
                // TODO: 'incorrect property value for temperature: expected a number, but got a string'
                'property "temperature" not number or undefined'
            );
        });

        it("returns a human-readable string explaining why the value has a non-number top_p property", () => {
            const value = {
                instruction: "What is the weather like today?",
                input: "",
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 10,
                temperature: 0.5,
                top_p: "0.9" // top_p is a string, not a number
            };
            const result = explainOpenAiEditRequestDTO(value);
            // TODO: const expected = `invalid OpenAiEditRequestDTO: top_p: expected a number, got string`;
            const expected = `property "top_p" not number or undefined`;
            expect(result).toEqual(expected);
        });

    });

    describe("stringifyOpenAiEditRequestDTO", () => {

        it("returns a string representation of the OpenAiEditRequestDTO object", () => {
            const request: OpenAiEditRequestDTO = {
                instruction: "What is the weather like today?",
                input: "",
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 10,
                temperature: 0.5,
                top_p: 0.9
            };
            expect(stringifyOpenAiEditRequestDTO(request)).toEqual(`OpenAiEditRequestDTO(${JSON.stringify(request)})`);
        });

    });

    describe("parseOpenAiEditRequestDTO", () => {

        it("parses a valid OpenAiEditRequestDTO string as an OpenAiEditRequestDTO object", () => {
            const request: OpenAiEditRequestDTO = {
                instruction: "What is the weather like today?",
                input: "",
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 10,
                temperature: 0.5,
                top_p: 0.9
            };
            const requestString: string = `OpenAiEditRequestDTO(${JSON.stringify(request)})`;
            expect(parseOpenAiEditRequestDTO(requestString)).toEqual(request);
        });

        it("parses a valid JSON string as an OpenAiEditRequestDTO object", () => {
            const request: OpenAiEditRequestDTO = {
                instruction: "What is the weather like today?",
                input: "",
                model: OpenAiModel.DAVINCI_EDIT_TEXT,
                n: 10,
                temperature: 0.5,
                top_p: 0.9
            };
            const requestString: string = `${JSON.stringify(request)}`;
            expect(parseOpenAiEditRequestDTO(requestString)).toEqual(request);
        });

        it("returns undefined for invalid OpenAiEditRequestDTO strings", () => {
            expect(parseOpenAiEditRequestDTO("invalid string")).toBeUndefined();
            expect(parseOpenAiEditRequestDTO("OpenAiEditRequestDTO(invalid json)")).toBeUndefined();
        });
    });

});

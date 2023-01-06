// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { createOpenAiCompletionResponseItemDTO, explainOpenAiCompletionResponseItemDTO, isOpenAiCompletionResponseItemDTO, OpenAiCompletionResponseItemDTO, parseOpenAiCompletionResponseItemDTO, stringifyOpenAiCompletionResponseItemDTO } from "./OpenAiCompletionResponseItemDTO";

describe("OpenAiCompletionResponseItemDTO", () => {

    describe("createOpenAiCompletionResponseItemDTO", () => {
        it("creates a valid OpenAiCompletionResponseItemDTO object", () => {
            const item1: OpenAiCompletionResponseItemDTO = createOpenAiCompletionResponseItemDTO(
                "completed text",
                0.5,
                ["choice1", "choice2"]
            );
            expect(item1).toEqual({
                                      text: "completed text",
                                      score: 0.5,
                                      choices: ["choice1", "choice2"]
                                  });

            const item2: OpenAiCompletionResponseItemDTO = createOpenAiCompletionResponseItemDTO(
                "more completed text",
                0.7,
                ["choice3", "choice4"]
            );
            expect(item2).toEqual({
                                      text: "more completed text",
                                      score: 0.7,
                                      choices: ["choice3", "choice4"]
                                  });
        });
    });

    describe('isOpenAiCompletionResponseItemDTO', () => {
        it('returns true for valid OpenAiCompletionResponseItemDTO objects', () => {
            expect(isOpenAiCompletionResponseItemDTO({
                                                         text: 'This is a test',
                                                         score: 0.5,
                                                         choices: ['choice1', 'choice2', 'choice3']
                                                     })).toBe(true);
        });

        it('returns false for invalid OpenAiCompletionResponseItemDTO objects', () => {
            // not an object
            expect(isOpenAiCompletionResponseItemDTO('invalid')).toBe(false);
            // extra keys
            expect(isOpenAiCompletionResponseItemDTO({
                                                         text: 'This is a test',
                                                         score: 0.5,
                                                         choices: ['choice1', 'choice2', 'choice3'],
                                                         extraKey: 'extra value'
                                                     })).toBe(false);
            // non-string text
            expect(isOpenAiCompletionResponseItemDTO({
                                                         text: ['This is a test'],
                                                         score: 0.5,
                                                         choices: ['choice1', 'choice2', 'choice3']
                                                     })).toBe(false);
            // non-number score
            expect(isOpenAiCompletionResponseItemDTO({
                                                         text: 'This is a test',
                                                         score: '0.5',
                                                         choices: ['choice1', 'choice2', 'choice3']
                                                     })).toBe(false);
            // non-string-array choices
            expect(isOpenAiCompletionResponseItemDTO({
                                                         text: 'This is a test',
                                                         score: 0.5,
                                                         choices: 'choice1, choice2, choice3'
                                                     })).toBe(false);
        });
    });

    describe("explainOpenAiCompletionResponseItemDTO", () => {

        it("returns a human-readable string explaining why the value has extra keys", () => {
            const value = {
                text: "This is a text",
                score: 0.5,
                choices: ["choice1", "choice2"],
                extraKey: "This is an extra key"
            };
            expect(explainOpenAiCompletionResponseItemDTO(value)).toEqual(
                "Value had extra properties: extraKey"
            );
        });

        it("returns a human-readable string explaining why the value has a non-string text property", () => {
            expect(explainOpenAiCompletionResponseItemDTO({
                                                              text: 5,
                                                              score: 0.5,
                                                              choices: ["choice1", "choice2"]
                                                          })).toEqual(
                  // "Object has a non-string property 'text' (5)"
                  'property "text" not string'
            );
        });

        it("returns a human-readable string explaining why the value has a non-number score property", () => {
            expect(explainOpenAiCompletionResponseItemDTO({
                                                              text: "Some text",
                                                              score: "not a number",
                                                              choices: ["choice1", "choice2"]
                                                          })).toBe(
            // "Expected property 'score' to be a number, but got string 'not a number' instead"
            'property "score" not number'
            );
        });

        it("returns a human-readable string explaining why the value is not a valid OpenAiCompletionResponseItemDTO", () => {
            expect(explainOpenAiCompletionResponseItemDTO({ extra: "key" })).toMatch(/Value had extra properties: extra/);
            expect(explainOpenAiCompletionResponseItemDTO("foo")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(null)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(true)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(false)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(0)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(1)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO("")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO("test")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO([])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(["test"])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(() => {})).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseItemDTO(Symbol())).toMatch(/not regular object/);
        });

    });

    describe("stringifyOpenAiCompletionResponseItemDTO", () => {
        it("should return the string 'OpenAiCompletionResponseItemDTO({...})'", () => {
            const value: OpenAiCompletionResponseItemDTO = {
                text: "This is a test",
                score: 0.9,
                choices: ["This is a choice", "This is another choice"]
            };
            const expected = "OpenAiCompletionResponseItemDTO({\"text\":\"This is a test\",\"score\":0.9,\"choices\":[\"This is a choice\",\"This is another choice\"]})";
            const result = stringifyOpenAiCompletionResponseItemDTO(value);
            expect(result).toEqual(expected);
        });
    });

    describe("parseOpenAiCompletionResponseItemDTO", () => {

        it("parses a valid OpenAiCompletionResponseItemDTO string representation", () => {
            const string = `OpenAiCompletionResponseItemDTO({"text":"text","score":1,"choices":["choice1","choice2"]})`;
            const value = parseOpenAiCompletionResponseItemDTO(string);
            expect(value).toEqual({
                                      text: "text",
                                      score: 1,
                                      choices: ["choice1", "choice2"]
                                  });
        });

        it("parses a valid OpenAiCompletionResponseItemDTO object", () => {
            const object = {
                text: "text",
                score: 1,
                choices: ["choice1", "choice2"]
            };
            const value = parseOpenAiCompletionResponseItemDTO(object);
            expect(value).toEqual(object);
        });

        it("returns undefined for an invalid OpenAiCompletionResponseItemDTO string representation", () => {
            const string = `OpenAiCompletionResponseItemDTO({"invalid":true})`;
            const value = parseOpenAiCompletionResponseItemDTO(string);
            expect(value).toBeUndefined();
        });

        it("returns undefined for a non-OpenAiCompletionResponseItemDTO object", () => {
            const object = {
                invalid: true
            };
            const value = parseOpenAiCompletionResponseItemDTO(object);
            expect(value).toBeUndefined();
        });

        it("returns undefined for non-string, non-object values", () => {
            expect(parseOpenAiCompletionResponseItemDTO(null)).toBeUndefined();
            expect(parseOpenAiCompletionResponseItemDTO(true)).toBeUndefined();
            expect(parseOpenAiCompletionResponseItemDTO(1)).toBeUndefined();
            expect(parseOpenAiCompletionResponseItemDTO([])).toBeUndefined();
        });

    });

});

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiCompletionResponseChoice,
    explainOpenAiCompletionResponseChoice,
    isOpenAiCompletionResponseChoice,
    OpenAiCompletionResponseChoice,
    parseOpenAiCompletionResponseChoice,
    stringifyOpenAiCompletionResponseChoice
} from "./OpenAiCompletionResponseChoice";

describe("OpenAiCompletionResponseChoice", () => {

    describe("createOpenAiCompletionResponseChoice", () => {
        it("creates a valid OpenAiCompletionResponseChoice object", () => {
            const item1: OpenAiCompletionResponseChoice = createOpenAiCompletionResponseChoice(
                "completed text",
                0,
                null,
                'length'
            );
            expect(item1).toEqual({
                                      text: "completed text",
                                      index: 0,
                                      logprobs: null,
                                      finish_reason: 'length'
                                  });

            const item2: OpenAiCompletionResponseChoice = createOpenAiCompletionResponseChoice(
                "more completed text",
                1,
                3,
                'length'
            );
            expect(item2).toEqual({
                                      text: "more completed text",
                                      index: 1,
                                      logprobs: 3,
                                      finish_reason: 'length'
                                  });
        });
    });

    describe('isOpenAiCompletionResponseChoice', () => {
        it('returns true for valid OpenAiCompletionResponseChoice objects', () => {
            expect(isOpenAiCompletionResponseChoice({
                                                         text: 'This is a test',
                                                         index: 0,
                                                        logprobs: null,
                                                        finish_reason: 'length'
                                                     })).toBe(true);
        });

        it('returns false for invalid OpenAiCompletionResponseChoice objects', () => {
            // not an object
            expect(isOpenAiCompletionResponseChoice('invalid')).toBe(false);
            // extra keys
            expect(isOpenAiCompletionResponseChoice({
                                                         text: 'This is a test',
                                                         index: 0,
                                                        logprobs: null,
                                                        finish_reason: 'length',
                                                         extraKey: 'extra value'
                                                     })).toBe(false);
            // non-string text
            expect(isOpenAiCompletionResponseChoice({
                                                         text: ['This is a test'],
                                                         index: 0,
                                                        logprobs: null,
                                                        finish_reason: 'length'
                                                     })).toBe(false);
            // non-number index
            expect(isOpenAiCompletionResponseChoice({
                                                         text: 'This is a test',
                                                         index: '0',
                                                        logprobs: null,
                                                        finish_reason: 'length'
                                                     })).toBe(false);
        });
    });

    describe("explainOpenAiCompletionResponseChoice", () => {

        it("returns a human-readable string explaining why the value has extra keys", () => {
            const value = {
                text: "This is a text",
                index: 0,
                logprobs: null,
                finish_reason: 'length',
                extraKey: "This is an extra key"
            };
            expect(explainOpenAiCompletionResponseChoice(value)).toEqual(
                "Value had extra properties: extraKey"
            );
        });

        it("returns a human-readable string explaining why the value has a non-string text property", () => {
            expect(explainOpenAiCompletionResponseChoice({
                                                              text: 5,
                                                              index: 0,
                                                             logprobs: null,
                                                             finish_reason: 'length'
                                                          })).toEqual(
                  // "Object has a non-string property 'text' (5)"
                  'property "text" not string'
            );
        });

        it("returns a human-readable string explaining why the value has a non-number index property", () => {
            expect(explainOpenAiCompletionResponseChoice({
                                                              text: "Some text",
                                                              index: "not a number",
                                                              logprobs: null,
                                                              finish_reason: 'length'
                                                          })).toBe(
            // "Expected property 'index' to be a number, but got string 'not a number' instead"
            'property "index" not number'
            );
        });

        it("returns a human-readable string explaining why the value is not a valid OpenAiCompletionResponseChoice", () => {
            expect(explainOpenAiCompletionResponseChoice({ extra: "key" })).toMatch(/Value had extra properties: extra/);
            expect(explainOpenAiCompletionResponseChoice("foo")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(null)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(true)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(false)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(0)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(1)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice("")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice("test")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice([])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(["test"])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(() => {})).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseChoice(Symbol())).toMatch(/not regular object/);
        });

    });

    describe("stringifyOpenAiCompletionResponseChoice", () => {
        it("should return the string 'OpenAiCompletionResponseChoice({...})'", () => {
            const value: OpenAiCompletionResponseChoice = {
                text: "This is a test",
                index: 2,
                logprobs: null,
                finish_reason: 'length'
            };
            const expected = "OpenAiCompletionResponseChoice({\"text\":\"This is a test\",\"index\":2,\"logprobs\":null,\"finish_reason\":\"length\"})";
            const result = stringifyOpenAiCompletionResponseChoice(value);
            expect(result).toEqual(expected);
        });
    });

    describe("parseOpenAiCompletionResponseChoice", () => {

        it("parses a valid OpenAiCompletionResponseChoice string representation", () => {
            const string = `OpenAiCompletionResponseChoice({"text":"text","index":1,"logprobs":null,"finish_reason":"length"})`;
            const value = parseOpenAiCompletionResponseChoice(string);
            expect(value).toEqual({
                                      text: "text",
                                      index: 1,
                                      logprobs: null,
                                      finish_reason: 'length'
                                  });
        });

        it("parses a valid OpenAiCompletionResponseChoice object", () => {
            const object = {
                text: "text",
                index: 1,
                logprobs: null,
                finish_reason: 'length'
            };
            const value = parseOpenAiCompletionResponseChoice(object);
            expect(value).toEqual(object);
        });

        it("returns undefined for an invalid OpenAiCompletionResponseChoice string representation", () => {
            const string = `OpenAiCompletionResponseChoice({"invalid":true})`;
            const value = parseOpenAiCompletionResponseChoice(string);
            expect(value).toBeUndefined();
        });

        it("returns undefined for a non-OpenAiCompletionResponseChoice object", () => {
            const object = {
                invalid: true
            };
            const value = parseOpenAiCompletionResponseChoice(object);
            expect(value).toBeUndefined();
        });

        it("returns undefined for non-string, non-object values", () => {
            expect(parseOpenAiCompletionResponseChoice(null)).toBeUndefined();
            expect(parseOpenAiCompletionResponseChoice(true)).toBeUndefined();
            expect(parseOpenAiCompletionResponseChoice(1)).toBeUndefined();
            expect(parseOpenAiCompletionResponseChoice([])).toBeUndefined();
        });

    });

});

// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiEditResponseChoice,
    explainOpenAiEditResponseChoice,
    isOpenAiEditResponseChoice,
    OpenAiEditResponseChoice,
    parseOpenAiEditResponseChoice,
    stringifyOpenAiEditResponseChoice
} from "./OpenAiEditResponseChoice";

describe("OpenAiEditResponseChoice", () => {

    describe("createOpenAiEditResponseChoice", () => {
        it("creates a valid OpenAiEditResponseChoice object", () => {
            const item1: OpenAiEditResponseChoice = createOpenAiEditResponseChoice(
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

            const item2: OpenAiEditResponseChoice = createOpenAiEditResponseChoice(
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

    describe('isOpenAiEditResponseChoice', () => {
        it('returns true for valid OpenAiEditResponseChoice objects', () => {
            expect(isOpenAiEditResponseChoice({
                                                         text: 'This is a test',
                                                         index: 0,
                                                        logprobs: null,
                                                        finish_reason: 'length'
                                                     })).toBe(true);
        });

        it('returns false for invalid OpenAiEditResponseChoice objects', () => {
            // not an object
            expect(isOpenAiEditResponseChoice('invalid')).toBe(false);
            // extra keys
            expect(isOpenAiEditResponseChoice({
                                                         text: 'This is a test',
                                                         index: 0,
                                                        logprobs: null,
                                                        finish_reason: 'length',
                                                         extraKey: 'extra value'
                                                     })).toBe(false);
            // non-string text
            expect(isOpenAiEditResponseChoice({
                                                         text: ['This is a test'],
                                                         index: 0,
                                                        logprobs: null,
                                                        finish_reason: 'length'
                                                     })).toBe(false);
            // non-number index
            expect(isOpenAiEditResponseChoice({
                                                         text: 'This is a test',
                                                         index: '0',
                                                        logprobs: null,
                                                        finish_reason: 'length'
                                                     })).toBe(false);
        });
    });

    describe("explainOpenAiEditResponseChoice", () => {

        it("returns a human-readable string explaining why the value has extra keys", () => {
            const value = {
                text: "This is a text",
                index: 0,
                logprobs: null,
                finish_reason: 'length',
                extraKey: "This is an extra key"
            };
            expect(explainOpenAiEditResponseChoice(value)).toEqual(
                "Value had extra properties: extraKey"
            );
        });

        it("returns a human-readable string explaining why the value has a non-string text property", () => {
            expect(explainOpenAiEditResponseChoice({
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
            expect(explainOpenAiEditResponseChoice({
                                                              text: "Some text",
                                                              index: "not a number",
                                                              logprobs: null,
                                                              finish_reason: 'length'
                                                          })).toBe(
            // "Expected property 'index' to be a number, but got string 'not a number' instead"
            'property "index" not number'
            );
        });

        it("returns a human-readable string explaining why the value is not a valid OpenAiEditResponseChoice", () => {
            expect(explainOpenAiEditResponseChoice({ extra: "key" })).toMatch(/Value had extra properties: extra/);
            expect(explainOpenAiEditResponseChoice("foo")).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(null)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(true)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(false)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(0)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(1)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice("")).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice("test")).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice([])).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(["test"])).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(() => {})).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseChoice(Symbol())).toMatch(/not regular object/);
        });

    });

    describe("stringifyOpenAiEditResponseChoice", () => {
        it("should return the string 'OpenAiEditResponseChoice({...})'", () => {
            const value: OpenAiEditResponseChoice = {
                text: "This is a test",
                index: 2,
                logprobs: null,
                finish_reason: 'length'
            };
            const expected = "OpenAiEditResponseChoice({\"text\":\"This is a test\",\"index\":2,\"logprobs\":null,\"finish_reason\":\"length\"})";
            const result = stringifyOpenAiEditResponseChoice(value);
            expect(result).toEqual(expected);
        });
    });

    describe("parseOpenAiEditResponseChoice", () => {

        it("parses a valid OpenAiEditResponseChoice string representation", () => {
            const string = `OpenAiEditResponseChoice({"text":"text","index":1,"logprobs":null,"finish_reason":"length"})`;
            const value = parseOpenAiEditResponseChoice(string);
            expect(value).toEqual({
                                      text: "text",
                                      index: 1,
                                      logprobs: null,
                                      finish_reason: 'length'
                                  });
        });

        it("parses a valid OpenAiEditResponseChoice object", () => {
            const object = {
                text: "text",
                index: 1,
                logprobs: null,
                finish_reason: 'length'
            };
            const value = parseOpenAiEditResponseChoice(object);
            expect(value).toEqual(object);
        });

        it("returns undefined for an invalid OpenAiEditResponseChoice string representation", () => {
            const string = `OpenAiEditResponseChoice({"invalid":true})`;
            const value = parseOpenAiEditResponseChoice(string);
            expect(value).toBeUndefined();
        });

        it("returns undefined for a non-OpenAiEditResponseChoice object", () => {
            const object = {
                invalid: true
            };
            const value = parseOpenAiEditResponseChoice(object);
            expect(value).toBeUndefined();
        });

        it("returns undefined for non-string, non-object values", () => {
            expect(parseOpenAiEditResponseChoice(null)).toBeUndefined();
            expect(parseOpenAiEditResponseChoice(true)).toBeUndefined();
            expect(parseOpenAiEditResponseChoice(1)).toBeUndefined();
            expect(parseOpenAiEditResponseChoice([])).toBeUndefined();
        });

    });

});

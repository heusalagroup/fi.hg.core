// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiCompletionResponseUsage,
    explainOpenAiCompletionResponseUsage,
    isOpenAiCompletionResponseUsage,
    OpenAiCompletionResponseUsage,
    parseOpenAiCompletionResponseUsage,
    stringifyOpenAiCompletionResponseUsage
} from "./OpenAiCompletionResponseUsage";

describe("OpenAiCompletionResponseUsage", () => {

    describe("createOpenAiCompletionResponseUsage", () => {
        it("creates a valid OpenAiCompletionResponseUsage object", () => {
            const item1: OpenAiCompletionResponseUsage = createOpenAiCompletionResponseUsage(
                1,
                2,
                3
            );
            expect(item1).toEqual({
                                      prompt_tokens: 1,
                                      completion_tokens: 2,
                                      total_tokens: 3
                                  });

            const item2: OpenAiCompletionResponseUsage = createOpenAiCompletionResponseUsage(
                2,
                3,
                4
            );
            expect(item2).toEqual({
                                      prompt_tokens: 2,
                                      completion_tokens: 3,
                                      total_tokens: 4
                                  });
        });
    });

    describe('isOpenAiCompletionResponseUsage', () => {
        it('returns true for valid OpenAiCompletionResponseUsage objects', () => {
            expect(isOpenAiCompletionResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: 2,
                                                        total_tokens: 3
                                                    })).toBe(true);
        });

        it('returns false for invalid OpenAiCompletionResponseUsage objects', () => {
            // not an object
            expect(isOpenAiCompletionResponseUsage('invalid')).toBe(false);
            // extra keys
            expect(isOpenAiCompletionResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: 2,
                                                        total_tokens: 3,
                                                        extraKey: 'extra value'
                                                    })).toBe(false);
            // non-number prompt_tokens
            expect(isOpenAiCompletionResponseUsage({
                                                        prompt_tokens: '1',
                                                        completion_tokens: 2,
                                                        total_tokens: 3
                                                    })).toBe(false);
            // non-number completion_tokens
            expect(isOpenAiCompletionResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: '2',
                                                        total_tokens: 3
                                                    })).toBe(false);
            // non-number total_tokens
            expect(isOpenAiCompletionResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: 2,
                                                        total_tokens: '3'
                                                    })).toBe(false);
        });
    });

    describe("explainOpenAiCompletionResponseUsage", () => {

        it("returns a human-readable string explaining why the value has extra keys", () => {
            const value = {
                prompt_tokens: 1,
                completion_tokens: 2,
                total_tokens: 3,
                extraKey: "This is an extra key"
            };
            expect(explainOpenAiCompletionResponseUsage(value)).toEqual(
                "Value had extra properties: extraKey"
            );
        });

        it("returns a human-readable string explaining why the value has a non-number text property", () => {
            expect(explainOpenAiCompletionResponseUsage({
                                                             prompt_tokens: "1",
                                                             completion_tokens: 2,
                                                             total_tokens: 3
                                                         })).toEqual(
                // "Object has a non-number property 'prompt_tokens' ("1")"
                'property "prompt_tokens" not number'
            );
        });

        it("returns a human-readable string explaining why the value has a non-number completion_tokens property", () => {
            expect(explainOpenAiCompletionResponseUsage({
                                                             prompt_tokens: 1,
                                                             completion_tokens: "not a number",
                                                             total_tokens: 3
                                                         })).toBe(
                // "Expected property 'completion_tokens' to be a number, but got string 'not a number' instead"
                'property "completion_tokens" not number'
            );
        });

        it("returns a human-readable string explaining why the value is not a valid OpenAiCompletionResponseUsage", () => {
            expect(explainOpenAiCompletionResponseUsage({ extra: "key" })).toMatch(/Value had extra properties: extra/);
            expect(explainOpenAiCompletionResponseUsage("foo")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(null)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(true)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(false)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(0)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(1)).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage("")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage("test")).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage([])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(["test"])).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(() => {})).toMatch(/not regular object/);
            expect(explainOpenAiCompletionResponseUsage(Symbol())).toMatch(/not regular object/);
        });

    });

    describe("stringifyOpenAiCompletionResponseUsage", () => {
        it("should return the string 'OpenAiCompletionResponseUsage({...})'", () => {
            const value: OpenAiCompletionResponseUsage = {
                prompt_tokens: 1,
                completion_tokens: 2,
                total_tokens: 3
            };
            const expected = "OpenAiCompletionResponseUsage({\"prompt_tokens\":1,\"completion_tokens\":2,\"total_tokens\":3})";
            const result = stringifyOpenAiCompletionResponseUsage(value);
            expect(result).toEqual(expected);
        });
    });

    describe("parseOpenAiCompletionResponseUsage", () => {

        it("parses a valid OpenAiCompletionResponseUsage string representation", () => {
            const string = `OpenAiCompletionResponseUsage({"prompt_tokens":1,"completion_tokens":2,"total_tokens":3})`;
            const value = parseOpenAiCompletionResponseUsage(string);
            expect(value).toEqual({
                                      prompt_tokens: 1,
                                      completion_tokens: 2,
                                      total_tokens: 3
                                  });
        });

        it("parses a valid OpenAiCompletionResponseUsage object", () => {
            const object = {
                prompt_tokens: 1,
                completion_tokens: 2,
                total_tokens: 3
            };
            const value = parseOpenAiCompletionResponseUsage(object);
            expect(value).toEqual(object);
        });

        it("returns undefined for an invalid OpenAiCompletionResponseUsage string representation", () => {
            const string = `OpenAiCompletionResponseUsage({"invalid":true})`;
            const value = parseOpenAiCompletionResponseUsage(string);
            expect(value).toBeUndefined();
        });

        it("returns undefined for a non-OpenAiCompletionResponseUsage object", () => {
            const object = {
                invalid: true
            };
            const value = parseOpenAiCompletionResponseUsage(object);
            expect(value).toBeUndefined();
        });

        it("returns undefined for non-string, non-object values", () => {
            expect(parseOpenAiCompletionResponseUsage(null)).toBeUndefined();
            expect(parseOpenAiCompletionResponseUsage(true)).toBeUndefined();
            expect(parseOpenAiCompletionResponseUsage(1)).toBeUndefined();
            expect(parseOpenAiCompletionResponseUsage([])).toBeUndefined();
        });

    });

});

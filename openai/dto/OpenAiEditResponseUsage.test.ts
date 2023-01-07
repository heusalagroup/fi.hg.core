// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import {
    createOpenAiEditResponseUsage,
    explainOpenAiEditResponseUsage,
    isOpenAiEditResponseUsage,
    OpenAiEditResponseUsage,
    parseOpenAiEditResponseUsage,
    stringifyOpenAiEditResponseUsage
} from "./OpenAiEditResponseUsage";

describe("OpenAiEditResponseUsage", () => {

    describe("createOpenAiEditResponseUsage", () => {
        it("creates a valid OpenAiEditResponseUsage object", () => {
            const item1: OpenAiEditResponseUsage = createOpenAiEditResponseUsage(
                1,
                2,
                3
            );
            expect(item1).toEqual({
                                      prompt_tokens: 1,
                                      completion_tokens: 2,
                                      total_tokens: 3
                                  });

            const item2: OpenAiEditResponseUsage = createOpenAiEditResponseUsage(
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

    describe('isOpenAiEditResponseUsage', () => {
        it('returns true for valid OpenAiEditResponseUsage objects', () => {
            expect(isOpenAiEditResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: 2,
                                                        total_tokens: 3
                                                    })).toBe(true);
        });

        it('returns false for invalid OpenAiEditResponseUsage objects', () => {
            // not an object
            expect(isOpenAiEditResponseUsage('invalid')).toBe(false);
            // extra keys
            expect(isOpenAiEditResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: 2,
                                                        total_tokens: 3,
                                                        extraKey: 'extra value'
                                                    })).toBe(false);
            // non-number prompt_tokens
            expect(isOpenAiEditResponseUsage({
                                                        prompt_tokens: '1',
                                                        completion_tokens: 2,
                                                        total_tokens: 3
                                                    })).toBe(false);
            // non-number completion_tokens
            expect(isOpenAiEditResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: '2',
                                                        total_tokens: 3
                                                    })).toBe(false);
            // non-number total_tokens
            expect(isOpenAiEditResponseUsage({
                                                        prompt_tokens: 1,
                                                        completion_tokens: 2,
                                                        total_tokens: '3'
                                                    })).toBe(false);
        });
    });

    describe("explainOpenAiEditResponseUsage", () => {

        it("returns a human-readable string explaining why the value has extra keys", () => {
            const value = {
                prompt_tokens: 1,
                completion_tokens: 2,
                total_tokens: 3,
                extraKey: "This is an extra key"
            };
            expect(explainOpenAiEditResponseUsage(value)).toEqual(
                "Value had extra properties: extraKey"
            );
        });

        it("returns a human-readable string explaining why the value has a non-number text property", () => {
            expect(explainOpenAiEditResponseUsage({
                                                             prompt_tokens: "1",
                                                             completion_tokens: 2,
                                                             total_tokens: 3
                                                         })).toEqual(
                // "Object has a non-number property 'prompt_tokens' ("1")"
                'property "prompt_tokens" not number'
            );
        });

        it("returns a human-readable string explaining why the value has a non-number completion_tokens property", () => {
            expect(explainOpenAiEditResponseUsage({
                                                             prompt_tokens: 1,
                                                             completion_tokens: "not a number",
                                                             total_tokens: 3
                                                         })).toBe(
                // "Expected property 'completion_tokens' to be a number, but got string 'not a number' instead"
                'property "completion_tokens" not number'
            );
        });

        it("returns a human-readable string explaining why the value is not a valid OpenAiEditResponseUsage", () => {
            expect(explainOpenAiEditResponseUsage({ extra: "key" })).toMatch(/Value had extra properties: extra/);
            expect(explainOpenAiEditResponseUsage("foo")).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(undefined)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(null)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(true)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(false)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(0)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(1)).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage("")).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage("test")).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage([])).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(["test"])).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(() => {})).toMatch(/not regular object/);
            expect(explainOpenAiEditResponseUsage(Symbol())).toMatch(/not regular object/);
        });

    });

    describe("stringifyOpenAiEditResponseUsage", () => {
        it("should return the string 'OpenAiEditResponseUsage({...})'", () => {
            const value: OpenAiEditResponseUsage = {
                prompt_tokens: 1,
                completion_tokens: 2,
                total_tokens: 3
            };
            const expected = "OpenAiEditResponseUsage({\"prompt_tokens\":1,\"completion_tokens\":2,\"total_tokens\":3})";
            const result = stringifyOpenAiEditResponseUsage(value);
            expect(result).toEqual(expected);
        });
    });

    describe("parseOpenAiEditResponseUsage", () => {

        it("parses a valid OpenAiEditResponseUsage string representation", () => {
            const string = `OpenAiEditResponseUsage({"prompt_tokens":1,"completion_tokens":2,"total_tokens":3})`;
            const value = parseOpenAiEditResponseUsage(string);
            expect(value).toEqual({
                                      prompt_tokens: 1,
                                      completion_tokens: 2,
                                      total_tokens: 3
                                  });
        });

        it("parses a valid OpenAiEditResponseUsage object", () => {
            const object = {
                prompt_tokens: 1,
                completion_tokens: 2,
                total_tokens: 3
            };
            const value = parseOpenAiEditResponseUsage(object);
            expect(value).toEqual(object);
        });

        it("returns undefined for an invalid OpenAiEditResponseUsage string representation", () => {
            const string = `OpenAiEditResponseUsage({"invalid":true})`;
            const value = parseOpenAiEditResponseUsage(string);
            expect(value).toBeUndefined();
        });

        it("returns undefined for a non-OpenAiEditResponseUsage object", () => {
            const object = {
                invalid: true
            };
            const value = parseOpenAiEditResponseUsage(object);
            expect(value).toBeUndefined();
        });

        it("returns undefined for non-string, non-object values", () => {
            expect(parseOpenAiEditResponseUsage(null)).toBeUndefined();
            expect(parseOpenAiEditResponseUsage(true)).toBeUndefined();
            expect(parseOpenAiEditResponseUsage(1)).toBeUndefined();
            expect(parseOpenAiEditResponseUsage([])).toBeUndefined();
        });

    });

});

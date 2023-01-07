// Copyright (c) 2023. Heusala Group Oy <info@heusalagroup.fi>. All rights reserved.

import { explainOpenAiModel, isOpenAiModel, OpenAiModel, parseOpenAiModel, stringifyOpenAiModel } from "./OpenAiModel";

describe("OpenAiApiModel", () => {

    describe("isOpenApiModel", () => {

        it("should return true for valid models", () => {
            expect(isOpenAiModel(OpenAiModel.DAVINCI)).toBe(true);
            expect(isOpenAiModel(OpenAiModel.CURIE)).toBe(true);
            expect(isOpenAiModel(OpenAiModel.BABBAGE)).toBe(true);
            expect(isOpenAiModel(OpenAiModel.ADA)).toBe(true);
            // expect(isOpenApiModel(OpenAiApiModel.NEWTON)).toBe(true);
            // expect(isOpenApiModel(OpenAiApiModel.LOVE)).toBe(true);
            expect(isOpenAiModel(OpenAiModel.CODEX)).toBe(true);
            // expect(isOpenApiModel(OpenAiApiModel.POPPY)).toBe(true);
            expect(isOpenAiModel(OpenAiModel.CONTENT_FILTER)).toBe(true);
        });

        it("should return false for invalid models", () => {
            expect(isOpenAiModel(null)).toBe(false);
            expect(isOpenAiModel(undefined)).toBe(false);
            expect(isOpenAiModel("")).toBe(false);
            expect(isOpenAiModel("invalid")).toBe(false);
            expect(isOpenAiModel(123)).toBe(false);
            expect(isOpenAiModel({})).toBe(false);
            expect(isOpenAiModel([])).toBe(false);
        });

    });

    describe("explainOpenApiModel", () => {
        it("should return 'incorrect enum value' message for invalid values", () => {
            expect(explainOpenAiModel("invalid")).toMatch(/incorrect enum value "invalid" for OpenApiModel/);
            expect(explainOpenAiModel(123)).toMatch(/incorrect enum value "123" for OpenApiModel/);
            expect(explainOpenAiModel(null)).toMatch(/incorrect enum value "null" for OpenApiModel/);
            expect(explainOpenAiModel(undefined)).toMatch(/incorrect enum value "undefined" for OpenApiModel/);
        });

        it("should return OK message for valid values", () => {
            expect(explainOpenAiModel(OpenAiModel.DAVINCI)).toBe("OK");
            expect(explainOpenAiModel(OpenAiModel.CURIE)).toBe("OK");
            expect(explainOpenAiModel(OpenAiModel.BABBAGE)).toBe("OK");
            expect(explainOpenAiModel(OpenAiModel.ADA)).toBe("OK");
            // expect(explainOpenApiModel(OpenAiApiModel.LOVELACE)).toBe("OK");
        });
    });

    describe('stringifyOpenApiModel', () => {
        it('should return the string representation of the OpenAiApiModel', () => {
            expect(stringifyOpenAiModel(OpenAiModel.DAVINCI)).toEqual('text-davinci-003');
            expect(stringifyOpenAiModel(OpenAiModel.CURIE)).toEqual('text-curie-001');
            expect(stringifyOpenAiModel(OpenAiModel.BABBAGE)).toEqual('text-babbage-001');
            expect(stringifyOpenAiModel(OpenAiModel.ADA)).toEqual('text-ada-001');
        });
    });

    describe("parseOpenApiModel", () => {

        it("parses a string representation of a model into the corresponding enum value", () => {
            expect(parseOpenAiModel("text-davinci-003")).toEqual(OpenAiModel.DAVINCI);
            expect(parseOpenAiModel("text-curie-001")).toEqual(OpenAiModel.CURIE);
            expect(parseOpenAiModel("text-babbage-001")).toEqual(OpenAiModel.BABBAGE);
            expect(parseOpenAiModel("text-ada-001")).toEqual(OpenAiModel.ADA);
            // expect(parseOpenApiModel("text-lovelace-002")).toEqual(OpenAiApiModel.LOVELACE);
        });

        it("returns undefined if the given string is not a valid model", () => {
            expect(parseOpenAiModel("")).toBeUndefined();
            expect(parseOpenAiModel("invalid-model")).toBeUndefined();
            expect(parseOpenAiModel("text-davinci-004")).toBeUndefined();
        });

    });

});
